import type { EngineId, ToolOptions } from '../tools.config';
import type {
  ImageWorkerRequest,
  ImageWorkerResponse,
  OutputMeta,
  OutputResult,
  PdfWorkerRequest,
  PdfWorkerResponse,
  RunToolOptions,
} from './types';
import { convertPdfToJpg } from './pdf-to-jpg';

export class EngineError extends Error {
  code: string;
  constructor(code: string, message?: string) {
    super(message || code);
    this.code = code;
  }
}

let imageWorker: Worker | null = null;
let pdfWorker: Worker | null = null;
let requestCounter = 0;

function getImageWorker(): Worker {
  if (!imageWorker) {
    imageWorker = new Worker(new URL('./image.worker.ts', import.meta.url), {
      type: 'module',
      name: 'toolabs-image',
    });
  }
  return imageWorker;
}

function getPdfWorker(): Worker {
  if (!pdfWorker) {
    pdfWorker = new Worker(new URL('./pdf.worker.ts', import.meta.url), {
      type: 'module',
      name: 'toolabs-pdf',
    });
  }
  return pdfWorker;
}

function resetWorker(kind: 'image' | 'pdf'): void {
  if (kind === 'image') {
    imageWorker?.terminate();
    imageWorker = null;
  } else {
    pdfWorker?.terminate();
    pdfWorker = null;
  }
}

function nextId(): string {
  requestCounter += 1;
  return `job-${Date.now()}-${requestCounter}`;
}

function checkAbort(signal?: AbortSignal): void {
  if (signal?.aborted) throw new EngineError('canceled');
}

function sendImage(
  request: ImageWorkerRequest,
  onProgress: (progress: number) => void,
  signal?: AbortSignal,
): Promise<{ blob: Blob; meta: OutputMeta }> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new EngineError('canceled'));
      return;
    }
    const worker = getImageWorker();
    const cleanup = () => {
      worker.removeEventListener('message', onMessage);
      worker.removeEventListener('error', onError);
      signal?.removeEventListener('abort', onAbort);
    };
    const onMessage = (event: MessageEvent<ImageWorkerResponse>) => {
      const message = event.data;
      if (!message || message.id !== request.id) return;
      if (message.type === 'progress') {
        onProgress(message.progress);
        return;
      }
      cleanup();
      if (message.type === 'done') {
        resolve({ blob: message.blob, meta: message.meta });
      } else {
        reject(new EngineError(message.code, message.message));
      }
    };
    const onError = (event: ErrorEvent) => {
      cleanup();
      resetWorker('image');
      reject(new EngineError('worker', event.message));
    };
    const onAbort = () => {
      cleanup();
      resetWorker('image');
      reject(new EngineError('canceled'));
    };
    worker.addEventListener('message', onMessage);
    worker.addEventListener('error', onError);
    signal?.addEventListener('abort', onAbort, { once: true });
    worker.postMessage(request);
  });
}

function sendPdf(
  request: PdfWorkerRequest,
  onProgress: (fileIndex: number, progress: number) => void,
  signal?: AbortSignal,
): Promise<{ name: string; blob: Blob; meta: OutputMeta; sourceIndex: number }[]> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new EngineError('canceled'));
      return;
    }
    const worker = getPdfWorker();
    const cleanup = () => {
      worker.removeEventListener('message', onMessage);
      worker.removeEventListener('error', onError);
      signal?.removeEventListener('abort', onAbort);
    };
    const onMessage = (event: MessageEvent<PdfWorkerResponse>) => {
      const message = event.data;
      if (!message || message.id !== request.id) return;
      if (message.type === 'progress') {
        onProgress(message.fileIndex, message.progress);
        return;
      }
      cleanup();
      if (message.type === 'done') {
        resolve(message.outputs);
      } else {
        reject(new EngineError(message.code, message.message));
      }
    };
    const onError = (event: ErrorEvent) => {
      cleanup();
      resetWorker('pdf');
      reject(new EngineError('worker', event.message));
    };
    const onAbort = () => {
      cleanup();
      resetWorker('pdf');
      reject(new EngineError('canceled'));
    };
    worker.addEventListener('message', onMessage);
    worker.addEventListener('error', onError);
    signal?.addEventListener('abort', onAbort, { once: true });
    worker.postMessage(request);
  });
}

function safeBase(name: string): string {
  return (
    name
      .replace(/\.[^.]+$/, '')
      .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-')
      .trim() || 'image'
  );
}

function extensionForMime(mime: string): string {
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  return 'jpg';
}

function imageOutputName(
  engine: EngineId,
  inputName: string,
  meta: OutputMeta,
  options: ToolOptions,
): string {
  const base = safeBase(inputName);
  const extension = extensionForMime(meta.mime);
  if (engine === 'image-convert') return `${base}.${extension}`;
  if (engine === 'image-resize') {
    if (options.width === 354 && options.height === 472) return `${base}-3x4.${extension}`;
    return `${base}-${meta.width ?? options.width ?? 'resized'}x${meta.height ?? options.height ?? ''}.${extension}`;
  }
  if (options.targetKB) return `${base}-${options.targetKB}kb.${extension}`;
  return `${base}-compressed.${extension}`;
}

