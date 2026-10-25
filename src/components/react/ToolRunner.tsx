import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from '../../config';
import { getUi } from '../../i18n/ui';
import type { EngineId, OutputFormat, ToolOptions } from '../../tools.config';
import { EngineError, runTool } from '../../engines/client';
import { generateQrCode } from '../../engines/qr';
import type { OutputResult, QrOptions } from '../../engines/types';
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

type QrContentType = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'whatsapp' | 'vcard';
type QrEncryption = 'WPA' | 'WEP' | 'nopass';

type QrForm = {
  type: QrContentType;
  url: string;
  text: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: QrEncryption;
  wifiHidden: boolean;
  emailTo: string;
  emailSubject: string;
  emailBody: string;
  phone: string;
  waNumber: string;
  waMessage: string;
  vcardFirst: string;
  vcardLast: string;
  vcardOrg: string;
  vcardTitle: string;
  vcardPhone: string;
  vcardEmail: string;
  vcardUrl: string;
  ecc: QrOptions['ecc'];
  colorDark: string;
  colorLight: string;
  margin: number;
  size: number;
  logoPercent: number;
  logoRounded: boolean;
  logoBackground: boolean;
};

const QR_DEFAULTS: QrForm = {
  type: 'url',
  url: '',
  text: '',
  wifiSsid: '',
  wifiPassword: '',
  wifiEncryption: 'WPA',
  wifiHidden: false,
  emailTo: '',
  emailSubject: '',
  emailBody: '',
  phone: '',
  waNumber: '',
  waMessage: '',
  vcardFirst: '',
  vcardLast: '',
  vcardOrg: '',
  vcardTitle: '',
  vcardPhone: '',
  vcardEmail: '',
  vcardUrl: '',
  ecc: 'H',
  colorDark: '#000000',
  colorLight: '#ffffff',
  margin: 4,
  size: 1024,
  logoPercent: 16,
  logoRounded: true,
  logoBackground: true,
};

