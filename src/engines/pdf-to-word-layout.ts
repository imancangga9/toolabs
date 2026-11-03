import type { OutputResult } from './types';

const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const RENDER_SCALE = 2;
const EMU_PER_PT = 12700;

type TextBox = {
  text: string;
  x: number;
  baseline: number;
  width: number;
  size: number;
  font: string;
  bold: boolean;
  italic: boolean;
  color: string;
};
type PageData = { widthPt: number; heightPt: number; image: Uint8Array; boxes: TextBox[] };

function canceledError(): Error {
  return Object.assign(new Error('canceled'), { code: 'canceled' });
}

function escapeXml(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f￾￿]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function mapFont(name: string, family: string): { font: string; bold: boolean; italic: boolean } {
  const source = `${name} ${family}`;
  const bold = /bold|black|heavy|semibold|demi/i.test(name);
  const italic = /italic|oblique/i.test(name);
  let font = 'Arial';
  if (/courier|mono|consolas/i.test(source)) font = 'Courier New';
  else if (/times/i.test(source)) font = 'Times New Roman';
  else if (/calibri/i.test(source)) font = 'Calibri';
  else if (/arial|helvet/i.test(source)) font = 'Arial';
  else if (/georgia|garamond|palatino|cambria|book|serif/i.test(source) && !/sans/i.test(source)) {
    font = 'Times New Roman';
  }
  return { font, bold, italic };
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? 255;
}

/**
 * Samples the background around a text box, picks the text color from the pixel that differs
 * most from it, then paints the box with the background so the page image no longer contains
 * that text (the editable text is placed on top in the DOCX).
 */
function eraseText(
  context: CanvasRenderingContext2D,
  left: number,
  top: number,
  width: number,
  height: number,
): string {
  const pad = 3;
  const x = Math.max(0, Math.floor(left) - pad);
  const y = Math.max(0, Math.floor(top) - pad);
  const w = Math.min(context.canvas.width - x, Math.ceil(width) + pad * 2);
  const h = Math.min(context.canvas.height - y, Math.ceil(height) + pad * 2);
  if (w <= pad * 2 || h <= pad * 2) return '000000';
  const { data } = context.getImageData(x, y, w, h);

  const reds: number[] = [];
  const greens: number[] = [];
  const blues: number[] = [];
  for (let py = 0; py < h; py += 1) {
    for (let px = 0; px < w; px += 1) {
      if (px < pad || px >= w - pad || py < pad || py >= h - pad) {
        const i = (py * w + px) * 4;
        reds.push(data[i]);
        greens.push(data[i + 1]);
        blues.push(data[i + 2]);
      }
    }
  }
  const bg = [median(reds), median(greens), median(blues)];

  let best = 0;
  let color = [0, 0, 0];
  for (let py = pad; py < h - pad; py += 1) {
    for (let px = pad; px < w - pad; px += 1) {
      const i = (py * w + px) * 4;
      const distance =
        Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]);
      if (distance > best) {
        best = distance;
        color = [data[i], data[i + 1], data[i + 2]];
      }
    }
  }

  context.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
  context.fillRect(x + 1, y + 1, w - 2, h - 2);
  return best > 120 ? color.map((v) => v.toString(16).padStart(2, '0')).join('') : '000000';
}

function pictureXml(rid: string, id: number, widthPt: number, heightPt: number): string {
  const cx = Math.round(widthPt * EMU_PER_PT);
  const cy = Math.round(heightPt * EMU_PER_PT);
  return `<w:r><w:drawing><wp:anchor distT="0" distB="0" distL="0" distR="0" simplePos="0" relativeHeight="0" behindDoc="1" locked="0" layoutInCell="1" allowOverlap="1"><wp:simplePos x="0" y="0"/><wp:positionH relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionH><wp:positionV relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionV><wp:extent cx="${cx}" cy="${cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:wrapNone/><wp:docPr id="${id}" name="Page ${id}"/><wp:cNvGraphicFramePr/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${id}" name="page-${id}.jpg"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"/></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:anchor></w:drawing></w:r>`;
}

