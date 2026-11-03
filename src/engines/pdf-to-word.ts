import type { OutputResult, WarningCode } from './types';
import { translateTexts, type LangCode } from './translate';
import { convertPdfToWordLayout } from './pdf-to-word-layout';

const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

type Fragment = { text: string; x: number; y: number; width: number; size: number };
type Line = { text: string; x: number; right: number; y: number; size: number };
type Paragraph = { text: string; size: number; heading: boolean };
type PageContent = { widthPt: number; heightPt: number; paragraphs: Paragraph[] };

function canceledError(): Error {
  return Object.assign(new Error('canceled'), { code: 'canceled' });
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function escapeXml(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f￾￿]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Groups positioned text fragments into visual lines, top to bottom, left to right. */
function buildLines(fragments: Fragment[]): Line[] {
  // Whitespace-only items hide real gaps (tab stops, table columns); spacing is rebuilt from positions.
  const sorted = fragments.filter((fragment) => fragment.text.trim()).sort((a, b) => b.y - a.y || a.x - b.x);
  const rows: Fragment[][] = [];
  for (const fragment of sorted) {
    const row = rows[rows.length - 1];
    const tolerance = Math.max(2, fragment.size * 0.45);
    if (row && Math.abs(row[0].y - fragment.y) <= tolerance) row.push(fragment);
    else rows.push([fragment]);
  }

  return rows.map((row) => {
    row.sort((a, b) => a.x - b.x);
    let text = '';
    let cursor = row[0].x;
    for (const fragment of row) {
      const gap = fragment.x - cursor;
      const space = fragment.size * 0.18;
      if (text && gap > space && !text.endsWith(' ') && !fragment.text.startsWith(' ')) {
        // A wide gap usually means a tab stop or table column.
        text += gap > fragment.size * 2.5 ? '\t' : ' ';
      }
      text += fragment.text;
      cursor = fragment.x + fragment.width;
    }
    return {
      text: text.replace(/[ ]{2,}/g, ' ').trimEnd(),
      x: row[0].x,
      right: cursor,
      y: row[0].y,
      size: median(row.map((fragment) => fragment.size)),
    };
  });
}

/** Merges wrapped lines back into paragraphs so the Word file is easy to edit. */
function buildParagraphs(lines: Line[], bodySize: number): Paragraph[] {
  const visible = lines.filter((line) => line.text.trim());
  if (!visible.length) return [];
  const maxRight = Math.max(...visible.map((line) => line.right));
  const minX = Math.min(...visible.map((line) => line.x));
  const paragraphs: Paragraph[] = [];
  let current: Paragraph | null = null;
  let previous: Line | null = null;

  for (const line of visible) {
    const heading = bodySize > 0 && line.size >= bodySize * 1.25;
    let startNew = true;
    if (current && previous && !heading && !current.heading) {
      const gap = previous.y - line.y;
      const sameBlock = gap > 0 && gap < line.size * 1.7;
      const previousFilled = previous.right - minX > (maxRight - minX) * 0.7;
      const indented = line.x - minX > line.size * 1.2;
      const hasTab = line.text.includes('\t') || previous.text.includes('\t');
      startNew = !(sameBlock && previousFilled && !indented && !hasTab);
    }
    if (startNew || !current) {
      current = { text: line.text, size: line.size, heading };
      paragraphs.push(current);
    } else {
      const joined = current.text.endsWith('-') ? '' : ' ';
      current.text += joined + line.text;
    }
    previous = line;
  }
  return paragraphs;
}

function paragraphXml(paragraph: Paragraph, bodySize: number, pageBreakBefore: boolean): string {
  const halfPoints = Math.max(16, Math.min(96, Math.round((paragraph.size || bodySize || 11) * 2)));
  const props = pageBreakBefore ? '<w:pPr><w:pageBreakBefore/></w:pPr>' : '';
  const runProps = `<w:rPr>${paragraph.heading ? '<w:b/>' : ''}<w:sz w:val="${halfPoints}"/><w:szCs w:val="${halfPoints}"/></w:rPr>`;
  const runs = paragraph.text
    .split('\t')
    .map((part) => `<w:r>${runProps}<w:t xml:space="preserve">${escapeXml(part)}</w:t></w:r>`)
    .join(`<w:r>${runProps}<w:tab/></w:r>`);
  return `<w:p>${props}${runs}</w:p>`;
}

function buildDocumentXml(pages: PageContent[], bodySize: number): string {
  const body: string[] = [];
  pages.forEach((page, pageIndex) => {
    if (!page.paragraphs.length) {
      body.push(pageIndex > 0 ? '<w:p><w:pPr><w:pageBreakBefore/></w:pPr></w:p>' : '<w:p/>');
      return;
    }
    page.paragraphs.forEach((paragraph, index) => {
      body.push(paragraphXml(paragraph, bodySize, pageIndex > 0 && index === 0));
    });
  });

  const first = pages[0];
  const width = Math.round((first?.widthPt ?? 595) * 20);
  const height = Math.round((first?.heightPt ?? 842) * 20);
  const landscape = width > height ? ' w:orient="landscape"' : '';
  const section = `<w:sectPr><w:pgSz w:w="${width}" w:h="${height}"${landscape}/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr>`;

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body.join('')}${section}</w:body></w:document>`;
}

async function packDocx(documentXml: string, title: string): Promise<Blob> {
  const { zipSync, strToU8 } = await import('fflate');
  const files = {
    '[Content_Types].xml': strToU8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>',
    ),
    '_rels/.rels': strToU8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>',
    ),
    'word/_rels/document.xml.rels': strToU8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
    ),
    'word/styles.xml': strToU8(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>',
    ),
    'docProps/core.xml': strToU8(
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${escapeXml(title)}</dc:title><dc:creator>Toolabs</dc:creator></cp:coreProperties>`,
    ),
    'word/document.xml': strToU8(documentXml),
  };
  const zipped = zipSync(files, { level: 6 });
  return new Blob([new Uint8Array(zipped)], { type: DOCX_MIME });
}