function escapeWifiValue(value: string): string {
  return value.replace(/([\\;,":])/g, '\\$1');
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

function normalizePhone(value: string): string {
  const trimmed = value.trim();
  const prefix = trimmed.startsWith('+') ? '+' : '';
  return `${prefix}${digitsOnly(trimmed)}`;
}

function buildQrPayload(form: QrForm): string {
  switch (form.type) {
    case 'url':
      return form.url.trim();
    case 'text':
      return form.text.trim();
    case 'wifi': {
      const parts = [`T:${form.wifiEncryption}`, `S:${escapeWifiValue(form.wifiSsid.trim())}`];
      if (form.wifiEncryption !== 'nopass') {
        parts.push(`P:${escapeWifiValue(form.wifiPassword)}`);
      }
      if (form.wifiHidden) parts.push('H:true');
      return `WIFI:${parts.join(';')};;`;
    }
    case 'email': {
      const params: string[] = [];
      if (form.emailSubject.trim()) {
        params.push(`subject=${encodeURIComponent(form.emailSubject.trim())}`);
      }
      if (form.emailBody.trim()) {
        params.push(`body=${encodeURIComponent(form.emailBody.trim())}`);
      }
      const query = params.length ? `?${params.join('&')}` : '';
      return `mailto:${form.emailTo.trim()}${query}`;
    }
    case 'phone':
      return `tel:${normalizePhone(form.phone)}`;
    case 'whatsapp': {
      const number = digitsOnly(form.waNumber);
      const message = form.waMessage.trim();
      return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
    }
    case 'vcard': {
      const first = form.vcardFirst.trim();
      const last = form.vcardLast.trim();
      const fullName = [first, last].filter(Boolean).join(' ');
      const lines = ['BEGIN:VCARD', 'VERSION:3.0', `N:${last};${first};;;`];
      lines.push(`FN:${fullName || form.vcardOrg.trim() || 'Contact'}`);
      if (form.vcardOrg.trim()) lines.push(`ORG:${form.vcardOrg.trim()}`);
      if (form.vcardTitle.trim()) lines.push(`TITLE:${form.vcardTitle.trim()}`);
      if (form.vcardPhone.trim()) lines.push(`TEL;TYPE=CELL:${normalizePhone(form.vcardPhone)}`);
      if (form.vcardEmail.trim()) lines.push(`EMAIL:${form.vcardEmail.trim()}`);
      if (form.vcardUrl.trim()) lines.push(`URL:${form.vcardUrl.trim()}`);
      lines.push('END:VCARD');
      return lines.join('\r\n');
    }
    default:
      return '';
  }
}

function validateQrForm(form: QrForm): string | null {
  switch (form.type) {
    case 'url': {
      const value = form.url.trim();
      if (!value) return 'qr-required';
      try {
        const url = new URL(value);
        if (url.protocol !== 'https:' && url.protocol !== 'http:') return 'qr-url';
      } catch {
        return 'qr-url';
      }
      return null;
    }
    case 'text':
      return form.text.trim() ? null : 'qr-text';
    case 'wifi':
      return form.wifiSsid.trim() ? null : 'qr-wifi';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailTo.trim()) ? null : 'qr-email';
    case 'phone':
      return digitsOnly(form.phone).length >= 4 ? null : 'qr-phone';
    case 'whatsapp':
      return digitsOnly(form.waNumber).length >= 6 ? null : 'qr-phone';
    case 'vcard':
      return form.vcardFirst.trim() || form.vcardLast.trim() || form.vcardOrg.trim()
        ? null
        : 'qr-vcard';
    default:
      return 'qr-required';
  }
}

export type ToolRunnerProps = {
  locale: Locale;
  toolId: string;
  engine: EngineId;
  accept: string[];
  maxFileMB: number;
  sortable?: boolean;
  defaults?: ToolOptions;
  /** Keeps the output extension identical to the input (no silent conversion). */
  fixedFormat?: boolean;
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
  return accept.some((entry) => {
    if (entry === 'image/*') return file.type.startsWith('image/');
    if (entry.startsWith('.')) return entry.slice(1).toLowerCase() === extension;
    return MIME_EXTENSIONS[entry]?.includes(extension) ?? false;
  });
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
    case 'qr-required':
      return ui.errors.qrRequired;
    case 'qr-url':
      return ui.errors.qrUrl;
    case 'qr-text':
      return ui.errors.qrText;
    case 'qr-wifi':
      return ui.errors.qrWifi;
    case 'qr-email':
      return ui.errors.qrEmail;
    case 'qr-phone':
      return ui.errors.qrPhone;
    case 'qr-vcard':
      return ui.errors.qrVcard;
    case 'qr-too-long':
      return ui.errors.qrTooLong;
    case 'qr-logo':
      return ui.errors.qrLogo;
    case 'qr-logo-size':
      return ui.errors.qrLogoSize;
    case 'qr-generate':
      return ui.errors.qrGenerate;
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
  fixedFormat = false,
}: ToolRunnerProps) {
  const ui = getUi(locale);
  const isQrGenerator = engine === 'qr-generator';
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [options, setOptions] = useState<ToolOptions>(defaults);
  const [qr, setQr] = useState<QrForm>(QR_DEFAULTS);
  const [qrLogo, setQrLogo] = useState<File | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('ready');
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [results, setResults] = useState<OutputResult[] | null>(null);
  const previews = useRef(new Set<string>());
  const previewsByFile = useRef(new Map<string, string>());
  const qrPreviewUrl = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const processing = phase === 'processing';
  const hasInput = isQrGenerator || files.length > 0;

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
      if (qrPreviewUrl.current) URL.revokeObjectURL(qrPreviewUrl.current);
      qrPreviewUrl.current = null;
      abortRef.current?.abort();
    };
  }, []);

  const qrOptions = useMemo<QrOptions>(
    () => ({
      text: buildQrPayload(qr),
      ecc: qr.ecc,
      colorDark: qr.colorDark,
      colorLight: qr.colorLight,
      margin: qr.margin,
      size: qr.size,
      logoPercent: qr.logoPercent,
      logoRounded: qr.logoRounded,
      logoBackground: qr.logoBackground,
    }),
    [qr],
  );

  const updateQr = useCallback((patch: Partial<QrForm>) => {
    setQr((current) => ({ ...current, ...patch }));
    setError(null);
    setResults(null);
    setPhase((current) => (current === 'processing' ? current : 'ready'));
  }, []);

  useEffect(() => {
    if (!isQrGenerator) return;
    const invalid = validateQrForm(qr);
    if (invalid) {
      if (qrPreviewUrl.current) URL.revokeObjectURL(qrPreviewUrl.current);
      qrPreviewUrl.current = null;
      setQrPreview(null);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const outputs = await generateQrCode(qrOptions, qrLogo, undefined, undefined, 'png');
        const png = outputs[0];
        if (cancelled || !png) return;
        const url = URL.createObjectURL(png.blob);
        if (qrPreviewUrl.current) URL.revokeObjectURL(qrPreviewUrl.current);
        qrPreviewUrl.current = url;
        setQrPreview(url);
      } catch {
        if (cancelled) return;
        if (qrPreviewUrl.current) URL.revokeObjectURL(qrPreviewUrl.current);
        qrPreviewUrl.current = null;
        setQrPreview(null);
      }
    }, 280);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [isQrGenerator, qr, qrLogo, qrOptions]);

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
    let qrPayload = '';
    if (isQrGenerator) {
      const invalid = validateQrForm(qr);
      if (invalid) {
        setError(errorMessage(invalid, ui, ''));
        return;
      }
      qrPayload = buildQrPayload(qr);
    } else if (!files.length) {
      setError(ui.files.addFirst);
      return;
    }

    setError(null);
    setNotice(null);
    setResults(null);
    setPhase('processing');

    const initial: Record<string, number> = isQrGenerator ? { qr: 0 } : {};
    for (const item of files) initial[item.id] = 0;
    setProgress(initial);

    const controller = new AbortController();
    abortRef.current = controller;
    const startedAt = Date.now();
    const inputFiles = files.map((item) => item.file);
    track('process_started', { tool: toolId, count: isQrGenerator ? 1 : files.length });

    try {
      const outputs = await runTool({
        engine,
        files: isQrGenerator ? [] : inputFiles,
        options,
        qrOptions: isQrGenerator ? { ...qrOptions, text: qrPayload } : undefined,
        qrLogo: isQrGenerator ? qrLogo : undefined,
        signal: controller.signal,
        onProgress: (sourceIndex, value) => {
          if (isQrGenerator) {
            setProgress((current) => ({ ...current, qr: value }));
            return;
          }
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
        {engine === 'image-converter' && (
          <div className="converter-controls">
            <label htmlFor="converter-output">{ui.converter.convertTo}</label>
            <select
              id="converter-output"
              className="select"
              value={options.outputFormat ?? 'image/jpeg'}
              onChange={(event) =>
                setOptions({ ...options, outputFormat: event.target.value as OutputFormat })
              }
            >
              <option value="image/jpeg">{ui.converter.jpg}</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WebP</option>
            </select>
          </div>
        )}

        {isQrGenerator ? (
          <div className="qr-form">
            <div className="qr-field">
              <label htmlFor="qr-type">{ui.qr.typeLabel}</label>
              <select
                id="qr-type"
                className="select"
                value={qr.type}
                disabled={processing}
                onChange={(event) => updateQr({ type: event.target.value as QrContentType })}
              >
                <option value="url">{ui.qr.typeUrl}</option>
                <option value="text">{ui.qr.typeText}</option>
                <option value="wifi">{ui.qr.typeWifi}</option>
                <option value="email">{ui.qr.typeEmail}</option>
                <option value="phone">{ui.qr.typePhone}</option>
                <option value="whatsapp">{ui.qr.typeWhatsapp}</option>
                <option value="vcard">{ui.qr.typeVcard}</option>
              </select>
            </div>

            {qr.type === 'url' && (
              <div className="qr-field">
                <label htmlFor="qr-url">{ui.qr.urlLabel}</label>
                <input
                  id="qr-url"
                  className="input"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder={ui.qr.urlPlaceholder}
                  value={qr.url}
                  disabled={processing}
                  onChange={(event) => updateQr({ url: event.target.value })}
                />
              </div>
            )}

            {qr.type === 'text' && (
              <div className="qr-field">
                <label htmlFor="qr-text">{ui.qr.textLabel}</label>
                <textarea
                  id="qr-text"
                  className="input qr-textarea"
                  rows={4}
                  placeholder={ui.qr.textPlaceholder}
                  value={qr.text}
                  disabled={processing}
                  onChange={(event) => updateQr({ text: event.target.value })}
                />
              </div>
            )}

            {qr.type === 'wifi' && (
              <div className="qr-grid">
                <div className="qr-field">
                  <label htmlFor="qr-wifi-ssid">{ui.qr.wifiSsidLabel}</label>
                  <input
                    id="qr-wifi-ssid"
                    className="input"
                    type="text"
                    placeholder={ui.qr.wifiSsidPlaceholder}
                    value={qr.wifiSsid}
                    disabled={processing}
                    onChange={(event) => updateQr({ wifiSsid: event.target.value })}
                  />
                </div>
                <div className="qr-field">
                  <label htmlFor="qr-wifi-encryption">{ui.qr.wifiEncryptionLabel}</label>
                  <select
                    id="qr-wifi-encryption"
                    className="select"
                    value={qr.wifiEncryption}
                    disabled={processing}
                    onChange={(event) =>
                      updateQr({ wifiEncryption: event.target.value as QrEncryption })
                    }
                  >
                    <option value="WPA">{ui.qr.wifiEncryptionWpa}</option>
                    <option value="WEP">{ui.qr.wifiEncryptionWep}</option>
                    <option value="nopass">{ui.qr.wifiEncryptionNone}</option>
                  </select>
                </div>
                {qr.wifiEncryption !== 'nopass' && (
                  <div className="qr-field">
                    <label htmlFor="qr-wifi-password">{ui.qr.wifiPasswordLabel}</label>
                    <input
                      id="qr-wifi-password"
                      className="input"
                      type="text"
                      autoComplete="off"
                      placeholder={ui.qr.wifiPasswordPlaceholder}
                      value={qr.wifiPassword}
                      disabled={processing}
                      onChange={(event) => updateQr({ wifiPassword: event.target.value })}
                    />
                  </div>
                )}
                <label className="qr-check">
                  <input
                    type="checkbox"
                    checked={qr.wifiHidden}
                    disabled={processing}
                    onChange={(event) => updateQr({ wifiHidden: event.target.checked })}
                  />
                  <span>{ui.qr.wifiHiddenLabel}</span>
                </label>
              </div>
            )}

            {qr.type === 'email' && (
              <div className="qr-grid">
                <div className="qr-field">
                  <label htmlFor="qr-email-to">{ui.qr.emailToLabel}</label>
                  <input
                    id="qr-email-to"
                    className="input"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder={ui.qr.emailToPlaceholder}
                    value={qr.emailTo}
                    disabled={processing}
                    onChange={(event) => updateQr({ emailTo: event.target.value })}
                  />
                </div>
                <div className="qr-field">
                  <label htmlFor="qr-email-subject">{ui.qr.emailSubjectLabel}</label>
                  <input
                    id="qr-email-subject"
                    className="input"
                    type="text"
                    placeholder={ui.qr.emailSubjectPlaceholder}
                    value={qr.emailSubject}
                    disabled={processing}
                    onChange={(event) => updateQr({ emailSubject: event.target.value })}
                  />
                </div>
                <div className="qr-field qr-span">
                  <label htmlFor="qr-email-body">{ui.qr.emailBodyLabel}</label>
                  <textarea
                    id="qr-email-body"
                    className="input qr-textarea"
                    rows={3}
                    placeholder={ui.qr.emailBodyPlaceholder}
                    value={qr.emailBody}
                    disabled={processing}
                    onChange={(event) => updateQr({ emailBody: event.target.value })}
                  />
                </div>
              </div>
            )}

            {qr.type === 'phone' && (
              <div className="qr-field">
                <label htmlFor="qr-phone">{ui.qr.phoneLabel}</label>
                <input
                  id="qr-phone"
                  className="input"
                  type="tel"
                  inputMode="tel"
                  placeholder={ui.qr.phonePlaceholder}
                  value={qr.phone}
                  disabled={processing}
                  onChange={(event) => updateQr({ phone: event.target.value })}
                />
              </div>
            )}

            {qr.type === 'whatsapp' && (
              <div className="qr-grid">
                <div className="qr-field">
                  <label htmlFor="qr-wa-number">{ui.qr.waNumberLabel}</label>
                  <input
                    id="qr-wa-number"
                    className="input"
                    type="tel"
                    inputMode="tel"
                    placeholder={ui.qr.waNumberPlaceholder}
                    value={qr.waNumber}
                    disabled={processing}
                    onChange={(event) => updateQr({ waNumber: event.target.value })}
                  />
                  <small>{ui.qr.waNumberHelp}</small>
                </div>
                <div className="qr-field">
                  <label htmlFor="qr-wa-message">{ui.qr.waMessageLabel}</label>
                  <input
                    id="qr-wa-message"
                    className="input"
                    type="text"
                    placeholder={ui.qr.waMessagePlaceholder}
                    value={qr.waMessage}
                    disabled={processing}
                    onChange={(event) => updateQr({ waMessage: event.target.value })}
                  />
                </div>
              </div>
            )}

            {qr.type === 'vcard' && (
              <div className="qr-grid">
                <div className="qr-field">
                  <label htmlFor="qr-vcard-first">{ui.qr.vcardFirstLabel}</label>
                  <input
                    id="qr-vcard-first"
                    className="input"
                    type="text"
                    placeholder={ui.qr.vcardFirstPlaceholder}
                    value={qr.vcardFirst}
                    disabled={processing}
                    onChange={(event) => updateQr({ vcardFirst: event.target.value })}
                  />
                </div>
                <div className="qr-field">
                  <label htmlFor="qr-vcard-last">{ui.qr.vcardLastLabel}</label>
                  <input
                    id="qr-vcard-last"
                    className="input"
                    type="text"
                    placeholder={ui.qr.vcardLastPlaceholder}
                    value={qr.vcardLast}
                    disabled={processing}
                    onChange={(event) => updateQr({ vcardLast: event.target.value })}
                  />
                </div>
                <div className="qr-field">
                  <label htmlFor="qr-vcard-org">{ui.qr.vcardOrgLabel}</label>
                  <input
                    id="qr-vcard-org"
                    className="input"
                    type="text"
                    placeholder={ui.qr.vcardOrgPlaceholder}
                    value={qr.vcardOrg}
                    disabled={processing}
                    onChange={(event) => updateQr({ vcardOrg: event.target.value })}
                  />
                </div>
                <div className="qr-field">
                  <label htmlFor="qr-vcard-title">{ui.qr.vcardTitleLabel}</label>
                  <input
                    id="qr-vcard-title"
                    className="input"
                    type="text"
                    placeholder={ui.qr.vcardTitlePlaceholder}
                    value={qr.vcardTitle}
                    disabled={processing}
                    onChange={(event) => updateQr({ vcardTitle: event.target.value })}
                  />
                </div>
                <div className="qr-field">
                  <label htmlFor="qr-vcard-phone">{ui.qr.vcardPhoneLabel}</label>
                  <input
                    id="qr-vcard-phone"
                    className="input"
                    type="tel"
                    inputMode="tel"
                    placeholder={ui.qr.phonePlaceholder}
                    value={qr.vcardPhone}
                    disabled={processing}
                    onChange={(event) => updateQr({ vcardPhone: event.target.value })}
                  />
                </div>
                <div className="qr-field">
                  <label htmlFor="qr-vcard-email">{ui.qr.vcardEmailLabel}</label>
                  <input
                    id="qr-vcard-email"
                    className="input"
                    type="email"
                    inputMode="email"
                    placeholder={ui.qr.emailToPlaceholder}
                    value={qr.vcardEmail}
                    disabled={processing}
                    onChange={(event) => updateQr({ vcardEmail: event.target.value })}
                  />
                </div>
                <div className="qr-field qr-span">
                  <label htmlFor="qr-vcard-url">{ui.qr.vcardUrlLabel}</label>
                  <input
                    id="qr-vcard-url"
                    className="input"
                    type="url"
                    inputMode="url"
                    placeholder={ui.qr.urlPlaceholder}
                    value={qr.vcardUrl}
                    disabled={processing}
                    onChange={(event) => updateQr({ vcardUrl: event.target.value })}
                  />
                </div>
              </div>
            )}

            <fieldset className="qr-group" disabled={processing}>
              <legend>{ui.qr.designTitle}</legend>
              <div className="qr-grid">
                <div className="qr-field">
                  <label htmlFor="qr-size">{ui.qr.sizeLabel}</label>
                  <select
                    id="qr-size"
                    className="select"
                    value={qr.size}
                    onChange={(event) => updateQr({ size: Number(event.target.value) })}
                  >
                    <option value={256}>256 × 256 px</option>
                    <option value={512}>512 × 512 px</option>
                    <option value={1024}>1024 × 1024 px</option>
                    <option value={2048}>2048 × 2048 px</option>
                  </select>
                </div>
                <div className="qr-field">
                  <label htmlFor="qr-ecc">{ui.qr.eccLabel}</label>
                  <select
                    id="qr-ecc"
                    className="select"
                    value={qrLogo ? 'H' : qr.ecc}
                    disabled={Boolean(qrLogo)}
                    onChange={(event) =>
                      updateQr({ ecc: event.target.value as QrOptions['ecc'] })
                    }
                  >
                    <option value="L">L — 7%</option>
                    <option value="M">M — 15%</option>
                    <option value="Q">Q — 25%</option>
                    <option value="H">H — 30%</option>
                  </select>
                  <small>{qrLogo ? ui.qr.eccForced : ui.qr.eccHelp}</small>
                </div>
                <div className="qr-field">
                  <label htmlFor="qr-margin">{ui.qr.marginLabel.replace('{n}', String(qr.margin))}</label>
                  <input
                    id="qr-margin"
                    className="qr-range"
                    type="range"
                    min={0}
                    max={8}
                    step={1}
                    value={qr.margin}
                    onChange={(event) => updateQr({ margin: Number(event.target.value) })}
                  />
                </div>
                <div className="qr-field">
                  <label>{ui.qr.colorsLabel}</label>
                  <div className="qr-color-row">
                    <label className="qr-color">
                      <span>{ui.qr.fgLabel}</span>
                      <input
                        type="color"
                        value={qr.colorDark}
                        onChange={(event) => updateQr({ colorDark: event.target.value })}
                      />
                    </label>
                    <label className="qr-color">
                      <span>{ui.qr.bgLabel}</span>
                      <input
                        type="color"
                        value={qr.colorLight}
                        onChange={(event) => updateQr({ colorLight: event.target.value })}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="qr-field">
              <label htmlFor="qr-logo">{ui.qr.logoLabel}</label>
              <input
                id="qr-logo"
                className="input qr-file-input"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                disabled={processing}
                onChange={(event) => {
                  const selected = event.target.files?.[0] ?? null;
                  event.target.value = '';
                  if (!selected) return;
                  if (selected.size > 5 * 1024 * 1024) {
                    setError(ui.errors.qrLogoSize);
                    return;
                  }
                  setQrLogo(selected);
                  setError(null);
                  setResults(null);
                  setPhase('ready');
                }}
              />
              <small>{ui.qr.logoHelp}</small>
              {qrLogo && (
                <>
                  <div className="qr-logo-selected">
                    <span title={qrLogo.name}>{qrLogo.name}</span>
                    <button
                      type="button"
                      className="file-action"
                      disabled={processing}
                      onClick={() => {
                        setQrLogo(null);
                        setResults(null);
                        setPhase('ready');
                      }}
                    >
                      {ui.qr.removeLogo}
                    </button>
                  </div>
                  <div className="qr-grid qr-logo-options">
                    <div className="qr-field">
                      <label htmlFor="qr-logo-size">
                        {ui.qr.logoSizeLabel.replace('{n}', String(qr.logoPercent))}
                      </label>
                      <input
                        id="qr-logo-size"
                        className="qr-range"
                        type="range"
                        min={8}
                        max={20}
                        step={1}
                        value={qr.logoPercent}
                        disabled={processing}
                        onChange={(event) => updateQr({ logoPercent: Number(event.target.value) })}
                      />
                    </div>
                    <div className="qr-checks">
                      <label className="qr-check">
                        <input
                          type="checkbox"
                          checked={qr.logoBackground}
                          disabled={processing}
                          onChange={(event) => updateQr({ logoBackground: event.target.checked })}
                        />
                        <span>{ui.qr.logoBackdropLabel}</span>
                      </label>
                      <label className="qr-check">
                        <input
                          type="checkbox"
                          checked={qr.logoRounded}
                          disabled={processing}
                          onChange={(event) => updateQr({ logoRounded: event.target.checked })}
                        />
                        <span>{ui.qr.logoRoundedLabel}</span>
                      </label>
                    </div>
                  </div>
                  <p className="qr-hint">
                    <Icon name="info" size={14} />
                    <span>{ui.qr.logoNote}</span>
                  </p>
                </>
              )}
            </div>

            <div className="qr-preview-panel">
              <div className="qr-preview-head">
                <strong>{ui.qr.previewTitle}</strong>
                <small>{ui.qr.previewNote}</small>
              </div>
              {qrPreview ? (
                <img
                  className="qr-preview"
                  src={qrPreview}
                  alt={ui.qr.previewAlt}
                  width={320}
                  height={320}
                />
              ) : (
                <div className="qr-preview-empty">{ui.qr.previewEmpty}</div>
              )}
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}
          </div>
        ) : (
          <>
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
          </>
        )}

        {notice && (
          <p className="callout">
            <Icon name="info" size={16} />
            <span>{notice}</span>
          </p>
        )}

        {hasInput && (
          <>
            {!isQrGenerator && (
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

                <OptionsPanel
                  engine={engine}
                  toolId={toolId}
                  locale={locale}
                  options={options}
                  fixedFormat={fixedFormat}
                  formatLocked={
                    toolId === 'compress-image' && files.length > 0 && files.every(({ file }) => {
                      const extension = extensionOf(file.name);
                      return (
                        file.type === 'image/gif' ||
                        file.type === 'image/heic' ||
                        file.type === 'image/heif' ||
                        extension === 'gif' ||
                        extension === 'heic' ||
                        extension === 'heif'
                      );
                    })
                  }
                  onChange={setOptions}
                />
              </>
            )}

            {!processing && phase !== 'done' && (
              <div className="widget-actions">
                <button className="button" type="button" onClick={() => void process()}>
                  <Icon name="bolt" size={17} />
                  {isQrGenerator
                    ? ui.qr.generate
                    : files.length === 1
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
                {isQrGenerator ? (
                  <div className="qr-progress">
                    <div
                      className="qr-progress-track"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round((progress.qr ?? 0) * 100)}
                    >
                      <span style={{ width: `${Math.round((progress.qr ?? 0) * 100)}%` }} />
                    </div>
                    <span>{ui.qr.generating}</span>
                  </div>
                ) : (
                  <ProgressPanel files={files} progress={progress} locale={locale} />
                )}
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
                showPreview={isQrGenerator}
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
