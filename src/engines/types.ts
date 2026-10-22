import type { EngineId, ToolOptions } from '../tools.config';

export type WarningCode =
  | 'low-quality'
  | 'dimensions-reduced'
  | 'target-unreachable'
  | 'png-lossless'
  | 'output-larger'
  | 'heic-first-frame'
  | 'pages-clamped';

export type OutputMeta = {
  originalBytes: number;
  bytes: number;
  mime: string;
  width?: number;
  height?: number;
  pages?: number;
  pageNumber?: number;
  quality?: number;
  targetBytes?: number;
  targetReached?: boolean;
  warnings: WarningCode[];
};

export type OutputResult = {
  id: string;
  name: string;
  blob: Blob;
  meta: OutputMeta;
  sourceIndex: number;
};

export type RunToolOptions = {
  engine: EngineId;
  files: File[];
  options: ToolOptions;
  onProgress?: (sourceIndex: number, progress: number) => void;
  signal?: AbortSignal;
};

export type ImageWorkerRequest = {
  id: string;
  engine: 'image-compress' | 'image-convert' | 'image-resize';
  file: File;
  options: ToolOptions;
};

export type ImageWorkerResponse =
  | { id: string; type: 'progress'; progress: number }
  | { id: string; type: 'done'; blob: Blob; meta: OutputMeta }
  | { id: string; type: 'error'; code: string; message?: string };

export type PdfWorkerRequest = {
  id: string;
  engine: 'pdf-merge' | 'image-to-pdf' | 'pdf-split' | 'pdf-rotate';
  files: File[];
  options: ToolOptions;
};

export type PdfWorkerOutput = {
  name: string;
  blob: Blob;
  meta: OutputMeta;
  sourceIndex: number;
};

export type PdfWorkerResponse =
  | { id: string; type: 'progress'; progress: number; fileIndex: number }
  | { id: string; type: 'done'; outputs: PdfWorkerOutput[] }
  | { id: string; type: 'error'; code: string; message?: string };
