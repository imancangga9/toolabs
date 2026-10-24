import QRCode from 'qrcode';
import type { OutputResult, QrEcc, QrOptions, WarningCode } from './types';

const MIN_SIZE = 256;
const MAX_SIZE = 2048;
const MAX_LOGO_SIZE = 5 * 1024 * 1024;
const DEFAULT_FG = '#000000';
const DEFAULT_BG = '#ffffff';

const LOGO_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];

class QrGenerationError extends Error {
  code: string;

  constructor(code: string, message?: string) {
    super(message ?? code);
    this.code = code;
  }
}

function checkAbort(signal?: AbortSignal): void {
  if (signal?.aborted) throw new QrGenerationError('canceled');
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeColor(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`.toLowerCase();
  }
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) return trimmed.toLowerCase();
  return fallback;
}

function relativeLuminance(hex: string): number {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map((offset) => {
    const channel = parseInt(value.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(a: string, b: string): number {
  const lumA = relativeLuminance(a);
  const lumB = relativeLuminance(b);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new QrGenerationError('qr-logo'));
    };
    reader.onerror = () => reject(new QrGenerationError('qr-logo'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new QrGenerationError('qr-logo'));
    image.src = src;
  });
}

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  if (radius <= 0) {
    context.beginPath();
    context.rect(x, y, width, height);
    return;
  }
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
}

function canvasToPng(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((result) => {
        if (result) resolve(result);
        else reject(new QrGenerationError('qr-generate'));
      }, 'image/png');
    } catch {
      reject(new QrGenerationError('qr-generate'));
    }
  });
}

function logoTooLong(error: unknown): boolean {
  const message = error instanceof Error ? error.message : '';
  return /too (big|long)|too much data|code length overflow/i.test(message);
}

function injectLogo(
  svg: string,
  dataUrl: string,
  image: HTMLImageElement,
  options: QrOptions,
  background: string,
): string {
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1]?.trim().split(/\s+/).map(Number);
  if (!viewBox || viewBox.length < 4 || viewBox.some((value) => !Number.isFinite(value))) return svg;

  const [vx, vy, vwidth, vheight] = viewBox;
  const maxSide = Math.min(vwidth, vheight) * (clamp(options.logoPercent, 5, 20) / 100);
  const naturalWidth = image.naturalWidth || image.width || 1;
  const naturalHeight = image.naturalHeight || image.height || 1;
  const scale = Math.min(maxSide / naturalWidth, maxSide / naturalHeight);
  const width = naturalWidth * scale;
  const height = naturalHeight * scale;
  const x = vx + (vwidth - width) / 2;
  const y = vy + (vheight - height) / 2;
  const padding = options.logoBackground ? Math.min(vwidth, vheight) * 0.015 : 0;
  const radius = options.logoRounded ? Math.min(width, height) * 0.18 : 0;

  const parts: string[] = [];
  if (options.logoRounded) {
    parts.push(
      `<clipPath id="toolabs-qr-logo"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" ry="${radius}"/></clipPath>`,
    );
  }
  if (options.logoBackground) {
    const backdropRadius = options.logoRounded ? radius + padding * 0.6 : 0;
    parts.push(
      `<rect x="${x - padding}" y="${y - padding}" width="${width + padding * 2}" height="${height + padding * 2}" rx="${backdropRadius}" ry="${backdropRadius}" fill="${background}"/>`,
    );
  }
  parts.push(
    `<image href="${dataUrl}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="none"${options.logoRounded ? ' clip-path="url(#toolabs-qr-logo)"' : ''}/>`,
  );

  return svg.replace('</svg>', `${parts.join('')}</svg>`);
}

