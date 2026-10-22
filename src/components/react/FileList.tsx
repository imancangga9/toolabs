import { useRef } from 'react';
import type { Locale } from '../../config';
import { getUi } from '../../i18n/ui';
import { formatBytes } from '../../i18n/format';
import type { SelectedFile } from './types';
import Icon from './Icon';

type Props = {
  files: SelectedFile[];
  locale: Locale;
  accept: string;
  sortable: boolean;
  disabled: boolean;
  onRemove: (id: string) => void;
  onClear: () => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onFiles: (files: File[]) => void;
};

export default function FileList({
  files,
  locale,
  accept,
  sortable,
  disabled,
  onRemove,
  onClear,
  onMove,
  onFiles,
}: Props) {
  const ui = getUi(locale);
  const inputRef = useRef<HTMLInputElement>(null);
  const totalBytes = files.reduce((sum, item) => sum + item.file.size, 0);
  const countLabel = (files.length === 1 ? ui.files.selected : ui.files.selectedPlural).replace(
    '{n}',
    String(files.length),
  );

  return (
    <div className="file-panel">
      <div className="file-panel-head">
        <div>
          <strong>{countLabel}</strong>
          <small>{ui.files.total}: {formatBytes(totalBytes, locale)} · {ui.files.ready}</small>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            className="add-more"
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
          >
            <Icon name="plus" size={14} /> {ui.dropzone.addMore}
          </button>
          <button className="button ghost small" type="button" onClick={onClear} disabled={disabled}>
            {ui.files.clear}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={(event) => {
              const next = Array.from(event.target.files ?? []);
              if (next.length) onFiles(next);
              event.target.value = '';
            }}
          />
        </div>
      </div>

      <ul className="file-list">
        {files.map((item, index) => (
          <li className="file-row" key={item.id}>
            <span className="file-thumb">
              {item.previewUrl ? (
                <img src={item.previewUrl} alt="" width="42" height="42" loading="lazy" decoding="async" />
              ) : (
                <Icon name={item.file.type === 'application/pdf' ? 'file' : 'image'} size={19} />
              )}
            </span>
            <span className="file-info">
              <span className="file-name" title={item.file.name}>{item.file.name}</span>
              <span className="file-meta">
                {formatBytes(item.file.size, locale)}
                {sortable && <span aria-hidden="true">· #{index + 1}</span>}
              </span>
            </span>
            <span className="file-actions">
              {sortable && (
                <>
                  <button
                    className="file-action"
                    type="button"
                    aria-label={ui.files.moveUp.replace('{name}', item.file.name)}
                    onClick={() => onMove(index, -1)}
                    disabled={disabled || index === 0}
                  >
                    <Icon name="arrow-up" size={15} />
                  </button>
                  <button
                    className="file-action"
                    type="button"
                    aria-label={ui.files.moveDown.replace('{name}', item.file.name)}
                    onClick={() => onMove(index, 1)}
                    disabled={disabled || index === files.length - 1}
                  >
                    <Icon name="arrow-down" size={15} />
                  </button>
                </>
              )}
              <button
                className="file-action danger"
                type="button"
                aria-label={ui.files.remove.replace('{name}', item.file.name)}
                onClick={() => onRemove(item.id)}
                disabled={disabled}
              >
                <Icon name="trash" size={15} />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
