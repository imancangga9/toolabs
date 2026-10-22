import type { Tool } from '../../tools.config';

export const pdfTools: Tool[] = [
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
    related: ['split-pdf', 'rotate-pdf', 'jpg-to-pdf', 'pdf-to-jpg'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'Merge PDF Files Online Free — Private PDF Merger',
        h1: 'Merge PDF files without uploading them',
        metaDescription:
          'Combine multiple PDFs into one file in your browser. Reorder documents, keep page quality, and download instantly. No upload or signup.',
        answerQuestion: 'How do I merge several PDF files into one?',
        shortAnswer:
          'Add two or more PDFs, use the move buttons to set the order, and press Process. Toolabs copies every page into a new document inside your browser and offers one merged PDF for download. Nothing is uploaded, watermarked, or stored after you close the page.',
        intro:
          'Merging PDFs is one of the most common document tasks: combining scans, attaching certificates to an application, or assembling a single report from separate chapters. Most free services upload each file, process it on a server, and return a link. Toolabs uses pdf-lib inside a Web Worker, so the pages are copied locally and the merged file is ready as soon as your device finishes writing it. Page sizes, orientation, and vector text are preserved because the tool copies pages rather than printing them to images. The file list is reorderable, which matters when the receiving institution expects documents in a specific sequence.',
        steps: [
          'Drop two or more PDF files, or select them from your device.',
          'Reorder the list with the up and down buttons until the sequence is correct.',
          'Press Process files. Toolabs merges the pages locally.',
          'Check the total page count and the result size.',
          'Download the merged PDF as a single file.',
        ],
        benefits: [
          'Page content remains vector-based and searchable; the tool does not rasterize it.',
          'Reordering is explicit, so the final document follows the required sequence.',
          'No upload means confidential contracts and medical records stay on your device.',
          'No watermark, no account, and no daily limit.',
        ],
        useCases: [
          'Combining a CV, certificate, and cover letter into one application PDF.',
          'Joining several scanned pages into a single document before archiving.',
          'Merging monthly reports or invoices into one file for an accountant.',
          'Assembling a course assignment with separate cover and appendix files.',
        ],
        faq: [
          {
            q: 'In what order are the PDFs merged?',
            a: 'The order shown in the file list is the final order. Use the move up and move down buttons to change it. The first file appears first in the merged document.',
          },
          {
            q: 'Is there a limit on the number of PDFs?',
            a: 'You can add many files, but device memory is the real limit. Each PDF is held in memory during merging. A warning appears for files above 40 MB, and there is a hard 100 MB per-file check.',
          },
          {
            q: 'Will the merged PDF keep text search and links?',
            a: 'Yes. Pages are copied into a new PDF without being converted to images, so text remains selectable and searchable. Internal links and annotations generally survive, although complex interactive forms may not.',
          },
          {
            q: 'Can I merge password-protected PDFs?',
            a: 'No. Encrypted PDFs are rejected with a clear message. Open the file in your PDF reader, remove the password, save a copy, and then merge that copy.',
          },
          {
            q: 'Does merging reduce quality?',
            a: 'No. The pages are copied as they are, so there is no recompression. The merged file is roughly the sum of the source files plus a small amount of PDF structure overhead.',
          },
          {
            q: 'Are my files uploaded to Toolabs?',
            a: 'No. The PDFs are read by your browser and processed in a Web Worker on your device. Toolabs does not have a server endpoint that receives them, and no copy is kept after the page is closed.',
          },
        ],
        tip: 'If the portal requires a maximum file size, merge first, then use Compress PDF when it becomes available. Do not compress each file separately unless you need to; merging preserves the original pages.',
      },
      id: {
        title: 'Gabung PDF Online Gratis — Tanpa Upload',
        h1: 'Gabungkan file PDF tanpa upload',
        metaDescription:
          'Gabungkan beberapa PDF menjadi satu file di browser. Atur urutan dokumen, kualitas halaman tetap, lalu unduh. Tanpa upload dan tanpa daftar.',
        answerQuestion: 'Bagaimana cara menggabungkan beberapa file PDF menjadi satu?',
        shortAnswer:
          'Tambahkan dua atau lebih PDF, atur urutannya, lalu tekan Proses. Toolabs menyalin setiap halaman ke dokumen baru di browser Anda dan menyediakan satu PDF gabungan untuk diunduh. Tidak ada unggahan, watermark, atau penyimpanan setelah halaman ditutup. Periksa kembali urutan halaman sebelum mengunduh hasil akhir.',
        intro:
          'Menggabungkan PDF adalah tugas dokumen yang sangat umum: menyatukan hasil pindai, melampirkan sertifikat pada lamaran, atau menyusun laporan dari beberapa bab. Sebagian besar layanan gratis mengunggah setiap file, memprosesnya di server, lalu memberi tautan. Toolabs memakai pdf-lib di dalam Web Worker, sehingga halaman disalin secara lokal dan file gabungan siap begitu perangkat selesai menulisnya. Ukuran halaman, orientasi, dan teks vektor tetap terjaga karena tool menyalin halaman, bukan mencetaknya menjadi gambar. Daftar file dapat diurutkan, hal penting bila instansi penerima mengharapkan urutan dokumen tertentu.',
        steps: [
          'Letakkan dua atau lebih file PDF, atau pilih dari perangkat Anda.',
          'Atur urutan dengan tombol naik dan turun hingga susunannya benar.',
          'Tekan Proses file. Toolabs menggabungkan halaman secara lokal.',
          'Periksa jumlah halaman dan ukuran hasil.',
          'Unduh PDF gabungan sebagai satu file.',
        ],
        benefits: [
          'Isi halaman tetap berbasis vektor dan bisa dicari; tool tidak mengubahnya menjadi gambar.',
          'Urutan diatur secara eksplisit, sehingga dokumen akhir sesuai kebutuhan.',
          'Tanpa upload, kontrak dan rekam medis rahasia tetap di perangkat Anda.',
          'Tanpa watermark, tanpa akun, dan tanpa batas harian.',
        ],
        useCases: [
          'Menggabungkan CV, sertifikat, dan surat lamaran menjadi satu PDF.',
          'Menyatukan beberapa halaman hasil pindai sebelum diarsipkan.',
          'Menggabungkan laporan atau faktur bulanan untuk akuntan.',
          'Menyusun tugas kuliah dari file sampul dan lampiran terpisah.',
        ],
        faq: [
          {
            q: 'Dalam urutan apa PDF digabungkan?',
            a: 'Urutan pada daftar file adalah urutan akhir. Gunakan tombol naik dan turun untuk mengubahnya. File pertama muncul paling awal di dokumen gabungan.',
          },
          {
            q: 'Apakah ada batas jumlah PDF?',
            a: 'Anda dapat menambahkan banyak file, tetapi memori perangkat adalah batas sebenarnya. Setiap PDF ditahan di memori selama penggabungan. Peringatan muncul untuk file di atas 40 MB, dan ada pemeriksaan keras 100 MB per file.',
          },
          {
            q: 'Apakah teks dan tautan tetap berfungsi?',
            a: 'Ya. Halaman disalin ke PDF baru tanpa diubah menjadi gambar, sehingga teks tetap bisa dipilih dan dicari. Tautan internal dan anotasi umumnya bertahan, meskipun formulir interaktif yang kompleks bisa hilang.',
          },
          {
            q: 'Bisakah menggabungkan PDF yang dilindungi kata sandi?',
            a: 'Tidak. PDF terenkripsi ditolak dengan pesan jelas. Buka file di pembaca PDF, hapus kata sandi, simpan salinan, lalu gabungkan salinan tersebut.',
          },
          {
            q: 'Apakah penggabungan menurunkan kualitas?',
            a: 'Tidak. Halaman disalin apa adanya, tanpa kompresi ulang. Ukuran file gabungan kira-kira jumlah file sumber ditambah sedikit struktur PDF tambahan.',
          },
          {
            q: 'Apakah file saya diunggah ke Toolabs?',
            a: 'Tidak. PDF dibaca browser dan diproses di Web Worker pada perangkat Anda. Toolabs tidak memiliki endpoint server yang menerimanya, dan tidak ada salinan yang disimpan setelah halaman ditutup.',
          },
        ],
        tip: 'Jika portal menetapkan batas ukuran maksimum, gabungkan dulu, lalu kompres PDF setelah fitur tersedia. Tidak perlu mengompres setiap file terpisah; penggabungan mempertahankan halaman asli.',
      },
    },
  },

  {
    id: 'jpg-to-pdf',
    slug: { en: 'jpg-to-pdf', id: 'jpg-ke-pdf' },
    category: 'pdf',
    engine: 'image-to-pdf',
    accept: ['image/jpeg', 'image/png', 'image/webp'],
    icon: 'image-pdf',
    featured: 4,
    sortable: true,
    options: { pageSize: 'a4', orientation: 'auto', margin: 24 },
    related: ['merge-pdf', 'pdf-to-jpg', 'compress-image', 'heic-to-jpg'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'JPG to PDF Converter — Free and Private',
        h1: 'Convert JPG images to a PDF',
        metaDescription:
          'Combine JPG, PNG, or WebP images into one PDF in your browser. Reorder pages, choose A4 or fit-to-image, and download without uploading.',
        answerQuestion: 'How do I turn JPG images into a PDF?',
        shortAnswer:
          'Add one or more images, arrange their order, choose a page size, and press Process. Toolabs places each image on its own PDF page and builds the file locally. You can use A4, Letter, or a page that matches the image exactly, then download a single PDF.',
        intro:
          'Portals often ask for a single PDF even when the source material is a stack of phone photos or scanned pages. This tool converts JPG, PNG, and WebP images into a clean PDF without sending them to a server. Each image becomes one page; the order in the file list becomes the page order. The default A4 layout fits the image inside the page with a margin, which looks like a scanned document. “Fit to image” avoids white borders and is useful for photo books or image-only documents. You can also choose portrait or landscape orientation. Because the images are embedded as images, the PDF is not searchable text; it is a faithful visual copy.',
        steps: [
          'Add JPG, PNG, or WebP images. Reorder them if needed.',
          'Choose A4, Letter, or Fit to image.',
          'Pick auto, portrait, or landscape orientation and a margin.',
          'Press Process files to build the PDF locally.',
          'Download the PDF and open it to check page order.',
        ],
        benefits: [
          'Turns phone photos into a single document that portals accept.',
          'No upload: identity documents and signed forms stay on your device.',
          'Page order is explicit, so the final PDF matches your application sequence.',
          'No watermark and no page limit imposed by a subscription.',
        ],
        useCases: [
          'Combining photos of an ID card, signature, and certificate into one PDF.',
          'Turning photographed homework or receipts into a single submission.',
          'Creating a simple portfolio PDF from JPG artwork.',
          'Packaging scanned pages when a portal rejects image uploads.',
        ],
        faq: [
          {
            q: 'Can I put several images in one PDF?',
            a: 'Yes. Each image becomes one page in the order shown. Use the move up and down buttons to arrange them before processing.',
          },
          {
            q: 'What page size should I choose?',
            a: 'A4 is the safest default for applications and official documents. Fit to image removes margins and matches the photo exactly. Letter is mainly for the United States and Canada.',
          },
          {
            q: 'Will the PDF be searchable?',
            a: 'No. The images are placed as pictures, so there is no text layer. If you need searchable text, you need OCR, which is a separate Phase 2 feature and will be clearly labelled when available.',
          },
          {
            q: 'Does the image lose quality?',
            a: 'The original image data is embedded without converting it to JPEG again. JPG photos stay JPEG inside the PDF, and PNG images stay PNG. The visual quality should match the source image.',
          },
          {
            q: 'How many images can I add?',
            a: 'There is a 100 MB per-file limit and a practical memory limit. Large photos and many pages are processed one by one. If the browser becomes slow, split the job into smaller batches.',
          },
          {
            q: 'Are my photos uploaded?',
            a: 'No. The images and the resulting PDF are handled entirely in your browser with a Web Worker. Toolabs does not receive or store them.',
          },
        ],
        comparison: {
          caption: 'Page layout options',
          headers: ['Layout', 'Best for', 'Result'],
          rows: [
            ['A4 + margin', 'Job applications, official forms', 'Image centred with white space around it'],
            ['A4, no margin', 'Full-page scans', 'Image fills the printable page'],
            ['Fit to image', 'Photo books, image-only PDFs', 'Page matches the image aspect ratio'],
            ['Letter', 'North American institutions', '8.5 × 11 in page'],
          ],
          note: 'Check the portal’s requirements before choosing. Some systems crop or resize pages during processing.',
        },
        tip: 'Photograph documents straight on, with even light, before converting. A good source photo matters more than any PDF setting.',
      },
      id: {
        title: 'JPG ke PDF Online Gratis — Tanpa Upload',
        h1: 'Ubah JPG menjadi PDF',
        metaDescription:
          'Gabungkan gambar JPG, PNG, atau WebP menjadi satu PDF di browser. Atur urutan, pilih A4 atau ikuti gambar, lalu unduh tanpa upload.',
        answerQuestion: 'Bagaimana cara mengubah gambar JPG menjadi PDF?',
        shortAnswer:
          'Tambahkan satu atau beberapa gambar, atur urutannya, pilih ukuran halaman, lalu tekan Proses. Toolabs menempatkan setiap gambar pada halaman PDF sendiri dan membuat file secara lokal. Pilih A4, Letter, atau halaman yang mengikuti gambar, lalu unduh satu PDF. Margin dan orientasi dapat disesuaikan melalui panel opsi.',
        intro:
          'Portal sering meminta satu PDF meskipun bahan sumbernya tumpukan foto ponsel atau halaman hasil pindai. Tool ini mengubah JPG, PNG, dan WebP menjadi PDF bersih tanpa mengirimnya ke server. Setiap gambar menjadi satu halaman; urutan di daftar file menjadi urutan halaman. Tata letak A4 bawaan memuat gambar di dalam halaman dengan margin, mirip dokumen hasil pindai. “Ikuti gambar” menghilangkan bingkai putih dan berguna untuk buku foto atau dokumen khusus gambar. Anda juga dapat memilih orientasi portrait atau lanskap. Karena gambar disematkan sebagai gambar, PDF tidak memiliki teks yang bisa dicari; isinya salinan visual yang setia.',
        steps: [
          'Tambahkan gambar JPG, PNG, atau WebP. Atur urutannya bila perlu.',
          'Pilih A4, Letter, atau Ikuti gambar.',
          'Pilih orientasi otomatis, potret, atau lanskap, serta margin.',
          'Tekan Proses file untuk membuat PDF secara lokal.',
          'Unduh PDF dan buka untuk memeriksa urutan halaman.',
        ],
        benefits: [
          'Mengubah foto ponsel menjadi satu dokumen yang diterima portal.',
          'Tanpa upload: dokumen identitas dan formulir bertanda tangan tetap di perangkat.',
          'Urutan halaman eksplisit, sehingga PDF akhir sesuai urutan lamaran.',
          'Tanpa watermark dan tanpa batas halaman dari langganan.',
        ],
        useCases: [
          'Menggabungkan foto KTP, tanda tangan, dan sertifikat menjadi satu PDF.',
          'Mengubah foto tugas atau struk menjadi satu kiriman.',
          'Membuat PDF portofolio sederhana dari karya JPG.',
          'Mengemas halaman hasil pindai saat portal menolak unggahan gambar.',
        ],
        faq: [
          {
            q: 'Bisakah memasukkan beberapa gambar ke satu PDF?',
            a: 'Bisa. Setiap gambar menjadi satu halaman sesuai urutan yang ditampilkan. Gunakan tombol naik dan turun untuk mengaturnya sebelum diproses.',
          },
          {
            q: 'Ukuran halaman mana yang sebaiknya dipilih?',
            a: 'A4 paling aman untuk lamaran dan dokumen resmi. Ikuti gambar menghapus margin dan menyesuaikan foto persis. Letter terutama untuk Amerika Serikat dan Kanada.',
          },
          {
            q: 'Apakah PDF bisa dicari teksnya?',
            a: 'Tidak. Gambar ditempatkan sebagai gambar, jadi tidak ada lapisan teks. Jika membutuhkan teks yang bisa dicari, Anda perlu OCR, fitur Fase 2 terpisah yang akan diberi label jelas saat tersedia.',
          },
          {
            q: 'Apakah kualitas gambar menurun?',
            a: 'Data gambar asli disematkan tanpa diubah menjadi JPEG lagi. Foto JPG tetap JPEG di dalam PDF, dan PNG tetap PNG. Kualitas visual seharusnya sama dengan gambar sumber.',
          },
          {
            q: 'Berapa banyak gambar yang bisa ditambahkan?',
            a: 'Ada batas 100 MB per file dan batas memori praktis. Foto besar dan banyak halaman diproses satu per satu. Jika browser melambat, bagi pekerjaan menjadi beberapa batch.',
          },
          {
            q: 'Apakah foto saya diunggah?',
            a: 'Tidak. Gambar dan PDF hasilnya ditangani sepenuhnya di browser dengan Web Worker. Toolabs tidak menerima atau menyimpannya.',
          },
        ],
        comparison: {
          caption: 'Pilihan tata letak halaman',
          headers: ['Tata letak', 'Cocok untuk', 'Hasil'],
          rows: [
            ['A4 + margin', 'Lamaran kerja, formulir resmi', 'Gambar di tengah dengan ruang putih'],
            ['A4 tanpa margin', 'Pindai satu halaman penuh', 'Gambar mengisi halaman cetak'],
            ['Ikuti gambar', 'Buku foto, PDF khusus gambar', 'Halaman sesuai rasio gambar'],
            ['Letter', 'Institusi Amerika Utara', 'Halaman 8,5 × 11 inci'],
          ],
          note: 'Periksa syarat portal sebelum memilih. Beberapa sistem memotong atau mengubah ukuran halaman saat diproses.',
        },
        tip: 'Foto dokumen secara lurus dengan cahaya merata sebelum dikonversi. Kualitas foto sumber lebih penting daripada pengaturan PDF apa pun.',
      },
    },
  },

  {
    id: 'split-pdf',
    slug: { en: 'split-pdf', id: 'pisah-pdf' },
    category: 'pdf',
    engine: 'pdf-split',
    accept: ['application/pdf'],
    icon: 'split',
    options: { splitMode: 'every' },
    related: ['merge-pdf', 'rotate-pdf', 'pdf-to-jpg', 'jpg-to-pdf'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'Split PDF Online Free — Extract Pages Privately',
        h1: 'Split a PDF into separate pages',
        metaDescription:
          'Split a PDF into single pages or custom ranges in your browser. No uploads, no signup, and your document never leaves your device.',
        answerQuestion: 'How do I split a PDF into separate pages?',
        shortAnswer:
          'Add a PDF and choose one file per page or enter custom ranges such as 1-3, 5, 8-10. Toolabs copies the selected pages into new PDFs locally. Download each result individually, or get everything as a ZIP when several files are produced.',
        intro:
          'Sometimes you need one page out of a forty-page document, and sometimes you need each page as a separate file. This tool handles both. The default mode creates a PDF for every page, which is useful for separating scanned forms or invoices. Custom ranges create one PDF per range, so "1-3, 5, 8-10" produces three files. Pages are copied rather than rasterized, preserving text and original quality. Links and annotations are copied with the page, but destinations outside the extracted range may stop working, so check them. Ranges are clamped to the document length with a warning instead of failing silently. Everything runs in a Web Worker, so even confidential HR or legal documents stay on your machine.',
        steps: [
          'Add the PDF you want to split.',
          'Choose One file per page or Custom ranges.',
          'For ranges, enter something like 1-3, 5, 8-10.',
          'Press Process file and wait while the new PDFs are created.',
          'Download individual files or all of them as a ZIP.',
        ],
        benefits: [
          'Extract only the pages you need without a full PDF editor.',
          'Original page quality and selectable text are preserved.',
          'Batch download as ZIP when a range creates several files.',
          'No upload keeps contracts, payslips, and personal records private.',
        ],
        useCases: [
          'Sending only the relevant page of a bank statement or contract.',
          'Separating a scanned batch into individual invoices.',
          'Extracting a certificate from a large application PDF.',
          'Splitting a course pack into weekly reading files.',
        ],
        faq: [
          {
            q: 'How do I extract just pages 2 to 4?',
            a: 'Choose Custom ranges and enter 2-4. Toolabs creates one PDF containing those pages. To extract several separate sections, enter multiple ranges separated by commas, such as 2-4, 7, 10-12.',
          },
          {
            q: 'What happens if I request a page that does not exist?',
            a: 'The range is adjusted to the available pages and a warning is shown. If no valid pages remain, the tool stops with an error rather than producing an empty PDF.',
          },
          {
            q: 'Will the split PDFs keep links and bookmarks?',
            a: 'Pages are copied directly, so page content, links, and most annotations are preserved. Document-level bookmarks may be trimmed because they can point to pages that no longer exist in the new file.',
          },
          {
            q: 'Can I split a password-protected PDF?',
            a: 'No. Encrypted PDFs are rejected. Open the file in a reader that can authorize access, remove the password, save a copy, and split that copy.',
          },
          {
            q: 'Is there a page limit?',
            a: 'No fixed page count, but browser memory limits how large a PDF can be. Files up to 100 MB are accepted, and a warning appears above 40 MB. Very large documents are better split on a desktop than on a phone.',
          },
          {
            q: 'Do you upload my document?',
            a: 'No. The PDF is opened by your browser and split in a local Web Worker. Toolabs has no upload endpoint for this tool and does not retain the file.',
          },
        ],
        tip: 'When a portal asks for “page 1 only”, split with range 1-1 instead of using the every-page mode. That avoids creating and downloading files you do not need.',
      },
      id: {
        title: 'Pisah PDF Online Gratis — Ekstrak Halaman',
        h1: 'Pisah PDF menjadi halaman terpisah',
        metaDescription:
          'Pisah PDF menjadi halaman tunggal atau rentang khusus di browser. Tanpa upload, tanpa daftar, dan dokumen tidak meninggalkan perangkat Anda.',
        answerQuestion: 'Bagaimana cara memisahkan PDF menjadi halaman terpisah?',
        shortAnswer:
          'Tambahkan PDF lalu pilih satu file per halaman atau masukkan rentang khusus seperti 1-3, 5, 8-10. Toolabs menyalin halaman yang dipilih ke PDF baru secara lokal. Unduh setiap hasil satu per satu, atau semua sekaligus sebagai ZIP bila menghasilkan beberapa file.',
        intro:
          'Kadang Anda butuh satu halaman dari dokumen empat puluh halaman, kadang setiap halaman perlu menjadi file terpisah. Tool ini menangani keduanya. Mode bawaan membuat PDF untuk setiap halaman, berguna untuk memisahkan formulir atau faktur hasil pindai. Rentang khusus membuat satu PDF per rentang, jadi "1-3, 5, 8-10" menghasilkan tiga file. Halaman disalin, bukan diubah menjadi gambar, sehingga teks dan kualitas asli terjaga. Tautan dan anotasi ikut tersalin, tetapi tujuan di luar rentang yang diambil bisa berhenti berfungsi, jadi periksa hasilnya. Rentang disesuaikan dengan panjang dokumen dan diberi peringatan, bukan gagal diam-diam. Semuanya berjalan di Web Worker, jadi dokumen HR atau hukum yang rahasia tetap di perangkat Anda.',
        steps: [
          'Tambahkan PDF yang ingin dipisah.',
          'Pilih Satu file per halaman atau Rentang khusus.',
          'Untuk rentang, masukkan misalnya 1-3, 5, 8-10.',
          'Tekan Proses file dan tunggu PDF baru dibuat.',
          'Unduh file satu per satu atau semuanya sebagai ZIP.',
        ],
        benefits: [
          'Ambil hanya halaman yang dibutuhkan tanpa editor PDF lengkap.',
          'Kualitas halaman asli dan teks yang bisa dipilih tetap terjaga.',
          'Unduh sekaligus sebagai ZIP bila rentang menghasilkan beberapa file.',
          'Tanpa upload, kontrak, slip gaji, dan catatan pribadi tetap privat.',
        ],
        useCases: [
          'Mengirim hanya halaman relevan dari rekening bank atau kontrak.',
          'Memisahkan tumpukan hasil pindai menjadi faktur individual.',
          'Mengekstrak sertifikat dari PDF lamaran yang besar.',
          'Memisah paket kuliah menjadi bacaan per minggu.',
        ],
        faq: [
          {
            q: 'Bagaimana cara mengambil hanya halaman 2 sampai 4?',
            a: 'Pilih Rentang khusus dan masukkan 2-4. Toolabs membuat satu PDF berisi halaman tersebut. Untuk mengambil beberapa bagian terpisah, masukkan beberapa rentang dipisah koma, misalnya 2-4, 7, 10-12.',
          },
          {
            q: 'Apa yang terjadi jika meminta halaman yang tidak ada?',
            a: 'Rentang disesuaikan dengan halaman yang tersedia dan peringatan ditampilkan. Jika tidak ada halaman valid yang tersisa, tool berhenti dengan pesan kesalahan, bukan membuat PDF kosong.',
          },
          {
            q: 'Apakah PDF hasil tetap memiliki tautan dan bookmark?',
            a: 'Halaman disalin langsung, jadi isi halaman, tautan, dan sebagian besar anotasi dipertahankan. Bookmark tingkat dokumen bisa berkurang karena menunjuk ke halaman yang tidak lagi ada di file baru.',
          },
          {
            q: 'Bisakah memisah PDF yang dilindungi kata sandi?',
            a: 'Tidak. PDF terenkripsi ditolak. Buka file di pembaca yang dapat mengizinkan akses, hapus kata sandi, simpan salinan, lalu pisahkan salinan tersebut.',
          },
          {
            q: 'Apakah ada batas halaman?',
            a: 'Tidak ada jumlah halaman tetap, tetapi memori browser membatasi ukuran PDF. File hingga 100 MB diterima, dan peringatan muncul di atas 40 MB. Dokumen sangat besar lebih baik dipisah di desktop daripada ponsel.',
          },
          {
            q: 'Apakah dokumen saya diunggah?',
            a: 'Tidak. PDF dibuka browser dan dipisah di Web Worker lokal. Toolabs tidak memiliki endpoint unggah untuk tool ini dan tidak menyimpan file.',
          },
        ],
        tip: 'Jika portal meminta “hanya halaman 1”, gunakan rentang 1-1, bukan mode setiap halaman. Ini menghindari pembuatan dan pengunduhan file yang tidak dibutuhkan.',
      },
    },
  },

  {
    id: 'rotate-pdf',
    slug: { en: 'rotate-pdf', id: 'putar-pdf' },
    category: 'pdf',
    engine: 'pdf-rotate',
    accept: ['application/pdf'],
    icon: 'rotate',
    options: { angle: 90 },
    related: ['merge-pdf', 'split-pdf', 'pdf-to-jpg', 'jpg-to-pdf'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'Rotate PDF Online Free — Fix Page Orientation',
        h1: 'Rotate PDF pages without uploading',
        metaDescription:
          'Rotate every page in a PDF 90°, 180°, or 270° in your browser. The file never leaves your device and original quality is preserved.',
        answerQuestion: 'How do I rotate all pages in a PDF?',
        shortAnswer:
          'Add the PDF, choose 90°, 180°, or 270°, and press Process. Toolabs applies the rotation to every page and saves a new PDF locally. The original file is unchanged on your device. Download the corrected copy and check that signatures and stamps still appear the right way up.',
        intro:
          'A sideways scan is easy to fix but annoying when every online tool wants an upload. This tool rotates every page in a PDF by a quarter turn or half turn and writes a new file. It does not re-render or rasterize the page, so text remains selectable and the original resolution is untouched. Rotation is additive: a page that was already rotated inside the PDF gets the new angle on top of its existing orientation. That is usually what you want for a scan, but signatures and annotations that were placed at a fixed angle may need a quick visual check after processing.',
        steps: [
          'Add the PDF with the pages that need correcting.',
          'Choose 90° clockwise, 180°, or 90° counter-clockwise.',
          'Press Process file to rotate all pages locally.',
          'Open the downloaded PDF and check the orientation of each page.',
          'If needed, process again with a different angle until it looks right.',
        ],
        benefits: [
          'Fixes sideways and upside-down scans in seconds.',
          'No rasterization, so text and vector graphics keep their quality.',
          'The original file is never modified; you receive a new copy.',
          'Private documents are processed locally and never uploaded.',
        ],
        useCases: [
          'Correcting a phone-scanned contract that imported sideways.',
          'Fixing upside-down pages in a merged report.',
          'Preparing a clean PDF for printing or archival.',
          'Rotating a landscape table so it reads naturally on screen.',
        ],
        faq: [
          {
            q: 'Does rotation affect every page?',
            a: 'Yes. This tool applies the chosen angle to all pages, which is the safest behaviour for a scan where the entire document has the same orientation. Page-by-page rotation is a future improvement.',
          },
          {
            q: 'Is the rotation permanent in the downloaded file?',
            a: 'The downloaded PDF stores the new page rotation. Your original file remains unchanged. If a viewer ignores page rotation settings, the page may still display incorrectly in that app.',
          },
          {
            q: 'Does the tool reduce PDF quality?',
            a: 'No. It changes the page rotation attribute and saves the document structure. Text, images, and vectors are not re-encoded.',
          },
          {
            q: 'Can I rotate a scanned PDF?',
            a: 'Yes. Scanned pages are images inside the PDF, and rotation is applied without recompressing the image. The result stays as sharp as the original scan.',
          },
          {
            q: 'What about password-protected PDFs?',
            a: 'Encrypted files cannot be processed. Remove the password in your PDF reader, save an unprotected copy, and rotate that copy.',
          },
          {
            q: 'Are my documents uploaded?',
            a: 'No. The PDF is read and rewritten by your browser in a local Web Worker. Toolabs does not receive the file.',
          },
        ],
        tip: 'If only one page is sideways, split that page, rotate it, then merge it back. The current rotate tool turns every page in the file.',
      },
      id: {
        title: 'Putar PDF Online Gratis — Perbaiki Orientasi',
        h1: 'Putar halaman PDF tanpa upload',
        metaDescription:
          'Putar semua halaman PDF 90°, 180°, atau 270° di browser. File tidak meninggalkan perangkat dan kualitas asli tetap terjaga.',
        answerQuestion: 'Bagaimana cara memutar semua halaman PDF?',
        shortAnswer:
          'Tambahkan PDF, pilih 90°, 180°, atau 270°, lalu tekan Proses. Toolabs menerapkan rotasi ke setiap halaman dan menyimpan PDF baru secara lokal. File asli di perangkat tidak berubah. Unduh salinan yang sudah diperbaiki dan pastikan tanda tangan serta stempel tetap menghadap ke atas.',
        intro:
          'Hasil pindai yang miring mudah diperbaiki, tetapi menjengkelkan ketika setiap tool online meminta unggahan. Tool ini memutar setiap halaman PDF seperempat atau setengah putaran dan menulis file baru. Tool tidak merender ulang atau mengubah halaman menjadi gambar, sehingga teks tetap bisa dipilih dan resolusi asli tidak tersentuh. Rotasi bersifat tambahan: halaman yang sudah diputar di dalam PDF mendapat sudut baru di atas orientasi lamanya. Ini biasanya sesuai untuk hasil pindai, tetapi tanda tangan dan anotasi yang ditempatkan pada sudut tetap perlu diperiksa secara visual setelah diproses.',
        steps: [
          'Tambahkan PDF dengan halaman yang perlu diperbaiki.',
          'Pilih 90° searah jarum jam, 180°, atau 90° berlawanan jarum jam.',
          'Tekan Proses file untuk memutar semua halaman secara lokal.',
          'Buka PDF hasil unduhan dan periksa orientasi setiap halaman.',
          'Jika perlu, proses lagi dengan sudut berbeda sampai tampilannya benar.',
        ],
        benefits: [
          'Memperbaiki hasil pindai miring dan terbalik dalam hitungan detik.',
          'Tanpa rasterisasi, sehingga teks dan grafik vektor tetap tajam.',
          'File asli tidak pernah diubah; Anda menerima salinan baru.',
          'Dokumen rahasia diproses lokal dan tidak pernah diunggah.',
        ],
        useCases: [
          'Memperbaiki kontrak hasil pindai ponsel yang masuk dalam posisi miring.',
          'Membetulkan halaman terbalik dalam laporan gabungan.',
          'Menyiapkan PDF bersih untuk dicetak atau diarsipkan.',
          'Memutar tabel lanskap agar nyaman dibaca di layar.',
        ],
        faq: [
          {
            q: 'Apakah rotasi berlaku untuk semua halaman?',
            a: 'Ya. Tool ini menerapkan sudut yang dipilih ke seluruh halaman, perilaku paling aman untuk hasil pindai yang orientasinya seragam. Rotasi per halaman adalah peningkatan mendatang.',
          },
          {
            q: 'Apakah rotasi permanen di file hasil unduhan?',
            a: 'PDF hasil unduhan menyimpan rotasi halaman baru. File asli Anda tetap tidak berubah. Jika aplikasi pembaca mengabaikan pengaturan rotasi halaman, tampilan di aplikasi tersebut bisa tetap salah.',
          },
          {
            q: 'Apakah tool menurunkan kualitas PDF?',
            a: 'Tidak. Tool mengubah atribut rotasi halaman dan menyimpan struktur dokumen. Teks, gambar, dan vektor tidak dikodekan ulang.',
          },
          {
            q: 'Bisakah memutar PDF hasil pindai?',
            a: 'Bisa. Halaman hasil pindai adalah gambar di dalam PDF, dan rotasi diterapkan tanpa mengompres ulang gambar. Hasilnya tetap setajam pindai asli.',
          },
          {
            q: 'Bagaimana dengan PDF yang dilindungi kata sandi?',
            a: 'File terenkripsi tidak dapat diproses. Hapus kata sandi di pembaca PDF, simpan salinan tanpa proteksi, lalu putar salinan tersebut.',
          },
          {
            q: 'Apakah dokumen saya diunggah?',
            a: 'Tidak. PDF dibaca dan ditulis ulang browser di Web Worker lokal. Toolabs tidak menerima file tersebut.',
          },
        ],
        tip: 'Jika hanya satu halaman yang miring, pisahkan halaman itu, putar, lalu gabungkan kembali. Tool rotasi saat ini memutar seluruh halaman dalam file.',
      },
    },
  },

  {
    id: 'pdf-to-jpg',
    slug: { en: 'pdf-to-jpg', id: 'pdf-ke-jpg' },
    category: 'pdf',
    engine: 'pdf-to-jpg',
    accept: ['application/pdf'],
    icon: 'pdf-image',
    options: { scale: 2, quality: 0.9 },
    related: ['jpg-to-pdf', 'split-pdf', 'merge-pdf', 'compress-image'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'PDF to JPG Converter — Free, Private, No Upload',
        h1: 'Convert PDF pages to JPG images',
        metaDescription:
          'Turn each PDF page into a JPG in your browser. Choose render scale and quality, then download individual images or a ZIP. No upload.',
        answerQuestion: 'How do I convert a PDF to JPG images?',
        shortAnswer:
          'Add a PDF and choose a render scale. Toolabs uses PDF.js to draw each page on a canvas and saves it as a JPG. Download pages individually or all at once as a ZIP. Text becomes part of the image, so links and selectable text are lost in the JPG output.',
        intro:
          'PDF is great for sharing documents but awkward when a website only accepts images or when you need a quick preview for a slide. This converter renders each page at a resolution you choose and encodes it as JPG. A scale of 2× produces roughly 144 DPI from a standard 72 DPI PDF page, which is sharp on screen and acceptable for many forms; 3× or 4× is better for print but creates much larger files. The rendering happens with PDF.js inside your browser. Because pages become images, text is no longer selectable and links stop working. The tool is intentionally one-way: use JPG to PDF to go back, but that will not restore a text layer.',
        steps: [
          'Add the PDF you want to convert.',
          'Choose a render scale: 1× for previews, 2× for general use, 3–4× for print.',
          'Adjust JPG quality if file size matters.',
          'Press Process file and wait while each page is rendered.',
          'Download individual JPGs or all pages as a ZIP.',
        ],
        benefits: [
          'Creates previews and thumbnails from any PDF without installing software.',
          'Exports every page at a consistent, controllable resolution.',
          'Batch ZIP download keeps multi-page jobs manageable.',
          'The PDF never leaves your browser, which matters for contracts and IDs.',
        ],
        useCases: [
          'Turning a PDF portfolio page into an image for a website.',
          'Creating JPG previews of a report for a chat or presentation.',
          'Extracting a scanned form as an image for an upload field that only accepts JPG.',
          'Preparing page images for a design mockup or social post.',
        ],
        faq: [
          {
            q: 'What resolution do the JPGs have?',
            a: 'Resolution depends on the PDF page size and the render scale. PDF pages use points at 72 per inch. A 2× render gives about 144 DPI, 3× about 216 DPI, and 4× about 288 DPI. Larger scales produce sharper images and much larger files.',
          },
          {
            q: 'Can I convert only some pages?',
            a: 'The current version renders every page. To keep only certain pages, split the PDF first with Split PDF, then convert the resulting file.',
          },
          {
            q: 'Will the JPG keep text and links?',
            a: 'No. JPG is a picture format. Text becomes pixels, so it cannot be selected or searched, and hyperlinks are not preserved. Keep the original PDF when you need a searchable document.',
          },
          {
            q: 'Why are the output files so large?',
            a: 'A high render scale creates many pixels per page. Use 2× and JPG quality around 85% for screen use, or reduce quality for previews. Each page is a separate file, so a long PDF naturally produces a larger ZIP.',
          },
          {
            q: 'Does it work with password-protected PDFs?',
            a: 'No. Encrypted PDFs are rejected. Remove the password in a PDF reader, save an unprotected copy, and convert that copy.',
          },
          {
            q: 'Are my PDFs uploaded?',
            a: 'No. PDF.js runs in your browser, and each page is drawn to a local canvas. Toolabs does not receive or store the document or the images.',
          },
        ],
        tip: 'For a quick preview, use 1× or 2× and lower quality. For print, prefer exporting from the original design tool rather than upscaling a PDF render.',
      },
      id: {
        title: 'PDF ke JPG Online Gratis — Tanpa Upload',
        h1: 'Ubah halaman PDF menjadi JPG',
        metaDescription:
          'Ubah setiap halaman PDF menjadi JPG di browser. Atur skala render dan kualitas, lalu unduh satu per satu atau sebagai ZIP. Tanpa upload.',
        answerQuestion: 'Bagaimana cara mengubah PDF menjadi gambar JPG?',
        shortAnswer:
          'Tambahkan PDF dan pilih skala render. Toolabs memakai PDF.js untuk menggambar setiap halaman di canvas dan menyimpannya sebagai JPG. Unduh halaman satu per satu atau semuanya sebagai ZIP. Teks menjadi bagian dari gambar, sehingga tautan dan teks yang bisa dipilih hilang pada hasil JPG.',
        intro:
          'PDF bagus untuk berbagi dokumen, tetapi merepotkan ketika situs hanya menerima gambar atau Anda butuh pratinjau cepat untuk presentasi. Konverter ini merender setiap halaman pada resolusi pilihan Anda dan mengodekannya sebagai JPG. Skala 2× menghasilkan sekitar 144 DPI dari halaman PDF standar 72 DPI, tajam di layar dan cukup untuk banyak formulir; 3× atau 4× lebih baik untuk cetak tetapi file jauh lebih besar. Rendering dilakukan dengan PDF.js di browser. Karena halaman menjadi gambar, teks tidak lagi bisa dipilih dan tautan tidak berfungsi. Tool ini sengaja satu arah: gunakan JPG ke PDF untuk kembali, tetapi lapisan teks tidak akan pulih.',
        steps: [
          'Tambahkan PDF yang ingin dikonversi.',
          'Pilih skala render: 1× untuk pratinjau, 2× untuk umum, 3–4× untuk cetak.',
          'Sesuaikan kualitas JPG bila ukuran file penting.',
          'Tekan Proses file dan tunggu setiap halaman dirender.',
          'Unduh JPG satu per satu atau semua halaman sebagai ZIP.',
        ],
        benefits: [
          'Membuat pratinjau dan thumbnail dari PDF tanpa instal software.',
          'Mengekspor semua halaman pada resolusi yang konsisten dan dapat diatur.',
          'Unduhan ZIP memudahkan pekerjaan banyak halaman.',
          'PDF tidak meninggalkan browser, penting untuk kontrak dan identitas.',
        ],
        useCases: [
          'Mengubah halaman portofolio PDF menjadi gambar untuk situs.',
          'Membuat pratinjau JPG laporan untuk chat atau presentasi.',
          'Mengekstrak formulir hasil pindai sebagai gambar untuk unggahan yang hanya menerima JPG.',
          'Menyiapkan gambar halaman untuk mockup desain atau unggahan sosial.',
        ],
        faq: [
          {
            q: 'Berapa resolusi JPG yang dihasilkan?',
            a: 'Resolusi bergantung pada ukuran halaman PDF dan skala render. Halaman PDF memakai poin pada 72 per inci. Render 2× memberi sekitar 144 DPI, 3× sekitar 216 DPI, dan 4× sekitar 288 DPI. Skala lebih besar menghasilkan gambar lebih tajam dan file jauh lebih besar.',
          },
          {
            q: 'Bisakah mengonversi hanya beberapa halaman?',
            a: 'Versi saat ini merender semua halaman. Untuk menyimpan halaman tertentu, pisahkan PDF dulu dengan Pisah PDF, lalu konversi file hasilnya.',
          },
          {
            q: 'Apakah JPG mempertahankan teks dan tautan?',
            a: 'Tidak. JPG adalah format gambar. Teks menjadi piksel, sehingga tidak bisa dipilih atau dicari, dan hyperlink tidak dipertahankan. Simpan PDF asli bila membutuhkan dokumen yang bisa dicari.',
          },
          {
            q: 'Mengapa file hasilnya sangat besar?',
            a: 'Skala render tinggi menghasilkan banyak piksel per halaman. Gunakan 2× dan kualitas JPG sekitar 85% untuk layar, atau turunkan kualitas untuk pratinjau. Setiap halaman adalah file terpisah, jadi PDF panjang wajar menghasilkan ZIP lebih besar.',
          },
          {
            q: 'Apakah berfungsi untuk PDF yang dilindungi kata sandi?',
            a: 'Tidak. PDF terenkripsi ditolak. Hapus kata sandi di pembaca PDF, simpan salinan tanpa proteksi, lalu konversi salinan tersebut.',
          },
          {
            q: 'Apakah PDF saya diunggah?',
            a: 'Tidak. PDF.js berjalan di browser, dan setiap halaman digambar ke canvas lokal. Toolabs tidak menerima atau menyimpan dokumen maupun gambarnya.',
          },
        ],
        tip: 'Untuk pratinjau cepat, gunakan 1× atau 2× dengan kualitas lebih rendah. Untuk cetak, ekspor dari aplikasi desain asli lebih baik daripada memperbesar hasil render PDF.',
      },
    },
  },
];
