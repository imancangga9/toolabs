import { PDFDocument, degrees } from 'pdf-lib';
import type {
  OutputMeta,
  PdfWorkerOutput,
  PdfWorkerRequest,
  PdfWorkerResponse,
  WarningCode,
} from './types';

const scope = self as unknown as {
  postMessage: (message: PdfWorkerResponse) => void;
  onmessage: ((event: MessageEvent<PdfWorkerRequest>) => void) | null;
};

class EngineError extends Error {
  code: string;
  constructor(code: string, message?: string) {
    super(message || code);
    this.code = code;
  }
}

scope.onmessage = (event) => {
  void handle(event.data);
};

async function handle(request: PdfWorkerRequest): Promise<void> {
  try {
    const outputs = await processPdf(request);
    scope.postMessage({ id: request.id, type: 'done', outputs });
  } catch (error) {
    const err = error as EngineError;
    scope.postMessage({
      id: request.id,
      type: 'error',
      code: err.code || 'pdf',
      message: err.message,
    });
  }
}

function report(request: PdfWorkerRequest, fileIndex: number, progress: number): void {
  scope.postMessage({
    id: request.id,
    type: 'progress',
    progress: Math.max(0, Math.min(1, progress)),
    fileIndex,
  });
}

function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, '').replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-').trim() || 'document';
}

function pdfBlob(bytes: Uint8Array): Blob {
  return new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
}

async function loadPdf(file: File): Promise<PDFDocument> {
  const bytes = await file.arrayBuffer();
  try {
    return await PDFDocument.load(bytes, { updateMetadata: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/encrypt|password/i.test(message)) {
      throw new EngineError('password', message);
    }
    throw new EngineError('pdf', message);
  }
}

function totalBytes(files: File[]): number {
  return files.reduce((sum, file) => sum + file.size, 0);
}

async function mergePdfs(
  request: PdfWorkerRequest,
): Promise<PdfWorkerOutput[]> {
  const { files } = request;
  if (!files.length) throw new EngineError('no-files');

  const merged = await PDFDocument.create();
  merged.setProducer('Toolabs');
  merged.setCreator('Toolabs (toolabs.com)');

  for (let index = 0; index < files.length; index += 1) {
    report(request, index, index / files.length);
    const source = await loadPdf(files[index]);
    const pages = await merged.copyPages(source, source.getPageIndices());
    for (const page of pages) merged.addPage(page);
    report(request, index, (index + 1) / files.length);
  }

  const bytes = await merged.save();
  const meta: OutputMeta = {
    originalBytes: totalBytes(files),
    bytes: bytes.byteLength,
    mime: 'application/pdf',
    pages: merged.getPageCount(),
    warnings: [],
  };
  return [{ name: 'toolabs-merged.pdf', blob: pdfBlob(bytes), meta, sourceIndex: 0 }];
}

function parseRanges(input: string, pageCount: number): { ranges: Array<[number, number]>; clamped: boolean } {
  const tokens = input
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean);

  if (!tokens.length) throw new EngineError('invalid-range');

  const ranges: Array<[number, number]> = [];
  let clamped = false;

  for (const token of tokens) {
    const match = token.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!match) throw new EngineError('invalid-range');
    let start = Number(match[1]);
    let end = Number(match[2] ?? match[1]);
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 1 || end < 1) {
      throw new EngineError('invalid-range');
    }
    if (start > end) [start, end] = [end, start];
    if (start > pageCount) {
      clamped = true;
      continue;
    }
    if (end > pageCount) {
      end = pageCount;
      clamped = true;
    }
    ranges.push([start, end]);
  }

  if (!ranges.length) throw new EngineError('no-pages');
  return { ranges, clamped };
}

async function splitPdf(request: PdfWorkerRequest): Promise<PdfWorkerOutput[]> {
  const { files, options } = request;
  const outputs: PdfWorkerOutput[] = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const source = await loadPdf(file);
    const pageCount = source.getPageCount();
    let ranges: Array<[number, number]>;
    let clamped = false;

    if (options.splitMode === 'ranges') {
      const parsed = parseRanges(options.ranges || '', pageCount);
      ranges = parsed.ranges;
      clamped = parsed.clamped;
    } else {
      ranges = Array.from(
        { length: pageCount },
        (_, pageIndex) => [pageIndex + 1, pageIndex + 1] as [number, number],
      );
    }

    for (let rangeIndex = 0; rangeIndex < ranges.length; rangeIndex += 1) {
      const [start, end] = ranges[rangeIndex];
      const target = await PDFDocument.create();
      target.setProducer('Toolabs');
      const indices = Array.from({ length: end - start + 1 }, (_, offset) => start - 1 + offset);
      const pages = await target.copyPages(source, indices);
      for (const page of pages) target.addPage(page);
      const bytes = await target.save();
      const safeBase = baseName(file.name);
      const suffix = start === end ? `page-${start}` : `pages-${start}-${end}`;
      const warnings: WarningCode[] = clamped ? ['pages-clamped'] : [];
      outputs.push({
        name: `${safeBase}-${suffix}.pdf`,
        blob: pdfBlob(bytes),
        meta: {
          originalBytes: 0,
          bytes: bytes.byteLength,
          mime: 'application/pdf',
          pages: target.getPageCount(),
          warnings,
        },
        sourceIndex: index,
      });
      report(request, index, (rangeIndex + 1) / ranges.length);
    }
  }

  return outputs;
}

