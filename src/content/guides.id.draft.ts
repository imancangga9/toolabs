import type { Guide } from './guides';

export const newGuidesId: Guide[] = [
  {
    id: 'heic-to-jpg-portal',
    slug: { en: 'convert-heic-to-jpg', id: 'konversi-heic-ke-jpg' },
    category: 'compress',
    title: 'Cara Konversi HEIC ke JPG agar Portal Bisa Membuka Foto',
    h1: 'Cara konversi HEIC ke JPG agar semua portal bisa membuka foto Anda',
    metaDescription:
      'Panduan konversi HEIC ke JPG untuk foto iPhone agar diterima portal kerja, kampus, dan layanan pemerintah, lengkap dengan cara memeriksa hasilnya.',
    excerpt:
      'Foto iPhone keluar sebagai HEIC dan banyak portal masih menolaknya. Ini cara mengonversinya ke JPG tanpa kehilangan orientasi, plus hal yang perlu diperiksa sebelum mengunggah.',
    quickAnswer:
      'Untuk mengonversi HEIC ke JPG, buka tool Konversi HEIC ke JPG di Toolabs, tambahkan foto dari iPhone atau Android, lalu proses. File dibaca dan dikonversi langsung di browser, jadi tidak diunggah. Hasil JPG siap diunggah ke portal, dengan konversi batch bila fotonya banyak.',
    updatedAt: '2026-10-25',
    readingMinutes: 6,
    keyTakeaways: [
      'HEIC adalah format bawaan kamera iPhone dan banyak portal masih hanya menerima JPG.',
      'Konversi mengurangi satu tingkat kualitas sekaligus menghapus metadata EXIF dari file.',
      'Gunakan PNG atau WebP jika gambar punya latar transparan yang harus dipertahankan.',
      'Periksa hasil konversi pada zoom 100% sebelum mengunggahnya ke portal.',
    ],
    blocks: [
      {
        heading: 'Mengapa foto HEIC ditolak banyak portal',
        paragraphs: [
          'Kamera iPhone sejak iOS 11 menghasilkan foto berformat HEIC, turunan dari codec HEVC dengan kedalaman warna 10-bit. Ukurannya memang lebih kecil daripada JPG pada kualitas visual serupa, dan itu alasan Apple menjadikannya format bawaan. macOS dan iOS membukanya tanpa masalah, sedangkan Windows 10 dan 11 memerlukan ekstensi HEIF dari Microsoft Store.',
          'Masalah muncul di tempat lain. Sebagian besar portal kerja, pendaftaran kampus, dan layanan pemerintah hanya menulis “JPG” di aturan unggahannya, dan banyak di antaranya memeriksa isi file, bukan sekadar ekstensi. Chrome dan Firefox mendukung HEIC sebagian, Safari sudah lengkap, tetapi penampil gambar di komputer kantor belum tentu. Hasilnya, foto Anda tidak bisa dibuka oleh orang yang seharusnya melihatnya.',
        ],
      },
      {
        heading: 'Apa yang sebenarnya terjadi saat konversi',
        paragraphs: [
          'Konversi HEIC ke JPG terdiri dari dua langkah: mendekode piksel dari HEIC, lalu mengodekan ulang piksel tersebut sebagai JPEG. Enkode ulang JPEG bersifat lossy, jadi konversi selalu memakan satu kali penurunan kualitas. Toolabs memakai kualitas 0,92 secara bawaan, yang menjaga wajah dan teks tetap terbaca sambil menekan ukuran file.',
          'Ada dua perubahan lain yang perlu diketahui. Metadata EXIF, termasuk lokasi GPS dan detail kamera, ikut terbuang, dan hal itu biasanya menguntungkan privasi. Orientasi tampilan tetap benar karena browser menerapkan tag orientasi sebelum menggambar ulang gambar. Namun transparansi tidak bisa dipertahankan di JPG, jadi gambar ber-Alpha channel sebaiknya dikonversi ke PNG atau WebP.',
        ],
      },
      {
        heading: 'Langkah demi langkah: konversi HEIC ke JPG',
        ordered: true,
        bullets: [
          'Buka tool Konversi HEIC ke JPG di Toolabs dan tambahkan satu atau banyak foto HEIC dari perangkat Anda.',
          'Biarkan format keluaran JPG, atau pilih PNG atau WebP jika gambar punya latar transparan.',
          'Tekan Proses file. Dekoder HEIC berjalan lokal, jadi tidak ada unggahan ke server mana pun.',
          'Unduh hasilnya, satu per satu atau seluruh batch sebagai ZIP.',
          'Buka hasil pada zoom 100% dan periksa wajah, teks kecil, serta orientasi sebelum mengunggah.',
        ],
      },
      {
        heading: 'Kapan HEIC asli sebaiknya disimpan',
        paragraphs: [
          'Simpan file HEIC aslinya untuk arsip. File tersebut masih menyimpan lebih banyak data daripada JPG hasil konversi, jadi salinan asli memberi ruang untuk mengolah ulang nanti tanpa menumpuk penurunan kualitas. Di ekosistem Apple, HEIC tetap format paling praktis: Foto di Mac dan iPhone membukanya langsung, dan sinkronisasi iCloud berjalan tanpa konversi.',
          'Konversilah ketika tujuannya jelas: mengunggah ke portal, mengirim lampiran email ke pihak yang tidak memakai perangkat Apple, atau membuka foto di komputer Windows tanpa memasang ekstensi. Aturan sederhananya, simpan satu salinan asli dan konversi salinan kerja. Dengan begitu kualitas tidak terkikis setiap kali file dipakai ulang.',
        ],
      },
      {
        heading: 'Tips sebelum mengunggah hasil konversi',
        bullets: [
          'Mulai dari file asli, bukan dari screenshot atau salinan yang sudah pernah dikompres ulang.',
          'Jika portal membatasi 100 KB, konversi dulu ke JPG lalu lanjutkan dengan Kompres Gambar ke 100 KB.',
          'Periksa hasil pada zoom 100%, terutama di area wajah, tanda tangan, dan teks kecil.',
          'Untuk gambar transparan, pilih PNG atau WebP; JPG mengganti area transparan dengan latar putih.',
          'Konversi satu batch bila fotonya banyak, lalu unduh ZIP agar tidak mengunduh satu per satu.',
        ],
      },
      {
        heading: 'Mengapa konversi di browser lebih aman',
        paragraphs: [
          'Foto yang diunggah ke portal sering memuat wajah, dokumen identitas, dan terkadang latar belakang pribadi. Mengirimnya ke layanan konversi daring menambah salinan di server yang kebijakan penyimpanannya tidak bisa Anda periksa. Konversi di browser membaca file lewat File API, mendekode, lalu mengodekan ulang di tab Anda sendiri.',
          'Anda bisa memastikannya: muat halaman Toolabs, putuskan koneksi internet, lalu proses satu foto HEIC. Jika hasilnya tetap bisa diunduh, memang tidak ada unggahan yang terjadi. Setelah tab ditutup, data kerja dilepaskan dan tidak ada berkas yang tersimpan di pihak lain.',
        ],
      },
    ],
    faq: [
      {
        q: 'Apakah konversi HEIC ke JPG mengurangi kualitas?',
        a: 'Ya, sedikit. HEIC sudah terkompresi lossy, dan mengonversinya ke JPG mengodekan ulang piksel tersebut, jadi ada satu penurunan kualitas tambahan. Dengan kualitas bawaan 0,92 perbedaannya jarang terlihat pada layar. Konversi di Toolabs berjalan lokal di browser tanpa mengunggah file ke server mana pun.',
      },
      {
        q: 'Mengapa foto HEIC terlihat miring setelah dikonversi?',
        a: 'Seharusnya tidak. Browser menerapkan tag orientasi EXIF saat membaca HEIC, lalu menggambar ulang gambar dalam orientasi yang benar, sehingga hasil JPG tampil lurus. Jika hasilnya miring, file asli kemungkinan sudah rusak atau pernah diedit, jadi coba proses ulang dari file aslinya.',
      },
      {
        q: 'Apakah data lokasi dan EXIF ikut terbawa?',
        a: 'Tidak. Pengodean ulang melalui canvas menghasilkan file JPG baru tanpa metadata EXIF, termasuk koordinat GPS, model kamera, dan tanggal pemotretan. Untuk foto yang akan diunggah ke portal publik, hal itu justru mengurangi jejak informasi pribadi. Orientasi tampilan tetap dipertahankan oleh browser.',
      },
      {
        q: 'Bagaimana jika gambar punya latar transparan?',
        a: 'JPG tidak mendukung transparansi; area transparan menjadi latar putih. Pilih PNG atau WebP sebagai keluaran bila transparansi penting, misalnya untuk logo atau ikon. Toolabs menyediakan keduanya, dan keduanya tetap diproses lokal di browser tanpa mengirim file ke mana pun. File tetap di perangkat Anda.',
      },
      {
        q: 'Bisakah mengonversi banyak foto sekaligus?',
        a: 'Bisa. Tambahkan beberapa file HEIC ke tool, pilih format keluaran yang sama untuk semuanya, lalu proses sebagai satu batch. Hasil dapat diunduh satu per satu atau sekaligus sebagai ZIP. Pemrosesan tetap berjalan di perangkat Anda. Ini mempercepat pekerjaan ketika seluruh album masih berformat HEIC.',
      },
      {
        q: 'Apakah Windows bisa membuka HEIC tanpa konversi?',
        a: 'Windows 10 dan 11 memerlukan ekstensi HEIF Image Extensions dari Microsoft Store, dan sebagian fitur memerlukan HEVC Video Extensions berbayar. Tanpa ekstensi itu, File Explorer hanya menampilkan pratinjau kosong. Jika penerima tidak ingin memasang ekstensi, kirimkan hasil konversi ke JPG agar bisa dibuka langsung.',
      },
    ],
    relatedTools: ['heic-to-jpg', 'compress-image', 'image-converter'],
  },
  {
    id: 'photo-size-for-forms',
    slug: { en: 'make-a-3x4-photo-online', id: 'cara-buat-pas-foto-3x4' },
    category: 'compress',
    title: 'Cara Membuat Foto 3×4 yang Lolos Formulir Online',
    h1: 'Cara membuat foto 3×4 yang lolos formulir online',
    metaDescription:
      'Cara membuat foto 3×4 untuk formulir online: pahami beda ukuran sentimeter dan piksel, rasio 3:4, warna latar, dan batas 50–200 KB agar lolos.',
    excerpt:
      'Formulir online sering menolak foto 3×4 karena ukuran piksel, rasio, atau berkasnya melebihi batas. Ini cara menyiapkan pas foto yang lolos sejak unggahan pertama tanpa harus mengulang.',
    quickAnswer:
      'Untuk membuat foto 3×4, gunakan tool Pas Foto 3×4 di Toolabs dan pilih preset 3 × 4 cm pada 300 DPI, yaitu sekitar 354 × 472 piksel. Potong foto sesuai rasio 3:4, jangan meregangkannya, lalu kompres agar berada di bawah 50–200 KB sesuai ketentuan formulir.',
    updatedAt: '2026-10-25',
    readingMinutes: 7,
    keyTakeaways: [
      'Ukuran sentimeter harus dikonversi ke piksel; 3 × 4 cm pada 300 DPI sekitar 354 × 472 piksel.',
      'DPI hanya relevan untuk cetak, sedangkan formulir di layar menilai piksel, rasio, dan ukuran file.',
      'Selalu potong foto ke rasio 3:4, jangan meregangkannya agar tidak mengubah bentuk wajah.',
      'Sebagian besar formulir Indonesia meminta JPEG 50–200 KB dengan latar merah, putih, atau biru.',
    ],
    blocks: [
      {
        heading: 'Mengapa ukuran sentimeter dan piksel sering tertukar',
        paragraphs: [
          'Formulir online di Indonesia hampir selalu menulis ukuran dalam sentimeter: 3 × 4 cm, 4 × 6 cm, atau 2 × 3 cm. Layar tidak mengenal sentimeter; yang dibaca sistem adalah piksel. Karena itu foto yang secara fisik sudah berukuran 3 × 4 cm bisa tetap ditolak jika jumlah pikselnya tidak sesuai.',
          'Angka yang muncul di kolom petunjuk berasal dari konversi cetak. Pada 300 DPI satu inci setara 300 piksel, sehingga 3 cm berarti 354 piksel dan 4 cm berarti 472 piksel. Memahami konversi ini menghapus kebutuhan menebak-nebak: Anda tahu angka yang harus dimasukkan, bukan sekadar berharap file diterima.',
        ],
      },
      {
        heading: 'DPI hanya relevan untuk cetak',
        paragraphs: [
          'DPI menyatakan kepadatan titik tinta di atas kertas, bukan kualitas gambar di layar. Untuk unggahan formulir, DPI tidak dibaca; yang dinilai adalah dimensi piksel, rasio, format, dan ukuran file. Foto 354 × 472 piksel dengan metadata 72 DPI tetap diterima, selama syarat lain terpenuhi.',
          'Yang benar-benar penting di layar adalah rasio. Rasio 3:4 sama dengan 0,75, dan sebagian besar kamera ponsel memotret 4:3, yaitu rasio yang sama dalam posisi lanskap. Artinya foto HP Anda sudah memenuhi rasio tersebut; yang tersisa hanyalah memotong sisi yang berlebih, bukan meregangkan gambar agar muat.',
        ],
      },
      {
        heading: 'Langkah demi langkah: membuat foto 3×4',
        ordered: true,
        bullets: [
          'Buka tool Pas Foto 3×4 di Toolabs dan masukkan foto asli dari galeri Anda.',
          'Pilih preset 3 × 4 cm pada 300 DPI, yaitu 354 × 472 piksel, alih-alih mengisi dimensi secara manual.',
          'Geser bingkai potong agar posisi wajah sesuai aturan: kepala tidak terpotong dan pandangan ke depan.',
          'Pilih warna latar yang diminta formulir, lalu ekspor hasilnya sebagai JPEG.',
          'Periksa hasil pada zoom 100% dan pastikan ukuran file berada di bawah batas, misalnya 100 KB.',
        ],
      },
      {
        heading: 'Syarat yang paling sering membuat foto ditolak',
        paragraphs: [
          'Aturan latar adalah penyebab penolakan paling umum: merah untuk identitas tertentu, putih untuk paspor dan sebagian besar portal, biru untuk keperluan lain. Selain warna, pemeriksa sering menilai posisi kepala dan ruang kosong di atas kepala. Foto selfie dengan sudut rendah biasanya gugur meski ukurannya sudah benar.',
          'Format dan ukuran menyusul. Sebagian besar formulir meminta JPEG, bukan PNG atau WebP, dengan batas 50–200 KB. Logikanya sama dengan panduan kompres 100 KB: targetkan sedikit di bawah angka yang tertulis, sebagian sistem membaca 100 KB sebagai 100.000 byte dan menolak file berukuran 100,4 KB.',
        ],
      },
      {
        heading: 'Tips agar lolos verifikasi pertama',
        bullets: [
          'Jangan memperbesar foto yang sudah lebih kecil dari target; interpolasi menambah piksel, bukan detail.',
          'Selalu potong ke rasio 3:4 daripada meregangkan foto agar pas dengan bingkai formulir.',
          'Gunakan preset 3 × 4 cm pada 300 DPI alih-alih menebak angka piksel sendiri.',
          'Simpan foto asli resolusi penuh dan bekerja dari salinan agar bisa mengulang saat aturan berubah.',
          'Periksa hasil pada zoom 100%, lalu pastikan ukurannya di bawah 50–200 KB sebelum mengunggah.',
        ],
      },
      {
        heading: 'Kapan preset 3×4 bukan solusi yang tepat',
        paragraphs: [
          'Preset 3 × 4 hanya benar jika formulir memang meminta ukuran itu. Untuk paspor, visa, atau dokumen dengan spesifikasi negara tertentu, dimensi dan rasio berbeda, dan mengikuti aturan Indonesia untuk dokumen luar negeri akan membuat berkas ditolak. Baca ketentuan resmi dokumen terkait lebih dulu.',
          'Preset juga bukan solusi ketika foto sumber terlalu kecil. Jika foto profil lama berukuran 200 × 200 piksel, mengubahnya menjadi 354 × 472 hanya menambah blur. Dalam kasus itu, memotret ulang dengan kamera ponsel dalam cahaya yang cukup lebih cepat daripada memperbaiki hasil yang tidak punya detail.',
        ],
      },
    ],
    faq: [
      {
        q: 'Berapa piksel untuk foto 3 × 4 cm?',
        a: 'Pada 300 DPI, foto 3 × 4 cm berukuran sekitar 354 × 472 piksel. Untuk ukuran lain: 4 × 6 cm sekitar 472 × 709 piksel dan 2 × 3 cm sekitar 236 × 354 piksel. Angka ini berasal dari konversi cetak, sedangkan unggahan di layar hanya menilai piksel dan rasio.',
      },
      {
        q: 'Apakah DPI harus 300 agar diterima?',
        a: 'Tidak harus. DPI adalah metadata cetak dan jarang dibaca oleh sistem unggahan. Yang diperiksa biasanya dimensi piksel, rasio, format, dan ukuran file. Mengisi 300 DPI hanya membantu jika foto nantinya dicetak; untuk unggahan, 354 × 472 piksel sudah cukup tanpa konversi tambahan.',
      },
      {
        q: 'Bolehkah foto diluruskan agar pas rasio?',
        a: 'Jangan. Memiringkan foto lalu memotongnya membuang piksel dan menurunkan ketajaman, sedangkan meregangkan foto mengubah bentuk wajah dan terlihat jelas. Potong saja sisanya. Kamera ponsel dengan rasio 4:3 sudah sesuai rasio 3:4, jadi biasanya hanya perlu pemotongan vertikal yang kecil. Foto potret HP umumnya langsung cocok.',
      },
      {
        q: 'Berapa batas ukuran file untuk pas foto?',
        a: 'Sebagian besar formulir Indonesia meminta 50–200 KB. Gunakan Kompres Gambar dengan target 100 KB sebagai titik aman, lalu periksa hasilnya. Targetkan sedikit di bawah batas karena sebagian sistem menghitung 100 KB sebagai 100.000 byte dan menolak file yang sedikit melebihi batasnya.',
      },
      {
        q: 'Apakah foto harus berlatar merah atau putih?',
        a: 'Tergantung dokumennya. Umumnya latar merah untuk KTP dan sebagian formulir kerja, putih untuk paspor dan visa, biru untuk keperluan tertentu lain. Selalu ikuti ketentuan yang tertulis pada formulir; warna latar yang salah membuat berkas ditolak meski ukuran dan rasio sudah benar.',
      },
      {
        q: 'Bisakah membuat pas foto 3 × 4 di ponsel?',
        a: 'Bisa. Toolabs berjalan di browser ponsel, jadi Anda dapat memilih foto dari galeri, memotong ke rasio 3:4, dan mengompresnya langsung di Android maupun iPhone. Semua pemrosesan terjadi di perangkat, tanpa mengunggah foto identitas ke server mana pun. Hasilnya siap diunggah seketika.',
      },
    ],
    relatedTools: ['photo-3x4', 'resize-image', 'compress-image'],
  },
  {
    id: 'smaller-png',
    slug: { en: 'make-a-png-smaller', id: 'perkecil-ukuran-png' },
    category: 'compress',
    title: 'Cara Memperkecil Ukuran PNG Tanpa Merusak Isinya',
    h1: 'Cara memperkecil ukuran PNG tanpa merusak isinya',
    metaDescription:
      'Cara memperkecil ukuran PNG dengan jujur: pahami mengapa enkode ulang jarang mengecilkan file, dan mana tuas yang benar-benar bekerja di browser.',
    excerpt:
      'PNG lossless membuat ekspektasi yang salah: file sering tidak mengecil malah membesar setelah dikodekan ulang. Ini tuas yang benar-benar menurunkan ukuran PNG di browser, dengan pemrosesan yang tetap lokal.',
    quickAnswer:
      'Untuk memperkecil ukuran PNG, gunakan tool Kompres PNG di Toolabs dan mulai dari crop serta pengurangan dimensi, karena enkode ulang PNG dengan piksel yang sama hampir tidak pernah mengecilkan file. Ubah ke WebP atau JPG hanya untuk foto dan screenshot padat, bukan untuk logo transparan.',
    updatedAt: '2026-10-25',
    readingMinutes: 6,
    keyTakeaways: [
      'Enkode ulang PNG dengan piksel yang sama hampir tidak pernah menghasilkan file yang lebih kecil.',
      'Pengurangan piksel lewat crop dan perkecil dimensi adalah tuas yang benar-benar mencapai target.',
      'Kuantisasi warna bagus dalam teori, tetapi tidak dilakukan oleh encoder browser.',
      'Foto dan screenshot padat biasanya jauh lebih kecil sebagai WebP atau JPG.',
    ],
    blocks: [
      {
        heading: 'Mengapa PNG sering tidak mengecil',
        paragraphs: [
          'PNG memakai kompresi DEFLATE yang lossless: piksel dipertahankan persis, dan ukuran file bergantung pada seberapa banyak pola yang bisa ditekan. Konsekuensinya, mengonversi ulang PNG dengan piksel yang sama hampir tidak pernah menghasilkan file lebih kecil. Encoder canvas browser bahkan sering menghasilkan file sedikit lebih besar daripada aslinya.',
          'Toolabs menangani hal ini dengan jujur: jika hasil enkode ulang lebih besar daripada file asli, byte aslinya yang disimpan dan muncul peringatan bahwa target tidak tercapai. Ini bukan kegagalan tool, melainkan sifat formatnya. Ekspektasi bahwa “dikompres” berarti otomatis mengecil adalah hal yang perlu dibuang sejak awal.',
        ],
      },
      {
        heading: 'Tuas yang benar-benar bekerja',
        paragraphs: [
          'Tuas pertama dan paling ampuh adalah jumlah piksel. Memotong screenshot agar hanya menyisakan bagian yang diperlukan, lalu memperkecil dimensi, langsung mengurangi byte secara nyata. Mengurangi lebar dan tinggi menjadi setengah menghapus tiga perempat piksel, dan itulah cara paling andal untuk mencapai target ukuran berapa pun.',
          'Tuas kedua adalah jumlah warna lewat kuantisasi palet. Dalam teori ini sangat efektif untuk grafis dengan sedikit warna, tetapi encoder browser tidak melakukan itu saat mengonversi PNG, jadi tidak ada gunanya menjanjikannya. Tuas ketiga adalah mengganti format: foto dan screenshot padat biasanya jauh lebih kecil sebagai WebP atau JPG, sementara logo, ikon, teks tajam, dan transparansi sebaiknya tetap PNG.',
        ],
      },
      {
        heading: 'Langkah demi langkah: memperkecil PNG',
        ordered: true,
        bullets: [
          'Buka tool Kompres PNG di Toolabs dan masukkan file PNG yang ingin diperkecil.',
          'Potong area yang tidak perlu lebih dulu; screenshot sebaiknya dipotong sebelum langkah lain.',
          'Perkecil dimensi sesuai kebutuhan tampilan, bukan selalu mempertahankan piksel penuh.',
          'Pilih keluaran PNG untuk logo dan transparansi, atau WebP dan JPG untuk foto serta screenshot padat.',
          'Periksa ukuran hasil, peringatan bila file tidak mengecil, lalu bandingkan pada zoom 100%.',
        ],
      },
      {
        heading: 'Kapan PNG bukan pilihan yang tepat',
        paragraphs: [
          'PNG adalah wadah yang buruk untuk foto. Foto punya ribuan gradasi warna yang tidak punya pola kuat untuk DEFLATE, sehingga file hasilnya tetap besar meski dimensinya sudah dikurangi. Jika targetnya 100 KB dan isinya foto, format JPG atau WebP akan mencapainya jauh lebih mudah.',
          'PNG juga tidak menyimpan animasi; GIF animasi yang dikonversi hanya menghasilkan frame pertama. Metadata EXIF ikut terbuang saat enkode ulang, yang umumnya baik untuk privasi. Sebaliknya, PNG tetap pilihan terbaik ketika transparansi, tepi teks yang tajam, atau logo berwarna datar harus dipertahankan tanpa artefak.',
        ],
      },
      {
        heading: 'Tips memperkecil PNG tanpa kehilangan isi',
        bullets: [
          'Potong dulu, kecilkan dimensi kemudian; urutan ini menghemat paling banyak byte.',
          'Jangan berharap enkode ulang mengecilkan PNG yang isinya sudah terkompres baik.',
          'Gunakan PNG untuk logo, ikon, dan teks tajam; pindahkan foto ke WebP atau JPG.',
          'Screenshot harus dipotong sebelum dikompres karena area kosong memakan banyak piksel.',
          'Jika target tidak tercapai, ubah format daripada menurunkan kualitas berulang kali.',
        ],
      },
      {
        heading: 'Mengapa pemrosesan lokal penting untuk file ini',
        paragraphs: [
          'Screenshot sering berisi percakapan, kode akses, data pelanggan, atau tampilan internal kantor. Mengunggahnya ke kompressor daring membuat salinan di server yang tidak bisa Anda periksa, dan Anda tidak pernah tahu berapa lama salinan itu disimpan. Pemrosesan lokal menghindari salinan tersebut sepenuhnya.',
          'Di Toolabs, file dibaca lewat File API, didekode, lalu dikodekan ulang di tab yang sama. Anda bisa membuktikannya dengan memutus internet setelah halaman dimuat; hasilnya tetap bisa diunduh. Setelah tab ditutup, data kerja tidak disimpan di mana pun.',
        ],
      },
    ],
    faq: [
      {
        q: 'Mengapa ukuran PNG saya malah membesar?',
        a: 'Karena enkode ulang PNG memakai encoder browser yang tidak seoptimal encoder aslinya, dan pikselnya tidak berubah. Toolabs mendeteksi hal ini dan menyimpan byte asli, lalu menampilkan peringatan. File Anda tidak akan membesar diam-diam; yang perlu diubah adalah dimensi atau formatnya. Ukuran file tetap sama.',
      },
      {
        q: 'Apakah ada cara mengecilkan PNG tanpa mengubah isinya?',
        a: 'Cara yang tersedia adalah mengurangi jumlah piksel melalui crop dan perkecil dimensi. Kuantisasi warna memang bisa mengecilkan PNG, tetapi encoder browser tidak melakukannya, jadi Toolabs tidak menjanjikannya. Jika isinya harus persis sama, satu-satunya jalan adalah mengurangi dimensi. File diproses lokal di browser.',
      },
      {
        q: 'Kapan sebaiknya mengonversi PNG ke WebP?',
        a: 'Ketika isinya berupa foto, screenshot ramai, atau gradasi halus. WebP umumnya jauh lebih kecil pada kualitas visual serupa dan mendukung transparansi, jadi logo pun masih bisa memakainya. Untuk teks tajam dan ikon kecil, PNG sering tetap lebih tajam pada ukuran yang sama.',
      },
      {
        q: 'Apakah kompresi menghapus metadata PNG?',
        a: 'Ya. Saat gambar dikodekan ulang, metadata yang tidak menempel pada piksel, seperti informasi perangkat, tidak ikut terbawa. Orientasi tampilan tetap benar karena browser menerapkannya sebelum menggambar. Untuk file yang berisi informasi sensitif, penghapusan ini justru menguntungkan privasi Anda secara otomatis.',
      },
      {
        q: 'Bisakah memperkecil banyak PNG sekaligus?',
        a: 'Bisa. Tambahkan beberapa file PNG ke tool, tentukan opsi yang sama, lalu proses sebagai batch. Setiap file dinilai terpisah, jadi satu gambar yang tidak mengecil tidak menghambat yang lain. Hasil dapat diunduh satu per satu atau sebagai ZIP. Pemrosesan tetap berjalan lokal.',
      },
      {
        q: 'Apakah PNG cocok untuk foto?',
        a: 'Tidak. Foto memiliki gradasi warna yang tidak terkompres baik oleh DEFLATE, sehingga file PNG hasil foto hampir selalu lebih besar daripada JPG pada kualitas serupa. Gunakan JPG atau WebP untuk foto, dan sisakan PNG untuk logo, ikon, teks tajam, serta gambar transparan.',
      },
    ],
    relatedTools: ['compress-png', 'png-to-webp', 'image-converter'],
  },
  {
    id: 'image-formats-compared',
    slug: { en: 'jpg-vs-png-vs-webp', id: 'perbedaan-jpg-png-webp' },
    category: 'convert',
    title: 'JPG vs PNG vs WebP: Format Mana yang Seharusnya Dipakai?',
    h1: 'JPG vs PNG vs WebP: format mana yang seharusnya dipakai',
    metaDescription:
      'Perbedaan JPG, PNG, dan WebP dijelaskan berdasarkan isi gambar: mana yang tepat untuk foto, logo, screenshot, situs web, cetak, dan formulir online.',
    excerpt:
      'Memilih format gambar berdasarkan kebiasaan menghasilkan file terlalu besar atau ditolak portal. Ini cara memilih JPG, PNG, atau WebP berdasarkan isi, bukan kebiasaan, sekaligus tahu kapan harus mengonversinya.',
    quickAnswer:
      'Untuk memilih format gambar, gunakan tool Konverter Gambar di Toolabs: foto untuk JPG, logo dan transparansi untuk PNG, situs web untuk WebP, dan portal yang hanya menerima JPEG tetap untuk JPG. Konversi berjalan di browser sehingga file tetap lokal dan tidak diunggah ke mana pun.',
    updatedAt: '2026-10-25',
    readingMinutes: 6,
    keyTakeaways: [
      'Pilih format berdasarkan isi gambar, bukan kebiasaan atau ekstensi yang selalu dipakai.',
      'JPEG unggul untuk foto, PNG untuk logo, teks tajam, dan transparansi.',
      'WebP umumnya 25–35% lebih kecil dari JPEG, tetapi sebagian portal lama masih menolaknya.',
      'Mengganti nama ekstensi tidak mengubah cara file dikodekan; formulir memeriksa isi file.',
    ],
    blocks: [
      {
        heading: 'Mengapa memilih format berdasarkan isi, bukan kebiasaan',
        paragraphs: [
          'Format gambar berbeda dalam cara mempertahankan data. JPEG memakai transformasi diskrit-kosinus bersifat lossy dan tidak mendukung transparansi, sehingga file kecil dan serbaguna untuk foto. PNG menyimpan piksel persis dengan dukungan alpha dan palet, tetapi ukurannya besar. WebP menggabungkan keduanya: mode lossy dan lossless, plus alpha, dengan ukuran umumnya 25–35% lebih kecil daripada JPEG pada kualitas serupa.',
          'Pilihan yang salah mahal dalam dua arah. Memakai PNG untuk foto menghasilkan file beberapa kali lebih besar dari yang diperlukan, sementara memakai JPEG untuk logo menghapus tepi tajam dan membuat teks kecil kabur. Portal yang menolak unggahan sering bukan soal ukuran, melainkan format yang tidak sesuai aturannya.',
        ],
      },
      {
        heading: 'Kompatibilitas, WebP, dan AVIF',
        paragraphs: [
          'JPEG dan PNG didukung di mana-mana, dari browser lama hingga aplikasi kantor. WebP didukung Chrome, Edge, Firefox, dan Safari sejak versi 14 pada 2020, jadi praktis sudah universal untuk web modern. Namun sebagian portal dan CMS lama masih menolaknya, dan aturan unggahan yang menulis “hanya JPG” jarang mau dilanggar.',
          'AVIF adalah alternatif yang lebih baru dengan kompresi lebih agresif, tetapi dukungannya masih bertahap dan sebagian sistem mengirimkannya sebagai unduhan, bukan gambar yang tampil. Untuk pekerjaan sehari-hari, tiga format pertama sudah cukup. Poin yang sering dilupakan: mengganti nama ekstensi tidak mengubah cara file dikodekan, dan formulir memeriksa format aslinya.',
        ],
      },
      {
        heading: 'Langkah demi langkah: memilih format yang tepat',
        ordered: true,
        bullets: [
          'Tentukan isi gambarnya lebih dulu: foto, logo, screenshot, teks tajam, atau gambar transparan.',
          'Periksa ketentuan tujuan; portal yang hanya menerima JPEG berarti tetap memakai JPG.',
          'Buka tool Konverter Gambar di Toolabs dan pilih format keluaran yang sesuai.',
          'Tambahkan file, proses, lalu periksa ukuran hasil dan tampilannya pada zoom 100%.',
          'Unduh hasilnya; pemrosesan berlangsung lokal sehingga file tidak meninggalkan perangkat Anda.',
        ],
      },
      {
        heading: 'Panduan cepat memilih format',
        bullets: [
          'Foto memakai JPG, atau WebP jika tujuannya sudah mendukung format tersebut.',
          'Screenshot, logo, dan gambar transparan memakai PNG agar tepi tetap tajam.',
          'Situs web dan blog memakai WebP agar halaman dimuat lebih ringan.',
          'Portal yang hanya menerima JPEG tetap memakai JPG tanpa perlu bernegosiasi.',
          'Untuk cetak, pakai file beresolusi terbesar yang Anda punya dan biarkan printer yang menurunkannya.',
        ],
      },
      {
        heading: 'Kapan konversi format diperlukan',
        paragraphs: [
          'Konversi diperlukan ketika tujuan menolak format asli: portal yang hanya menerima JPEG, CMS lama yang tidak mengenali WebP, atau alur kerja yang mensyaratkan PNG untuk transparansi. Konversi juga berguna untuk menghemat kuota, misalnya saat mengirim puluhan screenshot lewat chat.',
          'Konversi juga punya batas. Dari lossless ke lossy selalu ada penurunan, dan mengonversi berulang kali menumpuk kerusakan, konversi JPG ke WebP lalu kembali ke JPG akan terlihat pada tepi dan teks. Simpan file asli dan kerjakan dari salinan. Jangan mengganti nama ekstensi sebagai jalan pintas; isi file tetap format lama.',
        ],
      },
      {
        heading: 'Konversi yang berjalan di browser',
        paragraphs: [
          'Gambar yang dikonversi sering berisi wajah, dokumen, atau materi yang belum dipublikasikan. Mengirimnya ke konverter daring membuat salinan tambahan di server pihak ketiga, dan Anda tidak tahu berapa lama salinan itu disimpan. Konversi di browser membaca file lewat File API dan mengodekan ulang di tab Anda sendiri.',
          'Anda dapat mengujinya langsung: muat halaman Toolabs, putuskan koneksi internet, lalu konversi satu gambar. Jika hasilnya tetap terunduh, memang tidak ada unggahan yang terjadi. Untuk pekerjaan yang melibatkan data klien, kebiasaan ini lebih berharga daripada klaim privasi yang tidak bisa diverifikasi.',
        ],
      },
    ],
    faq: [
      {
        q: 'Format mana yang paling kecil ukurannya?',
        a: 'Umumnya WebP, yang sering 25–35% lebih kecil daripada JPEG pada kualitas visual serupa. Untuk foto, WebP atau JPG mengalahkan PNG jauh. Namun ukuran bukan satu-satunya kriteria: format yang ditolak portal atau tidak tampil di sistem lama justru memaksa Anda mengulang pekerjaan dari awal, karena file harus dibuat ulang.',
      },
      {
        q: 'Apakah WebP didukung semua browser?',
        a: 'Ya untuk browser modern: Chrome, Edge, Firefox, dan Safari sejak 2020 mendukung WebP. Yang belum tentu menerima adalah portal, CMS lama, dan aplikasi kantor tertentu. Jika Anda mengontrol tampilannya, WebP aman; jika aturan unggahan menulis JPEG, ikuti aturan itu. Konversinya tetap berjalan lokal di perangkat Anda.',
      },
      {
        q: 'Mengapa file saya ditolak setelah diganti nama ke .jpg?',
        a: 'Karena ekstensi hanya nama, bukan cara file dikodekan. Formulir memeriksa header file, sehingga PNG yang namanya diganti tetap terbaca sebagai PNG dan ditolak. Konversi yang sebenarnya mendekode lalu mengodekan ulang isinya, dan itulah yang dilakukan tool konversi di browser Anda secara lokal.',
      },
      {
        q: 'Apakah JPG sama dengan JPEG?',
        a: 'Ya. Keduanya nama ekstensi untuk format yang sama; JPG hanya lebih pendek karena batas nama file di sistem lama. Isi file dan cara kompresinya identik, jadi memilih JPG atau JPEG bebas. Yang tidak sama adalah PNG dan WebP, keduanya format berbeda dengan perilaku kompresi berbeda.',
      },
      {
        q: 'Mana yang tepat untuk screenshot?',
        a: 'PNG. Screenshot penuh teks tajam dan warna datar yang mudah rusak oleh kompresi lossy, dan PNG mempertahankannya persis. Jika screenshot sangat ramai dan ukurannya menjadi masalah, potong area yang diperlukan lebih dulu, baru pertimbangkan WebP atau JPG untuk bagian yang berisi foto.',
      },
      {
        q: 'Apakah konversi format di Toolabs mengunggah file?',
        a: 'Tidak. File dibaca lewat File API, didekode, lalu dikodekan ulang di browser Anda, tanpa endpoint unggahan. Anda bisa memastikannya dengan memutus internet setelah halaman dimuat lalu memproses satu gambar. Jika hasilnya tetap terunduh, pemrosesan memang berjalan di perangkat Anda sendiri.',
      },
    ],
    relatedTools: ['image-converter', 'png-to-webp', 'webp-to-jpg'],
  },
  {
    id: 'qr-code-that-scans',
    slug: { en: 'make-a-qr-code-that-scans', id: 'buat-qr-code-yang-terbaca' },
    category: 'convert',
    title: 'Cara Membuat QR Code yang Benar-Benar Bisa Dipindai',
    h1: 'Cara membuat QR code yang benar-benar bisa dipindai',
    metaDescription:
      'Cara membuat QR code yang bisa dipindai: quiet zone, kontras minimal 3:1, tingkat koreksi error, ukuran logo, jarak pindai, dan uji sebelum cetak.',
    excerpt:
      'QR yang gagal dipindai hampir selalu karena kontras, margin, atau ukuran yang salah. Ini cara membuat kode QR yang terbaca di layar maupun hasil cetak.',
    quickAnswer:
      'Untuk membuat QR code yang bisa dipindai, gunakan tool Generator QR di Toolabs: sisakan quiet zone 4 modul, jaga kontras minimal 3:1, dan pertahankan logo di bawah 18% lebar kode. Uji hasilnya dengan dua ponsel sebelum dicetak atau dibagikan di media apa pun.',
    updatedAt: '2026-10-25',
    readingMinutes: 7,
    keyTakeaways: [
      'QR butuh quiet zone minimal 4 modul dan kontras minimal 3:1 agar kamera mengenali tepinya.',
      'Koreksi error memulihkan sekitar 7%, 15%, 25%, atau 30% modul tergantung tingkatnya.',
      'Logo di tengah memaksa level H dan sebaiknya tetap di bawah 18% lebar kode.',
      'Jarak pindai nyaman sekitar 10× lebar kode, jadi kode 3 cm dipindai pada jarak sekitar 30 cm.',
    ],
    blocks: [
      {
        heading: 'Mengapa QR code gagal dipindai',
        paragraphs: [
          'QR code adalah kisi modul gelap di atas latar terang, dikelilingi quiet zone: margin kosong minimal 4 modul yang memberi ruang bagi pemindai mengenali tepi kode. Toolabs memakai margin bawaan 4 modul dan mengizinkan pengaturan 0–16. Tanpa quiet zone yang cukup, kamera tidak yakin di mana kode dimulai.',
          'Penyebab lain lebih sederhana: kontras rendah, kode yang tidak persegi, atau latar yang ramai. Pemindai membutuhkan perbedaan tegas antara modul gelap dan terang, dan Toolabs memperingatkan ketika rasio kontras depan dan belakang berada di bawah 3:1. Pantulan dari laminasi menambah kegagalan, terutama di bawah lampu ruangan.',
        ],
      },
      {
        heading: 'Koreksi error, logo, dan data yang terlalu panjang',
        paragraphs: [
          'Tingkat koreksi error menentukan berapa banyak modul yang bisa rusak tetap terbaca: sekitar 7% pada L, 15% pada M, 25% pada Q, dan 30% pada H. Logo di tengah menutupi sebagian modul, sehingga pemasangan logo memaksa level H. Toolabs mengaturnya, menjaga logo pada 5–20% lebar kode, dan memperingatkan saat logo melebihi 18%.',
          'Data yang panjang membuat modul bertambah dan kode menjadi lebih padat, sehingga tiap modul makin kecil pada ukuran yang sama. URL dengan pelacak dan parameter sering jadi penyebabnya. Pangkas tautan lebih dulu, lalu buat ulang kodenya. Jarak pindai nyaman sekitar 10× lebar kode: kode 3 cm dipindai pada jarak sekitar 30 cm.',
        ],
      },
      {
        heading: 'Langkah demi langkah: membuat QR yang terbaca',
        ordered: true,
        bullets: [
          'Buka tool Generator QR di Toolabs, lalu pilih jenis konten dan isi datanya.',
          'Pangkas URL hingga seperlunya agar jumlah modul tetap sedikit dan kodenya longgar.',
          'Tambahkan logo bila perlu, dan pertahankan ukurannya di bawah 18% lebar kode.',
          'Periksa pratinjau: kontras minimal 3:1, quiet zone 4 modul, dan modul tetap persegi.',
          'Uji pindai dengan setidaknya dua ponsel dari jarak sekitar 10× lebar kode sebelum mencetak.',
        ],
      },
      {
        heading: 'PNG, SVG, dan pilihan format',
        paragraphs: [
          'Untuk layar dan chat, PNG sudah tepat: cukup tajam, mudah dibuka di mana saja, dan ukurannya kecil. Untuk cetak, pakai SVG. Format vektor diskalakan tanpa pikselasi, sehingga kode tetap tajam baik di kartu nama maupun di spanduk besar.',
          'Jangan pernah memperbesar PNG melebihi ukuran aslinya untuk menyesuaikan tata letak; modul akan kabur dan tepinya kehilangan ketegasan. Jika harus memakai raster, buat ulang kodenya pada ukuran piksel yang dibutuhkan, bukan memaksa hasil skalanya. Hindari juga kombinasi kontras rendah serta kode terbalik yang andalitasnya jauh lebih rendah.',
        ],
      },
      {
        heading: 'Tips pindai yang sering dilewatkan',
        bullets: [
          'Sisakan quiet zone minimal 4 modul; jangan menempelkan elemen desain di tepi kode.',
          'Cetak pada kertas atau laminasi matte; pantulan dari kertas menggilap membingungkan kamera.',
          'Uji dengan dua ponsel berbeda dan dengan pencahayaan ruangan yang biasa dipakai.',
          'Jaga modul tetap persegi; kode yang melar vertikal sering gagal dibaca kamera.',
          'Simpan hasil cetak dalam SVG agar bisa diperbesar kapan pun tanpa kehilangan ketajaman.',
        ],
      },
      {
        heading: 'Konten QR yang tidak pernah dikirim ke mana pun',
        paragraphs: [
          'QR code sering membawa data yang sebaiknya tidak bocor: kata sandi Wi-Fi, nomor telepon, tautan dokumen internal, atau kontak bisnis. Generator daring yang memakai API pihak ketiga mengirim isi tersebut ke server lain sebelum gambar dibuat, dan Anda tidak bisa memeriksa apa yang terjadi di sana.',
          'Toolabs membuat kode sepenuhnya di browser. Isi dan logo tidak pernah dikirim ke api.qrserver.com atau layanan QR mana pun; kisi modul dihitung di perangkat Anda, lalu hasilnya diunduh sebagai PNG atau SVG. Anda bisa mengujinya dengan memutus koneksi internet setelah halaman dimuat.',
        ],
      },
    ],
    faq: [
      {
        q: 'Berapa quiet zone yang dibutuhkan QR code?',
        a: 'Minimal 4 modul di setiap sisi, sesuai spesifikasi QR. Toolabs memakai margin bawaan 4 modul dan mengizinkan pengaturan 0–16. Tanpa quiet zone yang cukup, kamera tidak bisa membedakan tepi kode dari latar di sekitarnya, dan pemindaian sering gagal. Bahkan kode yang dicetak rapi pun bisa gagal.',
      },
      {
        q: 'Seberapa besar logo yang aman untuk QR code?',
        a: 'Di bawah 18% lebar kode. Toolabs menempatkan logo pada 5–20% dan memperingatkan ketika melebihi 18%, karena logo menutup modul yang dipulihkan oleh koreksi error tingkat H. Logo yang lebih besar menghabiskan cadangan pemulihan itu dan membuat kode berisiko gagal dipindai.',
      },
      {
        q: 'Berapa jarak aman untuk memindai QR code?',
        a: 'Sekitar 10× lebar kode. Kode selebar 3 cm nyaman dipindai pada jarak sekitar 30 cm dengan kamera ponsel biasa. Data yang panjang membuat modul lebih kecil dan memperpendek jarak itu, jadi pangkas tautan dan uji pindai sebelum mencetak dalam jumlah banyak.',
      },
      {
        q: 'Apakah QR code warna-warni masih bisa dipindai?',
        a: 'Bisa, asalkan kontras antara modul gelap dan latar terang tetap minimal 3:1. Warna merah muda di atas putih sering gagal, dan kode dengan warna terbalik tidak andal. Toolabs memperingatkan saat kontras jatuh di bawah 3:1; ikuti peringatan itu daripada mengabaikannya.',
      },
      {
        q: 'PNG atau SVG untuk dicetak?',
        a: 'SVG untuk cetak karena diskalakan tanpa pikselasi, sehingga tetap tajam dari kartu nama sampai spanduk. PNG cukup untuk layar, chat, dan slide; untuk ukuran cetak, buat PNG pada resolusi piksel yang dibutuhkan bila sistem cetak Anda tidak menerima vektor seperti PDF.',
      },
      {
        q: 'Apakah isi QR code saya dikirim ke server?',
        a: 'Tidak. Toolabs menghitung kisi modul di browser Anda; isi, logo, dan warna tidak pernah dikirim ke api.qrserver.com atau layanan QR lain. Anda bisa memastikannya dengan memutus koneksi internet setelah halaman dimuat lalu membuat kode. Hasilnya tetap bisa diunduh sebagai PNG atau SVG.',
      },
    ],
    relatedTools: ['qr-generator', 'image-converter'],
  },
  {
    id: 'merge-pdf-mobile',
    slug: { en: 'merge-pdf-on-your-phone', id: 'gabung-pdf-di-ponsel' },
    category: 'pdf',
    title: 'Cara Gabung PDF di Ponsel Tanpa Kehalaman',
    h1: 'Cara gabung PDF di ponsel tanpa kehalaman',
    metaDescription:
      'Panduan gabung PDF di ponsel: memilih berkas di Android dan iPhone, mengatur urutan pindai, mengatasi memori penuh, dan menjaga dokumen tetap lokal.',
    excerpt:
      'Menggabungkan PDF di ponsel sering gagal karena urutan pindai terbalik dan memori yang habis. Ini alur kerja lengkap untuk Android dan iPhone tanpa mengunggah dokumen.',
    quickAnswer:
      'Untuk menggabungkan PDF di ponsel, buka tool Gabung PDF di Toolabs, tambahkan berkas dari Files atau File Manager, atur urutan dengan tombol panah, lalu proses. Hasil diunduh langsung ke perangkat dan siap dibagikan lewat WhatsApp atau email. Semua pemrosesan berjalan di browser tanpa unggahan.',
    updatedAt: '2026-10-25',
    readingMinutes: 6,
    keyTakeaways: [
      'Urutan halaman mengikuti urutan berkas, jadi atur dengan tombol panah sebelum memproses.',
      'Semua halaman disimpan di RAM, sehingga dokumen 100 MB bisa gagal di ponsel lama.',
      'Pemrosesan lokal membuat pekerjaan tetap jalan dengan kuota data yang tersisa.',
      'Selalu buka sekali PDF hasil gabungan untuk memastikan urutan sebelum dikirim.',
    ],
    blocks: [
      {
        heading: 'Mengapa ponsel lebih rawan kehabisan memori',
        paragraphs: [
          'Penggabungan PDF dilakukan sepenuhnya di memori browser. Berkas dibaca, halaman disalin, lalu dokumen baru disusun sebelum hasilnya ditulis ke unduhan. Di ponsel, memori itu bersaing dengan aplikasi lain yang masih berjalan. Beberapa hasil pindai biasanya aman, tetapi dokumen berukuran 100 MB bisa membuat proses gagal di ponsel lama.',
          'Kegagalan ini tidak merusak file asli; prosesnya berhenti dan Anda bisa mencoba lagi. Triknya adalah mengurangi beban per tab: tutup tab lain, proses dalam batch lebih kecil, dan beralih ke desktop untuk berkas yang sangat berat. Antarmuka yang sama tersedia di Android dan iPhone, jadi alurnya tidak berbeda, hanya ketahanan memorinya.',
        ],
      },
      {
        heading: 'Alur kerja khusus ponsel',
        paragraphs: [
          'Di Android, pemilih file biasanya membuka Files by Google, folder Downloads, atau Drive, dan urutannya mengikuti cara berkas disimpan awal. Di iPhone, berkas datang dari aplikasi Files, iCloud Drive, atau dokumen hasil pindai dari aplikasi kamera dan scanner. Pahami di mana berkas berada lebih dulu; mencari di tengah proses adalah penyebang gagal yang paling umum.',
          'Masalah khas ponsel adalah urutan pindai yang terbalik. Banyak aplikasi scanner menyimpan halaman terakhir sebagai file pertama, sehingga lampiran yang dihasilkan terbaca dari belakang. Toolabs menyediakan tombol panah untuk memindahkan berkas sebelum diproses, dan mengaturnya di tahap itu jauh lebih cepat daripada mengganti nama berkas di pengelola file.',
        ],
      },
      {
        heading: 'Langkah demi langkah: gabung PDF di ponsel',
        ordered: true,
        bullets: [
          'Buka tool Gabung PDF di Toolabs melalui browser ponsel, lalu tambahkan berkas dari Files, Downloads, atau Drive.',
          'Atur urutan dengan tombol panah; ingat bahwa scanner sering menghasilkan urutan terbalik.',
          'Periksa total ukuran. Jika mendekati puluhan MB, tutup tab lain sebelum memproses.',
          'Tekan Proses file dan biarkan tab tetap terbuka sampai proses selesai.',
          'Unduh hasilnya, lalu buka sekali untuk memastikan urutan halaman sebelum dikirim.',
        ],
      },
      {
        heading: 'Batas memori dan kapan pindah ke desktop',
        paragraphs: [
          'Semua halaman disimpan di RAM, jadi ukuran gabungan menentukan keberhasilan. Ponsel dengan RAM terbatas biasanya menangani beberapa pindai berukuran 2–5 MB tanpa masalah, tetapi gabungan yang mendekati 100 MB berada di batas yang tidak pasti. Jika pernah gagal, pecah pekerjaan menjadi batch dua atau tiga dokumen, lalu gabungkan hasilnya di desktop.',
          'Ukuran gabungan juga bukan sesuatu yang bisa dikecilkan oleh proses penggabungan. Halaman disalin, bukan dirender ulang, sehingga dua hasil pindai 5 MB menghasilkan berkas mendekati 10 MB. Jika WhatsApp atau email menolak lampirannya, itu masalah kompresi, bukan penggabungan, dan Optimasi PDF dipakai setelah dokumen tersusun rapi.',
        ],
      },
      {
        heading: 'Tips menggabungkan PDF dari ponsel',
        bullets: [
          'Tutup tab dan aplikasi lain agar memori browser tersedia sepenuhnya untuk proses.',
          'Atur urutan pindai dengan tombol panah sebelum memproses, bukan setelah hasil terbentuk.',
          'Proses dalam batch kecil ketika dokumennya besar, lalu gabungkan hasilnya.',
          'Buka PDF hasil gabungan sekali untuk memastikan urutan halaman sebelum dikirim.',
          'Jika berkas dilindungi kata sandi, buka kuncinya lebih dulu di pembaca PDF.',
        ],
      },
      {
        heading: 'Dokumen tetap di ponsel Anda',
        paragraphs: [
          'Pemrosesan lokal punya keuntungan praktis di ponsel: semuanya tetap berjalan dengan kuota data yang tersisa. Tidak ada unggahan yang memakan kuota, dan dokumen tidak menumpuk di server penyimpanan orang lain. Kontrak, hasil pindai identitas, dan berkas lamaran aman di perangkat Anda sendiri.',
          'Hasil unduhan langsung tersimpan di perangkat dan siap dibagikan lewat WhatsApp atau email. Untuk memastikannya, uji sendiri: muat halaman, putuskan koneksi internet, lalu gabungkan dua berkas kecil. Jika hasilnya tetap terunduh, memang tidak ada file yang keluar dari ponsel Anda.',
        ],
      },
    ],
    faq: [
      {
        q: 'Bisakah menggabungkan PDF langsung di ponsel?',
        a: 'Bisa. Toolabs berjalan di browser Android maupun iPhone, dan tombol serta pemilih filenya mudah dipakai di layar sentuh. Berkas dibaca dari Files, Downloads, atau Drive, lalu digabungkan di perangkat. Dokumen kecil biasanya mulus; berkas sangat berat lebih andal di desktop.',
      },
      {
        q: 'Mengapa urutan halaman saya terbalik?',
        a: 'Banyak aplikasi scanner menyimpan halaman terakhir sebagai file pertama, sehingga daftar berkas terbaca dari belakang. Atur urutannya dengan tombol panah sebelum menekan Proses; urutan pada daftar adalah urutan halaman hasil. Memeriksa ulang setelah digabungkan juga membantu menangkap kesalahan sebelum berkas dikirim.',
      },
      {
        q: 'Berapa besar file yang bisa diproses di ponsel?',
        a: 'Antarmuka menerima file hingga 100 MB, tetapi batas nyatanya adalah memori perangkat. Beberapa pindai berukuran 2–5 MB biasanya aman, sementara dokumen 100 MB bisa gagal di ponsel lama. Tutup tab lain, proses dalam batch lebih kecil, atau gunakan desktop untuk berkas berat.',
      },
      {
        q: 'Apakah PDF saya diunggah ke server?',
        a: 'Tidak. Berkas dibaca oleh browser dan digabungkan di perangkat Anda dengan JavaScript; situs tidak memiliki endpoint unggahan PDF. Pemrosesan lokal juga berarti pekerjaan tetap jalan dengan kuota data yang tersisa. Anda bisa memastikannya dengan memutus internet setelah halaman dimuat lalu menggabungkan dua berkas.',
      },
      {
        q: 'Bagaimana dengan PDF yang dilindungi kata sandi?',
        a: 'PDF terenkripsi harus dibuka kuncinya lebih dulu. Buka berkas di pembaca PDF di ponsel Anda, masukkan kata sandi, lalu simpan salinan tanpa proteksi. Salinan itulah yang bisa ditambahkan ke tool gabung; file terenkripsi akan ditolak dengan pesan yang jelas. Ini berlaku di semua perangkat.',
      },
      {
        q: 'Hasil gabungan terlalu besar untuk dikirim, kenapa?',
        a: 'Karena penggabungan menyalin halaman tanpa mengompres ulang, sehingga ukurannya mendekati total berkas sumber. Masalahnya ada di kompresi, bukan penggabungan. Setelah dokumen tersusun, gunakan Optimasi PDF untuk memperkecilnya, lalu kirim berkas hasilnya ke WhatsApp atau email. Hasilnya biasanya sudah cukup untuk messenger modern.',
      },
    ],
    relatedTools: ['merge-pdf'],
  },
];
