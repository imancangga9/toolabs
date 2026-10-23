import type { Locale } from '../config';

export type StaticPageKey = 'about' | 'privacy' | 'terms' | 'contact' | 'glossary';

export type StaticBlock = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
};

export type StaticPage = {
  title: string;
  h1: string;
  metaDescription: string;
  intro: string;
  updatedAt: string;
  blocks: StaticBlock[];
};

export const staticPagePaths: Record<StaticPageKey, Record<Locale, string>> = {
  about: { en: '/about', id: '/id/tentang' },
  privacy: { en: '/privacy', id: '/id/privasi' },
  terms: { en: '/terms', id: '/id/syarat' },
  contact: { en: '/contact', id: '/id/kontak' },
  glossary: { en: '/glossary', id: '/id/glosarium' },
};

const en: Record<StaticPageKey, StaticPage> = {
  about: {
    title: 'About Toolabs — Private File Tools Built for the Browser',
    h1: 'File tools should not require blind trust',
    metaDescription:
      'Toolabs is a free collection of image and PDF tools that run entirely in your browser. Learn why we built it, how local processing works, and what we do not do.',
    intro:
      'Toolabs is a small, independent project with a simple premise: the file you need to compress or convert should not have to leave your device just to get the job done.',
    updatedAt: '2026-10-21',
    blocks: [
      {
        heading: 'Why we built Toolabs',
        paragraphs: [
          'Most “free online tools” are free because the file is the product. A document is uploaded, stored for an unknown period, and sometimes used to train models or sold as part of an aggregated dataset. The interface rarely explains this clearly, and the privacy policy is often longer than the task itself.',
          'Modern browsers can do many of these jobs without a server. Canvas can resize and re-encode images. Web Workers can keep the interface responsive while compression runs. pdf-lib can merge and split PDF pages. WebAssembly can decode HEIC photos. Toolabs packages those capabilities into a clean, bilingual interface.',
          'The result is not only more private. It is often faster. There is no upload, no queue, and no round trip. On a slow connection, that difference is dramatic.',
        ],
      },
      {
        heading: 'What “local processing” means here',
        bullets: [
          'Files are selected through the browser’s file picker or drag-and-drop. They are read with the File API.',
          'Image work runs in a Web Worker using Canvas or OffscreenCanvas. PDF work uses pdf-lib, with PDF.js for rendering pages to JPG.',
          'The site has no endpoint that accepts image or PDF uploads. There is no account, cloud storage, or processing queue.',
          'Closing the tab releases the files from the browser’s memory. Downloads are generated from a local Blob URL.',
          'The interface is static HTML with small JavaScript islands. Analytics, when enabled, never receive file names or file contents.',
        ],
      },
      {
        heading: 'What we deliberately do not do',
        paragraphs: [
          'Toolabs does not offer social-media downloaders. Those tools usually depend on scraping platforms against their terms, break constantly, and create legal and ethical problems that are not worth the convenience.',
          'We also do not pretend that every file task can run locally. Optical character recognition, Office-to-PDF conversion, and heavy video transcoding may need a server. If those tools are added later, they will be labelled clearly and will not be mixed silently with the private tools.',
        ],
      },
      {
        heading: 'Who the tools are for',
        bullets: [
          'People applying for jobs, scholarships, or government services who need a photo under a specific size limit.',
          'Small teams that need to merge or split a contract without sending it to a third-party converter.',
          'Anyone who receives HEIC photos from an iPhone and needs a JPG that other software will open.',
          'Privacy-conscious users who want to verify that a tool works offline.',
        ],
      },
      {
        heading: 'How the project is funded',
        paragraphs: [
          'Toolabs is free to use and funded by advertising delivered by Google AdSense. Ads are clearly separated from the tools, are labelled, and never involve uploading your files. Document content will never be placed behind an account or a paywall.',
        ],
      },
      {
        heading: 'Corrections and contact',
        paragraphs: [
          'If a guide is inaccurate, a tool fails on a file it should handle, or a translated sentence reads badly, tell us. Small, specific reports are the most useful: browser, operating system, file type, and what happened. You can reach the team through the contact page.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy — Toolabs',
    h1: 'Privacy policy',
    metaDescription:
      'How Toolabs handles files, analytics, advertising cookies, server logs, and local storage. Your images and PDFs are processed in your browser and are never uploaded.',
    intro:
      'The short version: your files are processed on your device. Toolabs does not receive, store, or inspect the images and PDFs you use with the tools. This page explains the limited data that a website still needs to operate.',
    updatedAt: '2026-10-23',
    blocks: [
      {
        heading: 'Files you process',
        paragraphs: [
          'When you add a file, your browser reads it locally. Image compression, resizing, format conversion, PDF merging, splitting, rotation, and JPG rendering all happen inside your browser. The file is not sent to Toolabs or to a processing API.',
          'There is no upload endpoint for user files on this site. Downloads are created from data held in the page’s memory. When you close or reload the tab, the working data is released. Toolabs cannot recover a file you processed, because it never had a copy.',
        ],
      },
      {
        heading: 'Information collected automatically',
        paragraphs: [
          'Like most websites, Toolabs is served through a hosting provider and a content delivery network. These providers may process technical request data such as IP address, browser type, requested URL, timestamp, and security signals. This data is used to deliver the site, prevent abuse, and keep the service available.',
          'The site is designed to be served as static files. It does not have a user database, login system, or file storage bucket. Server logs do not contain the contents of files processed in your browser.',
        ],
      },
      {
        heading: 'Analytics',
        paragraphs: [
          'Toolabs may use privacy-conscious, aggregated measurement to understand which tools are useful. Analytics events are limited to things such as the tool identifier, file count, output format, file size, and whether a target size was reached. File names, file contents, and document text are never included.',
          'If Google Tag Manager or a similar measurement tool is enabled in a deployment, it may set cookies or similar identifiers according to that provider’s policies. When no measurement ID is configured, the production build does not load third-party analytics scripts.',
        ],
      },
      {
        heading: 'Advertising',
        paragraphs: [
          'Toolabs is supported by Google AdSense. When ads are enabled, Google and its partners may use cookies, device identifiers, and approximate location to select, cap, and measure ads. Ads are labelled and kept separate from the tools. The images and PDFs you process in your browser are never sent to Google or to an advertiser.',
          'You can read how Google uses information from sites that use its services at policies.google.com/technologies/partner-sites and manage personalised advertising at adssettings.google.com. In regions that require it, a consent message appears before advertising cookies are set, and you can change your choice through that message.',
        ],
      },
      {
        heading: 'Local storage',
        bullets: [
          'localStorage may store the language you selected, under a key such as toolabs-lang, so the site can respect your choice.',
          'sessionStorage may store a flag when you dismiss the language suggestion banner for the current session.',
          'These values stay in your browser. They are not sent to Toolabs as part of file processing.',
        ],
      },
      {
        heading: 'Third-party links',
        paragraphs: [
          'Guides may link to other websites, standards, or documentation. Once you follow an external link, that website’s privacy policy applies. Toolabs does not control those sites and does not send your files to them.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'Toolabs is a general-purpose utility site and is not directed at children under 13. We do not knowingly collect personal information from children. Because files are processed locally, using a tool does not create an account or profile.',
        ],
      },
      {
        heading: 'Your choices',
        bullets: [
          'You can use the tools with JavaScript enabled and disconnect from the internet after the page loads; local processing should continue to work.',
          'You can clear localStorage and sessionStorage in your browser settings to remove saved preferences.',
          'You can block analytics and advertising scripts with a browser extension or content blocker. The tools do not depend on them.',
          'You can opt out of personalised advertising in Google Ads Settings or at aboutads.info/choices.',
          'You can contact us to ask a privacy question or report a concern.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'If the way the site handles data changes, this page will be updated and the date at the top will change. Material changes will be described in plain language rather than hidden in a new paragraph. Continued use after an update means you accept the revised policy.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Use — Toolabs',
    h1: 'Terms of use',
    metaDescription:
      'The terms that apply when you use Toolabs. Free browser-based tools, no account required, and no warranty for files you choose to process.',
    intro:
      'These terms keep expectations clear. Toolabs is a free utility. You keep ownership of your files, and you are responsible for checking that a result is suitable for its destination.',
    updatedAt: '2026-10-21',
    blocks: [
      {
        heading: 'Using the service',
        paragraphs: [
          'Toolabs provides browser-based file utilities. You may use them for personal or commercial work at no charge. You do not need an account. You are responsible for the files you select and for having the right to process them.',
        ],
      },
      {
        heading: 'Acceptable use',
        bullets: [
          'Do not use the service to process material you do not have permission to use.',
          'Do not attempt to disrupt the site, bypass security controls, or automate requests in a way that degrades service for others.',
          'Do not misrepresent Toolabs output as a certified, legal, or officially compliant document. Always verify requirements with the receiving organization.',
          'Do not use the site for unlawful activity or to infringe intellectual property rights.',
        ],
      },
      {
        heading: 'Your files and results',
        paragraphs: [
          'Files are processed locally in your browser. Toolabs does not claim ownership of your files or of the results you create. You are responsible for keeping backups. Because processing happens on your device, a browser crash, an out-of-memory error, or a closed tab can lose unsaved work.',
          'Compression and conversion can change quality, dimensions, metadata, and compatibility. Check the result before submitting it to a portal, employer, court, or government service. A file that opens in one application may not open in another.',
        ],
      },
      {
        heading: 'No warranty',
        paragraphs: [
          'The service is provided “as is” and “as available.” To the extent permitted by law, Toolabs makes no warranty that a tool will be uninterrupted, error-free, or suitable for a particular purpose. Some browsers, devices, and file variants may not be supported.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the extent permitted by law, Toolabs is not liable for indirect, incidental, special, or consequential damages arising from use of the service, including lost files, missed deadlines, rejected applications, or loss of data. Nothing in these terms excludes liability that cannot legally be excluded.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'The Toolabs name, design, interface, and original written content are protected by applicable intellectual property laws. You may link to the site and quote short passages with attribution. Do not copy the full site or present it as your own service.',
        ],
      },
      {
        heading: 'Changes and availability',
        paragraphs: [
          'Tools may be added, changed, or removed. Free access is not a guarantee of permanent availability. If a feature depends on a third-party library or browser capability, it may change when that dependency changes. We aim to describe limitations honestly rather than hide them.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Questions about these terms can be sent through the contact page. Include the tool name and a clear description of the issue so the message can be routed correctly.',
        ],
      },
    ],
  },
  contact: {
    title: 'Contact Toolabs — Feedback, Bugs, and Privacy Questions',
    h1: 'Contact Toolabs',
    metaDescription:
      'Report a bug, suggest a tool, or ask a privacy question. Contact the Toolabs team by email. Please do not send confidential files.',
    intro:
      'Toolabs is a small project, and specific feedback is genuinely useful. Tell us what you were trying to do, which browser you used, and what went wrong.',
    updatedAt: '2026-10-21',
    blocks: [
      {
        heading: 'Email',
        paragraphs: [
          'Write to hello@toolabs.com. We aim to reply within two business days. Messages about a broken tool should include the browser version, operating system, file type, approximate file size, and the exact error message if one appeared.',
        ],
      },
      {
        heading: 'What not to send',
        paragraphs: [
          'Do not attach passports, identity cards, contracts, medical records, or other confidential documents. A screenshot of the error is usually enough. If a file is essential to reproduce a bug, create a harmless sample that shows the same problem.',
        ],
      },
      {
        heading: 'Bug reports',
        bullets: [
          'Which tool were you using, and what did you expect to happen?',
          'Which browser and version, on which operating system?',
          'Did the file type and size match the tool’s accepted formats?',
          'Did the problem happen once, or every time with that file?',
          'Was the page loaded from the live site or a local preview?',
        ],
      },
      {
        heading: 'Tool suggestions',
        paragraphs: [
          'Suggestions are welcome, especially when they can run locally in a browser. Tools that require a server, an account, or access to another platform’s private data are less likely to fit the project. Social-media downloaders are intentionally out of scope.',
        ],
      },
      {
        heading: 'Privacy and security',
        paragraphs: [
          'For a privacy question, say which page or behavior prompted it. If you believe you have found a security issue, describe the impact and the steps to reproduce it without accessing other people’s data. Please give us a reasonable chance to fix the issue before publishing details.',
        ],
      },
      {
        heading: 'Corrections',
        paragraphs: [
          'Guides are checked against current browser behavior, but formats and portal rules change. If a sentence is wrong or a size recommendation is outdated, send the page URL and the correction. Accurate content matters more than defending an old paragraph.',
        ],
      },
    ],
  },
  glossary: {
    title: 'File Format Glossary — JPG, PNG, WebP, HEIC, PDF',
    h1: 'File format glossary',
    metaDescription:
      'Plain-language definitions of JPG, PNG, WebP, HEIC, PDF, EXIF, DPI, lossy compression, and other terms used in Toolabs guides.',
    intro:
      'A short reference for the formats and concepts that come up when compressing images or working with PDFs. Definitions are practical rather than exhaustive.',
    updatedAt: '2026-10-21',
    blocks: [
      {
        heading: 'Image formats',
        table: {
          headers: ['Term', 'What it means', 'When it matters'],
          rows: [
            ['JPG / JPEG', 'A lossy image format designed for photographs. It discards some detail to make files smaller.', 'Best for photos and portals that only accept JPG. Not ideal for sharp text or transparency.'],
            ['PNG', 'A lossless image format that supports transparency and sharp edges.', 'Good for logos, screenshots, and graphics. Usually much larger than JPG for photographs.'],
            ['WebP', 'A modern format from Google that supports lossy and lossless modes plus transparency.', 'Often 20–35% smaller than JPG at similar quality, but some older systems reject it.'],
            ['HEIC / HEIF', 'A container format used by recent iPhones for photos and short videos.', 'Needs conversion before many websites and Windows apps will accept it.'],
            ['GIF', 'An older format limited to 256 colors and simple animation.', 'Fine for small animations, poor for photographs.'],
            ['SVG', 'A vector format made of shapes and paths rather than pixels.', 'Scales without blur. Not a photo format and not accepted by most image upload forms.'],
          ],
        },
      },
      {
        heading: 'Compression and quality',
        bullets: [
          'Lossy compression permanently removes some data to reduce file size. JPG and WebP use it.',
          'Lossless compression preserves every pixel while encoding the file more efficiently. PNG uses it.',
          'Quality is an encoder setting, not a universal measurement. A 90% JPG in one encoder may not match 90% in another.',
          'Target size is the maximum file size you need, such as 100 KB. A tool should reach it without silently producing an unusable image.',
          'EXIF is metadata stored in many photos: camera model, capture time, orientation, and sometimes GPS coordinates. Re-encoding through a canvas usually removes it.',
          'DPI (dots per inch) describes intended print density. It does not change the pixel dimensions of a file by itself. A 3×4 cm photo at 300 DPI is about 354 × 472 pixels.',
        ],
      },
      {
        heading: 'PDF terms',
        table: {
          headers: ['Term', 'What it means', 'When it matters'],
          rows: [
            ['PDF', 'A document format that describes pages, text, images, and sometimes forms and links.', 'The standard for applications, contracts, and scanned documents.'],
            ['Merge', 'Combine several PDFs into one document, usually by appending pages in file order.', 'Useful for joining a cover letter, ID scan, and certificate into one upload.'],
            ['Split', 'Extract pages or page ranges into separate PDF files.', 'Useful for sending only the relevant pages of a long report.'],
            ['Rotate', 'Change the page orientation by 90, 180, or 270 degrees.', 'Fixes sideways scans without editing the original content.'],
            ['Encrypted PDF', 'A PDF that requires a password or has restrictions applied.', 'Most browser tools cannot open it until the password is removed in a PDF reader.'],
            ['OCR', 'Optical character recognition, which turns an image of text into selectable text.', 'Not the same as converting to PDF. OCR usually needs a dedicated engine and may require a server for large files.'],
          ],
        },
      },
      {
        heading: 'Size units',
        bullets: [
          '1 KB is commonly 1,024 bytes in file-size contexts. Some systems use 1,000 bytes.',
          '1 MB is commonly 1,024 KB, or 1,048,576 bytes.',
          'A portal that says “under 2 MB” may calculate the limit differently. Aim slightly below the stated number.',
          'File size is not the same as image dimensions. A small file can contain a large pixel canvas, and a large file can contain a small one.',
        ],
      },
    ],
  },
};

const id: Record<StaticPageKey, StaticPage> = {
  about: {
    title: 'Tentang Toolabs — Tool File Privat di Browser',
    h1: 'Tool file seharusnya tidak menuntut kepercayaan buta',
    metaDescription:
      'Toolabs adalah kumpulan tool gambar dan PDF gratis yang berjalan sepenuhnya di browser. Pelajari alasan kami membangunnya, cara kerja lokal, dan batasannya.',
    intro:
      'Toolabs adalah proyek independen kecil dengan premis sederhana: file yang perlu dikompres atau dikonversi tidak harus meninggalkan perangkat Anda hanya agar pekerjaannya selesai.',
    updatedAt: '2026-10-21',
    blocks: [
      {
        heading: 'Mengapa Toolabs dibuat',
        paragraphs: [
          'Sebagian besar “tool online gratis” gratis karena file Anda adalah produknya. Dokumen diunggah, disimpan tanpa durasi yang jelas, dan kadang dipakai untuk melatih model atau dijual sebagai bagian dari kumpulan data. Antarmuka jarang menjelaskannya, dan kebijakan privasi sering lebih panjang daripada tugas itu sendiri.',
          'Browser modern dapat melakukan banyak pekerjaan ini tanpa server. Canvas dapat mengubah ukuran dan mengodekan ulang gambar. Web Worker menjaga antarmuka tetap responsif saat kompresi berjalan. pdf-lib dapat menggabungkan dan memisahkan halaman PDF. WebAssembly dapat membuka foto HEIC. Toolabs mengemas kemampuan itu menjadi antarmuka bilingual yang bersih.',
          'Hasilnya bukan hanya lebih privat, tetapi sering lebih cepat. Tidak ada unggahan, antrean, atau perjalanan bolak-balik ke server. Pada koneksi lambat, perbedaannya sangat terasa.',
        ],
      },
      {
        heading: 'Arti “pemrosesan lokal” di sini',
        bullets: [
          'File dipilih melalui pemilih file browser atau drag-and-drop, lalu dibaca dengan File API.',
          'Pekerjaan gambar berjalan di Web Worker menggunakan Canvas atau OffscreenCanvas. Pekerjaan PDF memakai pdf-lib, dengan PDF.js untuk merender halaman menjadi JPG.',
          'Situs tidak memiliki endpoint yang menerima unggahan gambar atau PDF. Tidak ada akun, penyimpanan cloud, atau antrean pemrosesan.',
          'Menutup tab melepaskan file dari memori browser. Unduhan dibuat dari Blob URL lokal.',
          'Antarmuka berupa HTML statis dengan pulau JavaScript kecil. Analitik, jika diaktifkan, tidak pernah menerima nama atau isi file.',
        ],
      },
      {
        heading: 'Yang sengaja tidak kami lakukan',
        paragraphs: [
          'Toolabs tidak menyediakan pengunduh media sosial. Tool semacam itu biasanya bergantung pada scraping platform yang melanggar ketentuan, sering rusak, dan menimbulkan masalah hukum serta etika yang tidak sebanding dengan kemudahannya.',
          'Kami juga tidak berpura-pura semua tugas file bisa berjalan lokal. Pengenalan teks (OCR), konversi Office ke PDF, dan transcoding video berat mungkin memerlukan server. Jika fitur seperti itu ditambahkan nanti, akan diberi label jelas dan tidak dicampur diam-diam dengan tool privat.',
        ],
      },
      {
        heading: 'Untuk siapa tool ini',
        bullets: [
          'Pelamar kerja, beasiswa, atau layanan pemerintah yang perlu foto di bawah batas ukuran tertentu.',
          'Tim kecil yang perlu menggabungkan atau memisahkan kontrak tanpa mengirimnya ke konverter pihak ketiga.',
          'Siapa pun yang menerima foto HEIC dari iPhone dan membutuhkan JPG yang bisa dibuka aplikasi lain.',
          'Pengguna yang peduli privasi dan ingin memastikan tool tetap bekerja secara offline.',
        ],
      },
      {
        heading: 'Cara proyek ini dibiayai',
        paragraphs: [
          'Toolabs gratis digunakan dan didukung oleh iklan dari Google AdSense. Iklan dipisahkan jelas dari tool, diberi label, dan tidak pernah melibatkan unggahan file Anda. Konten dokumen tidak akan ditempatkan di balik akun atau paywall.',
        ],
      },
      {
        heading: 'Koreksi dan kontak',
        paragraphs: [
          'Jika panduan tidak akurat, tool gagal pada file yang seharusnya didukung, atau terjemahan terasa janggal, beri tahu kami. Laporan kecil dan spesifik paling berguna: browser, sistem operasi, jenis file, dan apa yang terjadi. Anda dapat menghubungi tim melalui halaman kontak.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Kebijakan Privasi — Toolabs',
    h1: 'Kebijakan privasi',
    metaDescription:
      'Cara Toolabs menangani file, analitik, cookie iklan, log server, dan penyimpanan lokal. Gambar dan PDF Anda diproses di browser dan tidak pernah diunggah.',
    intro:
      'Versi singkatnya: file Anda diproses di perangkat Anda. Toolabs tidak menerima, menyimpan, atau memeriksa gambar dan PDF yang Anda gunakan. Halaman ini menjelaskan data terbatas yang tetap dibutuhkan situs untuk beroperasi.',
    updatedAt: '2026-10-23',
    blocks: [
      {
        heading: 'File yang Anda proses',
        paragraphs: [
          'Saat Anda menambahkan file, browser membacanya secara lokal. Kompresi gambar, perubahan ukuran, konversi format, penggabungan PDF, pemisahan, rotasi, dan render JPG semuanya terjadi di dalam browser. File tidak dikirim ke Toolabs atau ke API pemrosesan.',
          'Tidak ada endpoint unggahan untuk file pengguna di situs ini. Unduhan dibuat dari data yang tersimpan di memori halaman. Saat tab ditutup atau dimuat ulang, data kerja dilepaskan. Toolabs tidak dapat memulihkan file yang Anda proses karena memang tidak pernah memiliki salinannya.',
        ],
      },
      {
        heading: 'Informasi yang dikumpulkan otomatis',
        paragraphs: [
          'Seperti sebagian besar situs, Toolabs disajikan melalui penyedia hosting dan jaringan pengiriman konten. Penyedia tersebut dapat memproses data permintaan teknis seperti alamat IP, jenis browser, URL yang diminta, waktu, dan sinyal keamanan. Data ini digunakan untuk mengirim situs, mencegah penyalahgunaan, dan menjaga layanan tetap tersedia.',
          'Situs dirancang sebagai file statis. Tidak ada basis data pengguna, sistem login, atau penyimpanan file. Log server tidak berisi isi file yang diproses di browser Anda.',
        ],
      },
      {
        heading: 'Analitik',
        paragraphs: [
          'Toolabs dapat menggunakan pengukuran agregat yang ramah privasi untuk memahami tool mana yang berguna. Peristiwa analitik terbatas pada hal seperti pengenal tool, jumlah file, format keluaran, ukuran file, dan apakah target ukuran tercapai. Nama file, isi file, dan teks dokumen tidak pernah disertakan.',
          'Jika Google Tag Manager atau alat pengukuran serupa diaktifkan dalam suatu deployment, alat tersebut dapat menetapkan cookie atau pengenal serupa sesuai kebijakan penyedianya. Ketika tidak ada ID pengukuran yang dikonfigurasi, build produksi tidak memuat skrip analitik pihak ketiga.',
        ],
      },
      {
        heading: 'Iklan',
        paragraphs: [
          'Toolabs didukung oleh Google AdSense. Saat iklan aktif, Google dan mitranya dapat menggunakan cookie, pengenal perangkat, dan perkiraan lokasi untuk memilih, membatasi, dan mengukur iklan. Iklan diberi label dan dipisahkan dari tool. Gambar dan PDF yang Anda proses di browser tidak pernah dikirim ke Google atau pengiklan.',
          'Anda dapat membaca cara Google menggunakan informasi dari situs yang memakai layanannya di policies.google.com/technologies/partner-sites dan mengatur iklan yang dipersonalisasi di adssettings.google.com. Di wilayah yang mewajibkannya, pesan persetujuan muncul sebelum cookie iklan dipasang, dan pilihan Anda dapat diubah melalui pesan tersebut.',
        ],
      },
      {
        heading: 'Penyimpanan lokal',
        bullets: [
          'localStorage dapat menyimpan bahasa yang Anda pilih, dengan kunci seperti toolabs-lang, agar situs menghormati pilihan tersebut.',
          'sessionStorage dapat menyimpan penanda saat Anda menutup banner saran bahasa untuk sesi berjalan.',
          'Nilai ini tetap di browser Anda dan tidak dikirim ke Toolabs sebagai bagian dari pemrosesan file.',
        ],
      },
      {
        heading: 'Tautan pihak ketiga',
        paragraphs: [
          'Panduan dapat menautkan ke situs, standar, atau dokumentasi lain. Setelah Anda mengikuti tautan eksternal, kebijakan privasi situs tersebut berlaku. Toolabs tidak mengontrol situs itu dan tidak mengirim file Anda ke sana.',
        ],
      },
      {
        heading: 'Anak-anak',
        paragraphs: [
          'Toolabs adalah situs utilitas umum dan tidak ditujukan untuk anak di bawah 13 tahun. Kami tidak dengan sengaja mengumpulkan informasi pribadi anak. Karena file diproses secara lokal, menggunakan tool tidak membuat akun atau profil.',
        ],
      },
      {
        heading: 'Pilihan Anda',
        bullets: [
          'Anda dapat menggunakan tool dengan JavaScript aktif lalu memutus koneksi internet setelah halaman dimuat; pemrosesan lokal seharusnya tetap bekerja.',
          'Anda dapat menghapus localStorage dan sessionStorage melalui pengaturan browser untuk menghilangkan preferensi tersimpan.',
          'Anda dapat memblokir skrip analitik dan iklan dengan ekstensi browser atau pemblokir konten. Tool tidak bergantung padanya.',
          'Anda dapat menolak iklan yang dipersonalisasi melalui Setelan Iklan Google atau di aboutads.info/choices.',
          'Anda dapat menghubungi kami untuk menanyakan privasi atau melaporkan kekhawatiran.',
        ],
      },
      {
        heading: 'Perubahan kebijakan ini',
        paragraphs: [
          'Jika cara situs menangani data berubah, halaman ini akan diperbarui dan tanggal di bagian atas akan berubah. Perubahan material akan dijelaskan dengan bahasa yang jelas, bukan disembunyikan dalam paragraf baru. Penggunaan berkelanjutan setelah pembaruan berarti Anda menerima kebijakan yang direvisi.',
        ],
      },
    ],
  },
  terms: {
    title: 'Syarat Penggunaan — Toolabs',
    h1: 'Syarat penggunaan',
    metaDescription:
      'Syarat yang berlaku saat menggunakan Toolabs. Tool gratis berbasis browser, tanpa akun, dan tanpa jaminan untuk file yang Anda proses.',
    intro:
      'Syarat ini menjaga ekspektasi tetap jelas. Toolabs adalah utilitas gratis. Anda tetap memiliki file Anda, dan Anda bertanggung jawab memastikan hasilnya sesuai tujuan.',
    updatedAt: '2026-10-21',
    blocks: [
      {
        heading: 'Menggunakan layanan',
        paragraphs: [
          'Toolabs menyediakan utilitas file berbasis browser. Anda boleh menggunakannya untuk pekerjaan pribadi atau komersial tanpa biaya. Tidak perlu akun. Anda bertanggung jawab atas file yang dipilih dan memastikan Anda berhak memprosesnya.',
        ],
      },
      {
        heading: 'Penggunaan yang dapat diterima',
        bullets: [
          'Jangan menggunakan layanan untuk memproses materi yang tidak Anda miliki izinnya.',
          'Jangan mencoba mengganggu situs, melewati kontrol keamanan, atau mengotomatiskan permintaan hingga merugikan pengguna lain.',
          'Jangan menyatakan hasil Toolabs sebagai dokumen resmi, bersertifikat, atau otomatis memenuhi syarat hukum. Selalu verifikasi persyaratan dengan organisasi penerima.',
          'Jangan menggunakan situs untuk aktivitas melanggar hukum atau pelanggaran hak kekayaan intelektual.',
        ],
      },
      {
        heading: 'File dan hasil Anda',
        paragraphs: [
          'File diproses secara lokal di browser. Toolabs tidak mengklaim kepemilikan atas file atau hasil yang Anda buat. Anda bertanggung jawab menyimpan cadangan. Karena pemrosesan terjadi di perangkat Anda, crash browser, kehabisan memori, atau tab yang tertutup dapat menghilangkan pekerjaan yang belum disimpan.',
          'Kompresi dan konversi dapat mengubah kualitas, dimensi, metadata, dan kompatibilitas. Periksa hasil sebelum dikirim ke portal, perusahaan, pengadilan, atau layanan pemerintah. File yang terbuka di satu aplikasi belum tentu terbuka di aplikasi lain.',
        ],
      },
      {
        heading: 'Tanpa jaminan',
        paragraphs: [
          'Layanan disediakan “sebagaimana adanya” dan “sebagaimana tersedia.” Sejauh diizinkan hukum, Toolabs tidak menjamin tool akan selalu berjalan tanpa gangguan, bebas kesalahan, atau cocok untuk tujuan tertentu. Sebagian browser, perangkat, dan varian file mungkin tidak didukung.',
        ],
      },
      {
        heading: 'Batasan tanggung jawab',
        paragraphs: [
          'Sejauh diizinkan hukum, Toolabs tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan layanan, termasuk file hilang, tenggat terlewat, lamaran ditolak, atau kehilangan data. Tidak ada ketentuan yang mengecualikan tanggung jawab yang secara hukum tidak dapat dikecualikan.',
        ],
      },
      {
        heading: 'Kekayaan intelektual',
        paragraphs: [
          'Nama, desain, antarmuka, dan konten tulisan asli Toolabs dilindungi hukum kekayaan intelektual yang berlaku. Anda boleh menautkan situs dan mengutip bagian singkat dengan atribusi. Jangan menyalin seluruh situs atau menyajikannya sebagai layanan milik Anda.',
        ],
      },
      {
        heading: 'Perubahan dan ketersediaan',
        paragraphs: [
          'Tool dapat ditambahkan, diubah, atau dihapus. Akses gratis bukan jaminan ketersediaan permanen. Jika fitur bergantung pada library pihak ketiga atau kemampuan browser, fitur tersebut dapat berubah saat dependensinya berubah. Kami berusaha menjelaskan batasan secara jujur, bukan menyembunyikannya.',
        ],
      },
      {
        heading: 'Kontak',
        paragraphs: [
          'Pertanyaan tentang syarat ini dapat dikirim melalui halaman kontak. Sertakan nama tool dan deskripsi masalah yang jelas agar pesan dapat diarahkan dengan benar.',
        ],
      },
    ],
  },
  contact: {
    title: 'Kontak Toolabs — Masukan, Bug, dan Pertanyaan Privasi',
    h1: 'Kontak Toolabs',
    metaDescription:
      'Laporkan bug, usulkan tool, atau tanyakan privasi. Hubungi tim Toolabs melalui email. Jangan kirim file rahasia.',
    intro:
      'Toolabs adalah proyek kecil, dan masukan yang spesifik sangat berguna. Ceritakan apa yang ingin Anda lakukan, browser yang dipakai, dan apa yang salah.',
    updatedAt: '2026-10-21',
    blocks: [
      {
        heading: 'Email',
        paragraphs: [
          'Tulis ke hello@toolabs.com. Kami berusaha membalas dalam dua hari kerja. Pesan tentang tool yang rusak sebaiknya menyertakan versi browser, sistem operasi, jenis file, perkiraan ukuran, dan pesan kesalahan yang muncul.',
        ],
      },
      {
        heading: 'Yang tidak perlu dikirim',
        paragraphs: [
          'Jangan melampirkan paspor, kartu identitas, kontrak, rekam medis, atau dokumen rahasia lain. Tangkapan layar kesalahan biasanya cukup. Jika file memang penting untuk mereproduksi bug, buat sampel aman yang menunjukkan masalah serupa.',
        ],
      },
      {
        heading: 'Laporan bug',
        bullets: [
          'Tool mana yang digunakan, dan apa yang Anda harapkan terjadi?',
          'Browser dan versi apa, di sistem operasi apa?',
          'Apakah jenis dan ukuran file sesuai format yang diterima tool?',
          'Apakah masalah terjadi sekali, atau setiap kali dengan file itu?',
          'Apakah halaman dimuat dari situs langsung atau pratinjau lokal?',
        ],
      },
      {
        heading: 'Saran tool',
        paragraphs: [
          'Saran diterima, terutama jika dapat berjalan lokal di browser. Tool yang memerlukan server, akun, atau akses ke data privat platform lain lebih sulit masuk ke proyek ini. Pengunduh media sosial sengaja tidak termasuk cakupan.',
        ],
      },
      {
        heading: 'Privasi dan keamanan',
        paragraphs: [
          'Untuk pertanyaan privasi, sebutkan halaman atau perilaku yang memicunya. Jika Anda menemukan masalah keamanan, jelaskan dampak dan langkah reproduksi tanpa mengakses data orang lain. Beri kami kesempatan wajar untuk memperbaikinya sebelum mempublikasikan detail.',
        ],
      },
      {
        heading: 'Koreksi',
        paragraphs: [
          'Panduan diperiksa terhadap perilaku browser saat ini, tetapi format dan aturan portal berubah. Jika ada kalimat yang salah atau rekomendasi ukuran yang usang, kirim URL halaman dan koreksinya. Konten akurat lebih penting daripada mempertahankan paragraf lama.',
        ],
      },
    ],
  },
  glossary: {
    title: 'Glosarium Format File — JPG, PNG, WebP, HEIC, PDF',
    h1: 'Glosarium format file',
    metaDescription:
      'Definisi bahasa sederhana untuk JPG, PNG, WebP, HEIC, PDF, EXIF, DPI, kompresi lossy, dan istilah lain di panduan Toolabs.',
    intro:
      'Referensi singkat untuk format dan konsep yang muncul saat mengompres gambar atau bekerja dengan PDF. Definisi bersifat praktis, bukan menyeluruh.',
    updatedAt: '2026-10-21',
    blocks: [
      {
        heading: 'Format gambar',
        table: {
          headers: ['Istilah', 'Artinya', 'Kapan penting'],
          rows: [
            ['JPG / JPEG', 'Format gambar lossy yang dirancang untuk foto. Sebagian detail dibuang agar file lebih kecil.', 'Terbaik untuk foto dan portal yang hanya menerima JPG. Kurang cocok untuk teks tajam atau transparansi.'],
            ['PNG', 'Format gambar lossless yang mendukung transparansi dan tepi tajam.', 'Baik untuk logo, screenshot, dan grafik. Biasanya jauh lebih besar daripada JPG untuk foto.'],
            ['WebP', 'Format modern dari Google yang mendukung mode lossy dan lossless serta transparansi.', 'Sering 20–35% lebih kecil daripada JPG pada kualitas serupa, tetapi sebagian sistem lama menolaknya.'],
            ['HEIC / HEIF', 'Format kontainer yang dipakai iPhone terbaru untuk foto dan video pendek.', 'Perlu dikonversi sebelum banyak situs dan aplikasi Windows menerimanya.'],
            ['GIF', 'Format lama yang terbatas pada 256 warna dan animasi sederhana.', 'Cukup untuk animasi kecil, buruk untuk foto.'],
            ['SVG', 'Format vektor yang tersusun dari bentuk dan jalur, bukan piksel.', 'Tetap tajam saat diperbesar. Bukan format foto dan tidak diterima sebagian besar formulir unggah gambar.'],
          ],
        },
      },
      {
        heading: 'Kompresi dan kualitas',
        bullets: [
          'Kompresi lossy menghilangkan sebagian data secara permanen untuk mengurangi ukuran. JPG dan WebP memakainya.',
          'Kompresi lossless mempertahankan setiap piksel sambil mengodekan file lebih efisien. PNG memakainya.',
          'Kualitas adalah pengaturan encoder, bukan ukuran universal. JPG 90% di satu encoder belum tentu sama dengan 90% di encoder lain.',
          'Target ukuran adalah batas maksimum yang Anda butuhkan, misalnya 100 KB. Tool harus mencapainya tanpa diam-diam menghasilkan gambar tak layak.',
          'EXIF adalah metadata di banyak foto: model kamera, waktu pengambilan, orientasi, dan kadang koordinat GPS. Pengodean ulang melalui canvas biasanya menghapusnya.',
          'DPI (dots per inch) menggambarkan kerapatan cetak yang dimaksud. DPI tidak mengubah dimensi piksel file dengan sendirinya. Foto 3×4 cm pada 300 DPI sekitar 354 × 472 piksel.',
        ],
      },
      {
        heading: 'Istilah PDF',
        table: {
          headers: ['Istilah', 'Artinya', 'Kapan penting'],
          rows: [
            ['PDF', 'Format dokumen yang mendeskripsikan halaman, teks, gambar, dan kadang formulir serta tautan.', 'Standar untuk lamaran, kontrak, dan dokumen hasil pindai.'],
            ['Gabung', 'Menggabungkan beberapa PDF menjadi satu dokumen, biasanya dengan menambahkan halaman sesuai urutan file.', 'Berguna untuk menyatukan surat lamaran, pindaian identitas, dan sertifikat dalam satu unggahan.'],
            ['Pisah', 'Mengambil halaman atau rentang halaman menjadi file PDF terpisah.', 'Berguna untuk mengirim hanya halaman relevan dari laporan panjang.'],
            ['Putar', 'Mengubah orientasi halaman sebesar 90, 180, atau 270 derajat.', 'Memperbaiki hasil pindai miring tanpa mengedit isi aslinya.'],
            ['PDF terenkripsi', 'PDF yang memerlukan kata sandi atau memiliki pembatasan.', 'Sebagian besar tool browser tidak dapat membukanya sampai kata sandi dihapus di pembaca PDF.'],
            ['OCR', 'Optical character recognition, mengubah gambar teks menjadi teks yang dapat dipilih.', 'Bukan hal yang sama dengan konversi ke PDF. OCR biasanya memerlukan mesin khusus dan bisa butuh server untuk file besar.'],
          ],
        },
      },
      {
        heading: 'Satuan ukuran',
        bullets: [
          '1 KB umumnya berarti 1.024 byte dalam konteks ukuran file. Sebagian sistem memakai 1.000 byte.',
          '1 MB umumnya berarti 1.024 KB, atau 1.048.576 byte.',
          'Portal yang menulis “di bawah 2 MB” bisa menghitung batas dengan cara berbeda. Targetkan sedikit di bawah angka yang disebutkan.',
          'Ukuran file tidak sama dengan dimensi gambar. File kecil bisa berisi kanvas piksel besar, dan file besar bisa berisi kanvas kecil.',
        ],
      },
    ],
  },
};

export const staticPages: Record<Locale, Record<StaticPageKey, StaticPage>> = { en, id };

export function getStaticPage(key: StaticPageKey, locale: Locale): StaticPage {
  return staticPages[locale][key];
}

export function staticAlternatePath(key: StaticPageKey, otherLocale: Locale): string {
  return staticPagePaths[key][otherLocale];
}
