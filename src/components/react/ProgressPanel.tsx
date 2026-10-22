import type { Locale } from '../../config';
import { getUi } from '../../i18n/ui';
import type { SelectedFile } from './types';

type Props = {
  files: SelectedFile[];
  progress: Record<string, number>;
  locale: Locale;
};

export default function ProgressPanel({ files, progress, locale }: Props) {
  const ui = getUi(locale);
  const values = files.map((item) => Math.round((progress[item.id] ?? 0) * 100));
  const overall = values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;

  return (
    <div className="progress-panel" role="status" aria-live="polite">
      <div className="progress-row">
        <strong>{ui.progress.title}</strong>
        <small>{overall}%</small>
        <div className="progress-track" role="progressbar" aria-label={ui.progress.overall} aria-valuemin={0} aria-valuemax={100} aria-valuenow={overall}>
          <span style={{ width: `${overall}%` }} />
        </div>
      </div>
      {files.map((item, index) => {
        const value = progress[item.id] ?? 0;
        const percent = Math.round(value * 100);
        return (
          <div className="progress-row" key={item.id}>
            <strong title={item.file.name}>{item.file.name}</strong>
            <small>{value >= 1 ? ui.progress.done : `${ui.progress.working} ${percent}%`}</small>
            <div className="progress-track" role="progressbar" aria-label={`${ui.progress.fileOf.replace('{current}', String(index + 1)).replace('{total}', String(files.length))} — ${item.file.name}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
              <span style={{ width: `${percent}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
