import { useState } from 'react';
import type { Locale } from '../../config';
import type { EngineId, OutputFormat, ToolOptions } from '../../tools.config';
import { getUi } from '../../i18n/ui';

type Props = {
  engine: EngineId;
  locale: Locale;
  options: ToolOptions;
  onChange: (options: ToolOptions) => void;
};

const FORMAT_LABELS: Record<string, string> = {
  auto: 'Auto',
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WebP',
};

const TARGET_PRESETS = [20, 50, 100, 200, 500, 1024];
const MAX_DIMENSION = 6000;

export default function OptionsPanel({ engine, locale, options, onChange }: Props) {
  const ui = getUi(locale);
  const [unit, setUnit] = useState<'kb' | 'mb'>(
    options.targetKB && options.targetKB >= 1024 && options.targetKB % 1024 === 0 ? 'mb' : 'kb',
  );

  const update = (patch: Partial<ToolOptions>) => onChange({ ...options, ...patch });

  const targetValue =
    options.targetKB === undefined
      ? ''
      : unit === 'mb'
        ? String(Number((options.targetKB / 1024).toFixed(2)))
        : String(Math.round(options.targetKB));

  const quality = Math.round((options.quality ?? 0.9) * 100);
  const format = options.outputFormat ?? 'auto';
  const showQuality =
    engine !== 'pdf-split' &&
    engine !== 'pdf-rotate' &&
    engine !== 'pdf-merge' &&
    !(engine === 'image-to-pdf') &&
    !(format === 'image/png' && engine !== 'pdf-to-jpg');
  const isFixedFormat = engine === 'image-convert' || engine === 'heic-convert';
  const fixedFormat = engine === 'heic-convert' ? 'JPG' : FORMAT_LABELS[format] ?? 'JPG';
  const showTarget = engine === 'image-compress' || engine === 'image-resize' || engine === 'heic-convert';
  const showMaxWidth = engine === 'image-compress' || engine === 'image-convert' || engine === 'heic-convert';
  const showResize = engine === 'image-resize';
  const showOutputFormat = engine === 'image-compress' || engine === 'image-resize';

  return (
    <div className="options-panel">
      <div className="options-title">
        <strong>{ui.options.title}</strong>
        {engine === 'pdf-merge' && <small>{ui.options.mergeOrder}</small>}
      </div>

      <div className="option-grid">
        {showTarget && (
          <div className="option full">
            <label htmlFor="opt-target">
              {engine === 'heic-convert' ? ui.options.targetOptional : ui.options.targetSize}
            </label>
            <div className="input-group">
              <input
                id="opt-target"
                className="input"
                type="number"
                inputMode="decimal"
                min="1"
                step={unit === 'mb' ? '0.1' : '1'}
                placeholder={ui.options.targetPlaceholder}
                value={targetValue}
                onChange={(event) => {
                  const raw = event.target.value;
                  if (raw === '') {
                    update({ targetKB: undefined });
                    return;
                  }
                  const value = Number(raw);
                  if (Number.isFinite(value) && value > 0) {
                    update({ targetKB: Math.round(value * (unit === 'mb' ? 1024 : 1)) });
                  }
                }}
              />
              <select
                className="select"
                aria-label={ui.options.unit}
                value={unit}
                onChange={(event) => setUnit(event.target.value as 'kb' | 'mb')}
              >
                <option value="kb">{ui.options.kb}</option>
                <option value="mb">{ui.options.mb}</option>
              </select>
            </div>
            <div className="preset-row">
              {TARGET_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className="preset"
                  aria-pressed={options.targetKB === preset}
                  onClick={() => {
                    setUnit(preset >= 1024 ? 'mb' : 'kb');
                    update({ targetKB: preset });
                  }}
                >
                  {preset >= 1024 ? `1 ${ui.options.mb}` : `${preset} ${ui.options.kb}`}
                </button>
              ))}
            </div>
            <small>{ui.options.targetSizeHelp}</small>
          </div>
        )}

        {engine === 'image-compress' && (
          <div className="option full">
            <small style={{ marginTop: 0 }}>{ui.tool.privacyBody}</small>
          </div>
        )}

        {showOutputFormat && (
          <div className="option">
            <label htmlFor="opt-format">{ui.options.outputFormat}</label>
            <select
              id="opt-format"
              className="select"
              value={format}
              onChange={(event) => update({ outputFormat: event.target.value as OutputFormat })}
            >
              <option value="auto">{ui.options.auto}</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/webp">WebP</option>
              <option value="image/png">PNG</option>
            </select>
          </div>
        )}

        {isFixedFormat && (
          <div className="option">
            <span className="option-label">{ui.options.outputFormat}</span>
            <p className="option-note">{ui.options.fixedOutput.replace('{format}', fixedFormat)}</p>
          </div>
        )}

        {showMaxWidth && (
          <div className="option">
            <label htmlFor="opt-max-width">{ui.options.maxWidth}</label>
            <input
              id="opt-max-width"
              className="input"
              type="number"
              inputMode="numeric"
              min="32"
              max={MAX_DIMENSION}
              step="1"
              placeholder="1600"
              value={options.maxWidth ?? ''}
              onChange={(event) => {
                const value = Number(event.target.value);
                update({
                  maxWidth: event.target.value
                    ? Math.min(MAX_DIMENSION, Math.max(1, Math.round(value)))
                    : undefined,
                });
              }}
            />
            <small>{ui.options.maxWidthHelp}</small>
          </div>
        )}

        {showQuality && (
          <div className={`option${engine === 'pdf-to-jpg' ? ' full' : ''}`}>
            <label htmlFor="opt-quality">{ui.options.quality}</label>
            <div className="range-row">
              <input
                id="opt-quality"
                type="range"
                min="40"
                max="95"
                step="1"
                value={quality}
                onChange={(event) => update({ quality: Number(event.target.value) / 100 })}
              />
              <span className="range-value">{quality}%</span>
            </div>
            <small>{ui.options.qualityHelp}</small>
          </div>
        )}

        {format === 'image/png' && engine !== 'pdf-to-jpg' && (
          <div className="option full">
            <p className="option-note">{ui.options.pngQualityNote}</p>
          </div>
        )}

        {showResize && (
          <>
            <div className="option">
              <label htmlFor="opt-width">{ui.options.width} ({ui.options.px})</label>
              <input
                id="opt-width"
                className="input"
                type="number"
                inputMode="numeric"
                min="1"
                max={MAX_DIMENSION}
                step="1"
                value={options.width ?? ''}
                placeholder="1200"
                onChange={(event) => {
                  const value = Number(event.target.value);
                  update({
                    width: event.target.value
                      ? Math.min(MAX_DIMENSION, Math.max(1, Math.round(value)))
                      : undefined,
                  });
                }}
              />
            </div>
            <div className="option">
              <label htmlFor="opt-height">{ui.options.height} ({ui.options.px})</label>
              <input
                id="opt-height"
                className="input"
                type="number"
                inputMode="numeric"
                min="1"
                max={MAX_DIMENSION}
                step="1"
                value={options.height ?? ''}
                placeholder="800"
                onChange={(event) => {
                  const value = Number(event.target.value);
                  update({
                    height: event.target.value
                      ? Math.min(MAX_DIMENSION, Math.max(1, Math.round(value)))
                      : undefined,
                  });
                }}
              />
            </div>
            <div className="option full">
              <span className="option-label">{ui.options.fit}</span>
              <div className="choice-row">
                {(['contain', 'cover', 'stretch'] as const).map((fit) => (
                  <label className="choice" key={fit}>
                    <input
                      type="radio"
                      name="fit-mode"
                      value={fit}
                      checked={(options.fit ?? 'contain') === fit}
                      onChange={() => update({ fit })}
                    />
                    <span>{ui.options[fit]}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {engine === 'image-to-pdf' && (
          <>
            <div className="option">
              <label htmlFor="opt-page-size">{ui.options.pageSize}</label>
              <select
                id="opt-page-size"
                className="select"
                value={options.pageSize ?? 'a4'}
                onChange={(event) => update({ pageSize: event.target.value as ToolOptions['pageSize'] })}
              >
                <option value="a4">{ui.options.a4}</option>
                <option value="letter">{ui.options.letter}</option>
                <option value="fit">{ui.options.fitImage}</option>
              </select>
            </div>
            <div className="option">
              <label htmlFor="opt-orientation">{ui.options.orientation}</label>
              <select
                id="opt-orientation"
                className="select"
                value={options.orientation ?? 'auto'}
                onChange={(event) =>
                  update({ orientation: event.target.value as ToolOptions['orientation'] })
                }
              >
                <option value="auto">{ui.options.autoOrientation}</option>
                <option value="portrait">{ui.options.portrait}</option>
                <option value="landscape">{ui.options.landscape}</option>
              </select>
            </div>
            <div className="option">
              <label htmlFor="opt-margin">{ui.options.margin}</label>
              <select
                id="opt-margin"
                className="select"
                value={options.margin ?? 24}
                onChange={(event) => update({ margin: Number(event.target.value) })}
              >
                <option value="0">{ui.options.noMargin}</option>
                <option value="12">{ui.options.smallMargin}</option>
                <option value="24">{ui.options.mediumMargin}</option>
              </select>
            </div>
            <div className="option">
              <p className="option-note">{ui.options.pageOrder}</p>
            </div>
          </>
        )}

        {engine === 'pdf-split' && (
          <>
            <div className="option full">
              <span className="option-label">{ui.options.splitMode}</span>
              <div className="choice-row">
                <label className="choice">
                  <input
                    type="radio"
                    name="split-mode"
                    value="every"
                    checked={(options.splitMode ?? 'every') === 'every'}
                    onChange={() => update({ splitMode: 'every' })}
                  />
                  <span>{ui.options.everyPage}</span>
                </label>
                <label className="choice">
                  <input
                    type="radio"
                    name="split-mode"
                    value="ranges"
                    checked={options.splitMode === 'ranges'}
                    onChange={() => update({ splitMode: 'ranges' })}
                  />
                  <span>{ui.options.ranges}</span>
                </label>
              </div>
            </div>
            {options.splitMode === 'ranges' && (
              <div className="option full">
                <label htmlFor="opt-ranges">{ui.options.pageRange}</label>
                <input
                  id="opt-ranges"
                  className="input"
                  type="text"
                  inputMode="numeric"
                  placeholder={ui.options.rangesPlaceholder}
                  value={options.ranges ?? ''}
                  onChange={(event) => update({ ranges: event.target.value })}
                />
                <small>{ui.options.rangesHelp}</small>
              </div>
            )}
            <div className="option full">
              <p className="option-note">{ui.options.rangeNote}</p>
            </div>
          </>
        )}

        {engine === 'pdf-rotate' && (
          <div className="option full">
            <span className="option-label">{ui.options.angle}</span>
            <div className="choice-row">
              {([90, 180, 270] as const).map((angle) => (
                <label className="choice" key={angle}>
                  <input
                    type="radio"
                    name="rotate-angle"
                    value={angle}
                    checked={(options.angle ?? 90) === angle}
                    onChange={() => update({ angle })}
                  />
                  <span>
                    {angle === 90 ? ui.options.rotate90 : angle === 180 ? ui.options.rotate180 : ui.options.rotate270}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {engine === 'pdf-to-jpg' && (
          <div className="option full">
            <label htmlFor="opt-scale">{ui.options.scale}</label>
            <select
              id="opt-scale"
              className="select"
              value={String(options.scale ?? 2)}
              onChange={(event) => update({ scale: Number(event.target.value) })}
            >
              <option value="1">1×</option>
              <option value="1.5">1.5×</option>
              <option value="2">2×</option>
              <option value="3">3×</option>
            </select>
            <small>{ui.options.scaleHelp}</small>
          </div>
        )}

        {engine === 'pdf-merge' && (
          <div className="option full">
            <p className="option-note">{ui.options.mergeOrder}</p>
          </div>
        )}
      </div>
    </div>
  );
}
