export type LangCode = 'en' | 'id' | 'es' | 'fr' | 'de' | 'it' | 'ru' | 'zh' | 'ar' | 'ja';

export const LANGUAGES: { code: LangCode; en: string; id: string; target: boolean }[] = [
  { code: 'en', en: 'English', id: 'Inggris', target: true },
  { code: 'id', en: 'Indonesian', id: 'Indonesia', target: true },
  { code: 'es', en: 'Spanish', id: 'Spanyol', target: true },
  { code: 'fr', en: 'French', id: 'Prancis', target: true },
  { code: 'de', en: 'German', id: 'Jerman', target: true },
  { code: 'it', en: 'Italian', id: 'Italia', target: true },
  { code: 'ru', en: 'Russian', id: 'Rusia', target: true },
  { code: 'zh', en: 'Chinese', id: 'Mandarin', target: true },
  { code: 'ar', en: 'Arabic', id: 'Arab', target: true },
  // Japanese has a Japanese→English model only.
  { code: 'ja', en: 'Japanese', id: 'Jepang', target: false },
];

/** Opus-MT models are English-centric, so other pairs are translated through English. */
export function modelSteps(source: LangCode, target: LangCode): string[] {
  if (source === target) return [];
  const model = (a: string, b: string) => `Xenova/opus-mt-${a}-${b}`;
  if (source === 'en') return [model('en', target)];
  if (target === 'en') return [model(source, 'en')];
  return [model(source, 'en'), model('en', target)];
}

export type TranslateProgress = { stage: 'model' | 'translate'; progress: number };

type WorkerMessage =
  | { id: string; type: 'model'; step: number; progress: number }
  | { id: string; type: 'progress'; done: number; total: number }
  | { id: string; type: 'done'; texts: string[] }
  | { id: string; type: 'error'; message: string };

function translateError(code: string, message?: string): Error {
  return Object.assign(new Error(message || code), { code });
}

/** Translates paragraphs with a model that runs in a Web Worker on the visitor's device. */
export function translateTexts(
  texts: string[],
  source: LangCode,
  target: LangCode,
  onProgress?: (info: TranslateProgress) => void,
  signal?: AbortSignal,
): Promise<string[]> {
  const steps = modelSteps(source, target);
  if (!steps.length) return Promise.reject(translateError('same-lang'));
  if (signal?.aborted) return Promise.reject(translateError('canceled'));

  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./translate.worker.ts', import.meta.url), {
      type: 'module',
      name: 'toolabs-translate',
    });
    const id = `translate-${Date.now()}`;
    const finish = (action: () => void) => {
      signal?.removeEventListener('abort', onAbort);
      worker.terminate();
      action();
    };
    const onAbort = () => finish(() => reject(translateError('canceled')));
    signal?.addEventListener('abort', onAbort, { once: true });

    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const message = event.data;
      if (!message || message.id !== id) return;
      if (message.type === 'model') {
        onProgress?.({ stage: 'model', progress: (message.step + message.progress) / steps.length });
      } else if (message.type === 'progress') {
        onProgress?.({ stage: 'translate', progress: message.total ? message.done / message.total : 1 });
      } else if (message.type === 'done') {
        finish(() => resolve(message.texts));
      } else {
        finish(() => reject(translateError('translate', message.message)));
      }
    };
    worker.onerror = (event) => finish(() => reject(translateError('translate', event.message)));
    worker.postMessage({ id, steps, texts });
  });
}
