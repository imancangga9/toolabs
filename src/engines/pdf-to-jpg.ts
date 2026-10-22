import type { OutputResult, WarningCode } from './types';

type PdfToJpgOptions = {
  scale?: number;
  quality?: number;
};

function canceledError(): Error {
  return Object.assign(new Error('canceled'), { code: 'canceled' });
}

export async function convertPdfToJpg(
  files: File[],
  options: PdfToJpgOptions,
  onProgress?: (sourceIndex: number, progress: number) => void,
  signal?: AbortSignal,
): Promise<OutputResult[]> {
  const pdfjs = await import('pdfjs-dist');
  const workerUrl = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl.default;

  const scale = Math.min(5, Math.max(1, options.scale ?? 2));
  const quality = Math.min(1, Math.max(0.4, options.quality ?? 0.9));
  const results: OutputResult[] = [];
  let outputId = 0;

  for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
    if (signal?.aborted) throw canceledError();
    const file = files[fileIndex];
    const data = new Uint8Array(await file.arrayBuffer());
    let pdf: Awaited<ReturnType<typeof pdfjs.getDocument>['promise']> | undefined;
    let loadingTask: ReturnType<typeof pdfjs.getDocument> | undefined;
    const cancelLoading = () => {
      void loadingTask?.destroy();
    };
    signal?.addEventListener('abort', cancelLoading, { once: true });

    try {
      loadingTask = pdfjs.getDocument({ data });
      pdf = await loadingTask.promise;
      if (signal?.aborted) throw canceledError();
      const pageCount = pdf.numPages;
      const base =
        file.name.replace(/\.[^.]+$/, '').replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-') || 'document';

      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
        if (signal?.aborted) throw canceledError();
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.ceil(viewport.width));
        canvas.height = Math.max(1, Math.ceil(viewport.height));
        const context = canvas.getContext('2d', { alpha: false });
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
        if (signal?.aborted) throw canceledError();

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (value) => (value ? resolve(value) : reject(new Error('JPG encoding failed'))),
            'image/jpeg',
            quality,
          );
        });
        if (signal?.aborted) throw canceledError();

        results.push({
          id: `pdf-jpg-${outputId}`,
          name: `${base}-page-${pageNumber}.jpg`,
          blob,
          sourceIndex: fileIndex,
          meta: {
            originalBytes: 0,
            bytes: blob.size,
            mime: 'image/jpeg',
            width: canvas.width,
            height: canvas.height,
            pages: 1,
            pageNumber,
            quality,
            warnings: [] as WarningCode[],
          },
        });
        outputId += 1;
        page.cleanup();
        onProgress?.(fileIndex, pageNumber / pageCount);
      }
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
