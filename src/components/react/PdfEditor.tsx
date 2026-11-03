import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { Locale } from '../../config';
import { bounds, buildEditedPdf, drawAnnots, type Annot, type PageSlot, type TextBox } from '../../engines/pdf-edit';

type Tool = 'select' | 'text' | 'edit' | 'image' | 'highlight' | 'whiteout' | 'redact' | 'draw';

const T = {
  en: {
    drop: 'Drop a PDF here or choose a file',
    choose: 'Choose PDF',
    tools: { select: 'Select', text: 'Add text', edit: 'Edit text', image: 'Add image', highlight: 'Highlight', whiteout: 'White-out', redact: 'Redact', draw: 'Draw' },
    hints: {
      select: 'Click an item to select it, drag to move. Press Delete to remove it.',
      text: 'Click on the page where the text should go.',
      edit: 'Click a line of existing text to replace it. The original is covered in white.',
      image: 'Choose an image, then click the page to place it.',
      highlight: 'Drag to highlight an area.',
      whiteout: 'Drag to cover an area with white.',
      redact: 'Drag over content to remove it. Pages with redactions are flattened to images so the hidden text cannot be recovered.',
      draw: 'Draw freehand on the page.',
    },
    pageOf: 'Page {n} of {total}',
    delete: 'Delete page',
    restore: 'Restore deleted pages',
    left: 'Move earlier',
    right: 'Move later',
    undo: 'Undo',
    remove: 'Remove item',
    size: 'Size',
    color: 'Color',
    textPlaceholder: 'Type text, press Enter',
    export: 'Download edited PDF',
    exporting: 'Preparing…',
    another: 'Open another PDF',
    loading: 'Loading PDF…',
    noImage: 'Choose an image first.',
    errPdf: 'We could not read this PDF. It may be damaged or password-protected.',
    errExport: 'The PDF could not be saved. Try again.',
    flat: 'Redacted pages are saved as images.',
    chars: 'Some characters are not supported by the built-in font and were replaced with “?”.',
    empty: 'All pages were deleted. Restore at least one page.',
  },
  id: {
    drop: 'Letakkan PDF di sini atau pilih file',
    choose: 'Pilih PDF',
    tools: { select: 'Pilih', text: 'Tambah teks', edit: 'Edit teks', image: 'Tambah gambar', highlight: 'Sorot', whiteout: 'Tutup putih', redact: 'Sensor', draw: 'Gambar' },
    hints: {
      select: 'Klik item untuk memilih, seret untuk memindahkan. Tekan Delete untuk menghapus.',
      text: 'Klik pada halaman di tempat teks akan diletakkan.',
      edit: 'Klik baris teks yang ada untuk menggantinya. Teks asli ditutup putih.',
      image: 'Pilih gambar, lalu klik halaman untuk meletakkannya.',
      highlight: 'Seret untuk menyorot area.',
      whiteout: 'Seret untuk menutup area dengan warna putih.',
      redact: 'Seret di atas konten untuk menghapusnya. Halaman yang disensor diratakan menjadi gambar sehingga teks tersembunyi tidak bisa dipulihkan.',
      draw: 'Gambar bebas di halaman.',
    },
    pageOf: 'Halaman {n} dari {total}',
    delete: 'Hapus halaman',
    restore: 'Pulihkan halaman terhapus',
    left: 'Geser lebih awal',
    right: 'Geser lebih akhir',
    undo: 'Urungkan',
    remove: 'Hapus item',
    size: 'Ukuran',
    color: 'Warna',
    textPlaceholder: 'Ketik teks, tekan Enter',
    export: 'Unduh PDF hasil edit',
    exporting: 'Menyiapkan…',
    another: 'Buka PDF lain',
    loading: 'Memuat PDF…',
    noImage: 'Pilih gambar terlebih dahulu.',
    errPdf: 'PDF ini tidak bisa dibaca. Mungkin rusak atau dilindungi kata sandi.',
    errExport: 'PDF tidak bisa disimpan. Coba lagi.',
    flat: 'Halaman yang disensor disimpan sebagai gambar.',
    chars: 'Beberapa karakter tidak didukung font bawaan dan diganti dengan “?”.',
    empty: 'Semua halaman terhapus. Pulihkan minimal satu halaman.',
  },
} as const;

type PdfDoc = Awaited<ReturnType<typeof import('pdfjs-dist').getDocument>['promise']>;
type PageInfo = { width: number; height: number; texts: TextBox[] };
type Editing = { x: number; y: number; value: string; orig?: TextBox } | null;

