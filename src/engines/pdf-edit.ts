import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export type TextBox = { str: string; x: number; y: number; w: number; h: number; size: number };
export type PageSlot = { key: string; src: number };
export type PageInfoLite = { width: number; height: number };

type Base = { id: string };
export type Annot =
  | (Base & { type: 'text'; x: number; y: number; size: number; color: string; text: string })
  | (Base & { type: 'edit'; x: number; y: number; w: number; h: number; size: number; color: string; text: string })
  | (Base & { type: 'rect'; x: number; y: number; w: number; h: number; mode: 'highlight' | 'whiteout' | 'redact' })
  | (Base & { type: 'ink'; points: [number, number][]; color: string; width: number })
  | (Base & { type: 'image'; x: number; y: number; w: number; h: number; bitmap?: ImageBitmap; bytes: Uint8Array; kind: 'png' | 'jpg' });

type PdfJsDoc = {
  getPage: (n: number) => Promise<{
    getViewport: (o: { scale: number }) => { width: number; height: number; convertToPdfPoint: (x: number, y: number) => number[] };
    render: (o: { canvas: HTMLCanvasElement; viewport: unknown }) => { promise: Promise<unknown> };
    cleanup: () => void;
  }>;
};

function hexToRgb(hex: string) {
  const value = hex.replace('#', '');
  const n = parseInt(value.length === 3 ? value.replace(/./g, '$&$&') : value, 16) || 0;
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

const FONT = (size: number) => `${size}px Helvetica, Arial, sans-serif`;

export function bounds(a: Annot, ctx?: CanvasRenderingContext2D) {
  if (a.type === 'text') {
    let w = a.text.length * a.size * 0.55;
    if (ctx) {
      ctx.save();
      ctx.font = FONT(a.size);
      w = ctx.measureText(a.text).width;
      ctx.restore();
    }
    return { x: a.x, y: a.y, w, h: a.size * 1.2 };
  }
  if (a.type === 'ink') {
    const xs = a.points.map((p) => p[0]);
    const ys = a.points.map((p) => p[1]);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    return { x, y, w: Math.max(...xs) - x || 1, h: Math.max(...ys) - y || 1 };
  }
  return { x: a.x, y: a.y, w: a.w, h: a.h };
}

export function drawAnnots(ctx: CanvasRenderingContext2D, annots: Annot[], scale: number, selected?: string | null) {
  for (const a of annots) {
    ctx.save();
    if (a.type === 'rect') {
      ctx.fillStyle = a.mode === 'highlight' ? 'rgba(255, 224, 0, 0.45)' : a.mode === 'redact' ? '#000' : '#fff';
      ctx.fillRect(a.x * scale, a.y * scale, a.w * scale, a.h * scale);
    } else if (a.type === 'text') {
      ctx.fillStyle = a.color;
      ctx.font = FONT(a.size * scale);
      ctx.textBaseline = 'top';
      ctx.fillText(a.text, a.x * scale, a.y * scale);
    } else if (a.type === 'edit') {
      ctx.fillStyle = '#fff';
      ctx.fillRect((a.x - 1) * scale, (a.y - 1) * scale, (a.w + 2) * scale, (a.h + 2) * scale);
      ctx.fillStyle = a.color;
      ctx.font = FONT(a.size * scale);
      ctx.textBaseline = 'top';
      ctx.fillText(a.text, a.x * scale, (a.y + (a.h - a.size) / 2) * scale);
    } else if (a.type === 'ink') {
      ctx.strokeStyle = a.color;
      ctx.lineWidth = a.width * scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      a.points.forEach(([x, y], i) => (i ? ctx.lineTo(x * scale, y * scale) : ctx.moveTo(x * scale, y * scale)));
      ctx.stroke();
    } else if (a.type === 'image' && a.bitmap) {
      ctx.drawImage(a.bitmap, a.x * scale, a.y * scale, a.w * scale, a.h * scale);
    }
    ctx.restore();
    if (selected && a.id === selected) {
      const b = bounds(a, ctx);
      ctx.save();
      ctx.strokeStyle = '#0c7a62';
      ctx.setLineDash([5, 3]);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(b.x * scale - 2, b.y * scale - 2, b.w * scale + 4, b.h * scale + 4);
      ctx.restore();
    }
  }
}

export async function buildEditedPdf(
  file: File,
  doc: unknown,
  pages: PageSlot[],
  annots: Record<string, Annot[]>,
  infos: Record<number, PageInfoLite>,
): Promise<{ blob: Blob; flattened: boolean; replaced: boolean }> {
  const pdfjsDoc = doc as PdfJsDoc;
  const source = await PDFDocument.load(await file.arrayBuffer(), { updateMetadata: false });
  const out = await PDFDocument.create();
  out.setProducer('Toolabs');
  const font = await out.embedFont(StandardFonts.Helvetica);
  let flattened = false;
  let replaced = false;

  const safe = (text: string) => {
    let result = '';
    for (const ch of text) {
      try {
        font.encodeText(ch);
        result += ch;
      } catch {
        result += '?';
        replaced = true;
      }
    }
    return result;
  };

  for (const slot of pages) {
    const list = annots[slot.key] ?? [];
    const info = infos[slot.src];
    const jsPage = await pdfjsDoc.getPage(slot.src + 1);

    if (list.some((a) => a.type === 'rect' && a.mode === 'redact')) {
      // Redaction must remove the underlying content, so the page is rasterised.
      flattened = true;
      const scale = 2;
      const viewport = jsPage.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const ctx = canvas.getContext('2d', { alpha: false })!;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await jsPage.render({ canvas, viewport }).promise;
      drawAnnots(ctx, list, scale);
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode'))), 'image/jpeg', 0.92),
      );
      const image = await out.embedJpg(new Uint8Array(await blob.arrayBuffer()));
      const page = out.addPage([info.width, info.height]);
      page.drawImage(image, { x: 0, y: 0, width: info.width, height: info.height });
      jsPage.cleanup();
      continue;
    }

    const [copied] = await out.copyPages(source, [slot.src]);
    const page = out.addPage(copied);
    const vp = jsPage.getViewport({ scale: 1 });
    const pt = (x: number, y: number) => vp.convertToPdfPoint(x, y) as [number, number];
    const box = (x: number, y: number, w: number, h: number) => {
      const [x1, y1] = pt(x, y);
      const [x2, y2] = pt(x + w, y + h);
      return { x: Math.min(x1, x2), y: Math.min(y1, y2), width: Math.abs(x2 - x1), height: Math.abs(y2 - y1) };
    };

    for (const a of list) {
      if (a.type === 'rect') {
        page.drawRectangle({
          ...box(a.x, a.y, a.w, a.h),
          color: a.mode === 'highlight' ? rgb(1, 0.88, 0) : rgb(1, 1, 1),
          opacity: a.mode === 'highlight' ? 0.45 : 1,
        });
      } else if (a.type === 'text') {
        const [x, y] = pt(a.x, a.y + a.size * 0.8);
        page.drawText(safe(a.text), { x, y, size: a.size, font, color: hexToRgb(a.color) });
      } else if (a.type === 'edit') {
        page.drawRectangle({ ...box(a.x - 1, a.y - 1, a.w + 2, a.h + 2), color: rgb(1, 1, 1) });
        const [x, y] = pt(a.x, a.y + (a.h - a.size) / 2 + a.size * 0.8);
        page.drawText(safe(a.text), { x, y, size: a.size, font, color: hexToRgb(a.color) });
      } else if (a.type === 'ink') {
        for (let i = 1; i < a.points.length; i += 1) {
          const [sx, sy] = pt(a.points[i - 1][0], a.points[i - 1][1]);
          const [ex, ey] = pt(a.points[i][0], a.points[i][1]);
          page.drawLine({ start: { x: sx, y: sy }, end: { x: ex, y: ey }, thickness: a.width, color: hexToRgb(a.color) });
        }
      } else if (a.type === 'image') {
        const image = a.kind === 'png' ? await out.embedPng(a.bytes) : await out.embedJpg(a.bytes);
        page.drawImage(image, box(a.x, a.y, a.w, a.h));
      }
    }
    jsPage.cleanup();
  }

  const bytes = await out.save();
  return { blob: new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }), flattened, replaced };
}
