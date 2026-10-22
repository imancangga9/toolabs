import type { Locale } from './config';
import { imageTools } from './content/tools/image';
import { pdfTools } from './content/tools/pdf';
import { convertTools } from './content/tools/convert';

export type Category = 'image' | 'pdf' | 'convert';

export type EngineId =
  | 'image-compress'
  | 'image-convert'
  | 'image-resize'
  | 'heic-convert'
  | 'pdf-merge'
  | 'image-to-pdf'
  | 'pdf-split'
  | 'pdf-rotate'
  | 'pdf-to-jpg';

export type OutputFormat = 'auto' | 'image/jpeg' | 'image/png' | 'image/webp';
export type FitMode = 'contain' | 'cover' | 'stretch';
export type PageSize = 'a4' | 'letter' | 'fit';

export type ToolOptions = {
  targetKB?: number;
  outputFormat?: OutputFormat;
  quality?: number;
  maxWidth?: number;
  width?: number;
  height?: number;
  fit?: FitMode;
  pageSize?: PageSize;
  orientation?: 'auto' | 'portrait' | 'landscape';
  margin?: number;
  splitMode?: 'every' | 'ranges';
  ranges?: string;
  angle?: 90 | 180 | 270;
  scale?: number;
};

export type ToolFaq = { q: string; a: string };

export type ComparisonTable = {
  caption: string;
  headers: string[];
  rows: string[][];
  note?: string;
};

export type ToolContent = {
  title: string;
  h1: string;
  metaDescription: string;
  answerQuestion: string;
  shortAnswer: string;
  intro: string;
  steps: string[];
  benefits: string[];
  useCases: string[];
  faq: ToolFaq[];
  comparison?: ComparisonTable;
  tip?: string;
};

export type Tool = {
  id: string;
  slug: Record<Locale, string>;
  category: Category;
  engine: EngineId;
  accept: string[];
  icon: string;
  featured?: number;
  sortable?: boolean;
  options: ToolOptions;
  related: string[];
  updatedAt: string;
  locale: Record<Locale, ToolContent>;
};

export const categories: Record<
  Category,
  {
    slug: Record<Locale, string>;
    name: Record<Locale, string>;
    icon: string;
    hub: Record<
      Locale,
      {
        title: string;
        h1: string;
        metaDescription: string;
        intro: string[];
        faq: ToolFaq[];
      }
    >;
  }
