import { useEffect, useState } from 'react';
import type { Locale } from '../../config';
import { getUi } from '../../i18n/ui';
import { formatBytes, formatNumber, formatPercent } from '../../i18n/format';
import type { OutputResult, WarningCode } from '../../engines/types';
import { track } from '../../lib/analytics';
import Icon from './Icon';

type Props = {
  results: OutputResult[];
  locale: Locale;
  toolId: string;
  onStartOver: () => void;
};

const WARNING_KEYS: Record<WarningCode, keyof ReturnType<typeof getUi>['warnings']> = {
  'low-quality': 'lowQuality',
  'dimensions-reduced': 'dimensionsReduced',
  'target-unreachable': 'targetUnreachable',
  'png-lossless': 'pngLossless',
  'output-larger': 'outputLarger',
  'heic-first-frame': 'heicFirstFrame',
  'pages-clamped': 'pagesClamped',
};

function triggerDownload(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  anchor.rel = 'noopener';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function DownloadLink({
  result,
  locale,
  toolId,
}: {
  result: OutputResult;
  locale: Locale;
  toolId: string;
}) {
  const ui = getUi(locale);
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const next = URL.createObjectURL(result.blob);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [result.blob]);

  return (
    <a
      className="download-link"
      href={url ?? '#'}
      download={result.name}
      aria-disabled={!url}
      onClick={(event) => {
        if (!url) {
          event.preventDefault();
          return;
        }
        track('download_clicked', {
          tool: toolId,
          format: result.meta.mime,
          bytes: result.meta.bytes,
          mode: 'single',
        });
      }}
    >
      <Icon name="download" size={15} /> {ui.action.download}
    </a>
  );
}

export default function Results({ results, locale, toolId, onStartOver }: Props) {
  const ui = getUi(locale);
  const [zipError, setZipError] = useState<string | null>(null);
  const [zipping, setZipping] = useState(false);

  const downloadZip = async () => {
    if (zipping) return;
    setZipping(true);
    setZipError(null);
    try {
      const { zipSync } = await import('fflate');
      const entries: Record<string, Uint8Array> = {};
      for (let index = 0; index < results.length; index += 1) {
        const result = results[index];
        const buffer = new Uint8Array(await result.blob.arrayBuffer());
        let name = result.name;
        if (entries[name]) {
          const dot = name.lastIndexOf('.');
          name = dot > 0 ? `${name.slice(0, dot)}-${index + 1}${name.slice(dot)}` : `${name}-${index + 1}`;
        }
        entries[name] = buffer;
      }
      const zipped = zipSync(entries, { level: 6 });
      triggerDownload(new Blob([zipped], { type: 'application/zip' }), ui.results.zipName);
      track('download_clicked', {
        tool: toolId,
        format: 'application/zip',
        count: results.length,
        mode: 'zip',
      });
    } catch {
      setZipError(ui.errors.generic);
    } finally {
      setZipping(false);
    }
  };

  return (
    <section className="results-panel" aria-labelledby="results-title">
      <div className="results-head">
        <div>
          <h2 id="results-title">{ui.results.title}</h2>
          <p>{ui.results.note}</p>
        </div>
      </div>

      <div className="result-list">
        {results.map((result) => {
          const hasBefore = result.meta.originalBytes > 0;
          const difference = hasBefore ? (1 - result.meta.bytes / result.meta.originalBytes) * 100 : null;
          const warnings = Array.from(new Set(result.meta.warnings));
          const quality =
            result.meta.quality !== undefined && result.meta.mime !== 'image/png'
              ? Math.round(result.meta.quality * 100)
              : null;
          return (
            <article className="result-card" key={result.id}>
              <div className="result-main">
                <span className="result-name" title={result.name}>{result.name}</span>
                <div className="result-sizes">
                  {hasBefore && (
                    <span>{ui.results.original}: <b>{formatBytes(result.meta.originalBytes, locale)}</b></span>
                  )}
                  <span>{ui.results.result}: <b>{formatBytes(result.meta.bytes, locale)}</b></span>
                  {difference !== null && Math.abs(difference) >= 0.1 && (
                    <span className={`savings${difference < 0 ? ' larger' : ''}`}>
                      {difference >= 0
                        ? ui.results.saved.replace('{percent}', formatPercent(difference, locale))
                        : ui.results.larger.replace('{percent}', formatPercent(Math.abs(difference), locale))}
                    </span>
                  )}
                  {difference !== null && Math.abs(difference) < 0.1 && (
                    <span className="savings">{ui.results.noChange}</span>
                  )}
                  {result.meta.targetBytes !== undefined && (
                    <span className={`savings${result.meta.targetReached ? '' : ' larger'}`}>
                      {result.meta.targetReached ? ui.results.targetReached : ui.results.targetMissed}
                    </span>
                  )}
                </div>
              </div>
              <div className="result-actions">
                <DownloadLink result={result} locale={locale} toolId={toolId} />
              </div>

              {(result.meta.width || result.meta.height || result.meta.pages || quality !== null || result.meta.targetBytes) && (
                <div className="result-meta">
                  {result.meta.width && result.meta.height && (
                    <span>{ui.results.dimensions.replace('{width}', formatNumber(result.meta.width, locale)).replace('{height}', formatNumber(result.meta.height, locale))}</span>
                  )}
                  {result.meta.pageNumber && <span>{ui.results.page.replace('{n}', String(result.meta.pageNumber))}</span>}
                  {result.meta.pages !== undefined && result.meta.pages > 1 && (
                    <span>{ui.results.pages.replace('{n}', String(result.meta.pages))}</span>
                  )}
                  {quality !== null && <span>{ui.results.quality}: {quality}%</span>}
                  {result.meta.targetBytes !== undefined && (
                    <span>
                      {ui.results.targetLabel.replace('{size}', formatBytes(result.meta.targetBytes, locale))}
                      {!result.meta.targetReached &&
                        ` · ${ui.results.smallest.replace('{size}', formatBytes(result.meta.bytes, locale))}`}
                    </span>
                  )}
                </div>
              )}

              {warnings.map((warning) => (
                <div className="result-warning" key={warning}>
                  <Icon name="warning" size={15} />
                  <span>{ui.warnings[WARNING_KEYS[warning]]}</span>
                </div>
              ))}
            </article>
          );
        })}
      </div>

      {zipError && (
        <p className="alert" role="alert"><Icon name="warning" size={16} /> {zipError}</p>
      )}

      <div className="results-actions">
        {results.length > 1 && (
          <button className="button secondary" type="button" onClick={() => void downloadZip()} disabled={zipping}>
            <Icon name="download" size={16} />
            {zipping ? ui.action.preparing : ui.action.downloadAll}
          </button>
        )}
        <button className="button" type="button" onClick={onStartOver}>
          <Icon name="refresh" size={16} /> {ui.action.startOver}
        </button>
      </div>
      <p className="result-note"><Icon name="lock" size={14} /> {ui.results.note}</p>
    </section>
  );
}