export async function generateQrCode(
  options: QrOptions,
  logo?: File | null,
  signal?: AbortSignal,
  onProgress?: (progress: number) => void,
  formats: 'all' | 'png' = 'all',
): Promise<OutputResult[]> {
  const text = options.text.trim();
  if (!text) throw new QrGenerationError('qr-required');

  if (logo) {
    const isSvg = logo.type === 'image/svg+xml' || /\.svg$/i.test(logo.name);
    if (!isSvg && !LOGO_TYPES.includes(logo.type)) {
      throw new QrGenerationError('qr-logo');
    }
    if (logo.size > MAX_LOGO_SIZE) throw new QrGenerationError('qr-logo-size');
  }

  const warnings: WarningCode[] = [];
  let ecc: QrEcc = options.ecc ?? 'H';
  if (logo && ecc !== 'H') {
    ecc = 'H';
    warnings.push('qr-ecc-raised');
  }

  const size = clamp(Math.round(options.size || 1024), MIN_SIZE, MAX_SIZE);
  const margin = clamp(Math.round(options.margin ?? 4), 0, 16);
  const requestedLogoPercent = clamp(options.logoPercent || 16, 5, 20);
  if (requestedLogoPercent > 18) warnings.push('qr-logo-large');

  const colorDark = normalizeColor(options.colorDark, DEFAULT_FG);
  const colorLight = normalizeColor(options.colorLight, DEFAULT_BG);
  if (contrastRatio(colorDark, colorLight) < 3) warnings.push('qr-contrast');

  checkAbort(signal);
  onProgress?.(0.08);

  let logoDataUrl: string | null = null;
  let logoImage: HTMLImageElement | null = null;
  if (logo) {
    try {
      logoDataUrl = await fileToDataUrl(logo);
      logoImage = await loadImage(logoDataUrl);
    } catch (error) {
      if (error instanceof QrGenerationError) throw error;
      throw new QrGenerationError('qr-logo');
    }
  }

  checkAbort(signal);
  onProgress?.(0.22);

  const canvas = document.createElement('canvas');
  try {
    await QRCode.toCanvas(canvas, text, {
      width: size,
      margin,
      errorCorrectionLevel: ecc,
      color: { dark: colorDark, light: colorLight },
    });
  } catch (error) {
    throw new QrGenerationError(
      logoTooLong(error) ? 'qr-too-long' : 'qr-generate',
      error instanceof Error ? error.message : undefined,
    );
  }

  checkAbort(signal);
  onProgress?.(0.55);

  if (logoImage) {
    const context = canvas.getContext('2d');
    if (!context) throw new QrGenerationError('qr-generate');

    const maxSide = canvas.width * (requestedLogoPercent / 100);
    const naturalWidth = logoImage.naturalWidth || logoImage.width || 1;
    const naturalHeight = logoImage.naturalHeight || logoImage.height || 1;
    const scale = Math.min(maxSide / naturalWidth, maxSide / naturalHeight);
    const width = Math.max(1, Math.round(naturalWidth * scale));
    const height = Math.max(1, Math.round(naturalHeight * scale));
    const x = Math.round((canvas.width - width) / 2);
    const y = Math.round((canvas.height - height) / 2);
    const padding = options.logoBackground ? Math.round(canvas.width * 0.015) : 0;
    const radius = options.logoRounded ? Math.round(Math.min(width, height) * 0.18) : 0;

    if (options.logoBackground) {
      context.fillStyle = colorLight;
      const backdropRadius = options.logoRounded ? radius + Math.round(padding * 0.6) : 0;
      drawRoundedRect(
        context,
        x - padding,
        y - padding,
        width + padding * 2,
        height + padding * 2,
        backdropRadius,
      );
      context.fill();
    }

    if (options.logoRounded) {
      context.save();
      drawRoundedRect(context, x, y, width, height, radius);
      context.clip();
      context.drawImage(logoImage, x, y, width, height);
      context.restore();
    } else {
      context.drawImage(logoImage, x, y, width, height);
    }
  }

  checkAbort(signal);
  onProgress?.(0.78);

  const pngBlob = await canvasToPng(canvas);
  checkAbort(signal);

  const outputs: OutputResult[] = [
    {
      id: 'qr-code-png',
      name: 'qr-code.png',
      blob: pngBlob,
      sourceIndex: 0,
      meta: {
        originalBytes: 0,
        bytes: pngBlob.size,
        mime: 'image/png',
        width: canvas.width,
        height: canvas.height,
        warnings,
      },
    },
  ];

  if (formats === 'all') {
    onProgress?.(0.9);
    let svg: string;
    try {
      svg = await QRCode.toString(text, {
        type: 'svg',
        width: size,
        margin,
        errorCorrectionLevel: ecc,
        color: { dark: colorDark, light: colorLight },
      });
    } catch (error) {
      throw new QrGenerationError(
        logoTooLong(error) ? 'qr-too-long' : 'qr-generate',
        error instanceof Error ? error.message : undefined,
      );
    }

    if (logoDataUrl && logoImage) {
      svg = injectLogo(svg, logoDataUrl, logoImage, { ...options, logoPercent: requestedLogoPercent }, colorLight);
    }

    checkAbort(signal);

    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    outputs.push({
      id: 'qr-code-svg',
      name: 'qr-code.svg',
      blob: svgBlob,
      sourceIndex: 0,
      meta: {
        originalBytes: 0,
        bytes: svgBlob.size,
        mime: 'image/svg+xml',
        width: size,
        height: size,
        warnings: [],
      },
    });
  }

  onProgress?.(1);
  return outputs;
}