let counter = 0;
const uid = () => `a${(counter += 1)}`;

function moveAnnot(a: Annot, dx: number, dy: number): Annot {
  if (a.type === 'ink') return { ...a, points: a.points.map(([x, y]) => [x + dx, y + dy] as [number, number]) };
  return { ...a, x: a.x + dx, y: a.y + dy } as Annot;
}

export default function PdfEditor({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [file, setFile] = useState<File | null>(null);
  const [doc, setDoc] = useState<PdfDoc | null>(null);
  const [pages, setPages] = useState<PageSlot[]>([]);
  const [deleted, setDeleted] = useState<PageSlot[]>([]);
  const [infos, setInfos] = useState<Record<number, PageInfo>>({});
  const [current, setCurrent] = useState(0);
  const [annots, setAnnots] = useState<Record<string, Annot[]>>({});
  const [history, setHistory] = useState<Record<string, Annot[]>[]>([]);
  const [tool, setTool] = useState<Tool>('select');
  const [color, setColor] = useState('#d92d20');
  const [size, setSize] = useState(16);
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<Editing>(null);
  const [imageFile, setImageFile] = useState<{ bitmap: ImageBitmap; bytes: Uint8Array; kind: 'png' | 'jpg' } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [thumbs, setThumbs] = useState<Record<number, string>>({});
  const [tick, setTick] = useState(0);

  const pageCanvas = useRef<HTMLCanvasElement>(null);
  const overlay = useRef<HTMLCanvasElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const drag = useRef<{ mode: 'rect' | 'ink' | 'move'; start: { x: number; y: number }; id?: string; before?: Record<string, Annot[]> } | null>(null);
  const draft = useRef<Annot | null>(null);
  const [displayWidth, setDisplayWidth] = useState(720);

  const slot = pages[current];
  const info = slot ? infos[slot.src] : undefined;
  const pageAnnots = slot ? annots[slot.key] ?? [] : [];
  const scale = info ? displayWidth / info.width : 1;

  const commit = useCallback((next: Record<string, Annot[]>) => {
    setHistory((h) => [...h.slice(-30), annots]);
    setAnnots(next);
  }, [annots]);

  const loadFile = useCallback(async (f: File) => {
    setError(null);
    setNotice(null);
    setLoading(true);
    try {
      const pdfjs = (await import('pdfjs-dist/legacy/build/pdf.mjs')) as typeof import('pdfjs-dist');
      const workerUrl = await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url');
      pdfjs.GlobalWorkerOptions.workerSrc = workerUrl.default;
      const data = new Uint8Array(await f.arrayBuffer());
      const pdf = await pdfjs.getDocument({ data: data.slice() }).promise;
      const nextInfos: Record<number, PageInfo> = {};
      const nextThumbs: Record<number, string> = {};
      for (let i = 0; i < pdf.numPages; i += 1) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1 });
        const content = await page.getTextContent();
        const texts: TextBox[] = [];
        for (const item of content.items) {
          if (!('str' in item) || !item.str.trim()) continue;
          const m = pdfjs.Util.transform(viewport.transform, item.transform) as number[];
          const h = Math.hypot(m[2], m[3]) || item.height;
          texts.push({ str: item.str, x: m[4], y: m[5] - h * 0.85, w: item.width, h: h * 1.05, size: h });
        }
        nextInfos[i] = { width: viewport.width, height: viewport.height, texts };
        const thumbScale = 110 / viewport.width;
        const canvas = document.createElement('canvas');
        const tv = page.getViewport({ scale: thumbScale });
        canvas.width = Math.ceil(tv.width);
        canvas.height = Math.ceil(tv.height);
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvas, viewport: tv }).promise;
          nextThumbs[i] = canvas.toDataURL('image/jpeg', 0.7);
        }
        page.cleanup();
      }
      setFile(f);
      setDoc(pdf);
      setInfos(nextInfos);
      setThumbs(nextThumbs);
      setPages(Array.from({ length: pdf.numPages }, (_, i) => ({ key: `p${i}`, src: i })));
      setDeleted([]);
      setAnnots({});
      setHistory([]);
      setCurrent(0);
      setSelected(null);
    } catch {
      setError(t.errPdf);
    } finally {
      setLoading(false);
    }
  }, [t]);

  // Render the current page.
  useEffect(() => {
    if (!doc || !slot || !info || !pageCanvas.current) return;
    let cancelled = false;
    let task: { cancel: () => void; promise: Promise<unknown> } | null = null;
    (async () => {
      const page = await doc.getPage(slot.src + 1);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const viewport = page.getViewport({ scale: scale * dpr });
      const canvas = pageCanvas.current;
      if (!canvas || cancelled) return;
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${(info.height * displayWidth) / info.width}px`;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      task = page.render({ canvas, viewport });
      try {
        await task.promise;
      } catch {
        return;
      }
      if (!cancelled) setTick((n) => n + 1);
    })();
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, slot?.src, slot?.key, info, scale, displayWidth]);

  // Fit page width to the container.
  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const apply = () => setDisplayWidth(Math.max(280, Math.min(860, Math.floor(el.clientWidth - 2))));
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, [doc]);

  // Draw annotations on the overlay.
  const redraw = useCallback(() => {
    const canvas = overlay.current;
    const base = pageCanvas.current;
    if (!canvas || !base || !info) return;
    const dpr = base.width / displayWidth;
    canvas.width = base.width;
    canvas.height = base.height;
    canvas.style.width = base.style.width;
    canvas.style.height = base.style.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const list = draft.current ? [...pageAnnots, draft.current] : pageAnnots;
    drawAnnots(ctx, list, scale * dpr, selected);
    if (tool === 'edit') {
      ctx.save();
      ctx.strokeStyle = 'rgba(12,122,98,0.55)';
      ctx.lineWidth = 1;
      for (const box of info.texts) {
        ctx.strokeRect(box.x * scale * dpr, box.y * scale * dpr, box.w * scale * dpr, box.h * scale * dpr);
      }
      ctx.restore();
    }
  }, [pageAnnots, scale, selected, tool, info, displayWidth]);

  useEffect(() => {
    redraw();
  }, [redraw, tick]);

  const point = (event: ReactPointerEvent) => {
    const rect = overlay.current!.getBoundingClientRect();
    return { x: (event.clientX - rect.left) / scale, y: (event.clientY - rect.top) / scale };
  };

  const setList = (key: string, list: Annot[]) => commit({ ...annots, [key]: list });

  const onDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!slot || !info || editing) return;
    const p = point(event);
    const ctx = overlay.current!.getContext('2d')!;
    if (tool === 'select') {
      const hit = [...pageAnnots].reverse().find((a) => {
        const b = bounds(a, ctx);
        return p.x >= b.x - 3 && p.x <= b.x + b.w + 3 && p.y >= b.y - 3 && p.y <= b.y + b.h + 3;
      });
      setSelected(hit?.id ?? null);
      if (hit) {
        drag.current = { mode: 'move', start: p, id: hit.id, before: annots };
        overlay.current!.setPointerCapture(event.pointerId);
      }
      return;
    }
    if (tool === 'text') {
      setEditing({ x: p.x, y: p.y, value: '' });
      return;
    }
    if (tool === 'edit') {
      const box = info.texts.find((b) => p.x >= b.x && p.x <= b.x + b.w && p.y >= b.y && p.y <= b.y + b.h);
      if (box) setEditing({ x: box.x, y: box.y, value: box.str, orig: box });
      return;
    }
    if (tool === 'image') {
      if (!imageFile) {
        setNotice(t.noImage);
        return;
      }
      const w = Math.min(info.width * 0.3, imageFile.bitmap.width);
      const h = (w * imageFile.bitmap.height) / imageFile.bitmap.width;
      const a: Annot = { id: uid(), type: 'image', x: p.x, y: p.y, w, h, bitmap: imageFile.bitmap, bytes: imageFile.bytes, kind: imageFile.kind };
      setList(slot.key, [...pageAnnots, a]);
      setSelected(a.id);
      setTool('select');
      return;
    }
    if (tool === 'draw') {
      draft.current = { id: uid(), type: 'ink', points: [[p.x, p.y]], color, width: Math.max(1, size / 6) };
      drag.current = { mode: 'ink', start: p };
    } else {
      const mode = tool === 'highlight' ? 'highlight' : tool === 'redact' ? 'redact' : 'whiteout';
      draft.current = { id: uid(), type: 'rect', x: p.x, y: p.y, w: 0, h: 0, mode };
      drag.current = { mode: 'rect', start: p };
    }
    overlay.current!.setPointerCapture(event.pointerId);
  };

  const onMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const d = drag.current;
    if (!d || !slot) return;
    const p = point(event);
    if (d.mode === 'rect' && draft.current?.type === 'rect') {
      draft.current = { ...draft.current, x: Math.min(d.start.x, p.x), y: Math.min(d.start.y, p.y), w: Math.abs(p.x - d.start.x), h: Math.abs(p.y - d.start.y) };
    } else if (d.mode === 'ink' && draft.current?.type === 'ink') {
      draft.current = { ...draft.current, points: [...draft.current.points, [p.x, p.y]] };
    } else if (d.mode === 'move' && d.id) {
      const dx = p.x - d.start.x;
      const dy = p.y - d.start.y;
      d.start = p;
      setAnnots((all) => ({ ...all, [slot.key]: (all[slot.key] ?? []).map((a) => (a.id === d.id ? moveAnnot(a, dx, dy) : a)) }));
      return;
    }
    redraw();
  };

  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d || !slot) return;
    if (d.mode === 'move') {
      if (d.before) setHistory((h) => [...h.slice(-30), d.before!]);
      return;
    }
    const a = draft.current;
    draft.current = null;
    if (!a) return;
    if (a.type === 'rect' && (a.w < 3 || a.h < 3)) return redraw();
    setList(slot.key, [...pageAnnots, a]);
  };

  const submitText = () => {
    if (!editing || !slot) return;
    const value = editing.value;
    if (editing.orig) {
      const orig = editing.orig;
      if (value !== orig.str) {
        const a: Annot = { id: uid(), type: 'edit', x: orig.x, y: orig.y, w: Math.max(orig.w, value.length * orig.size * 0.5), h: orig.h, size: orig.size, text: value, color: '#000000' };
        setList(slot.key, [...pageAnnots, a]);
      }
    } else if (value.trim()) {
      const a: Annot = { id: uid(), type: 'text', x: editing.x, y: editing.y, size, color, text: value };
      setList(slot.key, [...pageAnnots, a]);
      setSelected(a.id);
    }
    setEditing(null);
  };

  const removeSelected = useCallback(() => {
    if (!selected || !slot) return;
    commit({ ...annots, [slot.key]: (annots[slot.key] ?? []).filter((a) => a.id !== selected) });
    setSelected(null);
  }, [selected, slot, annots, commit]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (event.key === 'Delete' || event.key === 'Backspace') removeSelected();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [removeSelected]);

  const undo = () => {
    setHistory((h) => {
      const prev = h[h.length - 1];
      if (prev) setAnnots(prev);
      return h.slice(0, -1);
    });
    setSelected(null);
  };

  const pickImage = async (f: File | undefined) => {
    if (!f) return;
    try {
      const bitmap = await createImageBitmap(f);
      const kind = f.type === 'image/png' ? 'png' : 'jpg';
      let bytes: Uint8Array;
      if (f.type === 'image/png' || f.type === 'image/jpeg') {
        bytes = new Uint8Array(await f.arrayBuffer());
      } else {
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        canvas.getContext('2d')!.drawImage(bitmap, 0, 0);
        const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject()), 'image/png'));
        bytes = new Uint8Array(await blob.arrayBuffer());
        setImageFile({ bitmap, bytes, kind: 'png' });
        setTool('image');
        return;
      }
      setImageFile({ bitmap, bytes, kind });
      setTool('image');
      setNotice(null);
    } catch {
      setNotice(t.noImage);
    }
  };

  const movePage = (dir: -1 | 1) => {
    const to = current + dir;
    if (to < 0 || to >= pages.length) return;
    const next = [...pages];
    [next[current], next[to]] = [next[to], next[current]];
    setPages(next);
    setCurrent(to);
  };

  const deletePage = () => {
    if (!slot) return;
    setDeleted((d) => [...d, slot]);
    const next = pages.filter((_, i) => i !== current);
    setPages(next);
    setCurrent(Math.max(0, Math.min(current, next.length - 1)));
    setSelected(null);
  };

  const restore = () => {
    setPages((p) => [...p, ...deleted].sort((a, b) => a.src - b.src || 0));
    setDeleted([]);
  };

  const exportPdf = async () => {
    if (!file || !doc) return;
    if (!pages.length) {
      setError(t.empty);
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const { blob, flattened, replaced } = await buildEditedPdf(file, doc, pages, annots, infos);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace(/\.pdf$/i, '')}-edited.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 2000);
      const messages = [];
      if (flattened) messages.push(t.flat);
      if (replaced) messages.push(t.chars);
      if (messages.length) setNotice(messages.join(' '));
    } catch {
      setError(t.errExport);
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setFile(null);
    setDoc(null);
    setPages([]);
    setAnnots({});
    setHistory([]);
    setEditing(null);
    setError(null);
    setNotice(null);
  };

  const editorStyle = useMemo(() => {
    if (!editing || !info) return {};
    return { left: editing.x * scale, top: editing.y * scale, fontSize: Math.max(12, (editing.orig?.size ?? size) * scale), minWidth: 160 } as const;
  }, [editing, info, scale, size]);

  if (!doc) {
    return (
      <section className="pdfed-drop" aria-label={t.choose}>
        <div
          className="pdfed-dropzone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files[0];
            if (f) void loadFile(f);
          }}
        >
          <p>{loading ? t.loading : t.drop}</p>
          <label className="button">
            {t.choose}
            <input type="file" accept="application/pdf,.pdf" hidden onChange={(e) => e.target.files?.[0] && void loadFile(e.target.files[0])} />
          </label>
          {error && <p className="pdfed-error" role="alert">{error}</p>}
        </div>
      </section>
    );
  }

  const toolList: Tool[] = ['select', 'text', 'edit', 'image', 'highlight', 'whiteout', 'redact', 'draw'];

  return (
    <section className="pdfed" aria-label="PDF editor">
      <div className="pdfed-toolbar" role="toolbar">
        {toolList.map((id) => (
          <button
            key={id}
            type="button"
            className={`button ${tool === id ? '' : 'secondary'}`}
            aria-pressed={tool === id}
            onClick={() => {
              setEditing(null);
              if (id === 'image') {
                document.getElementById('pdfed-image')?.click();
                return;
              }
              setTool(id);
            }}
          >
            {t.tools[id]}
          </button>
        ))}
        <input id="pdfed-image" type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={(e) => { void pickImage(e.target.files?.[0]); e.target.value = ''; }} />
        <label className="pdfed-field">
          {t.color}
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label className="pdfed-field">
          {t.size}
          <input type="range" min={8} max={72} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </label>
        <button type="button" className="button secondary" onClick={undo} disabled={!history.length}>{t.undo}</button>
        <button type="button" className="button secondary" onClick={removeSelected} disabled={!selected}>{t.remove}</button>
      </div>
      <p className="pdfed-hint">{t.hints[tool]}</p>

      <div className="pdfed-body">
        <ol className="pdfed-thumbs">
          {pages.map((p, i) => (
            <li key={p.key}>
              <button type="button" className={i === current ? 'active' : ''} onClick={() => { setCurrent(i); setSelected(null); setEditing(null); }} aria-label={t.pageOf.replace('{n}', String(i + 1)).replace('{total}', String(pages.length))}>
                {thumbs[p.src] && <img src={thumbs[p.src]} alt="" />}
                <span>{i + 1}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="pdfed-stage" ref={holder}>
          <div className="pdfed-pagebar">
            <span>{t.pageOf.replace('{n}', String(current + 1)).replace('{total}', String(pages.length))}</span>
            <button type="button" className="button secondary" onClick={() => movePage(-1)} disabled={current === 0}>{t.left}</button>
            <button type="button" className="button secondary" onClick={() => movePage(1)} disabled={current >= pages.length - 1}>{t.right}</button>
            <button type="button" className="button secondary" onClick={deletePage}>{t.delete}</button>
            {deleted.length > 0 && <button type="button" className="button secondary" onClick={restore}>{t.restore} ({deleted.length})</button>}
          </div>
          <div className="pdfed-canvaswrap" style={{ width: displayWidth }}>
            <canvas ref={pageCanvas} />
            <canvas
              ref={overlay}
              className={`pdfed-overlay tool-${tool}`}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            />
            {editing && (
              <input
                autoFocus
                className="pdfed-input"
                style={editorStyle}
                value={editing.value}
                placeholder={t.textPlaceholder}
                onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitText();
                  if (e.key === 'Escape') setEditing(null);
                }}
                onBlur={submitText}
              />
            )}
          </div>
        </div>
      </div>

      {error && <p className="pdfed-error" role="alert">{error}</p>}
      {notice && <p className="pdfed-notice" role="status">{notice}</p>}

      <div className="pdfed-actions">
        <button type="button" className="button" onClick={() => void exportPdf()} disabled={busy || !pages.length}>
          {busy ? t.exporting : t.export}
        </button>
        <button type="button" className="button secondary" onClick={reset}>{t.another}</button>
      </div>
    </section>
  );
}