export async function convertPdfToWord(
  files: File[],
  onProgress?: (sourceIndex: number, progress: number) => void,
  signal?: AbortSignal,
  translation?: {
    source: LangCode;
    target: LangCode;
    onProgress?: (sourceIndex: number, progress: number) => void;
  },
): Promise<OutputResult[]> {
  // Without translation the page layout and images are kept; translated text changes length, so it reflows instead.
  if (!translation) return convertPdfToWordLayout(files, onProgress, signal);

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

      const rawPages: { widthPt: number; heightPt: number; lines: Line[] }[] = [];
      const allSizes: number[] = [];
      let characters = 0;

      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
        if (signal?.aborted) throw canceledError();
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });
        const content = await page.getTextContent();
        const fragments: Fragment[] = [];
        for (const item of content.items) {
          if (!('str' in item) || !item.str) continue;
          const [a, b, , , e, f] = item.transform as number[];
          const size = Math.hypot(a, b) || item.height || 11;
          fragments.push({ text: item.str, x: e, y: f, width: item.width, size });
          allSizes.push(size);
          characters += item.str.trim().length;
        }
        rawPages.push({
          widthPt: viewport.width,
          heightPt: viewport.height,
          lines: buildLines(fragments),
        });
        page.cleanup();
        onProgress?.(fileIndex, (pageNumber / pageCount) * (translation ? 0.05 : 0.9));
      }

      const bodySize = median(allSizes) || 11;
      const pages: PageContent[] = rawPages.map((raw) => ({
        widthPt: raw.widthPt,
        heightPt: raw.heightPt,
        paragraphs: buildParagraphs(raw.lines, bodySize),
      }));

      if (translation && characters >= pageCount * 5) {
        const paragraphs = pages.flatMap((pageContent) => pageContent.paragraphs);
        const translated = await translateTexts(
          paragraphs.map((paragraph) => paragraph.text),
          translation.source,
          translation.target,
          (info) => {
            const base = info.stage === 'model' ? 0.05 + info.progress * 0.15 : 0.2 + info.progress * 0.78;
            translation.onProgress?.(fileIndex, base);
          },
          signal,
        );
        paragraphs.forEach((paragraph, index) => {
          paragraph.text = translated[index] ?? paragraph.text;
        });
      }

      const blob = await packDocx(buildDocumentXml(pages, bodySize), base);
      if (signal?.aborted) throw canceledError();
      const warnings: WarningCode[] = characters < pageCount * 5 ? ['no-text'] : [];

      results.push({
        id: `pdf-word-${fileIndex}`,
        name: translation ? `${base}-${translation.target}.docx` : `${base}.docx`,
        blob,
        sourceIndex: fileIndex,
        meta: {
          originalBytes: file.size,
          bytes: blob.size,
          mime: DOCX_MIME,
          pages: pageCount,
          warnings,
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
