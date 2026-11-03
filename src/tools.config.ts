import type { Locale } from './config';
import { convertTools } from './content/tools/convert';
import { commonImageAccept, imageTools } from './content/tools/image';

export type Category = 'compress' | 'pdf' | 'convert' | 'edit';

export type EngineId =
  | 'image-compress'
  | 'image-convert'
  | 'image-converter'
  | 'image-resize'
  | 'heic-convert'
  | 'qr-generator'
  | 'pdf-merge'
  | 'image-to-pdf'
  | 'pdf-split'
  | 'pdf-rotate'
  | 'pdf-to-jpg'
  | 'pdf-to-word'
  | 'pdf-editor'
  | 'pdf-translate'
  | 'pdf-to-excel'
  | 'pdf-to-powerpoint'
  | 'pdf-to-text'
  | 'pdf-unlock'
  | 'pdf-protect'
  | 'pdf-page'
  | 'pdf-compress';

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
  circle?: boolean;
  outputExtension?: 'jpg' | 'jpeg' | 'png' | 'webp';
  autoGifHeicJpg?: boolean;
  photoPreset?: string;
  sourceLang?: string;
  targetLang?: string;
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
  /** Locks the output format to the input extension so "compress" never converts. */
  fixedFormat?: boolean;
  comingSoon?: boolean;
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
    hub: Record<Locale, { title: string; h1: string; metaDescription: string; intro: string[]; faq: ToolFaq[] }>;
  }
