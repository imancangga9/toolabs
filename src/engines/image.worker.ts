import type { FitMode, OutputFormat, ToolOptions } from '../tools.config';
import type { ImageWorkerRequest, ImageWorkerResponse, OutputMeta, WarningCode } from './types';

const scope = self as unknown as {
  postMessage: (message: ImageWorkerResponse) => void;
  onmessage: ((event: MessageEvent<ImageWorkerRequest>) => void) | null;
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

async function handle(request: ImageWorkerRequest): Promise<void> {
  try {
    const { blob, meta } = await processImage(request);
    scope.postMessage({ id: request.id, type: 'done', blob, meta });
  } catch (error) {
    const err = error as EngineError;
    scope.postMessage({
      id: request.id,
      type: 'error',
      code: err.code || 'generic',
      message: err.message,
    });
  }
}

type Candidate = {
  blob: Blob;
  mime: string;
  quality?: number;
  width: number;
  height: number;
};

function resolveMime(input: string, requested?: OutputFormat): string {
  if (requested && requested !== 'auto') return requested;
  if (input === 'image/png' || input === 'image/webp' || input === 'image/jpeg') return input;
  return 'image/jpeg';
}

async function encode(
  bitmap: ImageBitmap,
  width: number,
  height: number,
  mime: string,
  quality: number | undefined,
  fit: FitMode = 'stretch',
): Promise<Blob> {
  if (typeof OffscreenCanvas === 'undefined') {
    throw new EngineError('worker', 'OffscreenCanvas is not available');
  }

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d', { alpha: mime !== 'image/jpeg' });
  if (!ctx) throw new EngineError('worker', 'Canvas 2D context is not available');

  if (mime === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const sourceWidth = bitmap.width;
  const sourceHeight = bitmap.height;

  if (fit === 'stretch') {
    ctx.drawImage(bitmap, 0, 0, width, height);
  } else {
    const scale =
      fit === 'contain'
        ? Math.min(width / sourceWidth, height / sourceHeight)
        : Math.max(width / sourceWidth, height / sourceHeight);

    if (fit === 'contain') {
      const drawWidth = sourceWidth * scale;
      const drawHeight = sourceHeight * scale;
      ctx.drawImage(
        bitmap,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
    } else {
      const targetRatio = width / height;
      const sourceRatio = sourceWidth / sourceHeight;
      let sx = 0;
      let sy = 0;
      let sw = sourceWidth;
      let sh = sourceHeight;
      if (sourceRatio > targetRatio) {
        sw = sourceHeight * targetRatio;
        sx = (sourceWidth - sw) / 2;
      } else {
        sh = sourceWidth / targetRatio;
        sy = (sourceHeight - sh) / 2;
      }
      ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, width, height);
    }
  }

  const blob = await canvas.convertToBlob({
    type: mime,
    quality: mime === 'image/png' ? undefined : quality,
  });
  if (blob.size === 0) throw new EngineError('decode', 'Encoder returned an empty file');
  return blob;
}

async function searchQuality(
  bitmap: ImageBitmap,
  width: number,
  height: number,
  mime: string,
  targetBytes: number,
  options: ToolOptions,
  report: (progress: number) => void,
  progressBase: number,
): Promise<{ best: Candidate | null; smallest: Candidate | null }> {
  const maxQuality = Math.min(Math.max(options.quality ?? 0.92, 0.4), 0.95);
  const minQuality = 0.3;

  const first = await encode(bitmap, width, height, mime, maxQuality);
  report(Math.min(0.94, progressBase + 0.02));
  if (first.size <= targetBytes) {
    return {
      best: { blob: first, mime, quality: maxQuality, width, height },
      smallest: { blob: first, mime, quality: maxQuality, width, height },
    };
  }

  const lowest = await encode(bitmap, width, height, mime, minQuality);
  report(Math.min(0.94, progressBase + 0.04));
  let smallest: Candidate = {
    blob: lowest,
    mime,
    quality: minQuality,
    width,
    height,
  };
  if (lowest.size <= targetBytes) {
    let low = minQuality;
    let high = maxQuality;
    let best: Candidate = { blob: lowest, mime, quality: minQuality, width, height };
    for (let i = 0; i < 5; i += 1) {
      const quality = (low + high) / 2;
      const blob = await encode(bitmap, width, height, mime, quality);
      report(Math.min(0.94, progressBase + 0.05 + i * 0.01));
      if (blob.size <= targetBytes) {
        best = { blob, mime, quality, width, height };
        low = quality;
      } else {
        high = quality;
      }
    }
    return { best, smallest };
  }

  return { best: null, smallest };
}

async function processCompress(
  bitmap: ImageBitmap,
  file: File,
  options: ToolOptions,
  report: (progress: number) => void,
): Promise<{ blob: Blob; meta: OutputMeta }> {
  const mime = resolveMime(file.type, options.outputFormat);
  const targetBytes = options.targetKB && options.targetKB > 0 ? options.targetKB * 1024 : undefined;
  const warnings: WarningCode[] = [];

  let width = bitmap.width;
  let height = bitmap.height;
  if (options.maxWidth && width > options.maxWidth) {
    const factor = options.maxWidth / width;
    width = Math.max(1, Math.round(width * factor));
    height = Math.max(1, Math.round(height * factor));
  }

  if (!targetBytes) {
    report(0.4);
    const quality = mime === 'image/png' ? undefined : (options.quality ?? 0.82);
    const blob = await encode(bitmap, width, height, mime, quality);

    // PNG is already lossless. Re-encoding through canvas rarely helps and can
    // make an already-optimized PNG larger (e.g. 1.76 MB → 2.47 MB). If the
    // re-encoded result is bigger than the source, keep the original bytes so
    // the tool never makes a PNG file larger without an explicit target size.
    let finalBlob = blob;
    if (mime === 'image/png' && blob.size > file.size) {
      finalBlob = file;
      warnings.push('png-lossless', 'output-larger');
    } else if (blob.size > file.size) {
      warnings.push('output-larger');
    }

    return {
      blob: finalBlob,
      meta: {
        originalBytes: file.size,
        bytes: finalBlob.size,
        mime,
        width,
        height,
        quality: mime === 'image/png' ? undefined : quality,
        warnings,
      },
    };
  }

  if (mime === 'image/png') warnings.push('png-lossless');

  const baseWidth = width;
  const baseHeight = height;
  let scale = 1;
  let chosen: Candidate | null = null;
  let smallestOverall: Candidate | null = null;
  let lastWidth = width;
  let lastHeight = height;

  for (let round = 0; round < 7; round += 1) {
    width = Math.max(1, Math.round(baseWidth * scale));
    height = Math.max(1, Math.round(baseHeight * scale));
    if (round > 0 && Math.min(width, height) < 64) break;
    lastWidth = width;
    lastHeight = height;

    if (mime === 'image/png') {
      const blob = await encode(bitmap, width, height, mime, undefined);
      report(Math.min(0.94, 0.12 + round * 0.13));
      const candidate: Candidate = { blob, mime, width, height };
      if (!smallestOverall || blob.size < smallestOverall.blob.size) {
        smallestOverall = candidate;
      }
      if (blob.size <= targetBytes) {
        chosen = candidate;
        break;
      }
      const ratio = targetBytes / blob.size;
      const jump = Math.min(0.85, Math.max(0.35, Math.sqrt(ratio) * 0.92));
      scale *= jump;
    } else {
      const { best, smallest } = await searchQuality(
        bitmap,
        width,
        height,
        mime,
        targetBytes,
        options,
        report,
        0.12 + round * 0.13,
      );
      if (smallest && (!smallestOverall || smallest.blob.size < smallestOverall.blob.size)) {
        smallestOverall = smallest;
      }
      if (best) {
        chosen = best;
        break;
      }
      const failed = smallest;
      if (failed) {
        const ratio = targetBytes / failed.blob.size;
        const jump = Math.min(0.85, Math.max(0.35, Math.sqrt(ratio) * 0.92));
        scale *= jump;
      } else {
        scale *= 0.8;
      }
    }
  }

  const finalCandidate = chosen ?? smallestOverall;
  if (!finalCandidate) throw new EngineError('decode', 'Could not encode the image');

  const targetReached = finalCandidate.blob.size <= targetBytes;
  if (!targetReached) warnings.push('target-unreachable');
  if (chosen && chosen.width < baseWidth) warnings.push('dimensions-reduced');
  if (finalCandidate.quality !== undefined && finalCandidate.quality < 0.55) {
    warnings.push('low-quality');
  }
  if (finalCandidate.blob.size > file.size) warnings.push('output-larger');

  report(1);
  return {
    blob: finalCandidate.blob,
    meta: {
      originalBytes: file.size,
      bytes: finalCandidate.blob.size,
      mime,
      width: finalCandidate.width || lastWidth,
      height: finalCandidate.height || lastHeight,
      quality: finalCandidate.quality,
      targetBytes,
      targetReached,
      warnings,
    },
  };
}

async function processConvert(
  bitmap: ImageBitmap,
  file: File,
  options: ToolOptions,
  report: (progress: number) => void,
): Promise<{ blob: Blob; meta: OutputMeta }> {
  const mime = resolveMime(file.type, options.outputFormat);
  const warnings: WarningCode[] = [];
  let width = bitmap.width;
  let height = bitmap.height;

  if (options.maxWidth && width > options.maxWidth) {
    const factor = options.maxWidth / width;
    width = Math.max(1, Math.round(width * factor));
    height = Math.max(1, Math.round(height * factor));
  }

  const targetBytes = options.targetKB && options.targetKB > 0 ? options.targetKB * 1024 : undefined;
  const quality = mime === 'image/png' ? undefined : (options.quality ?? 0.9);

  if (targetBytes) {
    const { best, smallest } = await searchQuality(
      bitmap,
      width,
      height,
      mime,
      targetBytes,
      options,
      report,
      0.2,
    );
    const chosen = best ?? smallest;
    if (!chosen) throw new EngineError('decode', 'Could not encode the image');
    if (chosen.blob.size > targetBytes) warnings.push('target-unreachable');
    if (chosen.blob.size > file.size) warnings.push('output-larger');
    report(1);
    return {
      blob: chosen.blob,
      meta: {
        originalBytes: file.size,
        bytes: chosen.blob.size,
        mime,
        width,
        height,
        quality: chosen.quality,
        targetBytes,
        targetReached: chosen.blob.size <= targetBytes,
        warnings,
      },
    };
  }

  report(0.5);
  const blob = await encode(bitmap, width, height, mime, quality);
  if (blob.size > file.size) warnings.push('output-larger');
  report(1);
  return {
    blob,
    meta: {
      originalBytes: file.size,
      bytes: blob.size,
      mime,
      width,
      height,
      quality,
      warnings,
    },
  };
}

async function processResize(
  bitmap: ImageBitmap,
  file: File,
  options: ToolOptions,
  report: (progress: number) => void,
): Promise<{ blob: Blob; meta: OutputMeta }> {
  const mime = resolveMime(file.type, options.outputFormat);
  const fit: FitMode = options.fit ?? 'contain';
  const warnings: WarningCode[] = [];

  let width = options.width && options.width > 0 ? Math.round(options.width) : bitmap.width;
  let height = options.height && options.height > 0 ? Math.round(options.height) : bitmap.height;

  if (options.width && !options.height) {
    height = Math.max(1, Math.round((options.width / bitmap.width) * bitmap.height));
  } else if (!options.width && options.height) {
    width = Math.max(1, Math.round((options.height / bitmap.height) * bitmap.width));
  }

  if (width < 1 || height < 1) throw new EngineError('unsupported', 'Invalid dimensions');

  const targetBytes = options.targetKB && options.targetKB > 0 ? options.targetKB * 1024 : undefined;
  const quality = mime === 'image/png' ? undefined : (options.quality ?? 0.9);

  if (targetBytes && mime !== 'image/png') {
    const { best, smallest } = await searchQuality(
      bitmap,
      width,
      height,
      mime,
      targetBytes,
      options,
      report,
      0.2,
    );
    const chosen = best ?? smallest;
    if (!chosen) throw new EngineError('decode', 'Could not encode the image');
    if (chosen.blob.size > targetBytes) warnings.push('target-unreachable');
    if (chosen.quality !== undefined && chosen.quality < 0.55) warnings.push('low-quality');
    if (chosen.blob.size > file.size) warnings.push('output-larger');
    report(1);
    return {
      blob: chosen.blob,
      meta: {
        originalBytes: file.size,
        bytes: chosen.blob.size,
        mime,
        width,
        height,
        quality: chosen.quality,
        targetBytes,
        targetReached: chosen.blob.size <= targetBytes,
        warnings,
      },
    };
  }

  report(0.4);
  const blob = await encode(bitmap, width, height, mime, quality, fit);
  if (targetBytes && blob.size > targetBytes) warnings.push('target-unreachable');
  if (blob.size > file.size) warnings.push('output-larger');
  report(1);
  return {
    blob,
    meta: {
      originalBytes: file.size,
      bytes: blob.size,
      mime,
      width,
      height,
      quality,
      targetBytes,
      targetReached: targetBytes ? blob.size <= targetBytes : undefined,
      warnings,
    },
  };
}

async function processImage(
  request: ImageWorkerRequest,
): Promise<{ blob: Blob; meta: OutputMeta }> {
  const { file, engine, options } = request;
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new EngineError('decode');
  }

  const report = (progress: number) => {
    scope.postMessage({ id: request.id, type: 'progress', progress });
  };

  try {
    if (engine === 'image-compress') return await processCompress(bitmap, file, options, report);
    if (engine === 'image-convert') return await processConvert(bitmap, file, options, report);
    return await processResize(bitmap, file, options, report);
  } finally {
    bitmap.close();
  }
}
