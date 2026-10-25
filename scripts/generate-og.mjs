import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const out = fileURLToPath(new URL('../public/', import.meta.url));
const og = fileURLToPath(new URL('../public/og/', import.meta.url));

const entries = [
  { file: 'default', kicker: 'Toolabs', title: 'File tools that never upload your files', note: 'Compress images, merge PDFs, convert formats — locally.' },
  { file: 'home', kicker: 'Free · Private · Browser-based', title: 'File tools that never upload your files', note: 'Image compression, PDF utilities, and format conversion.' },
  { file: 'category-compress', kicker: 'Compress tools', title: 'Compress images without changing the format', note: 'JPG, PNG, WebP, HEIC, and GIF — processed on your device.' },
  { file: 'category-pdf', kicker: 'PDF tools', title: 'Merge, split, rotate, and convert PDFs', note: 'Documents stay in your browser from start to finish.' },
  { file: 'category-convert', kicker: 'Convert tools', title: 'Convert image formats without uploading', note: 'HEIC to JPG, PNG to WebP, WebP to JPG, JPG to PNG.' },
  { file: 'category-edit', kicker: 'Edit tools', title: 'Resize, crop, and rotate images', note: 'Photo presets and precise image adjustments in your browser.' },
  { file: 'guides', kicker: 'Guides', title: 'Understand file size, quality, and privacy', note: 'Practical explanations for real file limits.' },
  { file: 'about', kicker: 'About Toolabs', title: 'File tools should not require blind trust', note: 'Why the tools run locally and what we do not do.' },
  { file: 'privacy', kicker: 'Privacy policy', title: 'Your files stay on your device', note: 'How Toolabs handles files, analytics, and local storage.' },
  { file: 'terms', kicker: 'Terms of use', title: 'Clear terms for a free utility', note: 'What you can expect when using Toolabs.' },
  { file: 'contact', kicker: 'Contact', title: 'Talk to the Toolabs team', note: 'Bug reports, corrections, and privacy questions.' },
  { file: 'glossary', kicker: 'Glossary', title: 'File formats without the jargon', note: 'JPG, PNG, WebP, HEIC, PDF, EXIF, DPI, and more.' },
  { file: 'guide-compress-image-100kb', kicker: 'Guide · Image compression', title: 'How to compress an image to 100 KB', note: 'Without turning faces or text into mush.' },
  { file: 'guide-merge-pdf-no-upload', kicker: 'Guide · PDF privacy', title: 'How to merge PDFs without uploading them', note: 'Page order, encryption, size, and local processing.' },
  { file: 'compress-image', kicker: 'Compress tool', title: 'Compress images to an exact target size', note: 'Quality first, then dimensions. Honest results.' },
  { file: 'compress-jpg', kicker: 'Compress tool', title: 'Compress JPG to a target size', note: 'The output stays a JPG — same extension, smaller file.' },
  { file: 'compress-webp', kicker: 'Compress tool', title: 'Compress WebP to a target size', note: 'Transparency and the .webp extension preserved.' },
  { file: 'compress-heic', kicker: 'Compress tool', title: 'Compress HEIC photos to JPG', note: 'Decoded locally, then compressed to your target.' },
  { file: 'compress-gif', kicker: 'Compress tool', title: 'Compress a GIF to a smaller JPG', note: 'First frame only, because browsers cannot write GIF.' },
  { file: 'compress-jpeg', kicker: 'Compress tool', title: 'Compress any image to JPEG', note: 'A fixed JPEG output, processed locally.' },
  { file: 'compress-jpg-to-100kb', kicker: 'Compress tool', title: 'Compress JPG to 100 KB', note: 'For portals, forms, and email limits.' },
  { file: 'compress-jpg-to-200kb', kicker: 'Compress tool', title: 'Compress JPG to 200 KB', note: 'A practical limit for ID photos and applications.' },
  { file: 'compress-png', kicker: 'Compress tool', title: 'Reduce PNG file size', note: 'Lossless dimensions and the .png extension kept.' },
  { file: 'resize-image', kicker: 'Compress tool', title: 'Resize images to exact dimensions', note: 'Contain, cover, or stretch — with no upload.' },
  { file: 'photo-3x4', kicker: 'Compress tool', title: 'Create a 3×4 cm ID photo', note: '354 × 472 pixels at 300 DPI.' },
  { file: 'image-to-jpg', kicker: 'Convert tool', title: 'Convert any image to JPG', note: 'A compatible JPG output, made in your browser.' },
  { file: 'image-to-jpeg', kicker: 'Convert tool', title: 'Convert any image to JPEG', note: 'Choose the .jpeg extension for your output.' },
  { file: 'image-to-png', kicker: 'Convert tool', title: 'Convert any image to PNG', note: 'Lossless PNG output, processed locally.' },
  { file: 'image-to-webp', kicker: 'Convert tool', title: 'Convert any image to WebP', note: 'Create modern WebP images in your browser.' },
  { file: 'image-to-heic', kicker: 'Coming soon', title: 'Convert images to HEIC', note: 'Browser-side HEIC encoding is being prepared.' },
  { file: 'gif-to-jpg', kicker: 'Convert tool', title: 'Convert GIF to JPG', note: 'Export the first frame as a JPG image.' },
  { file: 'resize-photo', kicker: 'Edit tool', title: 'Resize photos to 2×3, 3×4, or 4×6', note: 'Crop to print-ready photo proportions.' },
  { file: 'resize-photo-r', kicker: 'Edit tool', title: 'Resize photos to popular R sizes', note: '2R through 12R print presets.' },
  { file: 'image-crop', kicker: 'Edit tool', title: 'Crop images to an exact frame', note: 'Choose width and height, then crop to fit.' },
  { file: 'image-crop-circle', kicker: 'Edit tool', title: 'Crop images into a circle', note: 'Transparent PNG output.' },
  { file: 'image-rotate', kicker: 'Edit tool', title: 'Rotate images by 90 degrees', note: 'Choose 90°, 180°, or 270°.' },
  { file: 'image-merge', kicker: 'Coming soon', title: 'Merge images', note: 'This image editing tool is being prepared.' },
  { file: 'merge-pdf', kicker: 'PDF tool', title: 'Merge PDF files privately', note: 'Reorder documents and download one clean PDF.' },
  { file: 'jpg-to-pdf', kicker: 'PDF tool', title: 'Turn JPG images into a PDF', note: 'Page size, margins, and orientation under your control.' },
  { file: 'split-pdf', kicker: 'PDF tool', title: 'Split PDF pages or ranges', note: 'Extract exactly the pages you need.' },
  { file: 'rotate-pdf', kicker: 'PDF tool', title: 'Rotate PDF pages', note: 'Fix sideways scans in 90° steps.' },
  { file: 'pdf-to-jpg', kicker: 'PDF tool', title: 'Convert PDF pages to JPG', note: 'Render sharp images at up to 3× scale.' },
  { file: 'heic-to-jpg', kicker: 'Convert tool', title: 'Convert HEIC photos to JPG', note: 'iPhone photos that open everywhere.' },
  { file: 'png-to-webp', kicker: 'Convert tool', title: 'Convert PNG to WebP', note: 'Smaller files for the modern web.' },
  { file: 'webp-to-jpg', kicker: 'Convert tool', title: 'Convert WebP to JPG', note: 'A format that older apps accept.' },
  { file: 'jpg-to-png', kicker: 'Convert tool', title: 'Convert JPG to PNG', note: 'Lossless output for images without transparency.' },
];

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function svgFor(entry) {
  const size = entry.title.length > 46 ? 56 : entry.title.length > 34 ? 64 : 72;
  const maxChars = Math.floor(1000 / (size * 0.54));
  const lines = wrap(entry.title, maxChars);
  const lineHeight = size + 10;
  const titleTop = lines.length >= 3 ? 286 : 300;
  const title = lines
    .map(
      (line, index) =>
        `<text x="80" y="${titleTop + index * lineHeight}" font-family="Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="700" fill="#ffffff" letter-spacing="-1.5">${escapeXml(line)}</text>`,
    )
    .join('\n');
  const noteY = titleTop + (lines.length - 1) * lineHeight + 76;
  const kicker = entry.kicker;
  const kickerWidth = Math.max(160, Math.min(340, Math.round(34 + kicker.length * 8.1)));
  const kickerX = 1120 - kickerWidth;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0e211c"/>
      <stop offset="0.6" stop-color="#0c2c24"/>
      <stop offset="1" stop-color="#075b49"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.9" cy="0.1" r="0.8">
      <stop offset="0" stop-color="#3bbd9a" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#3bbd9a" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="80" y="60" width="58" height="58" rx="14" fill="#ffffff"/>
  <path d="M95 75h28v6.5h-10.5v23h-7v-23H95z" fill="#0e211c"/>
  <circle cx="123" cy="101" r="6" fill="#3bbd9a"/>
  <text x="154" y="101" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="700" fill="#ffffff" letter-spacing="-1">Toolabs</text>
  <rect x="${kickerX}" y="64" width="${kickerWidth}" height="36" rx="18" fill="#ffffff" fill-opacity="0.1" stroke="#ffffff" stroke-opacity="0.16"/>
  <text x="${1120 - kickerWidth / 2}" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#b7e8d8" letter-spacing="0.6">${escapeXml(kicker)}</text>
  ${title}
  <text x="80" y="${noteY}" font-family="Segoe UI, Arial, sans-serif" font-size="25" fill="#a9c9bd">${escapeXml(entry.note)}</text>
  <line x1="80" y1="520" x2="1120" y2="520" stroke="#ffffff" stroke-opacity="0.14"/>
  <text x="80" y="566" font-family="Segoe UI, Arial, sans-serif" font-size="19" fill="#dcefe8">toolabs.com</text>
  <text x="1120" y="566" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#8fb8aa">Runs in your browser · No uploads · No signup</text>
</svg>`;
}

async function main() {
  await mkdir(og, { recursive: true });

  const iconSvg = await readFile(`${out}favicon.svg`);

  for (const size of [180, 192, 512]) {
    await sharp(iconSvg).resize(size, size).png({ compressionLevel: 9 }).toFile(`${out}icon-${size}.png`);
  }

  for (const entry of entries) {
    const svg = Buffer.from(svgFor(entry));
    await sharp(svg).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(`${og}${entry.file}.png`);
  }

  console.log(`Generated ${entries.length} OG images and 3 icons in public/.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
