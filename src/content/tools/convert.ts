import type { Tool } from '../../tools.config';

export const convertTools: Tool[] = [
  {
    id: 'heic-to-jpg',
    slug: { en: 'heic-to-jpg', id: 'heic-ke-jpg' },
    category: 'convert',
    engine: 'heic-convert',
    accept: ['image/heic', 'image/heif'],
    icon: 'heic',
    featured: 4,
    options: { outputFormat: 'image/jpeg', quality: 0.92 },
    related: ['compress-jpg-to-200kb', 'jpg-to-png', 'compress-image', 'resize-image'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'HEIC to JPG Converter — Free and Private',
        h1: 'Convert HEIC to JPG in your browser',
        metaDescription:
          'Convert iPhone HEIC photos to JPG without uploading them. Choose quality and size, then download individual images or a ZIP. Free, no signup.',
        answerQuestion: 'How do I convert HEIC photos to JPG?',
        shortAnswer:
          'Add one or more HEIC files, choose the JPG quality, and press Process. Toolabs decodes the HEIC image locally with WebAssembly and re-encodes it as JPG. Download files individually or as a ZIP. The original HEIC stays untouched, and no photo is uploaded to a server.',
        intro:
          'iPhones save photos as HEIC by default because it stores good quality in less space. The problem appears when a Windows app, an older Android phone, a job portal, or a website refuses the format. This converter turns HEIC into JPG entirely in your browser using a WebAssembly decoder. You can process a batch of photos, control JPG quality, and optionally compress to a target size. The JPG will be larger than the original HEIC at similar visual quality; that is normal, because JPG is less efficient. If the HEIC contains several images, only the first frame is converted. Live Photo motion is not preserved.',
        steps: [
          'Add one or more HEIC files from your iPhone or computer.',
          'Choose the JPG quality. The default 92% is a good balance for photos.',
          'Optionally set a maximum width or a target file size.',
          'Press Process files and let the local HEIC decoder run.',
          'Download individual JPGs or all results as a ZIP.',
        ],
        benefits: [
          'Makes iPhone photos usable in Windows apps, older phones, and upload forms.',
          'Batch conversion saves repetitive work for a whole camera roll selection.',
          'No upload: personal photos never pass through a remote server.',
          'Optional target size prepares photos for portals with file limits.',
        ],
        useCases: [
          'Opening iPhone photos in Windows Photos or an older Android gallery.',
          'Uploading HEIC images to a job application that only accepts JPG.',
          'Sending iPhone photos to someone who cannot open HEIC.',
          'Preparing a batch of iPhone photos for a website or marketplace.',
        ],
        faq: [
          {
            q: 'Why can’t Windows open my iPhone photos?',
            a: 'Windows does not include a HEIC decoder by default on many installations. You can install a codec from the Microsoft Store, or convert the photos to JPG, which every version of Windows can open.',
          },
          {
            q: 'Does converting HEIC to JPG reduce quality?',
            a: 'Yes, slightly. JPG is lossy and always re-encodes the pixels. At 92% quality the difference is hard to see on screen. The JPG will also be larger than the HEIC because JPEG compression is less efficient.',
          },
          {
            q: 'Are Live Photos supported?',
            a: 'Only the still image is converted. The short video and motion metadata that make a Live Photo are not preserved in JPG. This is expected because JPG has no concept of motion.',
          },
          {
            q: 'What happens to multiple images inside one HEIC?',
            a: 'Some HEIC files contain several images or frames. Toolabs converts the first one and shows a warning. For burst photos, add each HEIC file separately.',
          },
          {
            q: 'Can I also resize the photos?',
            a: 'Yes. Expand Options and set a maximum width or target size before processing. The HEIC is decoded first, then the JPG is resized or compressed in the local image worker.',
          },
          {
            q: 'Are my photos uploaded?',
            a: 'No. The HEIC decoder runs in your browser through WebAssembly, and the JPG is created on your device. Toolabs does not receive, store, or see the photos.',
          },
        ],
        comparison: {
          caption: 'HEIC vs JPG vs PNG for iPhone photos',
          headers: ['Format', 'Typical strength', 'Typical weakness'],
          rows: [
            ['HEIC', 'Small files with high quality; supports HDR and Live Photos', 'Limited app support outside Apple devices'],
            ['JPG', 'Universally supported; small enough for uploads', 'Lossy; no transparency or animation'],
            ['PNG', 'Lossless and supports transparency', 'Much larger for photographs'],
          ],
          note: 'Converting to JPG does not recover more detail than the HEIC contains. It simply makes the photo compatible.',
        },
        tip: 'If a portal limits photos to 200 KB, convert to JPG first, then use Compress JPG to 200 KB. Converting directly with a target size also works and saves a step.',
      },
      id: {
        title: 'HEIC ke JPG Online Gratis — Tanpa Upload',
        h1: 'Konversi HEIC ke JPG di browser',
        metaDescription:
          'Konversi foto HEIC iPhone ke JPG tanpa upload. Atur kualitas dan ukuran, lalu unduh satu per satu atau sebagai ZIP. Gratis, tanpa daftar.',
        answerQuestion: 'Bagaimana cara mengonversi foto HEIC ke JPG?',
        shortAnswer:
          'Tambahkan satu atau beberapa file HEIC, pilih kualitas JPG, lalu tekan Proses. Toolabs membuka HEIC secara lokal dengan WebAssembly dan mengodekannya ulang sebagai JPG. Unduh file satu per satu atau sebagai ZIP. HEIC asli tidak berubah dan tidak ada foto yang diunggah ke server.',
        intro:
          'iPhone menyimpan foto sebagai HEIC secara bawaan karena kualitasnya baik dengan ukuran lebih kecil. Masalah muncul ketika aplikasi Windows, ponsel Android lama, portal lamaran, atau situs menolak format tersebut. Konverter ini mengubah HEIC menjadi JPG sepenuhnya di browser memakai dekoder WebAssembly. Anda bisa memproses beberapa foto, mengatur kualitas JPG, dan bila perlu mengompres ke target ukuran. JPG akan lebih besar daripada HEIC asli pada kualitas visual serupa; itu normal karena JPG kurang efisien. Jika HEIC berisi beberapa gambar, hanya frame pertama yang dikonversi. Gerakan Live Photo tidak dipertahankan.',
        steps: [
          'Tambahkan satu atau beberapa file HEIC dari iPhone atau komputer.',
          'Pilih kualitas JPG. Bawaan 92% seimbang untuk foto.',
          'Opsional: tentukan lebar maksimum atau target ukuran file.',
          'Tekan Proses file dan tunggu dekoder HEIC lokal bekerja.',
          'Unduh JPG satu per satu atau semua hasil sebagai ZIP.',
        ],
        benefits: [
          'Membuat foto iPhone bisa dibuka di aplikasi Windows, ponsel lama, dan formulir unggah.',
          'Konversi batch menghemat pekerjaan untuk banyak foto sekaligus.',
          'Tanpa upload: foto pribadi tidak melewati server jarak jauh.',
          'Target ukuran opsional menyiapkan foto untuk portal dengan batas file.',
        ],
        useCases: [
          'Membuka foto iPhone di Windows Photos atau galeri Android lama.',
          'Mengunggah gambar HEIC ke lamaran yang hanya menerima JPG.',
          'Mengirim foto iPhone ke orang yang tidak bisa membuka HEIC.',
          'Menyiapkan banyak foto iPhone untuk situs atau marketplace.',
        ],
        faq: [
          {
            q: 'Mengapa Windows tidak bisa membuka foto iPhone saya?',
            a: 'Banyak instalasi Windows tidak menyertakan dekoder HEIC secara bawaan. Anda bisa memasang codec dari Microsoft Store, atau mengonversi foto ke JPG yang bisa dibuka semua versi Windows.',
          },
          {
            q: 'Apakah konversi HEIC ke JPG menurunkan kualitas?',
            a: 'Ya, sedikit. JPG bersifat lossy dan selalu mengodekan ulang piksel. Pada kualitas 92%, perbedaannya sulit terlihat di layar. JPG juga akan lebih besar daripada HEIC karena kompresi JPEG kurang efisien.',
          },
          {
            q: 'Apakah Live Photo didukung?',
            a: 'Hanya gambar diamnya yang dikonversi. Video pendek dan metadata gerak yang membentuk Live Photo tidak dipertahankan di JPG. Ini wajar karena JPG tidak mengenal gerakan.',
          },
          {
            q: 'Apa yang terjadi bila satu HEIC berisi beberapa gambar?',
            a: 'Sebagian file HEIC berisi beberapa gambar atau frame. Toolabs mengonversi yang pertama dan menampilkan peringatan. Untuk foto burst, tambahkan setiap file HEIC secara terpisah.',
          },
          {
            q: 'Bisakah sekaligus mengubah ukuran foto?',
            a: 'Bisa. Buka Opsi dan tentukan lebar maksimum atau target ukuran sebelum memproses. HEIC dibuka lebih dulu, lalu JPG diubah ukurannya atau dikompres di worker gambar lokal.',
          },
          {
            q: 'Apakah foto saya diunggah?',
            a: 'Tidak. Dekoder HEIC berjalan di browser melalui WebAssembly, dan JPG dibuat di perangkat Anda. Toolabs tidak menerima, menyimpan, atau melihat foto tersebut.',
          },
        ],
        comparison: {
          caption: 'HEIC vs JPG vs PNG untuk foto iPhone',
          headers: ['Format', 'Kelebihan umum', 'Kekurangan umum'],
          rows: [
            ['HEIC', 'File kecil dengan kualitas tinggi; mendukung HDR dan Live Photos', 'Dukungan aplikasi terbatas di luar perangkat Apple'],
            ['JPG', 'Didukung universal; cukup kecil untuk unggahan', 'Lossy; tanpa transparansi atau animasi'],
            ['PNG', 'Lossless dan mendukung transparansi', 'Jauh lebih besar untuk foto'],
          ],
          note: 'Konversi ke JPG tidak memulihkan detail melebihi isi HEIC. Konversi hanya membuat foto lebih kompatibel.',
        },
        tip: 'Jika portal membatasi foto 200 KB, konversi dulu ke JPG, lalu gunakan Kompres JPG 200 KB. Mengonversi langsung dengan target ukuran juga bisa dan menghemat satu langkah.',
      },
    },
  },

  {
    id: 'png-to-webp',
    slug: { en: 'png-to-webp', id: 'png-ke-webp' },
    category: 'convert',
    engine: 'image-convert',
    accept: ['image/png'],
    icon: 'webp',
    options: { outputFormat: 'image/webp', quality: 0.85 },
    related: ['webp-to-jpg', 'compress-png', 'compress-image', 'jpg-to-png'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'PNG to WebP Converter — Free and Private',
        h1: 'Convert PNG to WebP',
        metaDescription:
          'Convert PNG images to WebP in your browser. Keep transparency, reduce file size, and download in seconds — no upload, no signup.',
        answerQuestion: 'How do I convert PNG to WebP?',
        shortAnswer:
          'Add a PNG, choose a quality level, and press Process. Toolabs converts the image to WebP on a local canvas, keeping transparent pixels intact. The result is usually much smaller than the PNG. Download single files or a ZIP, and compare the before and after size before using it.',
        intro:
          'WebP is the pragmatic replacement for PNG on the web. It supports transparency, sharp edges, and both lossy and lossless compression. For photographs saved as PNG, switching to WebP often cuts the file size by more than half with no visible difference. For logos and screenshots, WebP usually still beats PNG, though the gain is smaller. This converter runs in your browser and preserves the alpha channel. Quality 85% is a good starting point for photos; the slider tops out at 95% because this browser encoder is lossy. Keep the PNG if the image must remain pixel-identical. WebP is supported by all current major browsers, but some older desktop apps cannot import it.',
        steps: [
          'Add one or more PNG files.',
          'Set the WebP quality. Use 80–90% for photos and near 100% for graphics.',
          'Press Process files to convert locally.',
          'Compare the original and WebP sizes shown in the results.',
          'Download each WebP file or all of them as a ZIP.',
        ],
        benefits: [
          'Large size savings, especially for photographs saved as PNG.',
          'Transparency is preserved; white boxes do not appear behind logos.',
          'No upload keeps unreleased designs and client assets private.',
          'Batch conversion makes a whole image folder web-ready.',
        ],
        useCases: [
          'Replacing heavy PNG product photos on an online store.',
          'Optimizing transparent logos for a faster website.',
          'Preparing images for a WebP-only CMS or CDN.',
          'Reducing screenshot attachments without converting to blurry JPG.',
        ],
        faq: [
          {
            q: 'Is WebP smaller than PNG?',
            a: 'Usually yes, often substantially for photographs. For simple flat graphics the difference is smaller, but WebP still tends to win. The result panel shows the actual saving for your file, so you can decide.',
          },
          {
            q: 'Is transparency preserved?',
            a: 'Yes. The converter keeps the alpha channel, so transparent PNG areas remain transparent in WebP. JPG would replace transparency with white, which is why WebP is the better choice for logos.',
          },
          {
            q: 'Is WebP supported everywhere?',
            a: 'All current versions of Chrome, Safari, Firefox, and Edge support WebP. Older desktop publishing, office, and design applications may not import it. If you need a file for a specific app, check its supported formats first.',
          },
          {
            q: 'Does conversion reduce quality?',
            a: 'This tool uses the browser’s lossy WebP encoder, so some pixel detail is discarded at every slider setting, including 95%. For photos, 80-90% is usually visually indistinguishable and much smaller. Keep the PNG when you need pixel-identical output, because the WebP lossless mode is not exposed here.',
          },
          {
            q: 'Can I convert animated PNG files?',
            a: 'Only the first frame is converted. APNG animation is not preserved. Use a dedicated animation converter if motion matters.',
          },
          {
            q: 'Are my images uploaded?',
            a: 'No. The PNG is decoded and encoded by your browser on a local canvas. Toolabs does not receive the file.',
          },
        ],
        comparison: {
          caption: 'PNG vs WebP by content type',
          headers: ['Content', 'PNG', 'WebP (85%)'],
          rows: [
            ['Photograph', 'Very large', 'Often 50–80% smaller'],
            ['Transparent logo', 'Sharp edges, moderate size', 'Sharp edges, usually smaller'],
            ['Screenshot with text', 'Sharp, large', 'Sharp, usually smaller'],
            ['Image for an old desktop app', 'Universally supported', 'May not open'],
          ],
          note: 'Savings depend on the image. The tool reports the real result rather than an advertised average.',
        },
        tip: 'If you need the smallest possible file and do not need transparency, compare WebP with a high-quality JPG. For photos, JPG and WebP are close; for graphics, WebP usually wins.',
      },
      id: {
        title: 'PNG ke WebP Online Gratis — Tanpa Upload',
        h1: 'Konversi PNG ke WebP',
        metaDescription:
          'Konversi gambar PNG ke WebP di browser. Transparansi tetap, ukuran file lebih kecil, unduh dalam hitungan detik. Gratis, tanpa upload.',
        answerQuestion: 'Bagaimana cara mengonversi PNG ke WebP?',
        shortAnswer:
          'Tambahkan PNG, pilih tingkat kualitas, lalu tekan Proses. Toolabs mengonversi gambar ke WebP di canvas lokal dan mempertahankan piksel transparan. Hasilnya biasanya jauh lebih kecil daripada PNG. Unduh file tunggal atau ZIP, dan bandingkan ukuran sebelum serta sesudah sebelum dipakai.',
        intro:
          'WebP adalah pengganti praktis PNG untuk web. Format ini mendukung transparansi, tepi tajam, serta kompresi lossy maupun lossless. Untuk foto yang tersimpan sebagai PNG, beralih ke WebP sering memangkas ukuran lebih dari setengah tanpa perbedaan terlihat. Untuk logo dan tangkapan layar, WebP biasanya masih lebih kecil, meskipun selisihnya tidak sebesar foto. Konverter ini berjalan di browser dan mempertahankan kanal alpha. Kualitas 85% adalah titik awal yang baik untuk foto; slider berhenti di 95% karena encoder browser ini bersifat lossy. Pertahankan PNG bila gambar harus identik piksel. WebP didukung semua browser utama, tetapi sebagian aplikasi desktop lama belum bisa mengimpornya.',
        steps: [
          'Tambahkan satu atau beberapa file PNG.',
          'Atur kualitas WebP. Gunakan 80–90% untuk foto dan mendekati 100% untuk grafik.',
          'Tekan Proses file untuk mengonversi secara lokal.',
          'Bandingkan ukuran PNG asli dan WebP pada hasil.',
          'Unduh setiap file WebP atau semuanya sebagai ZIP.',
        ],
        benefits: [
          'Penghematan ukuran besar, terutama untuk foto yang disimpan sebagai PNG.',
          'Transparansi dipertahankan; tidak muncul kotak putih di belakang logo.',
          'Tanpa upload, desain yang belum dirilis dan aset klien tetap privat.',
          'Konversi batch membuat seluruh folder gambar siap web.',
        ],
        useCases: [
          'Mengganti foto produk PNG yang berat di toko online.',
          'Mengoptimalkan logo transparan agar situs lebih cepat.',
          'Menyiapkan gambar untuk CMS atau CDN yang mendukung WebP.',
          'Memperkecil lampiran tangkapan layar tanpa mengubahnya menjadi JPG yang kabur.',
        ],
        faq: [
          {
            q: 'Apakah WebP lebih kecil dari PNG?',
            a: 'Biasanya ya, sering jauh lebih kecil untuk foto. Untuk grafik datar sederhana selisihnya lebih kecil, tetapi WebP umumnya tetap unggul. Panel hasil menunjukkan penghematan nyata untuk file Anda.',
          },
          {
            q: 'Apakah transparansi dipertahankan?',
            a: 'Ya. Konverter mempertahankan kanal alpha, sehingga area transparan PNG tetap transparan di WebP. JPG akan menggantinya dengan putih, karena itu WebP lebih baik untuk logo.',
          },
          {
            q: 'Apakah WebP didukung di semua tempat?',
            a: 'Semua versi terbaru Chrome, Safari, Firefox, dan Edge mendukung WebP. Aplikasi office, desain, dan penerbitan desktop lama mungkin belum bisa mengimpornya. Jika file dibutuhkan untuk aplikasi tertentu, periksa format yang didukung.',
          },
          {
            q: 'Apakah konversi menurunkan kualitas?',
            a: 'Tool ini memakai encoder WebP lossy dari browser, jadi sebagian detail piksel dibuang pada semua pilihan slider, termasuk 95%. Untuk foto, 80-90% biasanya tidak terlihat berbeda dan jauh lebih kecil. Pertahankan PNG bila butuh hasil identik piksel, karena mode lossless WebP tidak tersedia di sini.',
          },
          {
            q: 'Bisakah mengonversi PNG animasi?',
            a: 'Hanya frame pertama yang dikonversi. Animasi APNG tidak dipertahankan. Gunakan konverter animasi khusus jika gerakan penting.',
          },
          {
            q: 'Apakah gambar saya diunggah?',
            a: 'Tidak. PNG dibaca dan dikodekan browser di canvas lokal. Toolabs tidak menerima file tersebut.',
          },
        ],
        comparison: {
          caption: 'PNG vs WebP menurut jenis konten',
          headers: ['Konten', 'PNG', 'WebP (85%)'],
          rows: [
            ['Foto', 'Sangat besar', 'Sering 50–80% lebih kecil'],
            ['Logo transparan', 'Tepi tajam, ukuran sedang', 'Tepi tajam, biasanya lebih kecil'],
            ['Tangkapan layar dengan teks', 'Tajam, besar', 'Tajam, biasanya lebih kecil'],
            ['Gambar untuk aplikasi desktop lama', 'Didukung universal', 'Mungkin tidak bisa dibuka'],
          ],
          note: 'Penghematan bergantung pada gambar. Tool melaporkan hasil nyata, bukan rata-rata iklan.',
        },
        tip: 'Jika butuh file sekecil mungkin dan tidak perlu transparansi, bandingkan WebP dengan JPG kualitas tinggi. Untuk foto, JPG dan WebP berdekatan; untuk grafik, WebP biasanya menang.',
      },
    },
  },

  {
    id: 'webp-to-jpg',
    slug: { en: 'webp-to-jpg', id: 'webp-ke-jpg' },
    category: 'convert',
    engine: 'image-convert',
    accept: ['image/webp'],
    icon: 'jpg',
    options: { outputFormat: 'image/jpeg', quality: 0.9 },
    related: ['png-to-webp', 'jpg-to-png', 'compress-image', 'resize-image'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'WebP to JPG Converter — Free and Private',
        h1: 'Convert WebP to JPG',
        metaDescription:
          'Convert WebP images to widely compatible JPGs in your browser. Choose quality, handle transparency, and download instantly. No upload.',
        answerQuestion: 'How do I convert WebP to JPG?',
        shortAnswer:
          'Add a WebP image, choose the JPG quality, and press Process. Toolabs decodes the WebP locally and re-encodes it as JPG. Transparent areas become white because JPG has no alpha channel. Download individual files or a ZIP; the original WebP stays unchanged on your device.',
        intro:
          'WebP is common on websites but still awkward in some desktop apps, office templates, and upload forms. Converting to JPG fixes compatibility at the cost of transparency and a small amount of image quality. This converter runs entirely in your browser. The default 90% quality keeps photos looking clean while producing a reasonable file size. If the source has transparent areas, they will appear white in the JPG, so choose a source with a solid background when possible. Animated WebP files are reduced to their first frame. For a smaller file rather than a different format, use Compress Image instead.',
        steps: [
          'Add one or more WebP files.',
          'Set the JPG quality. 90% is a good default for photos.',
          'Optionally set a maximum width or target file size.',
          'Press Process files to convert locally.',
          'Download the JPGs individually or as a ZIP.',
        ],
        benefits: [
          'Makes WebP images usable in apps that only accept JPG.',
          'Batch conversion handles downloaded image folders quickly.',
          'No upload, so product photos and private images stay local.',
          'Optional resize and target size reduce an extra editing step.',
        ],
        useCases: [
          'Inserting a WebP image into an older Word or PowerPoint document.',
          'Uploading a WebP download to a portal that requires JPG.',
          'Sending an image to someone whose app cannot open WebP.',
          'Preparing website images for a print service that only accepts JPG.',
        ],
        faq: [
          {
            q: 'What happens to transparent areas?',
            a: 'JPG does not support transparency, so transparent pixels are filled with white. If the image is a logo on a transparent background, consider keeping it as PNG or WebP instead of converting to JPG.',
          },
          {
            q: 'Does converting WebP to JPG reduce quality?',
            a: 'Yes, slightly, because JPG is lossy. At 90% quality the difference is usually hard to see. Converting back to WebP later will not restore the original detail.',
          },
          {
            q: 'Why is the JPG larger than the WebP?',
            a: 'WebP compresses more efficiently than JPG, especially at small file sizes. The JPG may be 20–50% larger at similar visual quality. That is expected and is the trade-off for broader compatibility.',
          },
          {
            q: 'Are animated WebP files supported?',
            a: 'Only the first frame is converted. Animation is not preserved in JPG. Use a video or animation tool if motion is essential.',
          },
          {
            q: 'Can I convert and resize at the same time?',
            a: 'Yes. Open Options and set a maximum width or target size. The image is decoded once and the final JPG is resized and compressed locally.',
          },
          {
            q: 'Are my images uploaded?',
            a: 'No. The WebP is decoded by your browser and encoded as JPG on a local canvas. Toolabs does not receive the image.',
          },
        ],
        comparison: {
          caption: 'When to keep WebP and when to convert',
          headers: ['Situation', 'Keep WebP', 'Convert to JPG'],
          rows: [
            ['Website image', 'Yes — smaller and well supported', 'Only if the CMS requires it'],
            ['Older desktop app', 'Risky', 'Yes — maximum compatibility'],
            ['Transparent logo', 'Yes', 'Avoid — transparency becomes white'],
            ['Photo for a print shop', 'Often unsupported', 'Yes — JPG or TIFF is safer'],
          ],
          note: 'If you need transparency and broad compatibility, PNG is a better target than JPG.',
        },
        tip: 'For logos with transparency, convert WebP to PNG instead of JPG. For photos, JPG is the safer universal choice.',
      },
      id: {
        title: 'WebP ke JPG Online Gratis — Tanpa Upload',
        h1: 'Konversi WebP ke JPG',
        metaDescription:
          'Konversi gambar WebP ke JPG yang kompatibel di browser. Atur kualitas, tangani transparansi, lalu unduh. Gratis, tanpa upload.',
        answerQuestion: 'Bagaimana cara mengonversi WebP ke JPG?',
        shortAnswer:
          'Tambahkan gambar WebP, pilih kualitas JPG, lalu tekan Proses. Toolabs membuka WebP secara lokal dan mengodekannya ulang sebagai JPG. Area transparan menjadi putih karena JPG tidak punya kanal alpha. Unduh satu per satu atau sebagai ZIP; WebP asli tetap tidak berubah di perangkat.',
        intro:
          'WebP umum di situs web tetapi masih merepotkan di sebagian aplikasi desktop, templat office, dan formulir unggah. Konversi ke JPG memperbaiki kompatibilitas dengan mengorbankan transparansi dan sedikit kualitas gambar. Konverter ini berjalan sepenuhnya di browser. Kualitas bawaan 90% menjaga foto tetap bersih dengan ukuran file wajar. Jika sumber memiliki area transparan, area itu akan tampak putih di JPG, jadi pilih sumber dengan latar solid bila memungkinkan. File WebP animasi dikurangi menjadi frame pertama. Untuk file lebih kecil, bukan format berbeda, gunakan Kompres Gambar.',
        steps: [
          'Tambahkan satu atau beberapa file WebP.',
          'Atur kualitas JPG. 90% adalah bawaan yang baik untuk foto.',
          'Opsional: tentukan lebar maksimum atau target ukuran file.',
          'Tekan Proses file untuk mengonversi secara lokal.',
          'Unduh JPG satu per satu atau sebagai ZIP.',
        ],
        benefits: [
          'Membuat gambar WebP bisa dipakai di aplikasi yang hanya menerima JPG.',
          'Konversi batch menangani folder gambar unduhan dengan cepat.',
          'Tanpa upload, foto produk dan gambar pribadi tetap lokal.',
          'Resize dan target ukuran opsional mengurangi langkah edit tambahan.',
        ],
        useCases: [
          'Menyisipkan gambar WebP ke dokumen Word atau PowerPoint lama.',
          'Mengunggah hasil unduhan WebP ke portal yang mewajibkan JPG.',
          'Mengirim gambar ke orang yang aplikasinya tidak bisa membuka WebP.',
          'Menyiapkan gambar situs untuk layanan cetak yang hanya menerima JPG.',
        ],
        faq: [
          {
            q: 'Apa yang terjadi pada area transparan?',
            a: 'JPG tidak mendukung transparansi, sehingga piksel transparan diisi putih. Jika gambar adalah logo berlatar transparan, pertimbangkan tetap PNG atau WebP daripada JPG.',
          },
          {
            q: 'Apakah konversi WebP ke JPG menurunkan kualitas?',
            a: 'Ya, sedikit, karena JPG lossy. Pada kualitas 90%, perbedaannya biasanya sulit terlihat. Mengonversi kembali ke WebP nanti tidak akan memulihkan detail asli.',
          },
          {
            q: 'Mengapa JPG lebih besar daripada WebP?',
            a: 'WebP mengompres lebih efisien daripada JPG, terutama pada ukuran kecil. JPG bisa 20–50% lebih besar pada kualitas visual serupa. Itu wajar dan merupakan konsekuensi kompatibilitas yang lebih luas.',
          },
          {
            q: 'Apakah file WebP animasi didukung?',
            a: 'Hanya frame pertama yang dikonversi. Animasi tidak dipertahankan di JPG. Gunakan tool video atau animasi jika gerakan penting.',
          },
          {
            q: 'Bisakah mengonversi dan mengubah ukuran sekaligus?',
            a: 'Bisa. Buka Opsi dan tentukan lebar maksimum atau target ukuran. Gambar dibaca sekali, lalu JPG akhir diubah ukurannya dan dikompres secara lokal.',
          },
          {
            q: 'Apakah gambar saya diunggah?',
            a: 'Tidak. WebP dibuka browser dan dikodekan sebagai JPG di canvas lokal. Toolabs tidak menerima gambar tersebut.',
          },
        ],
        comparison: {
          caption: 'Kapan mempertahankan WebP dan kapan ke JPG',
          headers: ['Situasi', 'Pertahankan WebP', 'Konversi ke JPG'],
          rows: [
            ['Gambar situs web', 'Ya — lebih kecil dan didukung luas', 'Hanya jika CMS mewajibkan'],
            ['Aplikasi desktop lama', 'Berisiko', 'Ya — kompatibilitas maksimal'],
            ['Logo transparan', 'Ya', 'Hindari — transparansi menjadi putih'],
            ['Foto untuk cetak', 'Sering tidak didukung', 'Ya — JPG atau TIFF lebih aman'],
          ],
          note: 'Jika butuh transparansi sekaligus kompatibilitas luas, PNG adalah target yang lebih baik daripada JPG.',
        },
        tip: 'Untuk logo transparan, konversi WebP ke PNG, bukan JPG. Untuk foto, JPG adalah pilihan universal yang lebih aman.',
      },
    },
  },

  {
    id: 'jpg-to-png',
    slug: { en: 'jpg-to-png', id: 'jpg-ke-png' },
    category: 'convert',
    engine: 'image-convert',
    accept: ['image/jpeg'],
    icon: 'png',
    options: { outputFormat: 'image/png', quality: 1 },
    related: ['png-to-webp', 'webp-to-jpg', 'compress-png', 'resize-image'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'JPG to PNG Converter — Free and Private',
        h1: 'Convert JPG to PNG',
        metaDescription:
          'Convert JPG photos to PNG in your browser. No upload, no signup, and no artificial quality gain — just a lossless PNG copy of the image.',
        answerQuestion: 'How do I convert a JPG to PNG?',
        shortAnswer:
          'Add a JPG, choose whether to resize it, and press Process. Toolabs decodes the photo and writes a lossless PNG in your browser. The PNG will usually be larger, and the conversion cannot restore detail that the JPG already lost. Download the file directly or as part of a ZIP.',
        intro:
          'JPG to PNG is one of the most misunderstood conversions. Turning a JPG into PNG does not improve quality: the compression artefacts are already part of the pixels, and PNG faithfully preserves them. What PNG gives you is a lossless container, an alpha channel (unused because JPG has no transparency), and compatibility with workflows that require PNG. The file will usually be several times larger. This tool is useful when a system refuses JPG, when you need to edit and re-save repeatedly without adding a new generation of JPG artefacts, or when preparing an image for a lossless pipeline. It will not turn a low-resolution photo into a high-resolution one.',
        steps: [
          'Add one or more JPG files.',
          'Optionally set new dimensions or a maximum width.',
          'Press Process files. The PNG is encoded locally.',
          'Check the larger file size; this is expected for PNG.',
          'Download individual PNGs or all results as a ZIP.',
        ],
        benefits: [
          'Creates a PNG for systems that reject JPG uploads.',
          'Avoids additional lossy compression during later edits.',
          'No upload means personal photos stay on your device.',
          'Batch conversion keeps mixed image folders consistent.',
        ],
        useCases: [
          'Uploading to a form that only lists PNG as an accepted image format.',
          'Preparing an image for a lossless editing workflow.',
          'Creating a PNG copy before adding annotations or text.',
          'Converting a set of JPG screenshots for a documentation tool that requires PNG.',
        ],
        faq: [
          {
            q: 'Does converting JPG to PNG improve quality?',
            a: 'No. The pixels are already compressed. PNG stores them without further loss, but it cannot recover detail that was discarded when the JPG was created. Any blur or blockiness remains.',
          },
          {
            q: 'Why is the PNG so much larger?',
            a: 'PNG is lossless and typically uses more bits per pixel than JPG. A photo that is 300 KB as JPG can easily become 2–5 MB as PNG. If file size matters, keep the JPG or convert to WebP instead.',
          },
          {
            q: 'Can I add a transparent background?',
            a: 'Not with this converter. JPG has no transparency, and the conversion fills the canvas with the original pixels. To remove a background, use a dedicated background-removal tool after conversion.',
          },
          {
            q: 'Should I use PNG for photos on a website?',
            a: 'No, unless the photo needs transparency or lossless editing. WebP or JPG gives a much smaller file for photographs. PNG is better for screenshots, diagrams, and images with sharp edges.',
          },
          {
            q: 'Does the tool keep EXIF data?',
            a: 'No. Re-encoding to PNG creates a new file without EXIF metadata, including GPS location and camera information. The image orientation is applied before encoding, so it still looks upright.',
          },
          {
            q: 'Are my files uploaded?',
            a: 'No. The JPG is decoded and the PNG is encoded by your browser. Toolabs does not receive or store the image.',
          },
        ],
        comparison: {
          caption: 'JPG vs PNG for different jobs',
          headers: ['Job', 'JPG', 'PNG'],
          rows: [
            ['Photo for a website', 'Better — small file', 'Much larger, no visual gain'],
            ['Screenshot with text', 'Blurry edges', 'Sharp and lossless'],
            ['Repeated editing', 'Adds artifacts each save', 'No generation loss'],
            ['Transparency', 'Not supported', 'Supported'],
            ['Portal that only accepts PNG', 'Rejected', 'Accepted'],
          ],
          note: 'Choose the format the destination requires, but avoid PNG for large photo galleries where bandwidth matters.',
        },
        tip: 'If you need a small file with broad support, convert JPG to WebP rather than PNG. Use PNG only when lossless editing or a PNG-only upload requires it.',
      },
      id: {
        title: 'JPG ke PNG Online Gratis — Tanpa Upload',
        h1: 'Konversi JPG ke PNG',
        metaDescription:
          'Konversi foto JPG ke PNG di browser. Tanpa upload, tanpa daftar, dan tanpa peningkatan kualitas palsu — hanya salinan PNG lossless.',
        answerQuestion: 'Bagaimana cara mengonversi JPG ke PNG?',
        shortAnswer:
          'Tambahkan JPG, tentukan apakah perlu diubah ukurannya, lalu tekan Proses. Toolabs membuka foto dan menulis PNG lossless di browser. PNG biasanya lebih besar, dan konversi tidak bisa memulihkan detail yang sudah hilang dari JPG. Unduh file langsung atau sebagai bagian dari ZIP.',
        intro:
          'JPG ke PNG adalah salah satu konversi yang paling sering disalahpahami. Mengubah JPG menjadi PNG tidak meningkatkan kualitas: artefak kompresi sudah menjadi bagian dari piksel, dan PNG menyimpannya dengan setia. Yang diberikan PNG adalah wadah lossless, kanal alpha (tidak terpakai karena JPG tidak transparan), dan kompatibilitas dengan alur kerja yang mewajibkan PNG. Ukuran file biasanya menjadi beberapa kali lebih besar. Tool ini berguna ketika sistem menolak JPG, saat Anda perlu mengedit dan menyimpan berulang tanpa menambah generasi artefak JPG baru, atau saat menyiapkan gambar untuk alur lossless. Tool ini tidak mengubah foto resolusi rendah menjadi resolusi tinggi.',
        steps: [
          'Tambahkan satu atau beberapa file JPG.',
          'Opsional: tentukan dimensi baru atau lebar maksimum.',
          'Tekan Proses file. PNG dikodekan secara lokal.',
          'Periksa ukuran file yang lebih besar; ini wajar untuk PNG.',
          'Unduh PNG satu per satu atau semua hasil sebagai ZIP.',
        ],
        benefits: [
          'Membuat PNG untuk sistem yang menolak unggahan JPG.',
          'Menghindari kompresi lossy tambahan saat pengeditan berikutnya.',
          'Tanpa upload, foto pribadi tetap di perangkat Anda.',
          'Konversi batch menjaga konsistensi folder gambar campuran.',
        ],
        useCases: [
          'Mengunggah ke formulir yang hanya mencantumkan PNG sebagai format gambar.',
          'Menyiapkan gambar untuk alur pengeditan lossless.',
          'Membuat salinan PNG sebelum menambahkan anotasi atau teks.',
          'Mengonversi kumpulan tangkapan layar JPG untuk tool dokumentasi yang mewajibkan PNG.',
        ],
        faq: [
          {
            q: 'Apakah konversi JPG ke PNG meningkatkan kualitas?',
            a: 'Tidak. Piksel sudah dikompres. PNG menyimpannya tanpa kehilangan tambahan, tetapi tidak bisa memulihkan detail yang dibuang saat JPG dibuat. Blur atau blok yang ada tetap terlihat.',
          },
          {
            q: 'Mengapa PNG jauh lebih besar?',
            a: 'PNG lossless dan biasanya memakai lebih banyak bit per piksel daripada JPG. Foto 300 KB sebagai JPG bisa menjadi 2–5 MB sebagai PNG. Jika ukuran penting, pertahankan JPG atau konversi ke WebP.',
          },
          {
            q: 'Bisakah menambahkan latar transparan?',
            a: 'Tidak dengan konverter ini. JPG tidak memiliki transparansi, dan konversi mengisi canvas dengan piksel asli. Untuk menghapus latar, gunakan tool penghapus latar khusus setelah konversi.',
          },
          {
            q: 'Sebaiknya pakai PNG untuk foto di situs?',
            a: 'Tidak, kecuali foto membutuhkan transparansi atau pengeditan lossless. WebP atau JPG menghasilkan file jauh lebih kecil untuk foto. PNG lebih baik untuk tangkapan layar, diagram, dan gambar dengan tepi tajam.',
          },
          {
            q: 'Apakah tool mempertahankan data EXIF?',
            a: 'Tidak. Pengodean ulang ke PNG menghasilkan file baru tanpa metadata EXIF, termasuk lokasi GPS dan informasi kamera. Orientasi gambar diterapkan sebelum encoding, sehingga tetap tampak tegak.',
          },
          {
            q: 'Apakah file saya diunggah?',
            a: 'Tidak. JPG dibuka dan PNG dikodekan oleh browser. Toolabs tidak menerima atau menyimpan gambar.',
          },
        ],
        comparison: {
          caption: 'JPG vs PNG untuk berbagai kebutuhan',
          headers: ['Kebutuhan', 'JPG', 'PNG'],
          rows: [
            ['Foto untuk situs', 'Lebih baik — file kecil', 'Jauh lebih besar, tanpa keuntungan visual'],
            ['Tangkapan layar dengan teks', 'Tepi kabur', 'Tajam dan lossless'],
            ['Pengeditan berulang', 'Menambah artefak setiap simpan', 'Tanpa kehilangan generasi'],
            ['Transparansi', 'Tidak didukung', 'Didukung'],
            ['Portal yang hanya menerima PNG', 'Ditolak', 'Diterima'],
          ],
          note: 'Pilih format yang diminta tujuan, tetapi hindari PNG untuk galeri foto besar bila bandwidth penting.',
        },
        tip: 'Jika butuh file kecil dengan dukungan luas, konversi JPG ke WebP, bukan PNG. Gunakan PNG hanya bila pengeditan lossless atau unggahan khusus PNG diperlukan.',
      },
    },
  },
];