async function rotatePdf(request: PdfWorkerRequest): Promise<PdfWorkerOutput[]> {
  const angle = request.options.angle ?? 90;
  const outputs: PdfWorkerOutput[] = [];

  for (let index = 0; index < request.files.length; index += 1) {
    const file = request.files[index];
    const document = await loadPdf(file);
    for (const page of document.getPages()) {
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + angle) % 360));
    }
    document.setProducer('Toolabs');
    const bytes = await document.save();
    outputs.push({
      name: `${baseName(file.name)}-rotated.pdf`,
      blob: pdfBlob(bytes),
      meta: {
        originalBytes: file.size,
        bytes: bytes.byteLength,
        mime: 'application/pdf',
        pages: document.getPageCount(),
        warnings: [],
      },
      sourceIndex: index,
    });
    report(request, index, (index + 1) / request.files.length);
  }

  return outputs;
}

async function imageToPdf(request: PdfWorkerRequest): Promise<PdfWorkerOutput[]> {
  const { files, options } = request;
  if (!files.length) throw new EngineError('no-images');

  const document = await PDFDocument.create();
  document.setProducer('Toolabs');
  document.setCreator('Toolabs (toolabs.com)');

  for (let index = 0; index < files.length; index += 1) {
    let bitmap: ImageBitmap;
    try {
      bitmap = await createImageBitmap(files[index]);
    } catch {
      throw new EngineError('decode');
    }

    try {
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) throw new EngineError('worker');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, bitmap.width, bitmap.height);
      ctx.drawImage(bitmap, 0, 0);
      const jpg = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.92 });
      const image = await document.embedJpg(new Uint8Array(await jpg.arrayBuffer()));

      const margin = Math.max(0, options.margin ?? 24);
      const pageSize = options.pageSize ?? 'a4';
      let pageWidth: number;
      let pageHeight: number;
      let drawWidth: number;
      let drawHeight: number;

      if (pageSize === 'fit') {
        pageWidth = image.width * 0.75 + margin * 2;
        pageHeight = image.height * 0.75 + margin * 2;
        drawWidth = image.width * 0.75;
        drawHeight = image.height * 0.75;
      } else {
        const shortSide = pageSize === 'letter' ? 612 : 595.28;
        const longSide = pageSize === 'letter' ? 792 : 841.89;
        const landscape =
          options.orientation === 'landscape' ||
          (options.orientation !== 'portrait' && image.width > image.height);
        pageWidth = landscape ? longSide : shortSide;
        pageHeight = landscape ? shortSide : longSide;

        const availableWidth = Math.max(1, pageWidth - margin * 2);
        const availableHeight = Math.max(1, pageHeight - margin * 2);
        const scale = Math.min(availableWidth / image.width, availableHeight / image.height);
        drawWidth = image.width * scale;
        drawHeight = image.height * scale;
      }

      const page = document.addPage([pageWidth, pageHeight]);
      page.drawImage(image, {
        x: (pageWidth - drawWidth) / 2,
        y: (pageHeight - drawHeight) / 2,
        width: drawWidth,
        height: drawHeight,
      });
    } finally {
      bitmap.close();
    }

    report(request, index, (index + 1) / files.length);
  }

  const bytes = await document.save();
  return [
    {
      name: 'toolabs-images.pdf',
      blob: pdfBlob(bytes),
      meta: {
        originalBytes: totalBytes(files),
        bytes: bytes.byteLength,
        mime: 'application/pdf',
        pages: document.getPageCount(),
        warnings: [],
      },
      sourceIndex: 0,
    },
  ];
}

async function processPdf(request: PdfWorkerRequest): Promise<PdfWorkerOutput[]> {
  if (!request.files.length) throw new EngineError('no-files');

  switch (request.engine) {
    case 'pdf-merge':
      return mergePdfs(request);
    case 'pdf-split':
      return splitPdf(request);
    case 'pdf-rotate':
      return rotatePdf(request);
    case 'image-to-pdf':
      return imageToPdf(request);
    default:
      throw new EngineError('unknown-engine');
  }
}