function frameXml(box: TextBox, pageHeightPt: number): string {
  const half = Math.max(2, Math.min(200, Math.round(box.size * 2)));
  const width = Math.round((box.width * 1.25 + 6) * 20);
  const height = Math.round(box.size * 1.35 * 20);
  const x = Math.round(box.x * 20);
  const y = Math.max(0, Math.round((pageHeightPt - box.baseline - box.size * 0.98) * 20));
  const line = Math.round(box.size * 1.2 * 20);
  const runProps = `<w:rPr><w:rFonts w:ascii="${box.font}" w:hAnsi="${box.font}" w:cs="${box.font}"/>${box.bold ? '<w:b/>' : ''}${box.italic ? '<w:i/>' : ''}<w:color w:val="${box.color}"/><w:sz w:val="${half}"/><w:szCs w:val="${half}"/></w:rPr>`;
  return `<w:p><w:pPr><w:framePr w:w="${width}" w:h="${height}" w:hRule="exact" w:wrap="none" w:vAnchor="page" w:hAnchor="page" w:x="${x}" w:y="${y}"/><w:spacing w:before="0" w:after="0" w:line="${line}" w:lineRule="exact"/></w:pPr><w:r>${runProps}<w:t xml:space="preserve">${escapeXml(box.text)}</w:t></w:r></w:p>`;
}

function sectionXml(widthPt: number, heightPt: number): string {
  const w = Math.round(widthPt * 20);
  const h = Math.round(heightPt * 20);
  const landscape = w > h ? ' w:orient="landscape"' : '';
  return `<w:sectPr><w:pgSz w:w="${w}" w:h="${h}"${landscape}/><w:pgMar w:top="0" w:right="0" w:bottom="0" w:left="0" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr>`;
}

const TINY = '<w:spacing w:before="0" w:after="0" w:line="20" w:lineRule="exact"/>';

