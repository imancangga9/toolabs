import type { Locale } from '../config';

export type GuideBlock = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: boolean;
};

export type Guide = {
  id: string;
  slug: Record<Locale, string>;
  title: string;
  h1: string;
  metaDescription: string;
  excerpt: string;
  quickAnswer: string;
  updatedAt: string;
  readingMinutes: number;
  keyTakeaways: string[];
  blocks: GuideBlock[];
  faq: Array<{ q: string; a: string }>;
  relatedTools: string[];
};

export const guides: Guide[] = [
  {
    id: 'compress-image-100kb',
    slug: { en: 'compress-image-to-100kb', id: 'kompres-gambar-100kb' },
    title: 'How to Compress an Image to 100 KB (Without Ruining It)',
    h1: 'How to compress an image to 100 KB without ruining it',
    metaDescription:
      'A practical guide to hitting a 100 KB image limit without turning faces or text into mush. Learn how quality, dimensions, and format interact.',
    excerpt:
      'Portals often cap uploads at 100 KB. Here is how to reach that limit while keeping a photo usable, and why renaming the file never works.',
    quickAnswer:
      'To compress an image to 100 KB, open a browser-based compressor, set the target to 100 KB, and let it reduce quality first and dimensions second. Choose JPG for photos, WebP for smaller web files, and PNG only for sharp graphics. Check the result at 100% zoom before uploading.',
    updatedAt: '2026-10-21',
    readingMinutes: 7,
    keyTakeaways: [
      'A 100 KB limit is about the file, not the photo’s visual dimensions alone.',
      'Quality reduction and pixel reduction solve different problems; good tools combine both.',
      'JPG or WebP is usually the right format for photographs under 100 KB.',
      'Always compare the result at 100% zoom, especially around faces and small text.',
    ],
    blocks: [
      {
        heading: 'Why so many forms ask for 100 KB',
        paragraphs: [
          'Job portals, campus applications, visa forms, and government services often set a hard limit between 50 KB and 200 KB. The limit exists because storage and transfer costs add up when thousands of people upload at once. It is not a judgment about how good your photo needs to be; it is an operational cap.',
          'That cap creates a common problem. A modern phone photo can be 3–8 MB, which is 30–80 times larger than allowed. The file has to lose a lot of data. The useful question is not “how do I make it exactly 100 KB?” but “which details can I remove while keeping the image fit for its purpose?”',
        ],
      },
      {
        heading: 'What 100 KB actually means',
        paragraphs: [
          'Most forms treat 100 KB as 100 × 1024 bytes, or 102,400 bytes. Some treat it as 100,000 bytes. The difference is small, but it matters when a portal rejects a file at 100.4 KB. Aim slightly below the limit rather than exactly on it.',
          'File size is not the same as visual size. An image can be 100 KB and still look sharp at 600 × 800 pixels, while a badly compressed 3000-pixel image can look smeared. Dimensions, compression quality, and content all affect the result.',
        ],
      },
      {
        heading: 'The two levers: quality and dimensions',
        paragraphs: [
          'A JPG encoder trades detail for bytes. Lower quality settings merge similar colors and discard fine texture. That works well for skin and landscapes until it starts producing blocky patches around edges. Text, logos, and sharp lines suffer earlier, which is why screenshots and documents need a different approach.',
          'Pixel dimensions are the second lever. Halving both width and height removes three quarters of the pixels. A 3000 × 4000 photo can become 750 × 1000 and still be acceptable for a profile or an ID photo, but it will no longer work for printing. Good compression tools try quality first because visible softness is usually less damaging than a sudden loss of resolution. They reduce dimensions only when quality alone cannot reach the target.',
        ],
      },
      {
        heading: 'Step by step: compress to 100 KB',
        ordered: true,
        bullets: [
          'Open the Compress Image tool and add a JPG, PNG, or WebP file. Everything runs on your device.',
          'Enter 100 in the target field, or choose the 100 KB preset. Keep the output format on Auto to preserve the original format.',
          'Start processing. The engine tests quality levels, then reduces dimensions if the file still does not fit.',
          'Check the before and after sizes, the final dimensions, and any warning about aggressive compression.',
          'Download the result and open it at 100% zoom. Confirm that the face, signature, or text the form needs is still readable.',
        ],
      },
      {
        heading: 'JPG, WebP, or PNG?',
        paragraphs: [
          'For photographs, JPG and WebP are efficient. WebP often produces a file 20–35% smaller than JPG at a similar visual quality, but some older systems still reject it. If a portal only accepts JPG, stay with JPG. If you control the destination and the browser support is modern, WebP is a good choice.',
          'PNG is lossless and a poor fit for photographs. Compressing a photo as PNG often leaves it far above 100 KB even after the dimensions are reduced. For logos, screenshots, and images with transparency, PNG preserves sharp edges, but a screenshot with lots of text may still need a smaller canvas or a format change.',
          'Never rename a JPG to PNG or vice versa. The extension does not change the encoding. Forms that inspect the file will reject it, and some image viewers will fail to open it.',
        ],
      },
      {
        heading: 'Getting a better result when 100 KB is tight',
        bullets: [
          'Crop first. Removing unused background reduces pixels before compression begins.',
          'Start from the largest original you have, not from a screenshot of a photo.',
          'If the destination accepts 200 KB, do not force 100 KB. Extra quality is free when the limit allows it.',
          'For ID photos, use the 3×4 cm preset at 300 DPI instead of guessing dimensions.',
          'If the result still looks bad, check whether the form accepts WebP or a slightly larger file. A different format can be better than heavier compression.',
        ],
      },
      {
        heading: 'Why local compression is safer',
        paragraphs: [
          'Identity photos and application documents often contain faces, signatures, ID numbers, and addresses. Uploading them to an unknown compressor adds a copy on a server you cannot inspect. A browser-based tool decodes and re-encodes the image in your own tab. When you close the page, the working data is released.',
          'This does not make every website trustworthy. Check that the tool actually processes locally rather than quietly uploading. You can test by loading the page, disconnecting from the internet, and trying a file. If it still works, the processing is genuinely on your device.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I hit exactly 100 KB?',
        a: 'Not reliably. Encoders produce variable sizes, and a tiny change in image content changes the output. A good tool stays just under the limit instead. That satisfies the form, which normally checks a maximum rather than an exact number.',
      },
      {
        q: 'Why does my 100 KB image look blurry?',
        a: 'The original was probably much larger and had to lose a lot of data. Either the quality dropped sharply or the dimensions were reduced. Cropping the image, choosing WebP, or accepting a higher limit will usually produce a better result than pushing the same file harder.',
      },
      {
        q: 'Is 100 KB enough for a passport photo?',
        a: 'Often yes, if the pixel dimensions meet the authority’s requirements. A 3×4 cm photo at 300 DPI is about 354 × 472 pixels. At that size, 100 KB is usually enough for a clean JPG portrait. Always follow the specific photo rules for the country and document.',
      },
      {
        q: 'Does compressing remove EXIF data?',
        a: 'When the image is re-encoded through a canvas, EXIF metadata such as GPS coordinates and camera details is not carried over. That is usually good for privacy. Visual orientation is preserved because the browser applies the orientation tag before drawing the image.',
      },
      {
        q: 'Can I compress several images at once?',
        a: 'Yes. Add multiple files to the tool, set one target, and process them together. You can download each result or all of them as a ZIP. Each file is handled separately, so a difficult image does not block the rest.',
      },
      {
        q: 'What if the portal rejects the file anyway?',
        a: 'Check the accepted formats first. Many portals say “JPG only” but accept a file with the wrong internal format. Also check the pixel dimension rules, the maximum file size in bytes, and whether the upload needs a minimum size. If the file is under 100 KB and still rejected, the issue is usually format or dimensions rather than compression.',
      },
    ],
    relatedTools: ['compress-image', 'compress-jpg-to-100kb', 'resize-image', 'photo-3x4'],
  },
  {
    id: 'merge-pdf-no-upload',
    slug: { en: 'merge-pdf-without-uploading', id: 'gabung-pdf-tanpa-upload' },
    title: 'How to Merge PDF Files Without Uploading Them',
    h1: 'How to merge PDF files without uploading them',
    metaDescription:
      'Combine PDFs locally in your browser. Learn how page order, file size, encryption, and privacy work when you merge documents without a server.',
    excerpt:
      'Contracts, scans, and application files should not need a stranger’s server. Here is how local PDF merging works and what to check before you download.',
    quickAnswer:
      'To merge PDFs without uploading, open a browser-based merge tool, add the files in the order you want, and process them locally. The PDFs are combined with JavaScript on your device. No account is needed, and the merged file is downloaded directly from your browser.',
    updatedAt: '2026-10-21',
    readingMinutes: 6,
    keyTakeaways: [
      'Local merging keeps the original documents on your device.',
      'Page order follows the file order, so reorder before processing.',
      'Encrypted PDFs must be unlocked before they can be merged.',
      'A merged PDF is not automatically smaller; it usually keeps most of the original data.',
    ],
    blocks: [
      {
        heading: 'Why uploading a PDF is a bigger deal than uploading a photo',
        paragraphs: [
          'A PDF often contains more than a picture of a page. It can include contracts, medical records, invoices, passport scans, signatures, and form fields. Uploading one to a free tool creates a copy on a server whose retention policy you cannot verify from the interface.',
          'For a holiday photo, that risk may feel abstract. For an employment contract or a visa application, it is concrete. Local merging avoids the copy entirely: the file is read from your disk, combined in memory, and written back through your browser’s download mechanism.',
        ],
      },
      {
        heading: 'What “local” means in practice',
        paragraphs: [
          'Modern browsers can read files through the File API without sending them anywhere. JavaScript libraries such as pdf-lib can then copy pages between documents. The work happens in the same tab, or in a Web Worker owned by that tab. There is no upload endpoint involved.',
          'You can verify the claim. Load the tool, then disconnect your device from the internet. Add two small PDFs and merge them. If the result still downloads, the processing did not depend on a remote server.',
        ],
      },
      {
        heading: 'Step by step: merge PDFs privately',
        ordered: true,
        bullets: [
          'Open Merge PDF and add two or more PDF files from your device.',
          'Use the up and down arrows to set the order. The first file becomes the first pages of the result.',
          'Check the total size. Very large files can be slow on phones because everything is held in memory.',
          'Press Process files. The documents are combined locally.',
          'Download the merged PDF and open it once to confirm the page order and that nothing is missing.',
        ],
      },
      {
        heading: 'Page order, bookmarks, and forms',
        paragraphs: [
          'Most mergers simply append pages in the order of the file list. If your scanner produced files in reverse order, reorder them before processing. If a document has a cover page, decide whether you want it first or after the main content.',
          'Bookmarks and interactive form fields are more complex. A basic merge may keep the pages but not every navigation structure. Flat scans are unaffected because there is nothing interactive to preserve. If you need a specific table of contents, add it after merging rather than expecting the tool to rebuild it.',
        ],
      },
      {
        heading: 'Why the merged file can be large',
        paragraphs: [
          'Merging does not recompress the page images. It copies the existing page content into a new document. Two 5 MB scans can therefore produce a merged file close to 10 MB. That is good for quality and bad for email attachments.',
          'If the result is too large, split the work: merge the documents first, then compress the PDF with a suitable tool. Avoid repeatedly merging and re-exporting the same file, which can add overhead without improving quality.',
        ],
      },
      {
        heading: 'Common problems and fixes',
        bullets: [
          'Password-protected PDF: remove the password in your PDF reader, save a new copy, then merge.',
          'Damaged PDF: try opening it in a reader first. If the reader cannot display it, a merger will not repair it.',
          'Wrong order: use the arrow controls before processing rather than renaming files on disk.',
          'Very large file: close other tabs and try on a desktop if a phone runs out of memory.',
          'Blank pages: check the original file. Scanners sometimes add blank pages that the merger faithfully preserves.',
        ],
      },
      {
        heading: 'When merging is the wrong tool',
        paragraphs: [
          'If you need only a few pages from a long document, use Split PDF instead. If a scan is sideways, rotate it before merging so the final file reads consistently. If you need to turn pages into images, use PDF to JPG. Merging is best when the goal is one continuous document, not when you need to reorganize content at a deeper level.',
        ],
      },
    ],
    faq: [
      {
        q: 'Are my PDFs uploaded when I merge them?',
        a: 'With Toolabs, no. The files are read by your browser and combined locally with JavaScript. The site does not have a PDF upload endpoint. You can confirm by disconnecting from the internet after the page loads and processing a small file.',
      },
      {
        q: 'Is there a file size limit?',
        a: 'The interface accepts files up to 100 MB, but the practical limit is your device memory. A 100 MB PDF may work on a desktop and fail on an older phone. For very large documents, close other tabs and use a desktop browser.',
      },
      {
        q: 'Can I merge password-protected PDFs?',
        a: 'No. Encrypted PDFs must be unlocked first. Open the file in your PDF reader, enter the password, and save an unprotected copy. Then add that copy to the merger.',
      },
      {
        q: 'Will the merged PDF keep bookmarks and links?',
        a: 'Pages are preserved, but not every interactive structure survives a basic merge. Links inside the pages usually remain, while document-level bookmarks may not. Flat scans are unaffected because they have no interactive elements.',
      },
      {
        q: 'Does merging reduce quality?',
        a: 'No. The pages are copied rather than re-rendered, so the original image and text quality stays the same. The trade-off is size: the merged file contains the data from every source document.',
      },
      {
        q: 'Can I merge PDFs on a phone?',
        a: 'Yes, if the browser has enough memory. Small documents usually merge without trouble. For large scans, a desktop browser is more reliable. The interface and file picker work on both Android and iPhone.',
      },
    ],
    relatedTools: ['merge-pdf', 'optimize-pdf', 'compress-pdf'],
  },
];

const idGuides: Guide[] = [
  {
    id: 'compress-image-100kb',
    slug: { en: 'compress-image-to-100kb', id: 'kompres-gambar-100kb' },
    title: 'Cara Kompres Gambar ke 100 KB Tanpa Merusak Kualitas',
    h1: 'Cara kompres gambar ke 100 KB tanpa merusak kualitas',
    metaDescription:
      'Panduan praktis mencapai batas gambar 100 KB tanpa membuat wajah atau teks kabur. Pelajari hubungan kualitas, dimensi, dan format.',
    excerpt:
      'Banyak portal membatasi unggahan 100 KB. Ini cara mencapai batas itu sambil menjaga foto tetap layak dipakai, dan mengapa mengganti nama file tidak pernah berhasil.',
    quickAnswer:
      'Untuk kompres gambar ke 100 KB, buka kompresor berbasis browser, isi target 100 KB, lalu biarkan alat menurunkan kualitas lebih dulu dan dimensi sebagai langkah kedua. Pilih JPG untuk foto, WebP untuk file web yang lebih kecil, dan PNG hanya untuk grafik tajam. Periksa hasilnya pada zoom 100% sebelum diunggah.',
    updatedAt: '2026-10-21',
    readingMinutes: 7,
    keyTakeaways: [
      'Batas 100 KB adalah soal ukuran file, bukan hanya dimensi visual foto.',
      'Penurunan kualitas dan pengurangan piksel menyelesaikan masalah yang berbeda; tool yang baik menggabungkan keduanya.',
      'JPG atau WebP biasanya pilihan tepat untuk foto di bawah 100 KB.',
      'Selalu periksa hasil pada zoom 100%, terutama di area wajah dan teks kecil.',
    ],
    blocks: [
      {
        heading: 'Mengapa banyak formulir meminta 100 KB',
        paragraphs: [
          'Portal lowongan, pendaftaran kampus, visa, dan layanan pemerintah sering menetapkan batas keras antara 50 KB dan 200 KB. Batas itu ada karena biaya penyimpanan dan transfer menjadi besar ketika ribuan orang mengunggah bersamaan. Ini bukan penilaian tentang seberapa bagus foto Anda, melainkan batas operasional.',
          'Batas tersebut menciptakan masalah umum. Foto ponsel modern bisa berukuran 3–8 MB, atau 30–80 kali lebih besar dari yang diizinkan. File harus kehilangan banyak data. Pertanyaan yang berguna bukan “bagaimana membuat tepat 100 KB?” tetapi “detail mana yang bisa dihilangkan tanpa membuat gambar gagal menjalankan fungsinya?”',
        ],
      },
      {
        heading: 'Arti 100 KB yang sebenarnya',
        paragraphs: [
          'Sebagian besar formulir menganggap 100 KB sebagai 100 × 1024 byte, yaitu 102.400 byte. Sebagian lain memakai 100.000 byte. Selisihnya kecil, tetapi penting ketika portal menolak file berukuran 100,4 KB. Targetkan sedikit di bawah batas, bukan tepat di angka itu.',
          'Ukuran file tidak sama dengan ukuran visual. Gambar 100 KB bisa tetap tajam pada 600 × 800 piksel, sementara gambar 3000 piksel yang dikompres buruk bisa terlihat belang. Dimensi, kualitas kompresi, dan isi gambar semuanya memengaruhi hasil.',
        ],
      },
      {
        heading: 'Dua tuas: kualitas dan dimensi',
        paragraphs: [
          'Encoder JPG menukar detail dengan byte. Kualitas lebih rendah menggabungkan warna yang mirip dan membuang tekstur halus. Cara ini bekerja baik untuk kulit dan pemandangan sampai muncul blok-blok di sekitar tepi. Teks, logo, dan garis tajam lebih cepat rusak, karena itu screenshot dan dokumen perlu pendekatan berbeda.',
          'Dimensi piksel adalah tuas kedua. Memotong lebar dan tinggi menjadi setengah menghilangkan tiga perempat piksel. Foto 3000 × 4000 bisa menjadi 750 × 1000 dan masih layak untuk profil atau foto identitas, tetapi tidak lagi untuk cetak. Tool kompresi yang baik mencoba kualitas lebih dulu karena sedikit lembut biasanya lebih baik daripada kehilangan resolusi secara mendadak. Dimensi baru dikurangi jika kualitas saja tidak cukup.',
        ],
      },
      {
        heading: 'Langkah demi langkah: kompres ke 100 KB',
        ordered: true,
        bullets: [
          'Buka tool Kompres Gambar dan tambahkan file JPG, PNG, atau WebP. Semua diproses di perangkat Anda.',
          'Masukkan 100 di kolom target, atau pilih preset 100 KB. Biarkan format keluaran Otomatis agar format asli dipertahankan.',
          'Mulai proses. Mesin menguji tingkat kualitas, lalu memperkecil dimensi jika file masih belum muat.',
          'Periksa ukuran sebelum dan sesudah, dimensi akhir, serta peringatan tentang kompresi agresif.',
          'Unduh hasilnya dan buka pada zoom 100%. Pastikan wajah, tanda tangan, atau teks yang dibutuhkan formulir masih terbaca.',
        ],
      },
      {
        heading: 'JPG, WebP, atau PNG?',
        paragraphs: [
          'Untuk foto, JPG dan WebP efisien. WebP sering menghasilkan file 20–35% lebih kecil daripada JPG pada kualitas visual serupa, tetapi sebagian sistem lama masih menolaknya. Jika portal hanya menerima JPG, gunakan JPG. Jika Anda mengontrol tujuannya dan browser modern, WebP adalah pilihan bagus.',
          'PNG bersifat lossless dan kurang cocok untuk foto. Mengompres foto sebagai PNG sering menyisakan ukuran jauh di atas 100 KB bahkan setelah dimensi dikurangi. Untuk logo, screenshot, dan gambar transparan, PNG menjaga tepi tetap tajam, tetapi screenshot penuh teks mungkin tetap perlu kanvas lebih kecil atau perubahan format.',
          'Jangan mengganti nama file JPG menjadi PNG atau sebaliknya. Ekstensi tidak mengubah cara file dikodekan. Formulir yang memeriksa file akan menolaknya, dan sebagian penampil gambar gagal membukanya.',
        ],
      },
      {
        heading: 'Mendapatkan hasil lebih baik saat 100 KB terasa sempit',
        bullets: [
          'Potong dulu. Membuang latar belakang yang tidak perlu mengurangi piksel sebelum kompresi dimulai.',
          'Mulai dari file asli terbesar, bukan dari screenshot foto.',
          'Jika tujuan menerima 200 KB, jangan paksa 100 KB. Kualitas tambahan gratis ketika batas mengizinkan.',
          'Untuk foto identitas, gunakan preset 3×4 cm pada 300 DPI daripada menebak dimensi.',
          'Jika hasil masih terlihat buruk, periksa apakah formulir menerima WebP atau file sedikit lebih besar. Format berbeda bisa lebih baik daripada kompresi yang lebih berat.',
        ],
      },
      {
        heading: 'Mengapa kompresi lokal lebih aman',
        paragraphs: [
          'Foto identitas dan dokumen lamaran sering berisi wajah, tanda tangan, nomor identitas, dan alamat. Mengunggahnya ke kompresor yang tidak dikenal menambah salinan di server yang tidak bisa Anda periksa. Tool berbasis browser membuka dan mengodekan ulang gambar di tab Anda sendiri. Saat halaman ditutup, data kerja dilepaskan.',
          'Ini tidak membuat setiap situs otomatis tepercaya. Periksa apakah tool benar-benar memproses secara lokal, bukan diam-diam mengunggah. Anda bisa mengujinya: muat halaman, putuskan koneksi internet, lalu coba satu file. Jika tetap berhasil, pemrosesan memang ada di perangkat Anda.',
        ],
      },
    ],
    faq: [
      {
        q: 'Bisakah mencapai tepat 100 KB?',
        a: 'Tidak bisa diandalkan. Encoder menghasilkan ukuran yang bervariasi, dan perubahan kecil pada isi gambar mengubah hasilnya. Tool yang baik menjaga hasil sedikit di bawah batas. Formulir biasanya memeriksa ukuran maksimum, bukan angka persis.',
      },
      {
        q: 'Mengapa gambar 100 KB saya terlihat blur?',
        a: 'Kemungkinan file asli jauh lebih besar sehingga harus kehilangan banyak data. Kualitas turun tajam atau dimensinya dikurangi. Memotong gambar, memilih WebP, atau menerima batas lebih tinggi biasanya menghasilkan hasil lebih baik daripada memaksa file yang sama lebih keras.',
      },
      {
        q: 'Apakah 100 KB cukup untuk pas foto?',
        a: 'Sering ya, jika dimensi piksel memenuhi syarat instansi. Foto 3×4 cm pada 300 DPI sekitar 354 × 472 piksel. Pada ukuran itu, 100 KB biasanya cukup untuk JPG portrait yang bersih. Selalu ikuti aturan foto resmi negara dan dokumen terkait.',
      },
      {
        q: 'Apakah kompresi menghapus data EXIF?',
        a: 'Saat gambar dikodekan ulang melalui canvas, metadata EXIF seperti koordinat GPS dan detail kamera tidak ikut terbawa. Ini biasanya menguntungkan privasi. Orientasi visual tetap dipertahankan karena browser menerapkan tag orientasi sebelum menggambar gambar.',
      },
      {
        q: 'Bisakah mengompres beberapa gambar sekaligus?',
        a: 'Bisa. Tambahkan beberapa file ke tool, tentukan satu target, lalu proses bersama. Anda dapat mengunduh masing-masing hasil atau semuanya sebagai ZIP. Setiap file ditangani terpisah, jadi satu gambar yang sulit tidak menghambat yang lain.',
      },
      {
        q: 'Bagaimana jika portal tetap menolak file?',
        a: 'Periksa format yang diterima lebih dulu. Banyak portal menulis “hanya JPG” tetapi menolak file dengan format internal berbeda. Periksa juga aturan dimensi piksel, batas ukuran dalam byte, dan apakah unggahan memerlukan ukuran minimum. Jika file sudah di bawah 100 KB dan tetap ditolak, masalahnya biasanya format atau dimensi, bukan kompresi.',
      },
    ],
    relatedTools: ['compress-image', 'compress-jpg-to-100kb', 'resize-image', 'photo-3x4'],
  },
  {
    id: 'merge-pdf-no-upload',
    slug: { en: 'merge-pdf-without-uploading', id: 'gabung-pdf-tanpa-upload' },
    title: 'Cara Gabung PDF Tanpa Mengunggahnya ke Server',
    h1: 'Cara gabung PDF tanpa mengunggahnya ke server',
    metaDescription:
      'Gabungkan PDF secara lokal di browser. Pelajari urutan halaman, ukuran file, enkripsi, dan privasi saat menggabungkan dokumen tanpa server.',
    excerpt:
      'Kontrak, hasil pindai, dan berkas lamaran tidak perlu melewati server orang lain. Ini cara kerja penggabungan PDF lokal dan hal yang perlu diperiksa sebelum mengunduh.',
    quickAnswer:
      'Untuk menggabungkan PDF tanpa upload, buka tool gabung berbasis browser, tambahkan file sesuai urutan yang diinginkan, lalu proses secara lokal. PDF digabungkan dengan JavaScript di perangkat Anda. Tidak perlu akun, dan file hasil diunduh langsung dari browser.',
    updatedAt: '2026-10-21',
    readingMinutes: 6,
    keyTakeaways: [
      'Penggabungan lokal menjaga dokumen asli tetap di perangkat Anda.',
      'Urutan halaman mengikuti urutan file, jadi ubah urutannya sebelum memproses.',
      'PDF terenkripsi harus dibuka kuncinya sebelum bisa digabungkan.',
      'PDF hasil gabungan tidak otomatis lebih kecil; sebagian besar data asli tetap tersimpan.',
    ],
    blocks: [
      {
        heading: 'Mengapa mengunggah PDF lebih sensitif daripada foto',
        paragraphs: [
          'PDF sering berisi lebih dari sekadar gambar halaman. Di dalamnya bisa ada kontrak, rekam medis, faktur, hasil pindai paspor, tanda tangan, dan kolom formulir. Mengunggahnya ke tool gratis berarti membuat salinan di server yang kebijakan penyimpanannya tidak bisa Anda pastikan dari tampilan.',
          'Untuk foto liburan, risiko itu mungkin terasa abstrak. Untuk kontrak kerja atau berkas visa, risikonya nyata. Penggabungan lokal menghindari salinan sepenuhnya: file dibaca dari disk, digabungkan di memori, lalu diunduh kembali melalui mekanisme unduhan browser.',
        ],
      },
      {
        heading: 'Arti “lokal” dalam praktik',
        paragraphs: [
          'Browser modern dapat membaca file melalui File API tanpa mengirimnya ke mana pun. Library JavaScript seperti pdf-lib kemudian menyalin halaman antar dokumen. Pekerjaan terjadi di tab yang sama, atau di Web Worker milik tab tersebut. Tidak ada endpoint unggahan yang terlibat.',
          'Anda bisa membuktikan klaim ini. Muat tool, lalu putuskan koneksi internet perangkat. Tambahkan dua PDF kecil dan gabungkan. Jika hasilnya tetap bisa diunduh, pemrosesan tidak bergantung pada server jarak jauh.',
        ],
      },
      {
        heading: 'Langkah demi langkah: gabung PDF secara privat',
        ordered: true,
        bullets: [
          'Buka Gabung PDF dan tambahkan dua atau lebih file PDF dari perangkat Anda.',
          'Gunakan tombol panah atas dan bawah untuk menentukan urutan. File pertama menjadi halaman awal hasil.',
          'Periksa total ukuran. File sangat besar bisa lambat di ponsel karena semuanya disimpan di memori.',
          'Tekan Proses file. Dokumen digabungkan secara lokal.',
          'Unduh PDF hasil gabungan dan buka sekali untuk memastikan urutan halaman serta tidak ada yang hilang.',
        ],
      },
      {
        heading: 'Urutan halaman, bookmark, dan formulir',
        paragraphs: [
          'Sebagian besar tool gabung hanya menambahkan halaman sesuai urutan file. Jika scanner menghasilkan file terbalik, ubah urutannya sebelum memproses. Jika ada halaman sampul, tentukan apakah ingin diletakkan di awal atau setelah isi utama.',
          'Bookmark dan kolom formulir interaktif lebih rumit. Penggabungan dasar mungkin mempertahankan halaman tetapi tidak semua struktur navigasi. Hasil pindai datar tidak terpengaruh karena tidak ada elemen interaktif yang perlu dijaga. Jika memerlukan daftar isi tertentu, tambahkan setelah penggabungan, bukan berharap tool membangunnya ulang.',
        ],
      },
      {
        heading: 'Mengapa file hasil gabungan bisa besar',
        paragraphs: [
          'Penggabungan tidak mengompres ulang gambar halaman. Proses ini menyalin konten halaman yang sudah ada ke dokumen baru. Dua hasil pindai 5 MB bisa menghasilkan file gabungan mendekati 10 MB. Ini baik untuk kualitas dan buruk untuk lampiran email.',
          'Jika hasil terlalu besar, pisahkan pekerjaan: gabungkan dulu dokumennya, lalu kompres PDF dengan tool yang sesuai. Hindari menggabungkan dan mengekspor ulang file yang sama berulang kali, karena bisa menambah overhead tanpa meningkatkan kualitas.',
        ],
      },
      {
        heading: 'Masalah umum dan solusinya',
        bullets: [
          'PDF dilindungi kata sandi: hapus kata sandi di pembaca PDF, simpan salinan baru, lalu gabungkan.',
          'PDF rusak: coba buka di pembaca PDF lebih dulu. Jika pembaca tidak bisa menampilkannya, tool gabung juga tidak bisa memperbaikinya.',
          'Urutan salah: gunakan tombol panah sebelum memproses, bukan mengganti nama file di disk.',
          'File sangat besar: tutup tab lain dan coba di desktop jika ponsel kehabisan memori.',
          'Halaman kosong: periksa file asli. Scanner terkadang menambahkan halaman kosong yang tetap dipertahankan oleh tool.',
        ],
      },
      {
        heading: 'Kapan penggabungan bukan tool yang tepat',
        paragraphs: [
          'Jika hanya perlu beberapa halaman dari dokumen panjang, gunakan Pisah PDF. Jika hasil pindai miring, putar dulu sebelum digabungkan agar file akhir terbaca konsisten. Jika perlu mengubah halaman menjadi gambar, gunakan PDF ke JPG. Penggabungan paling tepat ketika tujuannya satu dokumen berkelanjutan, bukan saat Anda perlu mengatur ulang konten secara mendalam.',
        ],
      },
    ],
    faq: [
      {
        q: 'Apakah PDF saya diunggah saat digabungkan?',
        a: 'Di Toolabs, tidak. File dibaca browser dan digabungkan secara lokal dengan JavaScript. Situs tidak memiliki endpoint unggahan PDF. Anda bisa memastikannya dengan memutus koneksi internet setelah halaman dimuat, lalu memproses file kecil.',
      },
      {
        q: 'Apakah ada batas ukuran file?',
        a: 'Antarmuka menerima file hingga 100 MB, tetapi batas praktisnya adalah memori perangkat. PDF 100 MB mungkin berhasil di desktop dan gagal di ponsel lama. Untuk dokumen sangat besar, tutup tab lain dan gunakan browser desktop.',
      },
      {
        q: 'Bisakah menggabungkan PDF yang dilindungi kata sandi?',
        a: 'Tidak. PDF terenkripsi harus dibuka kuncinya lebih dulu. Buka file di pembaca PDF, masukkan kata sandi, dan simpan salinan tanpa proteksi. Setelah itu tambahkan salinan tersebut ke tool gabung.',
      },
      {
        q: 'Apakah bookmark dan tautan tetap ada di PDF hasil gabungan?',
        a: 'Halaman dipertahankan, tetapi tidak semua struktur interaktif bertahan pada penggabungan dasar. Tautan di dalam halaman biasanya tetap ada, sedangkan bookmark tingkat dokumen bisa hilang. Hasil pindai datar tidak terpengaruh karena tidak memiliki elemen interaktif.',
      },
      {
        q: 'Apakah penggabungan menurunkan kualitas?',
        a: 'Tidak. Halaman disalin, bukan dirender ulang, sehingga kualitas gambar dan teks asli tetap sama. Konsekuensinya adalah ukuran: file gabungan menyimpan data dari setiap dokumen sumber.',
      },
      {
        q: 'Bisakah menggabungkan PDF di ponsel?',
        a: 'Bisa, jika browser memiliki cukup memori. Dokumen kecil biasanya tidak bermasalah. Untuk hasil pindai besar, browser desktop lebih andal. Antarmuka dan pemilih file berfungsi di Android maupun iPhone.',
      },
    ],
    relatedTools: ['merge-pdf', 'optimize-pdf', 'compress-pdf'],
  },
];

const localizedGuides: Record<Locale, Guide[]> = {
  en: guides,
  id: idGuides,
};

export function getGuides(locale: Locale): Guide[] {
  return localizedGuides[locale];
}

export function getGuide(slug: string, locale: Locale): Guide | undefined {
  return localizedGuides[locale].find((guide) => guide.slug[locale] === slug);
}

export function guidePath(guide: Guide, locale: Locale): string {
  return locale === 'en'
    ? `/guides/${guide.slug.en}`
    : `/id/panduan/${guide.slug.id}`;
}

export function guidesIndexPath(locale: Locale): string {
  return locale === 'en' ? '/guides' : '/id/panduan';
}