> = {
  compress: {
    slug: { en: 'compress', id: 'kompres' },
    name: { en: 'Compress', id: 'Kompres' },
    icon: 'compress',
    hub: {
      en: {
        title: 'Free Compress Tools — JPG, PNG, WebP, HEIC, GIF',
        h1: 'Compress images without changing the file extension',
        metaDescription:
          'Compress JPG, PNG, WebP, HEIC, and GIF to a target size while keeping the same format. Runs in your browser, free, no upload.',
        intro: [
          'Smaller file, same extension. A 2 MB PNG becomes a 100 KB PNG, and a JPG stays a JPG. Nothing is renamed, nothing is converted behind your back, and the file never leaves your device. Use Compress Image when you want one tool for any format, or open the tool that names the extension you are looking for — Compress PNG, Compress JPG, Compress WebP, Compress HEIC, and Compress GIF. Resize Image and the 3×4 photo tool sit on this page too, because a size limit usually comes with a pixel limit.',
        ],
        faq: [
          {
            q: 'Does compressing change my file format?',
            a: 'No. The output keeps the extension of the input, so a PNG stays a PNG and a JPG stays a JPG. Only the HEIC and GIF tools write JPG, because browsers cannot encode those two formats; the output file is named accordingly.',
          },
          {
            q: 'Which tool should I pick?',
            a: 'Compress Image accepts JPG, PNG, and WebP in one dropzone and is the safest default. If you already know the extension, use the tool with that name — it locks the output to your format and pre-fills a sensible target size.',
          },
          {
            q: 'What target size should I use?',
            a: '100 KB for job portals and campus forms, 200 KB for CPNS and ID photos, 500 KB for marketplaces. Aim slightly below the number the portal states, because systems count kilobytes differently.',
          },
          {
            q: 'Are my files uploaded?',
            a: 'No. Files are read with the File API, decoded and re-encoded inside a Web Worker on your device, and downloaded from a local Blob URL. There is no upload endpoint.',
          },
          {
            q: 'What if the target cannot be reached?',
            a: 'Toolabs shows the smallest result it could produce and says the target was missed, instead of silently returning a bad file. For PNG, which is lossless, the tool reduces pixel dimensions rather than quality.',
          },
        ],
      },
      id: {
        title: 'Tool Kompres Gratis — JPG, PNG, WebP, HEIC, GIF',
        h1: 'Kompres gambar tanpa mengubah ekstensi file',
        metaDescription:
          'Kompres JPG, PNG, WebP, HEIC, dan GIF ke ukuran target sambil mempertahankan format asli. Berjalan di browser, gratis, tanpa unggah.',
        intro: [
          'Ukuran lebih kecil, ekstensi sama. PNG 2 MB menjadi PNG 100 KB, dan JPG tetap JPG. Tidak ada yang diganti nama, tidak ada yang dikonversi diam-diam, dan file tidak pernah meninggalkan perangkat Anda. Gunakan Kompres Gambar jika ingin satu tool untuk semua format, atau buka tool yang menyebut ekstensi yang Anda cari — Kompres PNG, Kompres JPG, Kompres WebP, Kompres HEIC, dan Kompres GIF. Ubah Ukuran Gambar dan foto 3×4 juga ada di halaman ini, karena batas ukuran biasanya berpasangan dengan batas piksel.',
        ],
        faq: [
          {
            q: 'Apakah kompresi mengubah format file?',
            a: 'Tidak. Keluaran mempertahankan ekstensi dari file masukan, jadi PNG tetap PNG dan JPG tetap JPG. Hanya tool HEIC dan GIF yang menulis JPG, karena browser tidak bisa mengodekan kedua format tersebut; nama file hasilnya menyesuaikan.',
          },
          {
            q: 'Sebaiknya memilih tool yang mana?',
            a: 'Kompres Gambar menerima JPG, PNG, dan WebP sekaligus dan merupakan pilihan paling aman. Jika ekstensinya sudah jelas, gunakan tool dengan nama tersebut — keluarannya dikunci ke format itu dan target ukurannya sudah terisi.',
          },
          {
            q: 'Target ukuran berapa yang tepat?',
            a: '100 KB untuk portal lamaran dan formulir kampus, 200 KB untuk CPNS dan foto identitas, 500 KB untuk marketplace. Bidik sedikit di bawah angka yang ditulis portal, karena sistem menghitung kilobyte dengan cara berbeda.',
          },
          {
            q: 'Apakah file saya diunggah?',
            a: 'Tidak. File dibaca lewat File API, didekode dan dikodekan ulang di dalam Web Worker pada perangkat Anda, lalu diunduh dari Blob URL lokal. Tidak ada endpoint unggahan.',
          },
          {
            q: 'Bagaimana jika target tidak tercapai?',
            a: 'Toolabs menampilkan hasil terkecil yang bisa dihasilkan dan menyatakan bahwa target tidak terpenuhi, alih-alih diam-diam mengembalikan file buruk. Untuk PNG yang lossless, tool memperkecil dimensi piksel, bukan kualitas.',
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
        metaDescription: 'Merge, split, rotate, and convert PDFs in your browser. No uploads, no signup, and no watermark.',
        intro: ['PDF tools run in the browser.'],
        faq: [
          { q: 'Is there a file size limit?', a: 'Yes, up to 100 MB.' },
          { q: 'Are my PDFs uploaded?', a: 'No.' },
          { q: 'Do the tools add a watermark?', a: 'Never.' },
          { q: 'Can Toolabs open password-protected PDFs?', a: 'No.' },
        ],
      },
      id: {
        title: 'Tool PDF Gratis — Gabung, Pisah, Putar & Konversi',
        h1: 'Tool PDF yang menjaga privasi dokumen Anda',
        metaDescription: 'Gabung, pisah, putar, dan konversi PDF di browser. Tanpa upload, tanpa daftar, tanpa watermark.',
        intro: ['Tool PDF berjalan di browser.'],
        faq: [
          { q: 'Apakah ada batas ukuran file?', a: 'Ya, hingga 100 MB.' },
          { q: 'Apakah PDF saya diunggah?', a: 'Tidak.' },
          { q: 'Apakah tool menambahkan watermark?', a: 'Tidak pernah.' },
          { q: 'Bisakah Toolabs membuka PDF yang dilindungi kata sandi?', a: 'Tidak.' },
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
        metaDescription: 'Convert HEIC to JPG, PNG to WebP, WebP to JPG, and JPG to PNG in your browser. Free, private, and no software installation required.',
        intro: ['Conversions run in the browser.'],
        faq: [
          { q: 'Does converting change the image quality?', a: 'Yes, to JPG or WebP is lossy.' },
          { q: 'Can I convert several images at once?', a: 'Yes.' },
          { q: 'Is HEIC support available in every browser?', a: 'Via WebAssembly.' },
          { q: 'Are animated images supported?', a: 'No, only first frame.' },
        ],
      },
      id: {
        title: 'Konverter Gambar Gratis — HEIC, JPG, PNG, WebP',
        h1: 'Konversi format gambar tanpa upload',
        metaDescription: 'Konversi HEIC ke JPG, PNG ke WebP, WebP ke JPG, dan JPG ke PNG di browser. Gratis, privat, tanpa instal software.',
        intro: ['Konversi berjalan di browser.'],
        faq: [
          { q: 'Apakah konversi mengubah kualitas gambar?', a: 'Ya, ke JPG atau WebP bersifat lossy.' },
          { q: 'Bisakah mengonversi beberapa gambar sekaligus?', a: 'Ya.' },
          { q: 'Apakah dukungan HEIC tersedia di semua browser?', a: 'Via WebAssembly.' },
          { q: 'Apakah gambar animasi didukung?', a: 'Tidak, hanya frame pertama.' },
        ],
      },
    },
  },
  edit: {
    slug: { en: 'edit', id: 'edit-gambar' },
    name: { en: 'Edit Image', id: 'Edit Gambar' },
    icon: 'image',
    hub: {
      en: {
        title: 'Free Image Editing Tools — Resize, Crop & Rotate',
        h1: 'Edit images in your browser',
        metaDescription: 'Resize, crop, and rotate images locally in your browser. Free, private, and no upload.',
        intro: ['Resize, crop, and rotate images in your browser.'],
        faq: [
          { q: 'Are my images uploaded?', a: 'No. Editing runs locally in your browser.' },
          { q: 'Can I crop to an exact size?', a: 'Yes. Enter the desired width and height, then choose cover to crop.' },
          { q: 'Can I resize photos for printing?', a: 'Yes. Choose a photo or print-size preset.' },
          { q: 'Can I rotate by 90 degrees?', a: 'Yes. Choose a 90, 180, or 270 degree rotation.' },
          { q: 'Does editing overwrite my original?', a: 'No. Each edit creates a separate output file.' },
        ],
      },
      id: {
        title: 'Tool Edit Gambar Gratis — Ubah Ukuran, Crop & Putar',
        h1: 'Edit gambar di browser',
        metaDescription: 'Ubah ukuran, crop, dan putar gambar secara lokal di browser. Gratis, privat, tanpa upload.',
        intro: ['Ubah ukuran, crop, dan putar gambar di browser.'],
        faq: [
          { q: 'Apakah gambar saya diunggah?', a: 'Tidak. Pengeditan berjalan secara lokal di browser.' },
          { q: 'Bisakah crop dengan ukuran presisi?', a: 'Bisa. Masukkan lebar dan tinggi, lalu pilih mode cover untuk crop.' },
          { q: 'Bisakah mengubah ukuran foto untuk cetak?', a: 'Bisa. Pilih preset ukuran foto atau cetak.' },
          { q: 'Bisakah memutar 90 derajat?', a: 'Bisa. Pilih rotasi 90, 180, atau 270 derajat.' },
          { q: 'Apakah pengeditan menimpa file asli?', a: 'Tidak. Setiap edit membuat file hasil terpisah.' },
        ],
      },
    },
  },
};

const configuredTools: Tool[] = [
  // ===== IMAGE TOOLS =====
  {
    id: 'image-converter',
    slug: { en: 'image-converter', id: 'konverter-gambar' },
    category: 'convert',
    engine: 'image-converter',
    accept: [
      'image/*',
      ...'jpg jpeg png webp gif tiff tif heic heif avif bmp ico psd psb jfif jpe jif jfi jp2 tga wpg xbm xpm apng cur art dib dpx exr fax hdr hrz mng mtv palm pbm pcd pcx pfm pgm picon pict pix pnm ppm pwp rgb rgba rla sct sfw sgi sun dcm dds odg raw raf cr2 arw crw dcr dng mrw nef orf pef 3fr cr3 dcs drf erf iiq k25 kdc mef mos nrw ptx rw2 sr2 srf srw x3f'
        .split(' ')
        .map((extension) => `.${extension}`),
    ],
    icon: 'image',
    featured: 5,
    options: { outputFormat: 'image/jpeg', quality: 0.92 },
    related: ['compress-image'],
    updatedAt: '2026-10-24',
    locale: {
      en: {
        title: 'Image Converter Online — JPG, PNG, WebP',
        h1: 'Convert images to JPG, PNG, or WebP',
        metaDescription: 'Convert image files to JPG, PNG, or WebP in your browser. Add multiple images and download the converted files without uploading them.',
        answerQuestion: 'How do I convert an image to JPG, PNG, or WebP?',
        shortAnswer: 'Choose an output format, add one or more image files, and press Process. Toolabs converts readable images locally in your browser, then lets you download each result or a ZIP. HEIC and HEIF use a local decoder. Other formats depend on your browser’s image decoder, so some PSD and camera RAW files may not open.',
        intro: 'Choose JPG, PNG, or WebP as the output, then add your images. Conversion happens in your browser, so the files stay on your device. Many image extensions are accepted, but decoding support varies by browser and format.',
        steps: ['Choose JPG, PNG, or WebP as the output format.', 'Drop image files or select them from your device.', 'Press Process files and wait for local conversion.', 'Download each converted image or all results as a ZIP.'],
        benefits: ['Convert several images in one batch.', 'Choose a widely supported output format.', 'Files are processed locally and are not uploaded.'],
        useCases: ['Convert photos to JPG for websites and forms.', 'Create PNG files when you need transparency.', 'Convert images to WebP for smaller web pages.'],
        faq: [
          { q: 'Which output formats can I choose?', a: 'You can convert to JPG (the same format as JPEG), PNG, or WebP.' },
          { q: 'Which input formats are supported?', a: 'The file picker accepts common image extensions and the formats listed on this page. Actual decoding depends on your browser; HEIC and HEIF are handled by a local decoder, while unsupported PSD or RAW files may fail to open.' },
          { q: 'Are my images uploaded?', a: 'No. Images are decoded and converted in your browser. Toolabs does not receive or store the files.' },
          { q: 'Can I convert multiple files at once?', a: 'Yes. Add multiple images and process them as a batch. You can download each result or download all results as a ZIP.' },
          { q: 'Is JPG the same as JPEG?', a: 'Yes. JPG and JPEG are two filename extensions for the same image format. Converted JPG files use the .jpg extension.' },
          { q: 'Does conversion preserve animation?', a: 'No. Animated formats such as GIF and APNG are converted from their first frame only.' },
          { q: 'Why could a file be accepted but fail during conversion?', a: 'The browser file picker can accept an extension even when the browser has no decoder for its contents. If decoding fails, try another browser or convert that format with a tool that supports it.' },
        ],
        tip: 'For photos, JPG or WebP is usually smaller. Choose PNG when preserving transparency or lossless output matters.',
      },
      id: {
        title: 'Konverter Gambar Online — JPG, PNG, WebP',
        h1: 'Konversi gambar ke JPG, PNG, atau WebP',
        metaDescription: 'Konversi file gambar ke JPG, PNG, atau WebP di browser. Tambahkan beberapa gambar dan unduh hasilnya tanpa mengunggah file.',
        answerQuestion: 'Bagaimana cara mengubah gambar ke JPG, PNG, atau WebP?',
        shortAnswer: 'Pilih format keluaran, tambahkan satu atau beberapa file gambar, lalu tekan Proses. Toolabs mengonversi gambar yang dapat dibaca secara lokal di browser, kemudian Anda bisa mengunduh hasil satu per satu atau sebagai ZIP. HEIC dan HEIF memakai dekoder lokal. Format lain bergantung pada dekoder browser, sehingga beberapa file PSD dan RAW kamera mungkin tidak dapat dibuka.',
        intro: 'Pilih JPG, PNG, atau WebP sebagai format keluaran, lalu tambahkan gambar. Konversi berjalan di browser sehingga file tetap di perangkat Anda. Banyak ekstensi gambar diterima, tetapi dukungan dekode berbeda-beda menurut browser dan format.',
        steps: ['Pilih JPG, PNG, atau WebP sebagai format keluaran.', 'Letakkan file gambar atau pilih dari perangkat.', 'Tekan Proses file dan tunggu konversi lokal.', 'Unduh setiap gambar hasil atau semua hasil sebagai ZIP.'],
        benefits: ['Konversi beberapa gambar sekaligus.', 'Pilih format keluaran yang banyak didukung.', 'File diproses secara lokal dan tidak diunggah.'],
        useCases: ['Ubah foto ke JPG untuk situs dan formulir.', 'Buat file PNG saat membutuhkan transparansi.', 'Ubah gambar ke WebP agar halaman web lebih ringan.'],
        faq: [
          { q: 'Format keluaran apa saja yang tersedia?', a: 'Anda bisa mengonversi ke JPG (format yang sama dengan JPEG), PNG, atau WebP.' },
          { q: 'Format masukan apa saja yang didukung?', a: 'Pemilih file menerima ekstensi gambar umum dan format yang tercantum di halaman ini. Dukungan dekode bergantung pada browser; HEIC dan HEIF ditangani dekoder lokal, sedangkan file PSD atau RAW yang tidak didukung bisa gagal dibuka.' },
          { q: 'Apakah gambar saya diunggah?', a: 'Tidak. Gambar didekode dan dikonversi di browser Anda. Toolabs tidak menerima atau menyimpan file tersebut.' },
          { q: 'Bisakah mengonversi beberapa file sekaligus?', a: 'Bisa. Tambahkan beberapa gambar dan proses sebagai satu batch. Anda dapat mengunduh hasil satu per satu atau semuanya sebagai ZIP.' },
          { q: 'Apakah JPG sama dengan JPEG?', a: 'Ya. JPG dan JPEG adalah dua ekstensi nama file untuk format gambar yang sama. Hasil konversi JPG menggunakan ekstensi .jpg.' },
          { q: 'Apakah konversi mempertahankan animasi?', a: 'Tidak. Format animasi seperti GIF dan APNG hanya dikonversi dari frame pertamanya.' },
          { q: 'Mengapa file diterima tetapi gagal saat dikonversi?', a: 'Pemilih file browser dapat menerima ekstensi meski browser tidak memiliki dekoder untuk isinya. Jika dekode gagal, coba browser lain atau gunakan alat yang mendukung format tersebut.' },
        ],
        tip: 'Untuk foto, JPG atau WebP biasanya lebih kecil. Pilih PNG jika transparansi atau keluaran lossless penting.',
      },
    },
  },
  {
    id: 'compress-image',
    slug: { en: 'compress-image', id: 'kompres-gambar' },
    category: 'compress',
    engine: 'image-compress',
    accept: commonImageAccept,
    icon: 'compress',
    featured: 1,
    options: { targetKB: 200, outputFormat: 'auto', quality: 0.85, autoGifHeicJpg: true },
    related: ['compress-jpg', 'compress-png', 'compress-webp', 'compress-jpg-to-100kb', 'compress-heic'],
    updatedAt: '2026-10-23',
    locale: {
      en: {
        title: 'Compress Image Online Free — Any Image Format',
        h1: 'Compress images to your chosen format',
        metaDescription: 'Compress common image formats in your browser. Choose JPG, JPEG, PNG, or WebP output. GIF and HEIC export as JPG.',
        answerQuestion: 'How do I compress an image to an exact size?',
        shortAnswer: 'Add an image in a supported format, choose an output format, and set a target size. GIF and HEIC automatically use JPG output, with the format selector locked. Toolabs processes locally and shows the result size and dimensions before download. The original remains unchanged.',
        intro: 'Most compressors give you a quality slider and hope for the best.',
        steps: ['Add an image file in a supported format.', 'Enter a target size in KB.', 'Choose JPG, JPEG, PNG, or WebP output, unless the GIF/HEIC source locks output to JPG.', 'Press Process file and review the result.', 'Download the compressed image.'],
        benefits: ['You control the exact size limit.'],
        useCases: ['Shrinking a profile photo for a job portal.'],
        faq: [
          { q: 'Does compressing an image reduce its quality?', a: 'Yes for JPG and WebP. The tool lowers the encoder quality and, when needed, the pixel dimensions. PNG is lossless, so only dimensions change.' },
          { q: 'Can I compress an image to exactly 100 KB?', a: 'The result is at or slightly below the target, not exactly 100.00 KB. The tool guarantees staying under the maximum when the target is reachable.' },
          { q: 'What happens if the target cannot be reached?', a: 'Toolabs tells you instead of silently producing a bad file. It shows the smallest result it could make at a usable quality.' },
          { q: 'Are my images uploaded?', a: 'No. The image is read with the File API, decoded in your browser, resized on a canvas inside a Web Worker, and encoded locally.' },
          { q: 'Does it remove EXIF data?', a: 'Yes. Canvas re-encoding creates a new file without EXIF metadata. The visual orientation is preserved because the browser applies EXIF orientation when decoding.' },
        ],
        comparison: { caption: 'Common target sizes', headers: ['Target', 'Typical use', 'What to expect'], rows: [['100 KB', 'Job portals', 'Good for a portrait at 600-1200 px']] },
        tip: 'If you only need to change pixel dimensions, use Resize Image instead.',
      },
      id: {
        title: 'Kompres Gambar Online Gratis — Semua Format',
        h1: 'Kompres gambar ke format pilihan',
        metaDescription: 'Kompres berbagai format gambar di browser. Pilih JPG, JPEG, PNG, atau WebP. GIF dan HEIC otomatis menjadi JPG.',
        answerQuestion: 'Bagaimana cara kompres gambar ke ukuran tertentu?',
        shortAnswer: 'Tambahkan gambar dalam format yang didukung, pilih format keluaran, dan tentukan target ukuran. GIF dan HEIC otomatis memakai JPG dan pilihan formatnya terkunci. Toolabs memproses secara lokal, lalu menampilkan ukuran file dan dimensi hasil sebelum diunduh. File asli tetap utuh.',
        intro: 'Sebagian besar alat kompres hanya memberi slider kualitas dan berharap hasilnya cocok.',
        steps: ['Tambahkan file gambar dalam format yang didukung.', 'Masukkan target ukuran dalam KB.', 'Pilih JPG, JPEG, PNG, atau WebP, kecuali sumber GIF/HEIC yang mengunci keluaran ke JPG.', 'Tekan Proses file dan periksa hasilnya.', 'Unduh gambar hasil kompres.'],
        benefits: ['Anda mengatur batas ukuran yang pasti.'],
        useCases: ['Memperkecil foto profil untuk portal lamaran.'],
        faq: [
          { q: 'Apakah kompres gambar menurunkan kualitas?', a: 'Ya untuk JPG dan WebP. Tool menurunkan kualitas encoder dan bila perlu dimensi piksel. PNG bersifat lossless, jadi hanya dimensinya yang berubah.' },
          { q: 'Bisakah kompres gambar tepat 100 KB?', a: 'Hasilnya berada di atau sedikit di bawah target, bukan tepat 100,00 KB. Tool menjamin berada di bawah batas ketika target masih bisa dicapai.' },
          { q: 'Apa yang terjadi jika target tidak bisa dicapai?', a: 'Toolabs memberi tahu, bukan diam-diam menghasilkan file buruk.' },
          { q: 'Apakah gambar saya diunggah?', a: 'Tidak. Gambar dibaca lewat File API, didekode di browser, diubah ukurannya di canvas dalam Web Worker, lalu dikodekan secara lokal.' },
          { q: 'Apakah data EXIF dihapus?', a: 'Ya. Pengodean ulang canvas menghasilkan file baru tanpa metadata EXIF. Orientasi visual tetap benar karena browser menerapkan orientasi EXIF saat membaca gambar.' },
        ],
        comparison: { caption: 'Common target sizes', headers: ['Target', 'Typical use', 'What to expect'], rows: [['100 KB', 'Job portals', 'Good for a portrait at 600-1200 px']] },
        tip: 'If you only need to change pixel dimensions, use Resize Image instead.',
      },
    },
  },
  {
    id: 'compress-jpg-to-100kb',
    slug: { en: 'compress-jpg-to-100kb', id: 'kompres-jpg-100kb' },
    category: 'compress',
    engine: 'image-compress',
    accept: ['image/jpeg'],
    icon: 'target',
    featured: 5,
    fixedFormat: true,
    options: { targetKB: 100, outputFormat: 'image/jpeg' },
    related: ['compress-image', 'compress-jpg-to-200kb', 'resize-image', 'photo-3x4'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'Compress JPG to 100 KB Online — Free Toolabs',
        h1: 'Compress JPG to 100 KB',
        metaDescription: 'Reduce a JPG to 100 KB or less in your browser. See the exact before and after size, keep the best possible quality, and download instantly.',
        answerQuestion: 'How do I compress a JPG to 100 KB?',
        shortAnswer: 'Choose a JPG, keep the 100 KB target, and Toolabs finds the highest quality that fits. If quality alone cannot reach 100 KB, it reduces the dimensions step by step.',
        intro: 'A 100 KB limit is common on job applications, university forms, and older upload portals.',
        steps: ['Add the JPG you need to send.', 'The target is already set to 100 KB.', 'Press Process file.', 'Check the result size and download.'],
        benefits: ['No guesswork: the tool aims for the limit instead of asking you to try quality 70 and hope.'],
        useCases: ['Applying for a job through a portal with a 100 KB photo limit.'],
        faq: [
          { q: 'Is a 100 KB JPG good enough for a job application?', a: 'Usually yes for a portrait shown on screen. At 100 KB, a 600–1200 px photo remains clear enough for most applicant tracking systems.' },
          { q: 'Why does my photo become smaller in pixels?', a: 'JPEG quality reduction alone may not bring a large photo under 100 KB. The engine then scales the image down. The result panel shows the final dimensions.' },
          { q: 'Can I choose 50 KB or 200 KB instead?', a: 'Yes. Change the target field, or open Compress JPG to 200 KB for a 200 KB preset.' },
          { q: 'Will the portal accept a JPG with EXIF removed?', a: 'Portals check the file format, dimensions, and size, not EXIF fields. Removing camera and GPS data is safe and generally preferable for privacy.' },
          { q: 'What if 100 KB cannot be reached?', a: 'Toolabs reports the smallest achievable result and explains that the target was missed.' },
          { q: 'Is this the same as saving at 70% quality in Photoshop?', a: 'The goal is similar but the method is not. Photoshop applies a quality you choose. Toolabs measures the encoded bytes and searches for the highest quality that satisfies the 100 KB limit.' },
        ],
        comparison: { caption: 'Is 100 KB the right limit?', headers: ['Limit', 'Best for', 'Trade-off'], rows: [['100 KB', 'Job portals', 'Good on-screen quality at moderate dimensions']] },
        tip: 'If the portal also specifies pixel dimensions, set them first with Resize Image, then compress.',
      },
      id: {
        title: 'Kompres JPG jadi 100 KB Online Gratis — Toolabs',
        h1: 'Kompres JPG jadi 100 KB',
        metaDescription: 'Perkecil foto JPG jadi 100 KB atau kurang langsung di browser. Lihat ukuran sebelum dan sesudah.',
        answerQuestion: 'Bagaimana cara kompres foto JPG jadi 100 KB?',
        shortAnswer: 'Pilih foto JPG, biarkan target 100 KB, lalu Toolabs mencari kualitas tertinggi yang muat. Jika kualitas saja tidak cukup, dimensi diperkecil bertahap.',
        intro: 'Batas 100 KB sering muncul di portal lamaran kerja.',
        steps: ['Tambahkan foto JPG yang ingin dikirim.', 'Target sudah terisi 100 KB.', 'Tekan Proses file.', 'Periksa ukuran hasil dan unduh.'],
        benefits: ['Tanpa menebak: tool membidik batas ukuran.'],
        useCases: ['Melamar kerja lewat portal dengan batas foto 100 KB.'],
        faq: [
          { q: 'Apakah JPG 100 KB cukup untuk lamaran kerja?', a: 'Biasanya cukup untuk foto yang tampil di layar. Pada 100 KB, foto 600–1200 px masih jelas untuk sebagian besar sistem lamaran.' },
          { q: 'Mengapa jumlah piksel foto berkurang?', a: 'Penurunan kualitas JPEG saja mungkin tidak cukup. Mesin lalu memperkecil gambar. Panel hasil menampilkan dimensi akhir.' },
          { q: 'Bisakah memilih 50 KB atau 200 KB?', a: 'Bisa. Ubah kolom target, atau buka Kompres JPG 200 KB untuk preset 200 KB.' },
          { q: 'Apakah portal menerima JPG tanpa EXIF?', a: 'Portal memeriksa format file, dimensi, dan ukuran, bukan isi EXIF. Menghapus data kamera dan GPS aman.' },
          { q: 'Bagaimana jika 100 KB tidak bisa dicapai?', a: 'Toolabs menampilkan hasil terkecil yang bisa dicapai dan menjelaskan bahwa target tidak terpenuhi.' },
          { q: 'Apakah sama dengan menyimpan kualitas 70% di Photoshop?', a: 'Tujuannya mirip, tetapi caranya berbeda. Photoshop menerapkan kualitas yang Anda pilih. Toolabs mengukur byte hasil encoding dan mencari kualitas tertinggi yang memenuhi batas 100 KB.' },
        ],
        comparison: { caption: 'Apakah 100 KB adalah batas yang tepat?', headers: ['Limit', 'Best for', 'Trade-off'], rows: [['100 KB', 'Job portals', 'Good on-screen quality at moderate dimensions']] },
        tip: 'If the portal also specifies pixel dimensions, set them first with Resize Image, then compress.',
      },
    },
  },
  // ===== PDF TOOLS =====
  {
    id: 'optimize-pdf',
    slug: { en: 'optimize-pdf', id: 'optimize-pdf' },
    category: 'pdf',
    engine: 'pdf-compress',
    accept: ['application/pdf'],
    icon: 'optimize',
    options: { targetKB: 500 },
    related: ['compress-pdf', 'merge-pdf'],
    updatedAt: '2026-10-23',
    locale: {
      en: {
        title: 'Optimize PDF Online Free — Reduce PDF File Size',
        h1: 'Optimize PDF files to reduce size',
        metaDescription: 'Reduce PDF file size without losing quality. Optimize PDF online free.',
        answerQuestion: 'How do I optimize a PDF file size?',
        shortAnswer: 'Optimize PDF reduces file size by removing unused objects and optimizing streams. Runs in browser when possible.',
        intro: 'PDF optimization removes redundancy and compresses objects.',
        steps: ['Upload PDF', 'Run optimization', 'Download optimized PDF'],
        benefits: ['Smaller file size', 'Maintains quality', 'Private processing'],
        useCases: ['Reduce email attachment size', 'Fit portal upload limits'],
        faq: [
          { q: 'What does optimizing a PDF do?', a: 'Removes unused objects and compresses streams.' },
          { q: 'Does optimization change content?', a: 'No, only removes redundant data.' },
          { q: 'Is there a size limit?', a: 'Limited by browser memory or server.' },
          { q: 'Is my file private?', a: 'Client-side when possible.' },
          { q: 'Can I choose compression level?', a: 'Yes, via options.' },
        ],
        tip: 'Run optimization before merging PDFs to reduce final size.',
      },
      id: {
        title: 'Optimasi PDF Online Gratis — Perkecil Ukuran',
        h1: 'Optimalkan PDF untuk mengurangi ukuran',
        metaDescription: 'Perkecil ukuran file PDF tanpa kehilangan kualitas. Optimasi PDF online gratis.',
        answerQuestion: 'Bagaimana cara mengoptimalkan ukuran file PDF?',
        shortAnswer: 'Optimasi PDF mengurangi ukuran dengan menghapus objek tidak terpakai.',
        intro: 'Optimasi PDF menghapus redundansi dan mengompres stream.',
        steps: ['Unggah PDF', 'Jalankan optimasi', 'Unduh PDF teroptimasi'],
        benefits: ['Ukuran lebih kecil', 'Kualitas terjaga', 'Pemrosesan privat'],
        useCases: ['Kurangi ukuran lampiran email', 'Cocok batas unggah portal'],
        faq: [
          { q: 'Apa yang dilakukan mengoptimalkan PDF?', a: 'Menghapus objek tidak terpakai dan mengompres stream.' },
          { q: 'Apakah optimasi mengubah konten?', a: 'Tidak, hanya menghapus data redundan.' },
          { q: 'Apakah ada batas ukuran?', a: 'Terbatas oleh memori browser atau server.' },
          { q: 'Apakah file saya privat?', a: 'Client-side saat memungkinkan.' },
          { q: 'Bisa pilih tingkat kompresi?', a: 'Ya, melalui opsi.' },
        ],
        tip: 'Jalankan optimasi sebelum menggabungkan PDF untuk mengurangi ukuran akhir.',
      },
    },
  },
  {
    id: 'compress-pdf',
    slug: { en: 'compress-pdf', id: 'kompres-pdf' },
    category: 'pdf',
    engine: 'pdf-compress',
    accept: ['application/pdf'],
    icon: 'compress',
    featured: 2,
    options: { targetKB: 500 },
    related: ['optimize-pdf', 'merge-pdf'],
    updatedAt: '2026-10-23',
    locale: {
      en: {
        title: 'Compress PDF Online Free — Reduce PDF File Size',
        h1: 'Compress PDF files to reduce size',
        metaDescription: 'Compress PDF online free. Reduce PDF file size with quality preservation.',
        answerQuestion: 'How do I compress a PDF?',
        shortAnswer: 'Compress PDF reduces file size by optimizing content and re-encoding streams.',
        intro: 'PDF compression removes unnecessary data.',
        steps: ['Upload PDF', 'Run compression', 'Download compressed PDF'],
        benefits: ['Smaller file size', 'Quality preserved', 'Private processing'],
        useCases: ['Reduce email attachments', 'Fit portal limits'],
        faq: [
          { q: 'What does compressing a PDF do?', a: 'Removes unnecessary data and compresses streams.' },
          { q: 'Does compression change content?', a: 'No, visual content preserved.' },
          { q: 'Is my file private?', a: 'Client-side when possible.' },
          { q: 'What quality level?', a: 'Adjustable via options.' },
          { q: 'Can I combine with optimize?', a: 'Yes, use both.' },
        ],
        tip: 'For scanned PDFs, use image compression on embedded images.',
      },
      id: {
        title: 'Kompres PDF Online Gratis — Perkecil Ukuran',
        h1: 'Kompres PDF untuk mengurangi ukuran',
        metaDescription: 'Kompres PDF online gratis. Perkecil ukuran PDF dengan menjaga kualitas.',
        answerQuestion: 'Bagaimana cara kompres PDF?',
        shortAnswer: 'Kompres PDF mengurangi ukuran dengan menghapus data tidak perlu.',
        intro: 'Kompresi PDF menghapus data tidak perlu.',
        steps: ['Unggah PDF', 'Jalankan kompresi', 'Unduh PDF terkompresi'],
        benefits: ['Ukuran lebih kecil', 'Kualitas visual terjaga', 'Pemrosesan privat'],
        useCases: ['Kurangi lampiran email', 'Cocok batas portal'],
        faq: [
          { q: 'Apa yang dilakukan mengkompres PDF?', a: 'Menghapus data tidak perlu dan mengompres stream.' },
          { q: 'Apakah kompresi mengubah konten?', a: 'Tidak, konten visual terjaga.' },
          { q: 'Apakah file saya privat?', a: 'Client-side saat memungkinkan.' },
          { q: 'Tingkat kualitas apa?', a: 'Dapat diatur melalui opsi.' },
          { q: 'Bisa digabung dengan optimasi?', a: 'Ya, gunakan keduanya.' },
        ],
        tip: 'Untuk PDF hasil pindai, gunakan kompresi gambar pada gambar terintegrasi.',
      },
    },
  },
  {
    id: 'merge-pdf',
    slug: { en: 'merge-pdf', id: 'gabung-pdf' },
    category: 'pdf',
    engine: 'pdf-merge',
    accept: ['application/pdf'],
    icon: 'merge',
    featured: 3,
    sortable: true,
    options: {},
    related: ['optimize-pdf', 'compress-pdf'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'Merge PDF Files Online Free — Private PDF Merger',
        h1: 'Merge PDF files without uploading them',
        metaDescription: 'Combine multiple PDFs into one file in your browser. Reorder documents, keep page quality, and download instantly.',
        answerQuestion: 'How do I merge several PDF files into one?',
        shortAnswer: 'Add two or more PDFs, use the move buttons to set the order, and press Process. Toolabs copies every page into a new document inside your browser.',
        intro: 'Merging PDFs is one of the most common document tasks.',
        steps: ['Drop two or more PDF files, or select them from your device.', 'Reorder the list with the up and down buttons until the sequence is correct.', 'Press Process files. Toolabs merges the pages locally.', 'Check the total page count and the result size.', 'Download the merged PDF as a single file.'],
        benefits: ['Page content remains vector-based and searchable.', 'Reordering is explicit.'],
        useCases: ['Combining a CV, certificate, and cover letter into one application PDF.'],
        faq: [
          { q: 'In what order are the PDFs merged?', a: 'The order shown in the file list is the final order. Use the move up and move down buttons to change it.' },
          { q: 'Is there a limit on the number of PDFs?', a: 'You can add many files, but device memory is the real limit. A warning appears for files above 40 MB, and there is a hard 100 MB per-file check.' },
          { q: 'Will the merged PDF keep text search and links?', a: 'Yes. Pages are copied into a new PDF without being converted to images, so text remains selectable and searchable.' },
          { q: 'Can I merge password-protected PDFs?', a: 'No. Encrypted PDFs are rejected with a clear message. Open the file in your PDF reader, remove the password, save a copy, and then merge that copy.' },
          { q: 'Does merging reduce quality?', a: 'No. The pages are copied as they are, so there is no recompression.' },
          { q: 'Are my files uploaded to Toolabs?', a: 'No. The PDFs are read by your browser and processed in a Web Worker on your device.' },
        ],
        tip: 'If the portal requires a maximum file size, merge first, then use Compress PDF when available.',
      },
      id: {
        title: 'Gabung PDF Online Gratis — Tanpa Upload',
        h1: 'Gabungkan file PDF tanpa upload',
        metaDescription: 'Gabungkan beberapa PDF menjadi satu file di browser. Atur urutan dokumen, lalu unduh.',
        answerQuestion: 'Bagaimana cara menggabungkan beberapa file PDF menjadi satu?',
        shortAnswer: 'Tambahkan dua atau lebih PDF, atur urutannya, lalu tekan Proses. Toolabs menyalin setiap halaman ke dokumen baru di browser Anda.',
        intro: 'Menggabungkan PDF adalah tugas dokumen yang sangat umum.',
        steps: ['Letakkan dua atau lebih file PDF, atau pilih dari perangkat Anda.', 'Atur urutan dengan tombol naik dan turun hingga susunannya benar.', 'Tekan Proses file. Toolabs menggabungkan halaman secara lokal.', 'Periksa jumlah halaman dan ukuran hasil.', 'Unduh PDF gabungan sebagai satu file.'],
        benefits: ['Isi halaman tetap berbasis vektor dan bisa dicari.', 'Urutan diatur secara eksplisit.'],
        useCases: ['Menggabungkan CV, sertifikat, dan surat lamaran menjadi satu PDF.'],
        faq: [
          { q: 'Dalam urutan apa PDF digabungkan?', a: 'Urutan pada daftar file adalah urutan akhir. Gunakan tombol naik dan turun untuk mengubahnya.' },
          { q: 'Is there a limit on the number of PDFs?', a: 'You can add many files, but device memory is the real limit. A warning appears for files above 40 MB, and there is a hard 100 MB per-file check.' },
          { q: 'Will the merged PDF keep text search and links?', a: 'Yes. Pages are copied into a new PDF without being converted to images, so text remains selectable and searchable.' },
          { q: 'Can I merge password-protected PDFs?', a: 'No. Encrypted PDFs are rejected with a clear message. Open the file in your PDF reader, remove the password, save a copy, and then merge that copy.' },
          { q: 'Does merging reduce quality?', a: 'No. The pages are copied as they are, so there is no recompression.' },
          { q: 'Are my files uploaded to Toolabs?', a: 'No. The PDFs are read by your browser and processed in a Web Worker on your device.' },
        ],
        tip: 'If the portal requires a maximum file size, merge first, then use Compress PDF when available.',
      },
    },
  },
  // ===== QR CODE GENERATOR =====
  {
    id: 'pdf-to-word',
    slug: { en: 'pdf-to-word', id: 'pdf-ke-word' },
    category: 'pdf',
    engine: 'pdf-to-word',
    accept: ['application/pdf', '.pdf'],
    icon: 'pdf',
    featured: 4,
    options: {},
    related: ['merge-pdf', 'compress-pdf'],
    updatedAt: '2026-11-03',
    locale: {
      en: {
        title: 'PDF to Word Converter Free — No Upload',
        h1: 'Convert PDF to editable Word (DOCX) without uploading',
        metaDescription: 'Convert PDF to Word (.docx) in your browser. Text becomes editable paragraphs. Free, no signup, and your file never leaves your device.',
        answerQuestion: 'How do I convert a PDF to a Word document?',
        shortAnswer: 'Add your PDF and press Process. Toolabs reads the text and its position on every page inside your browser, rebuilds it as editable paragraphs and headings, and gives you a .docx file that opens in Microsoft Word, Google Docs, and LibreOffice.',
        intro: 'Toolabs reads the selectable text of your PDF, groups it into lines and paragraphs, and writes a standard DOCX file. Page size and page breaks are kept, and headings are detected from larger text. The conversion focuses on text: images, complex tables, and exact layouts are not reproduced, and scanned PDFs without a text layer need OCR first. Everything runs on your device, so contracts and personal documents are never uploaded.',
        steps: ['Drop a PDF file or select it from your device.', 'Press Process files. Toolabs extracts the text locally.', 'Wait for the progress bar to finish.', 'Download the .docx file and open it in Word, Google Docs, or LibreOffice.'],
        benefits: ['Your PDF is never uploaded to a server.', 'Text becomes editable paragraphs, not one text box per line.', 'Works with several PDFs in one batch.', 'Free, with no signup and no watermark.'],
        useCases: ['Editing a contract or letter that only exists as a PDF.', 'Copying a report into a document you can reformat.', 'Reusing text from a CV or application form.'],
        faq: [
          { q: 'Is my PDF uploaded to a server?', a: 'No. The file is read and converted by your browser on your device, and the DOCX is created locally. Toolabs never receives it.' },
          { q: 'Will the layout look exactly like the PDF?', a: 'Not exactly. Toolabs rebuilds paragraphs, headings, and page breaks from the text positions. Images, multi-column pages, and complex tables are not reproduced, so expect to adjust the formatting.' },
          { q: 'Why is my Word file empty or almost empty?', a: 'The PDF is probably a scan or a photo, so it has no selectable text. Toolabs shows a warning in that case. Scanned pages need OCR, which this tool does not do.' },
          { q: 'Can I convert a password-protected PDF?', a: 'No. Remove the password in your PDF reader, save a copy, and convert that copy.' },
          { q: 'Which programs open the DOCX file?', a: 'Microsoft Word, Google Docs, LibreOffice Writer, Apple Pages, and most other word processors.' },
          { q: 'Is there a file size limit?', a: 'There is no upload limit because nothing is uploaded, but very large PDFs depend on your device memory.' },
        ],
        tip: 'For the cleanest result, use a PDF exported from Word or another editor. Text-based PDFs convert far better than scans.',
      },
      id: {
        title: 'PDF ke Word Gratis — Tanpa Upload',
        h1: 'Ubah PDF ke Word (DOCX) yang bisa diedit tanpa upload',
        metaDescription: 'Ubah PDF ke Word (.docx) di browser. Teks menjadi paragraf yang bisa diedit. Gratis, tanpa daftar, file tidak keluar dari perangkat Anda.',
        answerQuestion: 'Bagaimana cara mengubah PDF menjadi dokumen Word?',
        shortAnswer: 'Tambahkan PDF lalu tekan Proses. Toolabs membaca teks beserta posisinya di setiap halaman langsung di browser, menyusunnya kembali menjadi paragraf dan judul yang bisa diedit, lalu memberi file .docx yang bisa dibuka di Microsoft Word, Google Docs, dan LibreOffice.',
        intro: 'Toolabs membaca teks PDF yang bisa dipilih, mengelompokkannya menjadi baris dan paragraf, lalu menulis file DOCX standar. Ukuran halaman dan pemisah halaman dipertahankan, dan judul dikenali dari teks yang lebih besar. Konversi berfokus pada teks: gambar, tabel kompleks, dan tata letak persis tidak direproduksi, dan PDF hasil pindai tanpa lapisan teks perlu OCR lebih dulu. Semua berjalan di perangkat Anda, sehingga kontrak dan dokumen pribadi tidak pernah diunggah.',
        steps: ['Letakkan file PDF atau pilih dari perangkat Anda.', 'Tekan Proses file. Toolabs mengekstrak teks secara lokal.', 'Tunggu hingga bilah progres selesai.', 'Unduh file .docx lalu buka di Word, Google Docs, atau LibreOffice.'],
        benefits: ['PDF Anda tidak pernah diunggah ke server.', 'Teks menjadi paragraf yang bisa diedit, bukan satu kotak teks per baris.', 'Bisa memproses beberapa PDF sekaligus.', 'Gratis, tanpa daftar dan tanpa watermark.'],
        useCases: ['Mengedit kontrak atau surat yang hanya tersedia dalam PDF.', 'Menyalin laporan ke dokumen yang bisa diformat ulang.', 'Memakai ulang teks dari CV atau formulir lamaran.'],
        faq: [
          { q: 'Apakah PDF saya diunggah ke server?', a: 'Tidak. File dibaca dan dikonversi oleh browser di perangkat Anda, dan DOCX dibuat secara lokal. Toolabs tidak pernah menerimanya.' },
          { q: 'Apakah tampilannya persis sama dengan PDF?', a: 'Tidak persis. Toolabs menyusun ulang paragraf, judul, dan pemisah halaman dari posisi teks. Gambar, halaman multi-kolom, dan tabel kompleks tidak direproduksi, jadi format perlu dirapikan.' },
          { q: 'Mengapa file Word saya kosong atau hampir kosong?', a: 'PDF kemungkinan hasil pindai atau foto, sehingga tidak punya teks yang bisa dipilih. Toolabs menampilkan peringatan pada kasus ini. Halaman pindai membutuhkan OCR, yang tidak tersedia di tool ini.' },
          { q: 'Bisakah mengonversi PDF yang diberi kata sandi?', a: 'Tidak. Hapus kata sandi di pembaca PDF, simpan salinannya, lalu konversi salinan tersebut.' },
          { q: 'Program apa yang bisa membuka file DOCX?', a: 'Microsoft Word, Google Docs, LibreOffice Writer, Apple Pages, dan sebagian besar pengolah kata lain.' },
          { q: 'Apakah ada batas ukuran file?', a: 'Tidak ada batas unggah karena tidak ada yang diunggah, tetapi PDF yang sangat besar bergantung pada memori perangkat Anda.' },
        ],
        tip: 'Untuk hasil terbaik, gunakan PDF yang diekspor dari Word atau editor lain. PDF berbasis teks jauh lebih baik daripada hasil pindai.',
      },
    },
  },
  {
    id: 'edit-pdf',
    slug: { en: 'edit-pdf', id: 'edit-pdf' },
    category: 'pdf',
    engine: 'pdf-editor',
    accept: ['application/pdf', '.pdf'],
    icon: 'pdf',
    featured: 5,
    options: {},
    related: ['pdf-to-word', 'merge-pdf', 'compress-pdf'],
    updatedAt: '2026-11-03',
    locale: {
      en: {
        title: 'Edit PDF Online Free — No Upload, No Signup',
        h1: 'Edit PDF files in your browser without uploading',
        metaDescription: 'Edit a PDF online: add text and images, replace existing text, highlight, redact, draw, delete and reorder pages. Free, private, no upload.',
        answerQuestion: 'How do I edit a PDF for free without uploading it?',
        shortAnswer: 'Open your PDF, pick a tool such as Add text, Edit text, Highlight, Redact, or Add image, click on the page, then download the edited file. Everything is applied by your browser on your device, so the document never goes to a server and no account is needed.',
        intro: 'This editor shows every page of your PDF and lets you place text and images, replace a line of existing text, highlight, white-out, or redact areas, draw freehand, delete pages, and change their order. Edits are written into a new PDF locally. Replacing existing text covers the original line in white and writes the new text with a standard font, so exact fonts are not preserved. Redaction flattens the affected page into an image so the hidden text cannot be recovered.',
        steps: ['Open a PDF from your device.', 'Choose a tool and click or drag on the page.', 'Use the page buttons to reorder or delete pages.', 'Press Download edited PDF.'],
        benefits: ['Your PDF never leaves your device.', 'Add text, images, highlights, drawings, and redactions.', 'Replace existing text with a few clicks.', 'Delete and reorder pages in the same place.'],
        useCases: ['Filling in a form or adding a signature image.', 'Fixing a typo or changing a date in a document.', 'Hiding a phone number or ID before sharing a file.'],
        faq: [
          { q: 'Is my PDF uploaded anywhere?', a: 'No. The file is read and edited inside your browser. The edited PDF is created locally and downloaded from your device.' },
          { q: 'Can I change existing text?', a: 'Yes. Use Edit text and click a line. The original line is covered in white and your new text is written on top using a standard font, so it may look slightly different from the original.' },
          { q: 'Is redaction really permanent?', a: 'Yes. Pages with a redaction are saved as images, so the covered text is removed rather than only hidden. The downside is that those pages are no longer searchable.' },
          { q: 'Why are some characters shown as question marks?', a: 'The built-in font supports Latin characters. Characters outside that set, such as Chinese or Arabic, are replaced with a question mark.' },
          { q: 'Can I edit a password-protected PDF?', a: 'No. Remove the password in your PDF reader, save a copy, and open that copy here.' },
          { q: 'Does it work on a phone?', a: 'Yes, with touch, although a larger screen makes precise placement easier.' },
        ],
        tip: 'Use White-out for a quick cover-up and Redact when the hidden content is sensitive.',
      },
      id: {
        title: 'Edit PDF Online Gratis — Tanpa Upload',
        h1: 'Edit file PDF di browser tanpa upload',
        metaDescription: 'Edit PDF online: tambah teks dan gambar, ganti teks yang ada, sorot, sensor, gambar, hapus dan urutkan halaman. Gratis, privat, tanpa upload.',
        answerQuestion: 'Bagaimana cara mengedit PDF gratis tanpa mengunggahnya?',
        shortAnswer: 'Buka PDF Anda, pilih alat seperti Tambah teks, Edit teks, Sorot, Sensor, atau Tambah gambar, klik pada halaman, lalu unduh file hasil edit. Semua diproses browser di perangkat Anda, sehingga dokumen tidak dikirim ke server dan tidak perlu akun.',
        intro: 'Editor ini menampilkan setiap halaman PDF dan memungkinkan Anda menempatkan teks dan gambar, mengganti baris teks yang ada, menyorot, menutup putih, atau menyensor area, menggambar bebas, menghapus halaman, serta mengubah urutannya. Hasil edit ditulis ke PDF baru secara lokal. Mengganti teks yang ada menutup baris asli dengan warna putih lalu menulis teks baru dengan font standar, sehingga font asli tidak dipertahankan persis. Sensor meratakan halaman terkait menjadi gambar sehingga teks tersembunyi tidak bisa dipulihkan.',
        steps: ['Buka PDF dari perangkat Anda.', 'Pilih alat lalu klik atau seret pada halaman.', 'Gunakan tombol halaman untuk mengurutkan atau menghapus halaman.', 'Tekan Unduh PDF hasil edit.'],
        benefits: ['PDF Anda tidak pernah keluar dari perangkat.', 'Tambah teks, gambar, sorotan, gambar bebas, dan sensor.', 'Ganti teks yang ada hanya dengan beberapa klik.', 'Hapus dan urutkan halaman di tempat yang sama.'],
        useCases: ['Mengisi formulir atau menambahkan gambar tanda tangan.', 'Memperbaiki salah ketik atau mengubah tanggal pada dokumen.', 'Menyembunyikan nomor telepon atau KTP sebelum berbagi file.'],
        faq: [
          { q: 'Apakah PDF saya diunggah ke suatu tempat?', a: 'Tidak. File dibaca dan diedit di dalam browser Anda. PDF hasil edit dibuat secara lokal dan diunduh dari perangkat Anda.' },
          { q: 'Bisakah mengubah teks yang sudah ada?', a: 'Bisa. Gunakan Edit teks lalu klik sebuah baris. Baris asli ditutup putih dan teks baru ditulis di atasnya dengan font standar, sehingga tampilannya bisa sedikit berbeda dari aslinya.' },
          { q: 'Apakah sensor benar-benar permanen?', a: 'Ya. Halaman yang disensor disimpan sebagai gambar, sehingga teks yang ditutup benar-benar hilang, bukan hanya disembunyikan. Konsekuensinya, halaman tersebut tidak lagi bisa dicari teksnya.' },
          { q: 'Mengapa beberapa karakter berubah menjadi tanda tanya?', a: 'Font bawaan mendukung karakter Latin. Karakter di luar itu, seperti Mandarin atau Arab, diganti dengan tanda tanya.' },
          { q: 'Bisakah mengedit PDF yang diberi kata sandi?', a: 'Tidak. Hapus kata sandi di pembaca PDF, simpan salinannya, lalu buka salinan itu di sini.' },
          { q: 'Apakah bisa dipakai di ponsel?', a: 'Bisa dengan layar sentuh, meski layar yang lebih besar memudahkan penempatan yang presisi.' },
        ],
        tip: 'Gunakan Tutup putih untuk menutup cepat dan Sensor jika isi yang disembunyikan bersifat sensitif.',
      },
    },
  },
  {
    id: 'translate-pdf',
    slug: { en: 'translate-pdf', id: 'terjemahkan-pdf' },
    category: 'pdf',
    engine: 'pdf-translate',
    accept: ['application/pdf', '.pdf'],
    icon: 'pdf',
    featured: 6,
    options: { sourceLang: 'en', targetLang: 'id' },
    related: ['pdf-to-word', 'edit-pdf', 'merge-pdf'],
    updatedAt: '2026-11-03',
    locale: {
      en: {
        title: 'Translate PDF Online Free — Private, In-Browser',
        h1: 'Translate PDF to another language without uploading',
        metaDescription: 'Translate a PDF to English, Indonesian, Spanish, French, German and more. The model runs in your browser, so your document is never uploaded.',
        answerQuestion: 'How do I translate a PDF without uploading it?',
        shortAnswer: 'Add your PDF, choose the source and target language, and press Process. A translation model downloads once and then runs inside your browser, translating the text of every page. You download the result as an editable Word (.docx) file, and the document never leaves your device.',
        intro: 'Most PDF translators send your document to a server. Toolabs runs an open translation model (Opus-MT) directly in your browser instead. The text of the PDF is extracted, translated paragraph by paragraph, and written into a Word file you can edit and save as PDF. English is the hub language: translating between two non-English languages goes through English, which takes longer and can lower quality. Machine translation is a good draft, not a certified translation, and the layout of the original PDF is not kept.',
        steps: ['Drop a PDF with selectable text.', 'Choose the source and target language.', 'Press Process files and wait for the model to download on first use.', 'Download the translated Word file.'],
        benefits: ['The document is never uploaded to a server.', 'No account, no page limit, and no watermark.', 'The result is an editable Word file.', 'The model is cached, so later translations start faster.'],
        useCases: ['Reading a foreign-language contract, manual, or article.', 'Getting a quick draft translation of a document.', 'Translating a private document you cannot send to an online service.'],
        faq: [
          { q: 'Is my PDF uploaded for translation?', a: 'No. The text is extracted and translated by a model that runs in your browser. Only the model files are downloaded, from a public model host, and your document is not sent anywhere.' },
          { q: 'Why does the first translation take long?', a: 'The model for your language pair has to download first, about 50 to 100 MB. Your browser caches it, so the next translation of that pair starts much faster.' },
          { q: 'Which languages are supported?', a: 'English, Indonesian, Spanish, French, German, Italian, Russian, Chinese, and Arabic as targets, plus Japanese as a source. Pairs without English are translated through English.' },
          { q: 'How good is the translation?', a: 'It is a machine translation from a compact model. It is good enough to understand a document, but check names, numbers, and legal terms. It is not a certified translation.' },
          { q: 'Can it translate a scanned PDF?', a: 'No. A scan is an image with no text to translate, and this tool does not do OCR. Toolabs warns you when it finds no selectable text.' },
          { q: 'Will the layout be preserved?', a: 'No. The output is a Word file with the translated paragraphs in reading order. Images, tables, and exact positioning from the PDF are not kept.' },
        ],
        tip: 'Translating to or from English gives the best quality. Close other heavy tabs for long documents.',
      },
      id: {
        title: 'Terjemahkan PDF Online Gratis — Privat di Browser',
        h1: 'Terjemahkan PDF ke bahasa lain tanpa upload',
        metaDescription: 'Terjemahkan PDF ke Inggris, Indonesia, Spanyol, Prancis, Jerman dan lainnya. Model berjalan di browser, dokumen Anda tidak pernah diunggah.',
        answerQuestion: 'Bagaimana cara menerjemahkan PDF tanpa mengunggahnya?',
        shortAnswer: 'Tambahkan PDF, pilih bahasa sumber dan tujuan, lalu tekan Proses. Model terjemahan diunduh sekali lalu berjalan di dalam browser, menerjemahkan teks di setiap halaman. Hasilnya berupa file Word (.docx) yang bisa diedit, dan dokumen tidak pernah keluar dari perangkat Anda.',
        intro: 'Kebanyakan penerjemah PDF mengirim dokumen Anda ke server. Toolabs justru menjalankan model terjemahan terbuka (Opus-MT) langsung di browser. Teks PDF diekstrak, diterjemahkan paragraf demi paragraf, lalu ditulis ke file Word yang bisa Anda edit dan simpan sebagai PDF. Bahasa Inggris menjadi bahasa perantara: terjemahan antara dua bahasa non-Inggris melewati bahasa Inggris, sehingga lebih lama dan kualitasnya bisa turun. Terjemahan mesin cocok sebagai draf, bukan terjemahan tersumpah, dan tata letak PDF asli tidak dipertahankan.',
        steps: ['Letakkan PDF yang teksnya bisa dipilih.', 'Pilih bahasa sumber dan bahasa tujuan.', 'Tekan Proses file dan tunggu model diunduh saat pertama kali dipakai.', 'Unduh file Word hasil terjemahan.'],
        benefits: ['Dokumen tidak pernah diunggah ke server.', 'Tanpa akun, tanpa batas halaman, dan tanpa watermark.', 'Hasilnya berupa file Word yang bisa diedit.', 'Model disimpan di cache sehingga terjemahan berikutnya lebih cepat dimulai.'],
        useCases: ['Membaca kontrak, manual, atau artikel berbahasa asing.', 'Mendapatkan draf terjemahan dokumen dengan cepat.', 'Menerjemahkan dokumen pribadi yang tidak boleh dikirim ke layanan online.'],
        faq: [
          { q: 'Apakah PDF saya diunggah untuk diterjemahkan?', a: 'Tidak. Teks diekstrak dan diterjemahkan oleh model yang berjalan di browser Anda. Hanya file model yang diunduh dari penyedia model publik, dan dokumen Anda tidak dikirim ke mana pun.' },
          { q: 'Mengapa terjemahan pertama lama?', a: 'Model untuk pasangan bahasa Anda harus diunduh dulu, sekitar 50 sampai 100 MB. Browser menyimpannya di cache, jadi terjemahan berikutnya untuk pasangan itu jauh lebih cepat dimulai.' },
          { q: 'Bahasa apa saja yang didukung?', a: 'Inggris, Indonesia, Spanyol, Prancis, Jerman, Italia, Rusia, Mandarin, dan Arab sebagai tujuan, ditambah Jepang sebagai sumber. Pasangan tanpa bahasa Inggris diterjemahkan lewat bahasa Inggris.' },
          { q: 'Seberapa bagus terjemahannya?', a: 'Ini terjemahan mesin dari model ringkas. Cukup untuk memahami dokumen, tetapi periksa nama, angka, dan istilah hukum. Ini bukan terjemahan tersumpah.' },
          { q: 'Bisakah menerjemahkan PDF hasil pindai?', a: 'Tidak. Hasil pindai adalah gambar tanpa teks untuk diterjemahkan, dan tool ini tidak melakukan OCR. Toolabs memberi peringatan jika tidak menemukan teks yang bisa dipilih.' },
          { q: 'Apakah tata letak dipertahankan?', a: 'Tidak. Hasilnya file Word berisi paragraf terjemahan sesuai urutan baca. Gambar, tabel, dan posisi persis dari PDF tidak dipertahankan.' },
        ],
        tip: 'Terjemahan dari atau ke bahasa Inggris memberi kualitas terbaik. Tutup tab berat lain untuk dokumen panjang.',
      },
    },
  },
  {
    id: 'qr-generator',
    slug: { en: 'qr-generator', id: 'generator-qr' },
    category: 'convert',
    engine: 'qr-generator',
    accept: ['text/plain', 'text'],
    icon: 'qr',
    featured: 8,
    options: { outputFormat: 'image/png' },
    related: ['image-converter', 'compress-image'],
    updatedAt: '2026-10-23',
    locale: {
      en: {
        title: 'QR Code Generator Online Free — Logo, Colors & SVG',
        h1: 'Generate QR codes with logo in your browser',
        metaDescription: 'Create QR codes for links, text, Wi-Fi, email, phone, WhatsApp, or vCard. Add a logo, choose colors and size, then export PNG or SVG locally. Free and private.',
        answerQuestion: 'How do I generate a QR code with logo?',
        shortAnswer: 'Choose a content type, fill in the details, and optionally add a logo. Adjust colors, margin, size, and error correction, then download a high-resolution PNG or a scalable SVG. Toolabs generates everything locally in your browser — your data is never uploaded.',
        intro: 'Create a QR code for a website, plain text, Wi-Fi network, email, phone number, WhatsApp chat, or contact card. Add a centered logo, pick your colors, and export a PNG for sharing or an SVG for print. A live preview updates as you type, and all processing happens on your device.',
        steps: [
          'Pick a content type and fill in the details.',
          'Optionally add a PNG, JPG, WebP, or SVG logo.',
          'Adjust colors, margin, size, and error correction.',
          'Check the live preview and scan-test it with your phone.',
          'Download the QR code as PNG or SVG.',
        ],
        benefits: [
          'Your content and logo stay on your device.',
          'Live preview before you download.',
          'Logo support with automatic high error correction.',
          'PNG for screens and SVG for crisp print output.',
        ],
        useCases: [
          'Print a QR code that links to your website.',
          'Add a branded QR code to a flyer or business card.',
          'Let guests join a Wi-Fi network without typing the password.',
          'Share a contact card, phone number, or WhatsApp chat.',
        ],
        faq: [
          { q: 'What content types can I encode?', a: 'Website URLs, plain text, Wi-Fi network details, email addresses, phone numbers, WhatsApp numbers, and vCard contact cards.' },
          { q: 'Can I put my logo in the QR code?', a: 'Yes. Choose a PNG, JPG, WebP, or SVG image and the generator places it in the center. You can set the logo size, add a light backdrop, and round the corners. Keeping the logo at or below 18% of the code width gives the best scan reliability.' },
          { q: 'Are my data and logo uploaded?', a: 'No. The QR code is generated entirely in your browser. Your content and logo are not sent to api.qrserver.com or any other QR service.' },
          { q: 'What file formats can I download?', a: 'You get a high-resolution PNG and a scalable SVG. Use PNG for messaging and slides, and SVG for printing or further editing.' },
          { q: 'Why is error correction set to H when I add a logo?', a: 'A centered logo covers some QR modules. Error correction level H can recover about 30% of the code, which keeps the link readable. Large logos or low-contrast colors can still make a code difficult to scan.' },
          { q: 'How can I check that my QR code works?', a: 'Scan the preview with a phone camera before printing or sharing it. Make sure the decoded content is exactly what you intended.' },
        ],
        tip: 'Keep the logo at or below 18% of the code width and scan-test the result before printing. Use SVG for print and PNG for quick sharing.',
      },
      id: {
        title: 'Generator QR Online Gratis — Logo, Warna & SVG',
        h1: 'Buat kode QR dengan logo di browser',
        metaDescription: 'Buat kode QR untuk tautan, teks, Wi-Fi, email, telepon, WhatsApp, atau vCard. Tambahkan logo, atur warna dan ukuran, lalu unduh PNG atau SVG secara lokal. Gratis dan privat.',
        answerQuestion: 'Bagaimana cara membuat kode QR dengan logo?',
        shortAnswer: 'Pilih jenis konten, isi detailnya, lalu tambahkan logo bila ingin. Atur warna, margin, ukuran, dan koreksi error, kemudian unduh PNG resolusi tinggi atau SVG yang bisa diperbesar. Toolabs membuat semuanya secara lokal di browser — data Anda tidak pernah diunggah.',
        intro: 'Buat kode QR untuk situs web, teks biasa, jaringan Wi-Fi, email, nomor telepon, chat WhatsApp, atau kartu kontak. Tambahkan logo di tengah, pilih warna, lalu ekspor PNG untuk dibagikan atau SVG untuk dicetak. Pratinjau langsung diperbarui saat Anda mengetik, dan semua proses berjalan di perangkat Anda.',
        steps: [
          'Pilih jenis konten dan isi detailnya.',
          'Opsional: tambahkan logo PNG, JPG, WebP, atau SVG.',
          'Atur warna, margin, ukuran, dan koreksi error.',
          'Periksa pratinjau langsung dan uji pindai dengan ponsel.',
          'Unduh kode QR sebagai PNG atau SVG.',
        ],
        benefits: [
          'Konten dan logo tetap di perangkat Anda.',
          'Pratinjau langsung sebelum mengunduh.',
          'Dukungan logo dengan koreksi error tinggi otomatis.',
          'PNG untuk layar dan SVG untuk hasil cetak yang tajam.',
        ],
        useCases: [
          'Mencetak kode QR yang mengarah ke situs Anda.',
          'Menambahkan QR berlogo ke selebaran atau kartu nama.',
          'Memudahkan tamu masuk ke jaringan Wi-Fi tanpa mengetik kata sandi.',
          'Membagikan kartu kontak, nomor telepon, atau chat WhatsApp.',
        ],
        faq: [
          { q: 'Jenis konten apa yang bisa dibuat?', a: 'URL situs, teks biasa, detail jaringan Wi-Fi, alamat email, nomor telepon, nomor WhatsApp, dan kartu kontak vCard.' },
          { q: 'Bisakah menambahkan logo di tengah kode QR?', a: 'Bisa. Pilih gambar PNG, JPG, WebP, atau SVG dan generator akan menempatkannya di tengah. Anda dapat mengatur ukuran logo, latar terang, dan sudut membulat. Agar mudah dipindai, jaga ukuran logo di bawah 18% lebar kode.' },
          { q: 'Apakah data dan logo saya diunggah?', a: 'Tidak. Kode QR dibuat sepenuhnya di browser Anda. Konten dan logo tidak dikirim ke api.qrserver.com atau layanan QR lainnya.' },
          { q: 'Format file apa yang bisa diunduh?', a: 'Anda mendapatkan PNG resolusi tinggi dan SVG yang dapat diperbesar. Gunakan PNG untuk pesan instan dan presentasi, serta SVG untuk cetak atau edit lebih lanjut.' },
          { q: 'Mengapa koreksi error menjadi H saat memakai logo?', a: 'Logo di tengah menutupi sebagian modul QR. Koreksi error tingkat H dapat memulihkan sekitar 30% kode sehingga tautan tetap terbaca. Logo besar atau warna berkontras rendah tetap dapat menyulitkan pemindaian.' },
          { q: 'Bagaimana memastikan kode QR berfungsi?', a: 'Pindai pratinjau dengan kamera ponsel sebelum dicetak atau dibagikan. Pastikan konten yang terbaca benar-benar sesuai keinginan Anda.' },
        ],
        tip: 'Jaga logo di bawah 18% lebar kode dan uji pindai sebelum mencetak. Gunakan SVG untuk cetak dan PNG untuk berbagi cepat.',
      },
    },
  },
];

const configuredToolIds = new Set(configuredTools.map((tool) => tool.id));
export const tools: Tool[] = [
  ...configuredTools,
  ...imageTools.filter((tool) => !configuredToolIds.has(tool.id)),
  ...convertTools.filter((tool) => !configuredToolIds.has(tool.id)),
];

export const imageToolGroups = [
  {
    name: { en: 'Compress Image', id: 'Kompres Gambar' },
    toolIds: ['compress-image', 'compress-jpg', 'compress-jpeg', 'compress-png', 'compress-webp', 'compress-gif', 'compress-heic'],
  },
  {
    name: { en: 'Convert Image', id: 'Konversi Gambar' },
    toolIds: ['image-to-jpg', 'image-to-jpeg', 'image-to-png', 'image-to-webp', 'image-to-heic', 'gif-to-jpg', 'heic-to-jpg'],
  },
  {
    name: { en: 'Edit Image', id: 'Edit Gambar' },
    toolIds: ['resize-image', 'resize-photo', 'resize-photo-r', 'image-crop', 'image-crop-circle', 'image-rotate', 'image-merge'],
  },
] as const;

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