> = {
  image: {
    slug: { en: 'image', id: 'gambar' },
    name: { en: 'Image', id: 'Gambar' },
    icon: 'image',
    hub: {
      en: {
        title: 'Free Image Tools — Compress, Resize & Convert',
        h1: 'Image tools that run in your browser',
        metaDescription:
          'Compress, resize, and convert JPG, PNG, WebP, and HEIC images for free. Files stay on your device and target sizes are visible before download.',
        intro: [
          'Toolabs image tools cover the jobs people do most often: shrinking a photo for a portal, changing its pixel dimensions, or converting it to a format another app accepts. Every tool runs locally with Canvas and Web Workers, so there is no upload step and no waiting queue.',
          'Start with Compress Image if you need a specific target size. For precise pixel dimensions, use Resize Image or the 3×4 cm photo preset. For format changes, choose HEIC to JPG, PNG to WebP, WebP to JPG, or JPG to PNG.',
        ],
        faq: [
          {
            q: 'Are the images uploaded to a server?',
            a: 'No. The image is decoded, resized, and encoded by your own browser. Toolabs never receives the file. Closing the tab removes it from memory.',
          },
          {
            q: 'Which image formats are supported?',
            a: 'JPG/JPEG, PNG, and WebP are supported directly. HEIC files from iPhones are supported by the HEIC to JPG converter, which decodes them locally before download.',
          },
          {
            q: 'How do I reach an exact file size?',
            a: 'Open Compress Image, enter the target in KB, and process. The engine searches for the highest quality under that size, then reduces dimensions only if quality alone is not enough.',
          },
          {
            q: 'Does compression remove EXIF data?',
            a: 'Yes. Re-encoding through Canvas produces a fresh image without EXIF metadata, including GPS coordinates. That is usually desirable for job applications and public uploads.',
          },
        ],
      },
      id: {
        title: 'Tool Gambar Gratis — Kompres, Ubah Ukuran, Konversi',
        h1: 'Tool gambar yang berjalan di browser Anda',
        metaDescription:
          'Kompres, ubah ukuran, dan konversi gambar JPG, PNG, WebP, dan HEIC gratis. File tetap di perangkat dan target ukuran terlihat sebelum unduh.',
        intro: [
          'Tool gambar Toolabs mencakup pekerjaan yang paling sering dibutuhkan: mengecilkan foto untuk portal unggah, mengubah dimensi piksel, atau mengonversi format agar diterima aplikasi lain. Semuanya berjalan lokal dengan Canvas dan Web Worker, tanpa unggah dan tanpa antrean.',
          'Mulai dari Kompres Gambar jika Anda punya target ukuran tertentu. Untuk dimensi piksel yang presisi, gunakan Ubah Ukuran Gambar atau preset foto 3×4. Untuk perubahan format, pilih HEIC ke JPG, PNG ke WebP, WebP ke JPG, atau JPG ke PNG.',
        ],
        faq: [
          {
            q: 'Apakah gambar diunggah ke server?',
            a: 'Tidak. Gambar dibaca, diubah ukurannya, dan dikodekan oleh browser Anda sendiri. Toolabs tidak pernah menerima file. Menutup tab akan menghapusnya dari memori.',
          },
          {
            q: 'Format gambar apa yang didukung?',
            a: 'JPG/JPEG, PNG, dan WebP didukung langsung. File HEIC dari iPhone didukung melalui konverter HEIC ke JPG yang membuka file secara lokal sebelum diunduh.',
          },
          {
            q: 'Bagaimana mencapai ukuran file yang tepat?',
            a: 'Buka Kompres Gambar, masukkan target dalam KB, lalu proses. Mesin mencari kualitas tertinggi di bawah target, kemudian memperkecil dimensi hanya jika kualitas saja tidak cukup.',
          },
          {
            q: 'Apakah kompresi menghapus data EXIF?',
            a: 'Ya. Pengodean ulang melalui Canvas menghasilkan gambar baru tanpa metadata EXIF, termasuk koordinat GPS. Ini biasanya justru diinginkan untuk lamaran kerja dan unggahan publik.',
          },
        ],
      },
    },
  },
  pdf: {
    slug: { en: 'pdf', id: 'pdf' },
    name: { en: 'PDF', id: 'PDF' },
    icon: 'pdf',
    hub: {
      en: {
        title: 'Free PDF Tools — Merge, Split, Rotate & Convert',
        h1: 'PDF tools that keep your documents private',
        metaDescription:
          'Merge, split, rotate, and convert PDFs in your browser. No uploads, no signup, and no watermark. Free PDF tools that work on desktop and mobile.',
        intro: [
          'Most online PDF tools upload your document to a server. Toolabs does the work in your browser using pdf-lib and PDF.js, so contracts, scans, and application files never leave your device. There is no queue, no account, and no watermark.',
          'Merge several scans into one file, extract a page range, fix a sideways scan, or turn PDF pages into JPG images. When a task genuinely needs a server — such as text recognition or Office conversion — it will be clearly labelled before launch.',
        ],
        faq: [
          {
            q: 'Is there a file size limit?',
            a: 'Toolabs accepts files up to 100 MB, but the practical limit depends on your device memory. Very large PDFs may be slow in mobile browsers. A warning appears above 40 MB.',
          },
          {
            q: 'Are my PDFs uploaded?',
            a: 'No. PDF merging, splitting, rotation, and JPG rendering happen inside your browser. You can disconnect from the internet after the page loads and the tools still work.',
          },
          {
            q: 'Do the tools add a watermark?',
            a: 'Never. The output is a clean PDF or image created from your own file.',
          },
          {
            q: 'Can Toolabs open password-protected PDFs?',
            a: 'No. Encrypted files are rejected with a clear message. Remove the password in your PDF reader, then try again.',
          },
        ],
      },
      id: {
        title: 'Tool PDF Gratis — Gabung, Pisah, Putar & Konversi',
        h1: 'Tool PDF yang menjaga privasi dokumen Anda',
        metaDescription:
          'Gabung, pisah, putar, dan konversi PDF di browser. Tanpa upload, tanpa daftar, tanpa watermark. Tool PDF gratis untuk desktop dan ponsel.',
        intro: [
          'Sebagian besar tool PDF online mengunggah dokumen Anda ke server. Toolabs mengerjakannya di browser dengan pdf-lib dan PDF.js, sehingga kontrak, hasil pindai, dan berkas lamaran tidak pernah meninggalkan perangkat. Tanpa antrean, tanpa akun, tanpa watermark.',
          'Gabungkan beberapa hasil pindai menjadi satu file, ambil rentang halaman tertentu, perbaiki scan yang miring, atau ubah halaman PDF menjadi gambar JPG. Jika suatu tugas benar-benar butuh server — misalnya pengenalan teks atau konversi Office — fitur itu akan diberi label jelas sebelum diluncurkan.',
        ],
        faq: [
          {
            q: 'Apakah ada batas ukuran file?',
            a: 'Toolabs menerima file hingga 100 MB, tetapi batas praktis bergantung pada memori perangkat. PDF sangat besar bisa lambat di browser ponsel. Peringatan muncul di atas 40 MB.',
          },
          {
            q: 'Apakah PDF saya diunggah?',
            a: 'Tidak. Penggabungan, pemisahan, rotasi, dan render JPG terjadi di browser Anda. Anda bisa memutus koneksi internet setelah halaman dimuat dan tool tetap bekerja.',
          },
          {
            q: 'Apakah tool menambahkan watermark?',
            a: 'Tidak pernah. Hasilnya adalah PDF atau gambar bersih yang dibuat dari file Anda sendiri.',
          },
          {
            q: 'Bisakah Toolabs membuka PDF yang dilindungi kata sandi?',
            a: 'Tidak. File terenkripsi ditolak dengan pesan yang jelas. Hapus kata sandi di pembaca PDF Anda, lalu coba lagi.',
          },
        ],
      },
    },
  },
  convert: {
    slug: { en: 'convert', id: 'konversi' },
    name: { en: 'Convert', id: 'Konversi' },
    icon: 'convert',
    hub: {
      en: {
        title: 'Free Image Converter — HEIC, JPG, PNG, WebP',
        h1: 'Convert image formats without uploading',
        metaDescription:
          'Convert HEIC to JPG, PNG to WebP, WebP to JPG, and JPG to PNG in your browser. Free, private, and no software installation required.',
        intro: [
          'Format conversion sounds simple until an app refuses your file. Toolabs converts the formats that cause the most friction: HEIC photos from iPhones, WebP images saved from websites, and PNG files that are too heavy to upload.',
          'Every conversion uses your browser’s image decoder and Canvas encoder. That means no file upload, no email link, and no waiting for a remote server. For a smaller file rather than a different format, use Compress Image instead.',
        ],
        faq: [
          {
            q: 'Does converting change the image quality?',
            a: 'Converting to JPG or WebP is lossy and always re-encodes the pixels. Converting to PNG is lossless, but the file will usually be larger than the JPG you started with.',
          },
          {
            q: 'Can I convert several images at once?',
            a: 'Yes. Add multiple files, process them together, and download each result or all results as a ZIP file.',
          },
          {
            q: 'Is HEIC support available in every browser?',
            a: 'The HEIC decoder runs in your browser through WebAssembly. Current versions of Chrome, Safari, Firefox, and Edge are supported; very old browsers may not have enough memory for large photos.',
          },
          {
            q: 'Are animated images supported?',
            a: 'The converter handles the first frame of animated WebP or HEIC files. Animation is not preserved.',
          },
        ],
      },
      id: {
        title: 'Konverter Gambar Gratis — HEIC, JPG, PNG, WebP',
        h1: 'Konversi format gambar tanpa upload',
        metaDescription:
          'Konversi HEIC ke JPG, PNG ke WebP, WebP ke JPG, dan JPG ke PNG di browser. Gratis, privat, tanpa instal software.',
        intro: [
          'Konversi format terdengar sederhana sampai ada aplikasi yang menolak file Anda. Toolabs mengonversi format yang paling sering bermasalah: foto HEIC dari iPhone, gambar WebP hasil unduhan situs, dan PNG yang terlalu berat untuk diunggah.',
          'Setiap konversi memakai dekoder gambar dan encoder Canvas milik browser Anda. Tidak ada unggahan file, tautan email, atau menunggu server jarak jauh. Jika yang Anda butuhkan adalah file lebih kecil, bukan format berbeda, gunakan Kompres Gambar.',
        ],
        faq: [
          {
            q: 'Apakah konversi mengubah kualitas gambar?',
            a: 'Konversi ke JPG atau WebP bersifat lossy dan selalu mengodekan ulang piksel. Konversi ke PNG bersifat lossless, tetapi ukuran file biasanya lebih besar daripada JPG asalnya.',
          },
          {
            q: 'Bisakah mengonversi beberapa gambar sekaligus?',
            a: 'Bisa. Tambahkan beberapa file, proses bersama, lalu unduh masing-masing hasil atau semua hasil sebagai file ZIP.',
          },
          {
            q: 'Apakah dukungan HEIC tersedia di semua browser?',
            a: 'Dekoder HEIC berjalan di browser melalui WebAssembly. Versi terbaru Chrome, Safari, Firefox, dan Edge didukung; browser sangat lama mungkin kekurangan memori untuk foto besar.',
          },
          {
            q: 'Apakah gambar animasi didukung?',
            a: 'Konverter memproses frame pertama file WebP atau HEIC animasi. Animasi tidak dipertahankan.',
          },
        ],
      },
    },
  },
};