function buildDocumentXml(pages: PageData[]): string {
  const body: string[] = [];
  pages.forEach((page, index) => {
    const last = index === pages.length - 1;
    body.push(
      `<w:p><w:pPr>${TINY}</w:pPr>${pictureXml(`rId${index + 2}`, index + 1, page.widthPt, page.heightPt)}</w:p>`,
    );
    for (const box of page.boxes) body.push(frameXml(box, page.heightPt));
    body.push(
      last
        ? `<w:p><w:pPr>${TINY}</w:pPr></w:p>`
        : `<w:p><w:pPr>${TINY}${sectionXml(page.widthPt, page.heightPt)}</w:pPr></w:p>`,
    );
  });
  const final = pages[pages.length - 1];
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>${body.join('')}${sectionXml(final.widthPt, final.heightPt)}</w:body></w:document>`;
}

async function packDocx(pages: PageData[], title: string): Promise<Blob> {
  const { zipSync, strToU8 } = await import('fflate');
  const imageRels = pages
    .map(
      (_, index) =>
        `<Relationship Id="rId${index + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/page${index + 1}.jpg"/>`,
    )
    .join('');
  const files: Record<string, Uint8Array> = {
    '[Content_Types].xml': strToU8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>',
    ),
    '_rels/.rels': strToU8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>',
    ),
    'word/_rels/document.xml.rels': strToU8(
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>${imageRels}</Relationships>`,
    ),
    'word/styles.xml': strToU8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="Arial" w:cs="Arial"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>',
    ),
    'docProps/core.xml': strToU8(
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${escapeXml(title)}</dc:title><dc:creator>Toolabs</dc:creator></cp:coreProperties>`,
    ),
    'word/document.xml': strToU8(buildDocumentXml(pages)),
  };
  pages.forEach((page, index) => {
    files[`word/media/page${index + 1}.jpg`] = page.image;
  });
  const zipped = zipSync(files, { level: 6 });
  return new Blob([new Uint8Array(zipped)], { type: DOCX_MIME });
}

/**
 * Layout-preserving conversion: each page becomes a background image (text erased from it)
 * with the original text placed on top as editable, absolutely positioned frames.
 */
export async function convertPdfToWordLayout(
  files: File[],
  onProgress?: (sourceIndex: number, progress: number) => void,
  signal?: AbortSignal,
): Promise<OutputResult[]> {
  // Legacy build avoids newer-browser APIs (Promise.try, Map.getOrInsertComputed) that make pdf.js fail on some browsers.
  const pdfjs = (await import('pdfjs-dist/legacy/build/pdf.mjs')) as typeof import('pdfjs-dist');
  const workerUrl = await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url');
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl.default;

  const results: OutputResult[] = [];

  for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
    if (signal?.aborted) throw canceledError();
    const file = files[fileIndex];
    const data = new Uint8Array(await file.arrayBuffer());
    let loadingTask: ReturnType<typeof pdfjs.getDocument> | undefined;
    const cancelLoading = () => {
      void loadingTask?.destroy();
    };
    signal?.addEventListener('abort', cancelLoading, { once: true });

    try {
      loadingTask = pdfjs.getDocument({ data });
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
      const base =
        file.name.replace(/\.[^.]+$/, '').replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-').trim() || 'document';
      const pages: PageData[] = [];

      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
        if (signal?.aborted) throw canceledError();
        const page = await pdf.getPage(pageNumber);
        const unit = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: RENDER_SCALE });
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.ceil(viewport.width));
        canvas.height = Math.max(1, Math.ceil(viewport.height));
        const context = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
        if (!context) throw new Error('Canvas 2D context unavailable');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const renderTask = page.render({ canvas, viewport });
        const cancelRender = () => renderTask.cancel();
        signal?.addEventListener('abort', cancelRender, { once: true });
        try {
          await renderTask.promise;
        } catch (error) {
          if (signal?.aborted) throw canceledError();
          throw error;
        } finally {
          signal?.removeEventListener('abort', cancelRender);
        }

        const content = await page.getTextContent();
        const boxes: TextBox[] = [];
        for (const item of content.items) {
          if (!('str' in item) || !item.str.trim()) continue;
          const [a, b, , , e, f] = item.transform as number[];
          const size = Math.hypot(a, b);
          // Rotated text stays in the page image only.
          if (!size || Math.abs(b) > Math.abs(a) * 0.01 || a < 0) continue;

          let fontName = '';
          try {
            fontName = (page.commonObjs.get(item.fontName) as { name?: string } | undefined)?.name ?? '';
          } catch {
            fontName = '';
          }
          const family = content.styles[item.fontName]?.fontFamily ?? '';
          const mapped = mapFont(fontName.replace(/^[A-Z]{6}\+/, ''), family);

          const baselineY = (unit.height - f) * RENDER_SCALE;
          const color = eraseText(
            context,
            e * RENDER_SCALE,
            baselineY - size * RENDER_SCALE * 0.85,
            item.width * RENDER_SCALE,
            size * RENDER_SCALE * 1.1,
          );
          boxes.push({ text: item.str, x: e, baseline: f, width: item.width, size, color, ...mapped });
        }

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (value) => (value ? resolve(value) : reject(new Error('JPG encoding failed'))),
            'image/jpeg',
            0.88,
          );
        });
        pages.push({
          widthPt: unit.width,
          heightPt: unit.height,
          image: new Uint8Array(await blob.arrayBuffer()),
          boxes,
        });
        canvas.width = 0;
        canvas.height = 0;
        page.cleanup();
        onProgress?.(fileIndex, (pageNumber / pageCount) * 0.9);
      }

      const blob = await packDocx(pages, base);
      if (signal?.aborted) throw canceledError();

      results.push({
        id: `pdf-word-${fileIndex}`,
        name: `${base}.docx`,
        blob,
        sourceIndex: fileIndex,
        meta: {
          originalBytes: file.size,
          bytes: blob.size,
          mime: DOCX_MIME,
          pages: pageCount,
          warnings: [],
        },
      });
      onProgress?.(fileIndex, 1);
    } catch (error) {
      if (signal?.aborted) throw canceledError();
      const message = error instanceof Error ? error.message : String(error);
      const code = /password|encrypt/i.test(message) ? 'password' : 'pdf';
      throw Object.assign(new Error(message), { code });
    } finally {
      signal?.removeEventListener('abort', cancelLoading);
      if (loadingTask) await loadingTask.destroy();
    }
  }

  return results;
}
