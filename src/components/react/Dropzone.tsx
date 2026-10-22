import { useRef, useState } from 'react';
import type { Locale } from '../../config';
import { getUi } from '../../i18n/ui';
import Icon from './Icon';

type Props = {
  accept: string;
  maxFileMB: number;
  locale: Locale;
  error: string | null;
  onFiles: (files: File[]) => void;
};

export default function Dropzone({ accept, maxFileMB, locale, error, onFiles }: Props) {
  const ui = getUi(locale);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragDepth = useRef(0);

  const openPicker = () => inputRef.current?.click();

  return (
    <div>
      <div
        className={`dropzone${dragging ? ' is-dragging' : ''}${error ? ' has-error' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={ui.dropzone.browse}
        aria-describedby="dropzone-privacy"
        onClick={openPicker}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openPicker();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          dragDepth.current += 1;
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          dragDepth.current = Math.max(0, dragDepth.current - 1);
          if (dragDepth.current === 0) setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          dragDepth.current = 0;
          setDragging(false);
          const files = Array.from(event.dataTransfer.files);
          if (files.length) onFiles(files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            if (files.length) onFiles(files);
            event.target.value = '';
          }}
        />
        <span className="dropzone-icon"><Icon name="upload" size={25} /></span>
        <strong>{dragging ? ui.dropzone.active : ui.dropzone.title}</strong>
        <span>{ui.dropzone.subtitle}</span>
        <span className="dropzone-link">{ui.dropzone.browse}</span>
        <span className="dropzone-hints">
          <span>{ui.dropzone.paste}</span>
          <span id="dropzone-privacy">{ui.dropzone.maxSize.replace('{mb}', String(maxFileMB))}</span>
        </span>
      </div>
      {error && (
        <p className="form-error" role="alert">{error}</p>
      )}
    </div>
  );
}
