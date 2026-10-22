import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from '../../config';
import { getUi } from '../../i18n/ui';
import type { EngineId, ToolOptions } from '../../tools.config';
import { EngineError, runTool } from '../../engines/client';
import type { OutputResult } from '../../engines/types';
import { track } from '../../lib/analytics';
import Dropzone from './Dropzone';
import FileList from './FileList';
import OptionsPanel from './OptionsPanel';
import ProgressPanel from './ProgressPanel';
import Results from './Results';
import Icon from './Icon';
import type { SelectedFile } from './types';

const MAX_FILES = 20;

const MIME_EXTENSIONS: Record<string, string[]> = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/webp': ['webp'],
  'image/heic': ['heic'],
  'image/heif': ['heif', 'heic'],
  'application/pdf': ['pdf'],
};

type Phase = 'ready' | 'processing' | 'done';

export type ToolRunnerProps = {
  locale: Locale;
  toolId: string;
  engine: EngineId;
  accept: string[];
  maxFileMB: number;
  sortable?: boolean;
  defaults?: ToolOptions;
};

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `file-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : '';
}

function isAccepted(file: File, accept: string[]): boolean {
  if (!file.type && !extensionOf(file.name)) return false;
  if (file.type && accept.includes(file.type)) return true;
  const extension = extensionOf(file.name);
  return accept.some((mime) => MIME_EXTENSIONS[mime]?.includes(extension));
}

function canPreview(file: File): boolean {
  return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
}

function errorMessage(code: string, ui: ReturnType<typeof getUi>, name: string): string {
  switch (code) {
    case 'unsupported':
      return ui.errors.unsupported.replace('{name}', name);
    case 'too-large':
      return ui.errors.tooLarge.replace('{name}', name).replace('{mb}', '100');
    case 'empty':
      return ui.errors.empty.replace('{name}', name);
    case 'decode':
      return ui.errors.decode.replace('{name}', name).replace('{format}', 'image');
    case 'heic':
      return ui.errors.heic;
    case 'pdf':
    case 'no-pages':
      return ui.errors.pdf;
    case 'password':
      return ui.errors.password;
    case 'no-files':
      return ui.errors.noFiles;
    case 'no-images':
      return ui.errors.noImages;
    case 'invalid-range':
      return ui.errors.invalidRange;
    case 'worker':
      return ui.errors.worker;
    case 'canceled':
      return ui.errors.canceled;
    case 'unknown-engine':
      return ui.errors.unknownEngine;
    default:
      return ui.errors.generic;
  }
}

export default function ToolRunner({
  locale,
  toolId,
  engine,
  accept,
  maxFileMB,
  sortable = false,
  defaults = {},
}: ToolRunnerProps) {
  const ui = getUi(locale);
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [options, setOptions] = useState<ToolOptions>(defaults);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('ready');
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [results, setResults] = useState<OutputResult[] | null>(null);
  const previews = useRef(new Set<string>());
  const previewsByFile = useRef(new Map<string, string>());
  const abortRef = useRef<AbortController | null>(null);
  const processing = phase === 'processing';

  const revokePreview = useCallback((id: string) => {
    const url = previewsByFile.current.get(id);
    if (url) {
      URL.revokeObjectURL(url);
      previews.current.delete(url);
      previewsByFile.current.delete(id);
    }
  }, []);

  useEffect(() => {
    return () => {
      for (const url of previews.current) URL.revokeObjectURL(url);
      previews.current.clear();
      previewsByFile.current.clear();
      abortRef.current?.abort();
    };
  }, []);

  const addFiles = useCallback(
    (incoming: File[]) => {
      if (processing) return;
      setError(null);
      setNotice(null);

      const current = files.length;
      if (current >= MAX_FILES) {
        setError(ui.files.limit.replace('{n}', String(MAX_FILES)));
        return;
      }

      const accepted: SelectedFile[] = [];
      let rejection: string | null = null;

      for (const file of incoming) {
        if (current + accepted.length >= MAX_FILES) {
          rejection = ui.files.limit.replace('{n}', String(MAX_FILES));
          break;
        }
        if (!isAccepted(file, accept)) {
          rejection = rejection ?? ui.errors.unsupported.replace('{name}', file.name);
          continue;
        }
        if (file.size === 0) {
          rejection = rejection ?? ui.errors.empty.replace('{name}', file.name);
          continue;
        }
        if (file.size > maxFileMB * 1024 * 1024) {
          rejection =
            rejection ??
            ui.errors.tooLarge.replace('{name}', file.name).replace('{mb}', String(maxFileMB));
          continue;
        }
        if (files.some((item) => item.file.name === file.name && item.file.size === file.size)) {
          continue;
        }

        const id = newId();
        let previewUrl: string | undefined;
        if (canPreview(file)) {
          previewUrl = URL.createObjectURL(file);
          previews.current.add(previewUrl);
          previewsByFile.current.set(id, previewUrl);
        }
        accepted.push({ id, file, previewUrl });
      }

      if (accepted.length) {
        const next = [...files, ...accepted];
        setFiles(next);
        setResults(null);
        setPhase('ready');
        setProgress({});
        const totalBytes = accepted.reduce((sum, item) => sum + item.file.size, 0);
        track('file_selected', {
          tool: toolId,
          added: accepted.length,
          count: next.length,
          bytes: totalBytes,
        });
        if (next.some((item) => item.file.size > 40 * 1024 * 1024)) {
          setNotice(ui.dropzone.maxSize.replace('{mb}', String(maxFileMB)));
        }
      }

      if (rejection) setError(rejection);
    },
    [accept, files, maxFileMB, processing, toolId, ui],
  );

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      if (processing) return;
      const pasted = Array.from(event.clipboardData?.files ?? []);
      const accepted = pasted.filter((file) => isAccepted(file, accept));
      if (!accepted.length) return;
      event.preventDefault();
      addFiles(accepted);
    };
    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, [accept, addFiles, processing]);

  const removeFile = (id: string) => {
    if (processing) return;
    revokePreview(id);
    setFiles((current) => current.filter((item) => item.id !== id));
    setError(null);
    setResults(null);
  };

  const clearFiles = () => {
    if (processing) return;
    for (const item of files) revokePreview(item.id);
    setFiles([]);
    setResults(null);
    setError(null);
    setNotice(null);
    setProgress({});
    setPhase('ready');
  };

  const moveFile = (index: number, direction: -1 | 1) => {
    if (processing) return;
    setFiles((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const startOver = () => {
    for (const item of files) revokePreview(item.id);
    setFiles([]);
    setResults(null);
    setError(null);
    setNotice(null);
    setProgress({});
    setPhase('ready');
  };

  const process = async () => {
    if (processing) return;
    if (!files.length) {
      setError(ui.files.addFirst);
      return;
    }

    setError(null);
    setNotice(null);
    setResults(null);
    setPhase('processing');

    const initial: Record<string, number> = {};
    for (const item of files) initial[item.id] = 0;
    setProgress(initial);

    const controller = new AbortController();
    abortRef.current = controller;
    const startedAt = Date.now();
    const inputFiles = files.map((item) => item.file);
    track('process_started', { tool: toolId, count: files.length });

    try {
      const outputs = await runTool({
        engine,
        files: inputFiles,
        options,
        signal: controller.signal,
        onProgress: (sourceIndex, value) => {
          const selected = files[sourceIndex];
          if (!selected) return;
          setProgress((current) => ({ ...current, [selected.id]: value }));
        },
      });

      if (controller.signal.aborted) throw new EngineError('canceled');

      setResults(outputs);
      setPhase('done');

      const outputBytes = outputs.reduce((sum, output) => sum + output.meta.bytes, 0);
      track('process_completed', {
        tool: toolId,
        count: outputs.length,
        bytes: outputBytes,
        duration_ms: Date.now() - startedAt,
      });

      if (
        outputs.some(
          (output) => output.meta.targetBytes !== undefined && output.meta.targetReached === false,
        )
      ) {
        track('target_size_unreachable', { tool: toolId, target_kb: options.targetKB });
      }
    } catch (caught) {
      const code =
        caught instanceof EngineError
          ? caught.code
          : typeof (caught as { code?: unknown })?.code === 'string'
            ? String((caught as { code: string }).code)
            : 'generic';
      if (code !== 'canceled') {
        setError(errorMessage(code, ui, files[0]?.file.name ?? ''));
        track('process_failed', { tool: toolId, code });
      }
      setPhase('ready');
    } finally {
      abortRef.current = null;
    }
  };

  const cancel = () => {
    abortRef.current?.abort();
  };

  const statusText = useMemo(() => {
    if (phase === 'processing') return ui.progress.title;
    if (phase === 'done') return ui.results.title;
    return '';
  }, [phase, ui]);

  return (
    <div className="tool-widget" id="tool">
      <div className="widget-head">
        <strong>{processing ? ui.action.processing : ui.action.process}</strong>
        <small>{ui.tool.privacyBody}</small>
      </div>

      <div className="tool-widget-body">
        <div className="widget-step">
          <b>1</b>
          <span>{ui.dropzone.title}</span>
        </div>

        <Dropzone
          accept={accept.join(',')}
          maxFileMB={maxFileMB}
          locale={locale}
          error={error}
          onFiles={addFiles}
        />

        {notice && (
          <p className="callout">
            <Icon name="info" size={16} />
            <span>{notice}</span>
          </p>
        )}

        {files.length > 0 && (
          <>
            <FileList
              files={files}
              locale={locale}
              accept={accept.join(',')}
              sortable={sortable}
              disabled={processing}
              onRemove={removeFile}
              onClear={clearFiles}
              onMove={moveFile}
              onFiles={addFiles}
            />

            <div className="widget-step">
              <b>2</b>
              <span>{ui.options.title}</span>
            </div>

            <OptionsPanel engine={engine} locale={locale} options={options} onChange={setOptions} />

            {!processing && phase !== 'done' && (
              <div className="widget-actions">
                <button className="button" type="button" onClick={() => void process()}>
                  <Icon name="bolt" size={17} />
                  {files.length === 1
                    ? ui.action.process
                    : ui.action.processPlural.replace('{n}', String(files.length))}
                </button>
                <span className="privacy-note">
                  <Icon name="lock" size={14} /> {ui.dropzone.privacy}
                </span>
              </div>
            )}

            {processing && (
              <>
                <ProgressPanel files={files} progress={progress} locale={locale} />
                <div className="widget-actions">
                  <button className="button secondary" type="button" onClick={cancel}>
                    {ui.action.cancel}
                  </button>
                </div>
              </>
            )}

            {results && phase === 'done' && (
              <Results
                results={results}
                locale={locale}
                toolId={toolId}
                onStartOver={startOver}
              />
            )}
          </>
        )}

        <p className="sr-only" aria-live="polite">
          {statusText}
        </p>
      </div>
    </div>
  );
}
