import { env, pipeline } from '@huggingface/transformers';

env.allowLocalModels = false;
env.useBrowserCache = true;

type Request = { id: string; steps: string[]; texts: string[] };
type Response =
  | { id: string; type: 'model'; step: number; progress: number }
  | { id: string; type: 'progress'; done: number; total: number }
  | { id: string; type: 'done'; texts: string[] }
  | { id: string; type: 'error'; message: string };

const scope = self as unknown as {
  postMessage: (message: Response) => void;
  onmessage: ((event: MessageEvent<Request>) => void) | null;
};

type Translator = (input: string[], options?: Record<string, unknown>) => Promise<{ translation_text: string }[]>;

scope.onmessage = (event) => {
  void run(event.data);
};

/** Splits long paragraphs so each chunk stays inside the model's input limit. */
function chunk(text: string, limit = 380): string[] {
  if (text.length <= limit) return [text];
  const sentences = text.match(/[^.!?。！？]+[.!?。！？]*\s*/g) ?? [text];
  const parts: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    if (current && current.length + sentence.length > limit) {
      parts.push(current.trim());
      current = '';
    }
    current += sentence;
    while (current.length > limit * 1.5) {
      parts.push(current.slice(0, limit).trim());
      current = current.slice(limit);
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

async function run(request: Request): Promise<void> {
  const { id, steps } = request;
  try {
    let texts = request.texts;
    for (let step = 0; step < steps.length; step += 1) {
      const translator = (await pipeline('translation', steps[step], {
        dtype: 'q8',
        progress_callback: (info: { status?: string; progress?: number }) => {
          if (info.status === 'progress' && typeof info.progress === 'number') {
            scope.postMessage({ id, type: 'model', step, progress: info.progress / 100 });
          }
        },
      })) as unknown as Translator;

      const pieces: { index: number; part: number; text: string }[] = [];
      const counts = texts.map((text, index) => {
        const parts = text.trim() ? chunk(text) : [];
        parts.forEach((part, partIndex) => pieces.push({ index, part: partIndex, text: part }));
        return parts.length;
      });
      const translated: string[][] = texts.map((_, i) => new Array(counts[i]).fill(''));

      const batchSize = 4;
      for (let start = 0; start < pieces.length; start += batchSize) {
        const batch = pieces.slice(start, start + batchSize);
        const output = await translator(
          batch.map((piece) => piece.text),
          { max_new_tokens: 512 },
        );
        output.forEach((item, i) => {
          translated[batch[i].index][batch[i].part] = item.translation_text;
        });
        scope.postMessage({
          id,
          type: 'progress',
          done: (step * pieces.length + Math.min(start + batchSize, pieces.length)),
          total: steps.length * pieces.length,
        });
      }
      texts = texts.map((original, i) => (counts[i] ? translated[i].join(' ') : original));
    }
    scope.postMessage({ id, type: 'done', texts });
  } catch (error) {
    scope.postMessage({ id, type: 'error', message: error instanceof Error ? error.message : String(error) });
  }
}