export const tools: Tool[] = [...imageTools, ...pdfTools, ...convertTools];

const byId = new Map(tools.map((tool) => [tool.id, tool]));

export function getTool(id: string): Tool {
  const tool = byId.get(id);
  if (!tool) throw new Error(`Unknown tool id: ${id}`);
  return tool;
}

export function getToolBySlug(slug: string, locale: Locale): Tool | undefined {
  return tools.find((tool) => tool.slug[locale] === slug);
}

export function getToolsByCategory(category: Category): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export function getFeaturedTools(): Tool[] {
  return tools
    .filter((tool) => typeof tool.featured === 'number')
    .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));
}

export function getRelatedTools(tool: Tool): Tool[] {
  return tool.related.map((id) => getTool(id)).filter(Boolean);
}

export function toolPath(tool: Tool, locale: Locale): string {
  return locale === 'en' ? `/${tool.slug.en}` : `/id/${tool.slug.id}`;
}

export function categoryPath(category: Category, locale: Locale): string {
  const slug = categories[category].slug[locale];
  return locale === 'en' ? `/${slug}` : `/id/${slug}`;
}

/**
 * Structural validation. Runs at build time so a broken registry fails the
 * deploy instead of producing a dead link or an empty page.
 */
function validateTools(): void {
  const seenIds = new Set<string>();
  const seenSlugs = { en: new Set<string>(), id: new Set<string>() };

  for (const tool of tools) {
    if (seenIds.has(tool.id)) throw new Error(`Duplicate tool id: ${tool.id}`);
    seenIds.add(tool.id);

    for (const locale of ['en', 'id'] as const) {
      const slug = tool.slug[locale];
      if (!slug) throw new Error(`Missing ${locale} slug for ${tool.id}`);
      if (seenSlugs[locale].has(slug)) {
        throw new Error(`Duplicate ${locale} slug "${slug}"`);
      }
      seenSlugs[locale].add(slug);

      const content = tool.locale[locale];
      if (!content) throw new Error(`Missing ${locale} content for ${tool.id}`);
      if (content.faq.length < 5) {
        throw new Error(`${tool.id} (${locale}) needs at least 5 FAQ entries`);
      }
      if (content.steps.length < 3) {
        throw new Error(`${tool.id} (${locale}) needs at least 3 steps`);
      }
      if (content.title.length > 65) {
        console.warn(`[seo] ${tool.id} (${locale}) title is ${content.title.length} chars`);
      }
      if (content.metaDescription.length > 160) {
        console.warn(
          `[seo] ${tool.id} (${locale}) meta description is ${content.metaDescription.length} chars`,
        );
      }
      const answerWords = content.shortAnswer.split(/\s+/).filter(Boolean).length;
      if (answerWords < 35 || answerWords > 70) {
        console.warn(
          `[aeo] ${tool.id} (${locale}) short answer has ${answerWords} words (target 40–60)`,
        );
      }
    }
  }

  for (const tool of tools) {
    for (const relatedId of tool.related) {
      if (!byId.has(relatedId)) {
        throw new Error(`${tool.id} links to unknown related tool "${relatedId}"`);
      }
    }
  }

  for (const category of Object.values(categories)) {
    for (const locale of ['en', 'id'] as const) {
      if (!category.hub[locale].faq.length) {
        throw new Error(`Category hub faq missing for ${category.slug[locale]}`);
      }
    }
  }
}

validateTools();