async function runImageBatch(
  engine: 'image-compress' | 'image-convert' | 'image-resize',
  files: File[],
  options: ToolOptions,
  onProgress: ((sourceIndex: number, progress: number) => void) | undefined,
  signal: AbortSignal | undefined,
): Promise<OutputResult[]> {
  const results: OutputResult[] = [];
  for (let index = 0; index < files.length; index += 1) {
    checkAbort(signal);
    const file = files[index];
    onProgress?.(index, 0.02);
    const request: ImageWorkerRequest = {
      id: nextId(),
      engine,
      file,
      options,
    };
    const { blob, meta } = await sendImage(
      request,
      (progress) => {
        onProgress?.(index, progress);
      },
      signal,
    );
    checkAbort(signal);
    results.push({
      id: `${index}-${nextId()}`,
      name: imageOutputName(engine, file.name, meta, options),
      blob,
      meta,
      sourceIndex: index,
    });
    onProgress?.(index, 1);
  }
  return results;
}

async function runHeic(
  files: File[],
  options: ToolOptions,
  onProgress: ((sourceIndex: number, progress: number) => void) | undefined,
  signal: AbortSignal | undefined,
): Promise<OutputResult[]> {
  const module = await import('heic2any');
  const convert = module.default;
  const results: OutputResult[] = [];

  for (let index = 0; index < files.length; index += 1) {
    checkAbort(signal);
    const file = files[index];
    onProgress?.(index, 0.05);

    let converted: Blob | Blob[];
    try {
      converted = await convert({
        blob: file,
        toType: 'image/jpeg',
        quality: Math.min(1, Math.max(0.4, options.quality ?? 0.92)),
      });
    } catch {
      throw new EngineError('heic');
    }

    const blobs = Array.isArray(converted) ? converted : [converted];
    const jpeg = blobs[0];
    if (!jpeg) throw new EngineError('heic');
    const warnings: OutputMeta['warnings'] = blobs.length > 1 ? ['heic-first-frame'] : [];
    onProgress?.(index, 0.15);

    const needsWorker = Boolean(options.targetKB || options.maxWidth);
    if (needsWorker) {
      const workerFile = new File([jpeg], `${safeBase(file.name)}.jpg`, { type: 'image/jpeg' });
      const engine = options.targetKB ? 'image-compress' : 'image-convert';
      const response = await sendImage(
        {
          id: nextId(),
          engine,
          file: workerFile,
          options: { ...options, outputFormat: 'image/jpeg' },
        },
        (progress) => onProgress?.(index, 0.15 + progress * 0.8),
        signal,
      );
      checkAbort(signal);
      results.push({
        id: `${index}-${nextId()}`,
        name: `${safeBase(file.name)}.jpg`,
        blob: response.blob,
        meta: {
          ...response.meta,
          originalBytes: file.size,
          warnings: [...new Set([...warnings, ...response.meta.warnings])],
        },
        sourceIndex: index,
      });
    } else {
      let width: number | undefined;
      let height: number | undefined;
      try {
        const bitmap = await createImageBitmap(jpeg);
        width = bitmap.width;
        height = bitmap.height;
        bitmap.close();
      } catch {
        // Dimensions are optional metadata; the converted image is still valid.
      }
      results.push({
        id: `${index}-${nextId()}`,
        name: `${safeBase(file.name)}.jpg`,
        blob: jpeg,
        meta: {
          originalBytes: file.size,
          bytes: jpeg.size,
          mime: 'image/jpeg',
          width,
          height,
          quality: options.quality ?? 0.92,
          warnings,
        },
        sourceIndex: index,
      });
    }
    onProgress?.(index, 1);
  }

  return results;
}

async function runPdf(
  engine: 'pdf-merge' | 'image-to-pdf' | 'pdf-split' | 'pdf-rotate',
  files: File[],
  options: ToolOptions,
  onProgress: ((sourceIndex: number, progress: number) => void) | undefined,
  signal: AbortSignal | undefined,
): Promise<OutputResult[]> {
  checkAbort(signal);
  const request: PdfWorkerRequest = {
    id: nextId(),
    engine,
    files,
    options,
  };
  const outputs = await sendPdf(
    request,
    (fileIndex, progress) => {
      onProgress?.(fileIndex, progress);
    },
    signal,
  );
  checkAbort(signal);

  return outputs.map((output, index) => {
    onProgress?.(output.sourceIndex, 1);
    return {
      id: `pdf-${index}-${nextId()}`,
      name: output.name,
      blob: output.blob,
      meta: output.meta,
      sourceIndex: output.sourceIndex,
    };
  });
}

export async function runTool({
  engine,
  files,
  options,
  onProgress,
  signal,
}: RunToolOptions): Promise<OutputResult[]> {
  if (!files.length) throw new EngineError('no-files');
  checkAbort(signal);

  if (engine === 'pdf-to-jpg') {
    return convertPdfToJpg(
      files,
      { scale: options.scale, quality: options.quality },
      (index, progress) => onProgress?.(index, progress),
      signal,
    );
  }

  if (engine === 'pdf-merge' || engine === 'image-to-pdf' || engine === 'pdf-split' || engine === 'pdf-rotate') {
    return runPdf(engine, files, options, onProgress, signal);
  }

  if (engine === 'heic-convert') {
    return runHeic(files, options, onProgress, signal);
  }

  if (engine === 'image-compress' || engine === 'image-convert' || engine === 'image-resize') {
    return runImageBatch(engine, files, options, onProgress, signal);
  }

  throw new EngineError('unknown-engine');
}
