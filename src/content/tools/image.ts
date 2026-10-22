import type { Tool } from '../../tools.config';

export const imageTools: Tool[] = [
  {
    id: 'compress-image',
    slug: { en: 'compress-image', id: 'kompres-gambar' },
    category: 'image',
    engine: 'image-compress',
    accept: ['image/jpeg', 'image/png', 'image/webp'],
    icon: 'compress',
    featured: 1,
    options: {},
    related: ['compress-jpg-to-100kb', 'compress-jpg-to-200kb', 'compress-png', 'resize-image', 'png-to-webp'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'Compress Image Online Free — JPG, PNG, WebP',
        h1: 'Compress images without uploading them',
        metaDescription:
          'Compress JPG, PNG, and WebP images to a target size in your browser. See the exact before and after size. Free, private, and no signup.',
        answerQuestion: 'How do I compress an image to an exact size?',
        shortAnswer:
          'Drop a JPG, PNG, or WebP image, set a target such as 100 KB, and Toolabs searches for the highest quality that fits. If quality alone is not enough, it reduces the pixel dimensions step by step. The file is processed in your browser and never uploaded.',
        intro:
          'Most compressors give you a quality slider and hope for the best. Toolabs works backwards from the number that usually matters: the maximum file size a portal, form, or email attachment will accept. Enter 100 KB and the engine keeps testing the image until it is under that limit, while trying to preserve as much visual quality as possible. The widget shows both sizes, the final dimensions, and a warning when the result needed aggressive compression. Because the image is decoded and re-encoded locally, you can use the tool on confidential documents without sending them anywhere.',
        steps: [
          'Drop a JPG, PNG, or WebP file, or choose one from your device.',
          'Enter a target size in KB or pick a preset such as 100 KB or 200 KB.',
          'Leave the output format on Auto, or choose JPG or WebP if you want a smaller result.',
          'Press Process file and compare the before and after sizes.',
          'Download the compressed image, or process another file without reloading.',
        ],
        benefits: [
          'You control the exact size limit instead of guessing from a quality percentage.',
          'The engine reports the result honestly, including when a target forces a visible quality drop.',
          'Re-encoding removes EXIF metadata such as GPS location, camera model, and capture time.',
          'No upload means the tool still works on slow connections and on private documents.',
        ],
        useCases: [
          'Shrinking a profile photo for a job portal that only accepts files under 200 KB.',
          'Preparing product photos for a marketplace with a strict upload limit.',
          'Sending several photos by email without hitting the attachment cap.',
          'Reducing images for a slide deck or report that has become too heavy to share.',
        ],
        faq: [
          {
            q: 'Does compressing an image reduce its quality?',
            a: 'Yes for JPG and WebP. The tool lowers the encoder quality and, when needed, the pixel dimensions. PNG is lossless, so only dimensions change. The result panel shows the final dimensions and warns you when compression was aggressive.',
          },
          {
            q: 'Can I compress an image to exactly 100 KB?',
            a: 'The result is at or slightly below the target, not exactly 100.00 KB. Encoders cannot hit an exact byte count reliably. What matters for portals is staying under the maximum, which this tool guarantees when the target is reachable.',
          },
          {
            q: 'What happens if the target cannot be reached?',
            a: 'Toolabs tells you instead of silently producing a bad file. It shows the smallest result it could make at a usable quality, along with the dimensions used. A different format such as WebP or a smaller starting image can help.',
          },
          {
            q: 'Are my images uploaded?',
            a: 'No. The image is read with the File API, decoded in your browser, resized on a canvas inside a Web Worker, and encoded locally. Toolabs has no server endpoint that receives image data.',
          },
          {
            q: 'Does it remove EXIF data?',
            a: 'Yes. Canvas re-encoding creates a new file without EXIF metadata. GPS coordinates, camera details, and timestamps are removed. The visual orientation is preserved because the browser applies EXIF orientation when decoding.',
          },
          {
            q: 'Which format should I choose for the smallest file?',
            a: 'For photographs, JPG and WebP are both efficient; WebP is often 20–35% smaller at similar visual quality. For screenshots, diagrams, or images with transparency, PNG keeps sharp edges but is much larger. The best choice depends on the content, so compare both results when size is critical.',
          },
        ],
        comparison: {
          caption: 'Common target sizes and what they are usually for',
          headers: ['Target', 'Typical use', 'What to expect'],
          rows: [
            ['20–50 KB', 'Tiny profile photos, signature images', 'Small dimensions; fine for thumbnails, not for printing'],
            ['100 KB', 'Job portals, campus forms, email', 'Good for a portrait or document photo at 600–1200 px'],
            ['200 KB', 'CPNS and civil-service portals, ID photos', 'Usually reaches 3×4 cm at 300 DPI without visible loss'],
            ['500 KB', 'Marketplace listings, blog images', 'High quality at typical web dimensions'],
            ['1 MB', 'Photography, print preparation', 'Mild compression; often no visible change'],
          ],
          note: 'Always check the exact limit and allowed formats on the destination portal. Limits change and may apply per file or per submission.',
        },
        tip: 'If you only need to change pixel dimensions, use Resize Image instead. It avoids unnecessary re-compression and gives you exact width and height.',
      },
      id: {
        title: 'Kompres Gambar Online Gratis — JPG, PNG, WebP',
        h1: 'Kompres gambar tanpa upload ke server',
        metaDescription:
          'Kompres gambar JPG, PNG, dan WebP ke ukuran target di browser. Lihat ukuran sebelum dan sesudah. Gratis, privat, tanpa daftar.',
        answerQuestion: 'Bagaimana cara kompres gambar ke ukuran tertentu?',
        shortAnswer:
          'Letakkan gambar JPG, PNG, atau WebP, tentukan target seperti 100 KB, lalu Toolabs mencari kualitas tertinggi yang muat. Jika kualitas saja tidak cukup, dimensi piksel diperkecil bertahap. File diproses di browser Anda dan tidak pernah diunggah. Nilai sebelum dan sesudah ditampilkan supaya Anda bisa memeriksa hasilnya.',
        intro:
          'Sebagian besar alat kompres hanya memberi slider kualitas dan berharap hasilnya cocok. Toolabs bekerja dari angka yang biasanya paling penting: batas ukuran file yang diterima portal, formulir, atau lampiran email. Masukkan 100 KB, lalu mesin terus menguji gambar sampai berada di bawah batas itu sambil menjaga kualitas visual sebaik mungkin. Widget menampilkan ukuran sebelum dan sesudah, dimensi akhir, serta peringatan bila kompresi harus sangat agresif. Karena gambar dibaca dan dikodekan ulang secara lokal, tool ini aman untuk dokumen pribadi.',
        steps: [
          'Letakkan file JPG, PNG, atau WebP, atau pilih dari perangkat Anda.',
          'Masukkan target ukuran dalam KB atau pilih preset seperti 100 KB atau 200 KB.',
          'Biarkan format keluaran Otomatis, atau pilih JPG/WebP untuk hasil lebih kecil.',
          'Tekan Proses file dan bandingkan ukuran sebelum dan sesudah.',
          'Unduh gambar hasil kompres, atau proses file lain tanpa memuat ulang halaman.',
        ],
        benefits: [
          'Anda mengatur batas ukuran yang pasti, bukan menebak dari persentase kualitas.',
          'Hasil dilaporkan jujur, termasuk saat target memaksa penurunan kualitas yang terlihat.',
          'Pengodean ulang menghapus metadata EXIF seperti lokasi GPS, model kamera, dan waktu pengambilan.',
          'Tanpa unggah, tool tetap berfungsi di koneksi lambat dan untuk dokumen pribadi.',
        ],
        useCases: [
          'Memperkecil foto profil untuk portal lamaran yang hanya menerima file di bawah 200 KB.',
          'Menyiapkan foto produk untuk marketplace dengan batas unggah ketat.',
          'Mengirim beberapa foto lewat email tanpa melebihi batas lampiran.',
          'Mengecilkan gambar untuk presentasi atau laporan yang terlalu berat dibagikan.',
        ],
        faq: [
          {
            q: 'Apakah kompres gambar menurunkan kualitas?',
            a: 'Ya untuk JPG dan WebP. Tool menurunkan kualitas encoder dan bila perlu dimensi piksel. PNG bersifat lossless, jadi hanya dimensinya yang berubah. Panel hasil menampilkan dimensi akhir dan memberi peringatan bila kompresi sangat agresif.',
          },
          {
            q: 'Bisakah kompres gambar tepat 100 KB?',
            a: 'Hasilnya berada di atau sedikit di bawah target, bukan tepat 100,00 KB. Encoder tidak bisa mencapai jumlah byte yang persis. Yang penting untuk portal adalah tetap di bawah batas maksimum, dan tool ini menjaminnya selama target masih mungkin dicapai.',
          },
          {
            q: 'Apa yang terjadi jika target tidak bisa dicapai?',
            a: 'Toolabs memberi tahu, bukan diam-diam menghasilkan file buruk. Tool menampilkan hasil terkecil pada kualitas yang masih layak beserta dimensinya. Format lain seperti WebP atau gambar awal yang lebih kecil dapat membantu.',
          },
          {
            q: 'Apakah gambar saya diunggah?',
            a: 'Tidak. Gambar dibaca lewat File API, didekode di browser, diubah ukurannya di canvas dalam Web Worker, lalu dikodekan secara lokal. Toolabs tidak memiliki endpoint server yang menerima data gambar.',
          },
          {
            q: 'Apakah data EXIF dihapus?',
            a: 'Ya. Pengodean ulang canvas menghasilkan file baru tanpa metadata EXIF. Koordinat GPS, detail kamera, dan waktu pengambilan hilang. Orientasi visual tetap benar karena browser menerapkan orientasi EXIF saat membaca gambar.',
          },
          {
            q: 'Format apa yang paling kecil?',
            a: 'Untuk foto, JPG dan WebP sama-sama efisien; WebP sering 20–35% lebih kecil pada kualitas visual serupa. Untuk tangkapan layar, diagram, atau gambar transparan, PNG menjaga ketajaman tepi tetapi jauh lebih besar. Pilihan terbaik bergantung pada isi gambar, jadi bandingkan hasilnya bila ukuran sangat penting.',
          },
        ],
        comparison: {
          caption: 'Target ukuran umum dan kegunaannya',
          headers: ['Target', 'Biasanya untuk', 'Perkiraan hasil'],
          rows: [
            ['20–50 KB', 'Foto profil kecil, gambar tanda tangan', 'Dimensi kecil; cocok untuk thumbnail, tidak untuk cetak'],
            ['100 KB', 'Portal lamaran, formulir kampus, email', 'Cukup untuk foto portrait atau dokumen pada 600–1200 px'],
            ['200 KB', 'Portal CPNS, foto identitas', 'Umumnya mencapai 3×4 cm pada 300 DPI tanpa kerusakan terlihat'],
            ['500 KB', 'Foto marketplace, gambar blog', 'Kualitas tinggi pada dimensi web biasa'],
            ['1 MB', 'Fotografi, persiapan cetak', 'Kompresi ringan; sering tanpa perubahan terlihat'],
          ],
          note: 'Selalu periksa batas dan format yang diterima portal tujuan. Batas dapat berubah dan bisa berlaku per file atau per pengiriman.',
        },
        tip: 'Jika hanya perlu mengubah dimensi piksel, gunakan Ubah Ukuran Gambar. Tool tersebut menghindari kompresi ulang yang tidak perlu dan memberi lebar serta tinggi yang presisi.',
      },
    },
  },

  {
    id: 'compress-jpg-to-100kb',
    slug: { en: 'compress-jpg-to-100kb', id: 'kompres-jpg-100kb' },
    category: 'image',
    engine: 'image-compress',
    accept: ['image/jpeg'],
    icon: 'target',
    featured: 2,
    options: { targetKB: 100, outputFormat: 'image/jpeg' },
    related: ['compress-image', 'compress-jpg-to-200kb', 'compress-png', 'photo-3x4'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'Compress JPG to 100 KB Online — Free Toolabs',
        h1: 'Compress JPG to 100 KB',
        metaDescription:
          'Reduce a JPG to 100 KB or less in your browser. See the exact before and after size, keep the best possible quality, and download instantly.',
        answerQuestion: 'How do I compress a JPG to 100 KB?',
        shortAnswer:
          'Choose a JPG, keep the 100 KB target, and Toolabs finds the highest quality that fits. If quality alone cannot reach 100 KB, it reduces the dimensions step by step. Compare the before and after size, then download the result. The photo never leaves your device.',
        intro:
          'A 100 KB limit is common on job applications, university forms, and older upload portals. The file is usually a portrait or a scan, and the portal rejects anything above the cap without explaining how to fix it. This page uses the same compression engine as Compress Image, but arrives with the 100 KB target already set. The engine searches for the best quality under the limit instead of applying a fixed quality percentage, then lowers dimensions only when necessary. If your photo is a 12-megapixel image, some resizing is normal: a 100 KB JPEG cannot preserve every pixel of a large photo.',
        steps: [
          'Add the JPG you need to send. PNG and WebP files are not accepted on this page.',
          'The target is already set to 100 KB. Change it only if your portal uses a different limit.',
          'Press Process file. Toolabs will test quality settings and, if required, reduce dimensions.',
          'Check the result size, dimensions, and any warning before downloading.',
          'Download the JPG and upload it to the portal that requested the limit.',
        ],
        benefits: [
          'No guesswork: the tool aims for the limit instead of asking you to try quality 70 and hope.',
          'The original dimensions and the output dimensions are shown, so nothing changes silently.',
          'EXIF location data is removed by re-encoding, which is safer for public applications.',
          'Everything happens locally; your ID photo is not sent to a server or stored in a queue.',
        ],
        useCases: [
          'Applying for a job through a portal with a 100 KB photo limit.',
          'Uploading a student card photo or campus registration document.',
          'Attaching a portrait to a visa, scholarship, or certification form.',
          'Replacing an oversized email attachment with a smaller version.',
        ],
        faq: [
          {
            q: 'Is a 100 KB JPG good enough for a job application?',
            a: 'Usually yes for a portrait shown on screen. At 100 KB, a 600–1200 px photo remains clear enough for most applicant tracking systems. If the portal asks for a printed photo or a specific DPI, check its instructions before compressing.',
          },
          {
            q: 'Why does my photo become smaller in pixels?',
            a: 'JPEG quality reduction alone may not bring a large photo under 100 KB. The engine then scales the image down. The result panel shows the final dimensions. For a typical portrait, 800–1200 px on the long side is usually plenty for an online form.',
          },
          {
            q: 'Can I choose 50 KB or 200 KB instead?',
            a: 'Yes. Change the target field, or open Compress JPG to 200 KB for a 200 KB preset. The same engine handles any target from a small thumbnail to several megabytes.',
          },
          {
            q: 'Will the portal accept a JPG with EXIF removed?',
            a: 'Portals check the file format, dimensions, and size, not EXIF fields. Removing camera and GPS data is safe and generally preferable for privacy. The image orientation is preserved visually.',
          },
          {
            q: 'What if 100 KB cannot be reached?',
            a: 'Toolabs reports the smallest achievable result and explains that the target was missed. That is rare at 100 KB because dimensions can be reduced, but a broken file, an unusually detailed image, or a tiny target can still make it impossible.',
          },
          {
            q: 'Is this the same as saving at 70% quality in Photoshop?',
            a: 'The goal is similar but the method is not. Photoshop applies a quality you choose. Toolabs measures the encoded bytes and searches for the highest quality that satisfies the 100 KB limit, which is more predictable when a hard cap matters.',
          },
        ],
        comparison: {
          caption: 'Is 100 KB the right limit?',
          headers: ['Limit', 'Best for', 'Trade-off'],
          rows: [
            ['50 KB', 'Very small profile photos, signatures', 'Visible softness on detailed portraits'],
            ['100 KB', 'Job portals, campus forms, email', 'Good on-screen quality at moderate dimensions'],
            ['200 KB', 'CPNS/ID photos, larger portraits', 'Sharper details and more room for 3×4 cm prints'],
            ['500 KB', 'High-quality application photos', 'Rarely needed when a portal shows a small preview'],
          ],
          note: 'Use the limit stated by the receiving portal. A smaller file is not automatically better if the portal displays a large preview.',
        },
        tip: 'If the portal also specifies pixel dimensions, set them first with Resize Image, then compress. Starting from the right dimensions avoids double work and gives a cleaner result.',
      },
      id: {
        title: 'Kompres JPG jadi 100 KB Online Gratis — Toolabs',
        h1: 'Kompres JPG jadi 100 KB',
        metaDescription:
          'Perkecil foto JPG jadi 100 KB atau kurang langsung di browser. Lihat ukuran sebelum dan sesudah, kualitas terbaik, lalu unduh gratis.',
        answerQuestion: 'Bagaimana cara kompres foto JPG jadi 100 KB?',
        shortAnswer:
          'Pilih foto JPG, biarkan target 100 KB, lalu Toolabs mencari kualitas tertinggi yang muat. Jika kualitas saja tidak cukup, dimensi diperkecil bertahap. Bandingkan ukuran sebelum dan sesudah, lalu unduh hasilnya. Foto tidak pernah meninggalkan perangkat Anda. Cocok untuk portal lamaran yang membatasi ukuran unggahan.',
        intro:
          'Batas 100 KB sering muncul di portal lamaran kerja, formulir kampus, dan situs pendaftaran lama. File yang diunggah biasanya foto wajah atau hasil pindai, dan portal menolak file di atas batas tanpa menjelaskan cara memperbaikinya. Halaman ini memakai mesin kompres yang sama dengan Kompres Gambar, tetapi target 100 KB sudah terisi. Mesin mencari kualitas terbaik di bawah batas, bukan menerapkan persentase kualitas tetap, lalu memperkecil dimensi hanya bila perlu. Jika foto Anda 12 megapiksel, pengecilan dimensi adalah hal normal: JPEG 100 KB tidak mungkin menyimpan seluruh detail foto besar.',
        steps: [
          'Tambahkan foto JPG yang ingin dikirim. Halaman ini tidak menerima PNG atau WebP.',
          'Target sudah terisi 100 KB. Ubah hanya jika portal Anda memakai batas berbeda.',
          'Tekan Proses file. Toolabs akan menguji kualitas dan bila perlu memperkecil dimensi.',
          'Periksa ukuran hasil, dimensi, dan peringatan sebelum mengunduh.',
          'Unduh JPG dan unggah ke portal yang meminta batas tersebut.',
        ],
        benefits: [
          'Tanpa menebak: tool membidik batas ukuran, bukan menyuruh Anda mencoba kualitas 70 dan berharap.',
          'Dimensi asli dan hasil ditampilkan, jadi tidak ada perubahan yang terjadi diam-diam.',
          'Data lokasi EXIF dihapus saat pengodean ulang, lebih aman untuk lamaran publik.',
          'Semua berjalan lokal; foto identitas Anda tidak dikirim ke server atau disimpan dalam antrean.',
        ],
        useCases: [
          'Melamar kerja lewat portal dengan batas foto 100 KB.',
          'Mengunggah foto kartu mahasiswa atau berkas pendaftaran kampus.',
          'Melampirkan pas foto pada formulir visa, beasiswa, atau sertifikasi.',
          'Mengganti lampiran email yang terlalu besar dengan versi lebih kecil.',
        ],
        faq: [
          {
            q: 'Apakah JPG 100 KB cukup untuk lamaran kerja?',
            a: 'Biasanya cukup untuk foto yang tampil di layar. Pada 100 KB, foto 600–1200 px masih jelas untuk sebagian besar sistem lamaran. Jika portal meminta foto cetak atau DPI tertentu, periksa instruksinya sebelum mengompres.',
          },
          {
            q: 'Mengapa jumlah piksel foto berkurang?',
            a: 'Penurunan kualitas JPEG saja mungkin tidak cukup untuk membawa foto besar di bawah 100 KB. Mesin lalu memperkecil gambar. Panel hasil menampilkan dimensi akhir. Untuk foto portrait, 800–1200 px di sisi terpanjang biasanya cukup untuk formulir online.',
          },
          {
            q: 'Bisakah memilih 50 KB atau 200 KB?',
            a: 'Bisa. Ubah kolom target, atau buka Kompres JPG 200 KB untuk preset 200 KB. Mesin yang sama menangani target apa pun, dari thumbnail kecil hingga beberapa megabyte.',
          },
          {
            q: 'Apakah portal menerima JPG tanpa EXIF?',
            a: 'Portal memeriksa format file, dimensi, dan ukuran, bukan isi EXIF. Menghapus data kamera dan GPS aman dan umumnya lebih baik untuk privasi. Orientasi foto tetap benar secara visual.',
          },
          {
            q: 'Bagaimana jika 100 KB tidak bisa dicapai?',
            a: 'Toolabs menampilkan hasil terkecil yang bisa dicapai dan menjelaskan bahwa target tidak terpenuhi. Ini jarang terjadi pada 100 KB karena dimensi bisa diperkecil, tetapi file rusak, gambar yang sangat detail, atau target ekstrem tetap bisa membuatnya mustahil.',
          },
          {
            q: 'Apakah sama dengan menyimpan kualitas 70% di Photoshop?',
            a: 'Tujuannya mirip, tetapi caranya berbeda. Photoshop menerapkan kualitas yang Anda pilih. Toolabs mengukur byte hasil encoding dan mencari kualitas tertinggi yang memenuhi batas 100 KB, lebih dapat diprediksi saat ada batas keras.',
          },
        ],
        comparison: {
          caption: 'Apakah 100 KB adalah batas yang tepat?',
          headers: ['Batas', 'Cocok untuk', 'Konsekuensi'],
          rows: [
            ['50 KB', 'Foto profil sangat kecil, tanda tangan', 'Terlihat lembut pada portrait detail'],
            ['100 KB', 'Portal lamaran, formulir kampus, email', 'Kualitas layar baik pada dimensi sedang'],
            ['200 KB', 'Foto CPNS/identitas, portrait lebih besar', 'Detail lebih tajam dan ruang untuk cetak 3×4 cm'],
            ['500 KB', 'Foto lamaran kualitas tinggi', 'Jarang diperlukan bila portal hanya menampilkan pratinjau kecil'],
          ],
          note: 'Gunakan batas yang tertera di portal penerima. File lebih kecil belum tentu lebih baik jika portal menampilkan pratinjau besar.',
        },
        tip: 'Jika portal juga menentukan dimensi piksel, atur dulu lewat Ubah Ukuran Gambar, lalu kompres. Memulai dari dimensi yang benar menghindari pekerjaan ganda dan hasil lebih bersih.',
      },
    },
  },

  {
    id: 'compress-jpg-to-200kb',
    slug: { en: 'compress-jpg-to-200kb', id: 'kompres-jpg-200kb' },
    category: 'image',
    engine: 'image-compress',
    accept: ['image/jpeg'],
    icon: 'target',
    options: { targetKB: 200, outputFormat: 'image/jpeg' },
    related: ['compress-jpg-to-100kb', 'compress-image', 'photo-3x4', 'compress-png'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'Compress JPG to 200 KB Online — Free Toolabs',
        h1: 'Compress JPG to 200 KB',
        metaDescription:
          'Compress a JPG to 200 KB or less in your browser. Ideal for ID photos and application portals. No upload, no signup, exact size shown.',
        answerQuestion: 'How do I compress a JPG to 200 KB?',
        shortAnswer:
          'Add your JPG and process it with the 200 KB target already selected. Toolabs keeps the highest quality that fits and reduces dimensions only when necessary. You see both sizes and the final resolution before downloading. The photo is processed on your device and is never uploaded.',
        intro:
          'The 200 KB limit is common on government and recruitment portals, including Indonesian CPNS applications and many ID-photo forms. It is generous enough for a sharp portrait but tight enough that a phone photo straight from the camera will usually fail. This preset removes the trial and error: the target is set to 200 KB, and the engine adjusts quality first, dimensions second. If the portal also requires a specific photo size such as 3×4 cm, use the 3×4 preset and enter 200 KB as the target there. Always confirm the current rules on the official portal, because requirements can differ by year and agency.',
        steps: [
          'Add a JPG file. This page is tuned for photos rather than screenshots.',
          'Keep the 200 KB target. Use the 3×4 photo tool if you also need exact print dimensions.',
          'Press Process file and wait for the local encoder to finish.',
          'Review the result size, resolution, and quality warning.',
          'Download the compressed JPG and upload it to the portal.',
        ],
        benefits: [
          'The 200 KB target is pre-filled, so there is no unit or conversion mistake.',
          'Suitable for ID photos: the result is clear at the dimensions portals usually display.',
          'No server upload keeps personal portraits and identity documents private.',
          'The tool warns when a photo had to be reduced more than expected.',
        ],
        useCases: [
          'Preparing a CPNS or government application photo within the stated limit.',
          'Uploading a passport-style photo to a visa or immigration form.',
          'Submitting a portrait for a professional certification or exam registration.',
          'Reducing a camera photo for a portal that rejects files above 200 KB.',
        ],
        faq: [
          {
            q: 'Is 200 KB enough for a CPNS photo?',
            a: 'Many Indonesian government portals use limits around 200 KB, but rules vary by agency and selection period. Check the official announcement. If it specifies 200 KB, this preset produces a file at or below that size while keeping as much quality as possible.',
          },
          {
            q: 'Should I use 200 KB or 100 KB?',
            a: 'Use the largest limit the portal allows. A 200 KB file usually keeps more detail than a 100 KB file. If the portal says 100 KB, use the 100 KB preset; submitting a larger file will be rejected regardless of visual quality.',
          },
          {
            q: 'Does the tool change the photo dimensions?',
            a: 'Only if quality reduction alone cannot reach 200 KB. The result card shows the final width and height. For a standard portrait, that is rarely a problem at 200 KB, but very large phone photos may still be scaled down.',
          },
          {
            q: 'Can I produce a 3×4 cm photo at 200 KB?',
            a: 'Yes. Open Resize Photo to 3×4 cm, which uses 354×472 pixels at 300 DPI and a 200 KB target. It crops to the correct ratio and compresses the result.',
          },
          {
            q: 'Does background colour or clothing affect the file size?',
            a: 'Yes, indirectly. Detailed backgrounds, patterns, and sharp textures need more data than a plain background. A clean, evenly lit photo usually stays sharper at the same file size.',
          },
          {
            q: 'Are the photos stored anywhere?',
            a: 'No. The file is opened by your browser, processed in a local worker, and downloaded back to your device. Toolabs does not operate an upload endpoint for this tool.',
          },
        ],
        comparison: {
          caption: '200 KB in context',
          headers: ['Requirement', 'What 200 KB usually supports', 'Watch out for'],
          rows: [
            ['3×4 cm at 300 DPI (354×472 px)', 'Sharp portrait with a plain background', 'Exact crop ratio and head position'],
            ['4×6 cm at 300 DPI (472×709 px)', 'Good detail for printed application photos', 'Larger pixel count can need more compression'],
            ['Web profile photo', 'More detail than needed for most screens', 'Portals may resize the preview anyway'],
            ['Full phone photo', 'Usually requires downscaling', 'Check whether the portal needs the original'],
          ],
          note: 'DPI is metadata for printing; portals usually check pixel dimensions and file size. A 354×472 px image is 3×4 cm at 300 DPI when printed.',
        },
        tip: 'If the portal shows a crop frame, leave a little space around the head and shoulders. Cropping after compression wastes quality and may cut the face.',
      },
      id: {
        title: 'Kompres JPG jadi 200 KB Online Gratis — Toolabs',
        h1: 'Kompres JPG jadi 200 KB',
        metaDescription:
          'Kompres foto JPG jadi 200 KB atau kurang di browser. Cocok untuk foto CPNS dan portal lamaran. Tanpa upload, tanpa daftar, ukuran terlihat.',
        answerQuestion: 'Bagaimana cara kompres foto JPG jadi 200 KB?',
        shortAnswer:
          'Tambahkan foto JPG dan proses dengan target 200 KB yang sudah terpilih. Toolabs mempertahankan kualitas tertinggi yang muat dan hanya memperkecil dimensi bila perlu. Anda melihat ukuran sebelum, sesudah, dan resolusi akhir sebelum mengunduh. Foto diproses di perangkat dan tidak diunggah.',
        intro:
          'Batas 200 KB sering dipakai portal pemerintah dan rekrutmen, termasuk pendaftaran CPNS dan berbagai formulir pas foto. Batas ini cukup longgar untuk portrait yang tajam, tetapi tetap membuat foto ponsel langsung dari kamera biasanya ditolak. Preset ini menghilangkan coba-coba: target 200 KB sudah terisi, mesin menyesuaikan kualitas lebih dulu, lalu dimensi. Jika portal juga meminta ukuran foto 3×4 cm, gunakan preset foto 3×4 dan masukkan target 200 KB di sana. Selalu cek aturan terbaru di portal resmi karena syarat dapat berbeda tiap tahun dan instansi.',
        steps: [
          'Tambahkan file JPG. Halaman ini dioptimalkan untuk foto, bukan tangkapan layar.',
          'Biarkan target 200 KB. Gunakan tool foto 3×4 jika perlu dimensi cetak yang presisi.',
          'Tekan Proses file dan tunggu encoder lokal selesai.',
          'Periksa ukuran hasil, resolusi, dan peringatan kualitas.',
          'Unduh JPG hasil kompres dan unggah ke portal.',
        ],
        benefits: [
          'Target 200 KB sudah terisi, sehingga tidak ada kesalahan satuan atau konversi.',
          'Cocok untuk pas foto: hasil tetap jelas pada dimensi yang biasanya ditampilkan portal.',
          'Tanpa unggah server, foto pribadi dan dokumen identitas tetap privat.',
          'Tool memberi peringatan bila foto harus diperkecil lebih banyak dari perkiraan.',
        ],
        useCases: [
          'Menyiapkan foto pendaftaran CPNS atau instansi pemerintah sesuai batas.',
          'Mengunggah pas foto ke formulir visa atau imigrasi.',
          'Mengirim portrait untuk sertifikasi profesional atau pendaftaran ujian.',
          'Memperkecil foto kamera untuk portal yang menolak file di atas 200 KB.',
        ],
        faq: [
          {
            q: 'Apakah 200 KB cukup untuk foto CPNS?',
            a: 'Banyak portal pemerintah Indonesia memakai batas sekitar 200 KB, tetapi aturannya berbeda menurut instansi dan periode seleksi. Periksa pengumuman resmi. Jika tertulis 200 KB, preset ini menghasilkan file di atau di bawah batas dengan kualitas semaksimal mungkin.',
          },
          {
            q: 'Sebaiknya 200 KB atau 100 KB?',
            a: 'Gunakan batas terbesar yang diizinkan portal. File 200 KB biasanya menyimpan lebih banyak detail daripada 100 KB. Jika portal menulis 100 KB, gunakan preset 100 KB; file yang lebih besar akan ditolak apa pun kualitas visualnya.',
          },
          {
            q: 'Apakah tool mengubah dimensi foto?',
            a: 'Hanya jika penurunan kualitas saja tidak cukup mencapai 200 KB. Kartu hasil menampilkan lebar dan tinggi akhir. Untuk portrait standar, ini jarang menjadi masalah pada 200 KB, tetapi foto ponsel yang sangat besar bisa tetap diperkecil.',
          },
          {
            q: 'Bisakah membuat foto 3×4 cm dengan ukuran 200 KB?',
            a: 'Bisa. Buka Ubah Foto 3×4 cm yang memakai 354×472 piksel pada 300 DPI dan target 200 KB. Tool memotong sesuai rasio yang benar lalu mengompres hasilnya.',
          },
          {
            q: 'Apakah warna latar atau pakaian memengaruhi ukuran file?',
            a: 'Ya, secara tidak langsung. Latar yang detail, pola, dan tekstur tajam membutuhkan lebih banyak data daripada latar polos. Foto dengan cahaya rata dan latar bersih biasanya lebih tajam pada ukuran file yang sama.',
          },
          {
            q: 'Apakah foto disimpan di suatu tempat?',
            a: 'Tidak. File dibuka browser, diproses di worker lokal, lalu diunduh kembali ke perangkat Anda. Toolabs tidak memiliki endpoint unggah untuk tool ini.',
          },
        ],
        comparison: {
          caption: '200 KB dalam konteks',
          headers: ['Kebutuhan', 'Yang biasanya didukung 200 KB', 'Perhatikan'],
          rows: [
            ['3×4 cm pada 300 DPI (354×472 px)', 'Portrait tajam dengan latar polos', 'Rasio potong dan posisi kepala yang tepat'],
            ['4×6 cm pada 300 DPI (472×709 px)', 'Detail baik untuk foto lamaran cetak', 'Jumlah piksel lebih besar bisa butuh kompresi lebih kuat'],
            ['Foto profil web', 'Detail melebihi kebutuhan layar umumnya', 'Portal mungkin mengecilkan pratinjau'],
            ['Foto ponsel penuh', 'Biasanya perlu diperkecil', 'Cek apakah portal membutuhkan foto asli'],
          ],
          note: 'DPI adalah metadata untuk cetak; portal biasanya memeriksa dimensi piksel dan ukuran file. Gambar 354×472 px setara 3×4 cm pada 300 DPI saat dicetak.',
        },
        tip: 'Jika portal menampilkan bingkai potong, sisakan ruang di sekitar kepala dan bahu. Memotong setelah kompresi membuang kualitas dan bisa memangkas wajah.',
      },
    },
  },

  {
    id: 'compress-png',
    slug: { en: 'compress-png', id: 'kompres-png' },
    category: 'image',
    engine: 'image-compress',
    accept: ['image/png'],
    icon: 'png',
    options: { outputFormat: 'image/png' },
    related: ['compress-image', 'resize-image', 'png-to-webp', 'jpg-to-png'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'Compress PNG Online Free — Reduce PNG Size',
        h1: 'Compress PNG without uploading it',
        metaDescription:
          'Reduce PNG file size in your browser. Choose a target size and let Toolabs resize the image, or convert to WebP for a much smaller file.',
        answerQuestion: 'How do I reduce the size of a PNG file?',
        shortAnswer:
          'Add a PNG and set a target size. Because PNG is lossless, Toolabs cannot trade quality for bytes the way it does with JPG; it reduces the pixel dimensions instead. If you need a dramatically smaller file, convert to WebP, which supports transparency and compresses much better.',
        intro:
          'PNG is excellent for screenshots, logos, and images with transparency, but it is a poor choice for photographs. A 4 MB PNG screenshot can often become a 300 KB WebP with no visible difference. This tool gives you two honest paths: keep PNG and reduce dimensions, or change the format. Many “PNG compressors” quietly convert your file to JPG and remove transparency; Toolabs tells you what will happen and lets you choose. The output format is set to PNG by default here. Change it to WebP in the options if file size matters more than keeping the exact format.',
        steps: [
          'Drop a PNG file or select several at once.',
          'Enter a target size if you have a limit, or leave it empty to use the default quality.',
          'Keep PNG as the output, or switch to WebP for a smaller file with transparency intact.',
          'Process the image and compare the result, dimensions, and format.',
          'Download the compressed file and check that transparency is preserved if needed.',
        ],
        benefits: [
          'No misleading “lossless compression” claim: the tool shows when dimensions were reduced.',
          'Optional WebP output keeps transparency while cutting file size substantially.',
          'Screenshots and interface images stay sharp because they are never converted to JPG.',
          'Local processing means unpublished designs and client work stay private.',
        ],
        useCases: [
          'Reducing a screenshot before attaching it to a bug report or support ticket.',
          'Preparing a transparent logo for a website while staying under a CMS limit.',
          'Compressing a design mockup for a client email without losing sharp UI edges.',
          'Replacing a heavy PNG photo with WebP on a small business website.',
        ],
        faq: [
          {
            q: 'Why does PNG compression not reduce quality?',
            a: 'PNG uses lossless compression: the decoded pixels are identical to the original. That also means there is little room to shrink an already-optimized PNG without changing its pixels. Toolabs therefore reduces dimensions when a target size is required.',
          },
          {
            q: 'Should I use WebP instead of PNG?',
            a: 'Use WebP for photographs and large images where a smaller file matters. Use PNG when an app or workflow requires PNG, or when you need absolutely identical pixels. WebP supports transparency, so replacing a transparent PNG is usually safe on the web.',
          },
          {
            q: 'Will transparency be preserved?',
            a: 'Yes. PNG output keeps the alpha channel. WebP output also supports transparency and keeps it. If you choose JPG output, transparent areas become white because JPG has no alpha channel.',
          },
          {
            q: 'Can I compress a PNG to 100 KB?',
            a: 'Yes, by reducing dimensions. A large screenshot may need to become much smaller in pixels to reach 100 KB as PNG. If that is not acceptable, convert to WebP or JPG and compare the visual result. The tool will show the dimensions it used.',
          },
          {
            q: 'Does the tool remove metadata from PNG files?',
            a: 'Yes. Re-encoding creates a clean image without ancillary chunks such as text comments, colour profiles beyond the browser’s output, or location metadata. Visual content is preserved.',
          },
          {
            q: 'Are animated PNGs supported?',
            a: 'Only the first frame is processed. APNG animation is not preserved. For animated images, use a dedicated animation tool.',
          },
        ],
        comparison: {
          caption: 'PNG vs JPG vs WebP for common image types',
          headers: ['Image type', 'Best format', 'Why'],
          rows: [
            ['Screenshot or UI mockup', 'PNG or WebP', 'Sharp text and flat colours; JPG creates fuzzy edges'],
            ['Transparent logo', 'PNG or WebP', 'Alpha channel required'],
            ['Photograph without transparency', 'JPG or WebP', 'Much smaller than PNG at similar visual quality'],
            ['Image for an older app', 'PNG or JPG', 'WebP support is not universal in desktop software'],
          ],
          note: 'WebP is supported by all current major browsers. Some older desktop publishing and office apps still lack WebP import support.',
        },
        tip: 'For a transparent logo on a website, compare PNG and WebP at the exact display size. WebP can cut the file by more than half while keeping smooth edges.',
      },
      id: {
        title: 'Kompres PNG Online Gratis — Perkecil Ukuran PNG',
        h1: 'Kompres PNG tanpa upload ke server',
        metaDescription:
          'Perkecil ukuran file PNG di browser. Tentukan target ukuran dan biarkan Toolabs memperkecil dimensi, atau konversi ke WebP agar jauh lebih kecil.',
        answerQuestion: 'Bagaimana cara memperkecil ukuran file PNG?',
        shortAnswer:
          'Tambahkan PNG dan tentukan target ukuran. Karena PNG lossless, Toolabs tidak bisa menukar kualitas dengan byte seperti pada JPG; yang diperkecil adalah dimensi piksel. Jika butuh file jauh lebih kecil, konversi ke WebP yang mendukung transparansi dan kompresinya lebih efisien.',
        intro:
          'PNG sangat baik untuk tangkapan layar, logo, dan gambar transparan, tetapi buruk untuk foto. PNG tangkapan layar 4 MB sering bisa menjadi WebP 300 KB tanpa perbedaan terlihat. Tool ini memberi dua pilihan jujur: tetap PNG dan perkecil dimensi, atau ganti format. Banyak “kompresor PNG” diam-diam mengubah file menjadi JPG dan menghapus transparansi; Toolabs menjelaskan apa yang terjadi dan membiarkan Anda memilih. Format keluaran di halaman ini adalah PNG. Ubah ke WebP di opsi jika ukuran file lebih penting daripada mempertahankan format persis.',
        steps: [
          'Letakkan file PNG atau pilih beberapa sekaligus.',
          'Masukkan target ukuran jika ada batas, atau kosongkan untuk memakai kualitas bawaan.',
          'Pertahankan PNG sebagai keluaran, atau pilih WebP untuk file lebih kecil dengan transparansi tetap utuh.',
          'Proses gambar dan bandingkan hasil, dimensi, serta formatnya.',
          'Unduh file hasil dan pastikan transparansi tetap ada bila diperlukan.',
        ],
        benefits: [
          'Tanpa klaim “kompresi lossless” yang menyesatkan: tool menunjukkan bila dimensi diperkecil.',
          'Opsi WebP mempertahankan transparansi sekaligus memangkas ukuran file secara signifikan.',
          'Tangkapan layar dan gambar antarmuka tetap tajam karena tidak diubah ke JPG.',
          'Pemrosesan lokal membuat desain yang belum dipublikasikan dan pekerjaan klien tetap privat.',
        ],
        useCases: [
          'Memperkecil tangkapan layar sebelum dilampirkan ke laporan bug atau tiket dukungan.',
          'Menyiapkan logo transparan untuk situs sambil tetap di bawah batas CMS.',
          'Mengompres mockup desain untuk email klien tanpa kehilangan ketajaman antarmuka.',
          'Mengganti PNG foto yang berat dengan WebP di situs usaha kecil.',
        ],
        faq: [
          {
            q: 'Mengapa kompresi PNG tidak menurunkan kualitas?',
            a: 'PNG memakai kompresi lossless: piksel setelah dibuka identik dengan aslinya. Artinya ruang untuk mengecilkan PNG yang sudah optimal sangat sedikit tanpa mengubah piksel. Toolabs karena itu memperkecil dimensi bila target ukuran diminta.',
          },
          {
            q: 'Sebaiknya pakai WebP atau PNG?',
            a: 'Gunakan WebP untuk foto dan gambar besar yang ukurannya penting. Gunakan PNG bila aplikasi atau alur kerja mewajibkan PNG, atau bila piksel harus benar-benar identik. WebP mendukung transparansi, jadi menggantikan PNG transparan biasanya aman di web.',
          },
          {
            q: 'Apakah transparansi dipertahankan?',
            a: 'Ya. Keluaran PNG mempertahankan kanal alpha. Keluaran WebP juga mendukung transparansi dan tetap menyimpannya. Jika memilih JPG, area transparan menjadi putih karena JPG tidak punya kanal alpha.',
          },
          {
            q: 'Bisakah kompres PNG jadi 100 KB?',
            a: 'Bisa, dengan memperkecil dimensi. Tangkapan layar besar mungkin harus menjadi jauh lebih kecil dalam piksel untuk mencapai 100 KB sebagai PNG. Jika itu tidak dapat diterima, konversi ke WebP atau JPG dan bandingkan hasil visualnya. Tool akan menunjukkan dimensi yang dipakai.',
          },
          {
            q: 'Apakah tool menghapus metadata dari PNG?',
            a: 'Ya. Pengodean ulang menghasilkan gambar bersih tanpa chunk tambahan seperti komentar teks, profil warna di luar keluaran browser, atau metadata lokasi. Isi visual tetap dipertahankan.',
          },
          {
            q: 'Apakah PNG animasi didukung?',
            a: 'Hanya frame pertama yang diproses. Animasi APNG tidak dipertahankan. Untuk gambar animasi, gunakan tool animasi khusus.',
          },
        ],
        comparison: {
          caption: 'PNG vs JPG vs WebP untuk jenis gambar umum',
          headers: ['Jenis gambar', 'Format terbaik', 'Alasannya'],
          rows: [
            ['Tangkapan layar atau mockup UI', 'PNG atau WebP', 'Teks tajam dan warna rata; JPG membuat tepi kabur'],
            ['Logo transparan', 'PNG atau WebP', 'Membutuhkan kanal alpha'],
            ['Foto tanpa transparansi', 'JPG atau WebP', 'Jauh lebih kecil daripada PNG pada kualitas visual serupa'],
            ['Gambar untuk aplikasi lama', 'PNG atau JPG', 'Dukungan WebP belum universal di aplikasi desktop'],
          ],
          note: 'WebP didukung semua browser utama saat ini. Beberapa aplikasi office dan penerbitan desktop lama belum bisa mengimpor WebP.',
        },
        tip: 'Untuk logo transparan di situs, bandingkan PNG dan WebP pada ukuran tampil yang tepat. WebP bisa memangkas ukuran lebih dari setengah tanpa kehilangan tepi halus.',
      },
    },
  },

  {
    id: 'resize-image',
    slug: { en: 'resize-image', id: 'ubah-ukuran-gambar' },
    category: 'image',
    engine: 'image-resize',
    accept: ['image/jpeg', 'image/png', 'image/webp'],
    icon: 'resize',
    options: { fit: 'contain', outputFormat: 'auto' },
    related: ['photo-3x4', 'compress-image', 'png-to-webp', 'jpg-to-png'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'Resize Image Online Free — Exact Pixel Size',
        h1: 'Resize an image to exact dimensions',
        metaDescription:
          'Resize JPG, PNG, and WebP images to the exact width and height you need. Crop or fit, optionally hit a target file size, all in your browser.',
        answerQuestion: 'How do I resize an image to an exact pixel size?',
        shortAnswer:
          'Add an image, enter the width and height in pixels, and choose whether to fit the image inside that frame or crop it to fill. Toolabs renders the new dimensions locally and can also compress the result to a target size. Download the resized image when it looks right.',
        intro:
          'Pixel dimensions matter more than most people expect. A profile photo may require exactly 600×600 px, a banner 1200×630 px, and a print photo 354×472 px for 3×4 cm at 300 DPI. This tool gives you those numbers directly, without installing an editor. The default mode fits the image inside the frame and keeps the aspect ratio; empty space becomes transparent for PNG/WebP or white for JPG. Choose “Fill and crop” when the frame must be completely covered, or “Stretch” only when distorting is acceptable. The result card reports both the requested size and the actual output, and an optional target size lets you finish the whole job in one pass.',
        steps: [
          'Add a JPG, PNG, or WebP image.',
          'Enter the target width and height in pixels.',
          'Choose Fit inside, Fill and crop, or Stretch.',
          'Optionally set a maximum file size and output format.',
          'Process, inspect the preview metadata, and download.',
        ],
        benefits: [
          'Exact pixel dimensions instead of approximate percentage scaling.',
          'Three fit modes make cropping behaviour explicit before processing.',
          'Transparency is preserved for PNG and WebP output.',
          'Optional target size removes the need for a second compression step.',
        ],
        useCases: [
          'Making a social profile photo meet an exact square requirement.',
          'Preparing a 1200×630 px image for an Open Graph preview.',
          'Scaling down a large photo before uploading it to a form.',
          'Creating a 3×4 cm photo at 300 DPI with the dedicated preset.',
        ],
        faq: [
          {
            q: 'What is the difference between fit and fill?',
            a: 'Fit inside scales the whole image until it fits within the frame, leaving empty space where the aspect ratio differs. Fill and crop scales the image until it covers the frame, then crops the overflow. Stretch forces both dimensions and can distort faces or logos.',
          },
          {
            q: 'How do pixels relate to centimetres and DPI?',
            a: 'Pixels = centimetres ÷ 2.54 × DPI. A 3×4 cm photo at 300 DPI is about 354×472 px. At 150 DPI the same print size is only 177×236 px. Online portals usually care about pixels and file size, not the DPI tag.',
          },
          {
            q: 'Why did my PNG become a JPG?',
            a: 'It should not unless you choose JPG as the output format. The default keeps the original format. If the original is JPG, transparent areas do not exist, so the output remains JPG.',
          },
          {
            q: 'Does resizing up improve quality?',
            a: 'No. Enlarging adds interpolated pixels but cannot recover detail that was never captured. For print, start with an image that already has enough pixels. For screens, downscaling usually improves perceived sharpness.',
          },
          {
            q: 'Can I resize and compress in one step?',
            a: 'Yes. Enter a target size in KB under Options. After resizing, Toolabs searches for the best quality under that limit while keeping your requested dimensions if possible.',
          },
          {
            q: 'What happens to EXIF orientation?',
            a: 'The browser applies EXIF orientation while decoding, so the image appears upright. The resized output is a new file without EXIF metadata, which also removes GPS and camera information.',
          },
        ],
        comparison: {
          caption: 'Common pixel sizes and their use',
          headers: ['Use', 'Typical pixels', 'Notes'],
          rows: [
            ['Profile photo', '400×400 or 600×600', 'Square crop; keep the face centred'],
            ['Open Graph / social preview', '1200×630', 'Landscape 1.91:1 ratio'],
            ['3×4 cm print at 300 DPI', '354×472', '3:4 portrait ratio'],
            ['4×6 cm print at 300 DPI', '472×709', '4:6 portrait ratio'],
            ['Full HD wallpaper', '1920×1080', '16:9 landscape'],
          ],
          note: 'Always check the receiving platform’s current requirements. Some portals ask for a maximum dimension rather than an exact size.',
        },
        tip: 'Crop before scaling when possible. Cropping a full-resolution image keeps more detail than cropping an already resized one.',
      },
      id: {
        title: 'Ubah Ukuran Gambar Online Gratis — Piksel',
        h1: 'Ubah ukuran gambar sesuai dimensi',
        metaDescription:
          'Ubah ukuran gambar JPG, PNG, dan WebP ke lebar dan tinggi yang diinginkan. Potong atau muat, plus target ukuran file, di browser.',
        answerQuestion: 'Bagaimana cara mengubah ukuran gambar ke piksel tertentu?',
        shortAnswer:
          'Tambahkan gambar, masukkan lebar dan tinggi dalam piksel, lalu pilih apakah gambar dimuat di dalam bingkai atau dipotong agar memenuhi. Toolabs merender dimensi baru secara lokal dan bisa mengompres hasilnya ke target ukuran. Unduh gambar setelah hasilnya sesuai. Gunakan mode contain agar seluruh gambar tetap terlihat.',
        intro:
          'Dimensi piksel lebih penting daripada yang sering diperkirakan. Foto profil bisa diwajibkan tepat 600×600 px, banner 1200×630 px, dan foto cetak 354×472 px untuk 3×4 cm pada 300 DPI. Tool ini memberi angka tersebut langsung tanpa aplikasi editor. Mode bawaan memuat gambar di dalam bingkai dan mempertahankan rasio aspek; ruang kosong menjadi transparan untuk PNG/WebP atau putih untuk JPG. Pilih “Isi dan potong” bila bingkai harus tertutup penuh, atau “Regangkan” hanya bila distorsi dapat diterima. Kartu hasil menampilkan ukuran yang diminta dan hasil aktual, dan target ukuran opsional menyelesaikan semuanya dalam satu langkah.',
        steps: [
          'Tambahkan gambar JPG, PNG, atau WebP.',
          'Masukkan target lebar dan tinggi dalam piksel.',
          'Pilih Muat di dalam, Isi dan potong, atau Regangkan.',
          'Opsional: tentukan batas ukuran file dan format keluaran.',
          'Proses, periksa metadata hasil, lalu unduh.',
        ],
        benefits: [
          'Dimensi piksel presisi, bukan penskalaan persentase perkiraan.',
          'Tiga mode penyesuaian membuat perilaku pemotongan jelas sebelum diproses.',
          'Transparansi dipertahankan untuk keluaran PNG dan WebP.',
          'Target ukuran opsional menghilangkan kebutuhan langkah kompres kedua.',
        ],
        useCases: [
          'Membuat foto profil media sosial sesuai syarat persegi.',
          'Menyiapkan gambar 1200×630 px untuk pratinjau Open Graph.',
          'Memperkecil foto besar sebelum diunggah ke formulir.',
          'Membuat foto 3×4 cm pada 300 DPI dengan preset khusus.',
        ],
        faq: [
          {
            q: 'Apa beda muat di dalam dan isi?',
            a: 'Muat di dalam menskalakan seluruh gambar hingga masuk ke bingkai, menyisakan ruang kosong bila rasio aspek berbeda. Isi dan potong menskalakan gambar hingga menutupi bingkai, lalu memotong kelebihannya. Regangkan memaksa kedua dimensi dan bisa mendistorsi wajah atau logo.',
          },
          {
            q: 'Bagaimana hubungan piksel dengan sentimeter dan DPI?',
            a: 'Piksel = sentimeter ÷ 2,54 × DPI. Foto 3×4 cm pada 300 DPI sekitar 354×472 px. Pada 150 DPI, ukuran cetak yang sama hanya 177×236 px. Portal online biasanya mementingkan piksel dan ukuran file, bukan tag DPI.',
          },
          {
            q: 'Mengapa PNG saya berubah menjadi JPG?',
            a: 'Seharusnya tidak, kecuali Anda memilih JPG sebagai format keluaran. Bawaan mempertahankan format asli. Jika aslinya JPG, area transparan memang tidak ada, sehingga hasilnya tetap JPG.',
          },
          {
            q: 'Apakah memperbesar gambar meningkatkan kualitas?',
            a: 'Tidak. Pembesaran menambah piksel interpolasi tetapi tidak bisa memulihkan detail yang tidak pernah terekam. Untuk cetak, mulai dari gambar yang pikselnya sudah cukup. Untuk layar, memperkecil biasanya meningkatkan ketajaman yang terlihat.',
          },
          {
            q: 'Bisakah mengubah ukuran dan mengompres sekaligus?',
            a: 'Bisa. Masukkan target ukuran dalam KB di bagian Opsi. Setelah diubah ukurannya, Toolabs mencari kualitas terbaik di bawah batas sambil mempertahankan dimensi yang diminta bila memungkinkan.',
          },
          {
            q: 'Apa yang terjadi pada orientasi EXIF?',
            a: 'Browser menerapkan orientasi EXIF saat membaca gambar, sehingga tampil tegak. Hasil ubah ukuran adalah file baru tanpa metadata EXIF, yang juga menghapus informasi GPS dan kamera.',
          },
        ],
        comparison: {
          caption: 'Ukuran piksel umum dan kegunaannya',
          headers: ['Kegunaan', 'Piksel umum', 'Catatan'],
          rows: [
            ['Foto profil', '400×400 atau 600×600', 'Potong persegi; posisikan wajah di tengah'],
            ['Pratinjau Open Graph / sosial', '1200×630', 'Rasio lanskap 1,91:1'],
            ['Cetak 3×4 cm pada 300 DPI', '354×472', 'Rasio portrait 3:4'],
            ['Cetak 4×6 cm pada 300 DPI', '472×709', 'Rasio portrait 4:6'],
            ['Wallpaper Full HD', '1920×1080', 'Lanskap 16:9'],
          ],
          note: 'Selalu periksa syarat platform penerima. Beberapa portal meminta dimensi maksimum, bukan ukuran persis.',
        },
        tip: 'Potong dulu sebelum memperkecil bila memungkinkan. Memotong gambar resolusi penuh menyimpan lebih banyak detail daripada memotong gambar yang sudah diperkecil.',
      },
    },
  },

  {
    id: 'photo-3x4',
    slug: { en: 'resize-photo-3x4', id: 'foto-3x4' },
    category: 'image',
    engine: 'image-resize',
    accept: ['image/jpeg', 'image/png', 'image/webp'],
    icon: 'id-photo',
    options: {
      width: 354,
      height: 472,
      fit: 'cover',
      targetKB: 200,
      outputFormat: 'image/jpeg',
    },
    related: ['compress-jpg-to-200kb', 'compress-jpg-to-100kb', 'resize-image', 'compress-image'],
    updatedAt: '2026-10-21',
    locale: {
      en: {
        title: 'Resize Photo to 3x4 cm (354x472 px) Online',
        h1: 'Make a 3×4 cm photo (354 × 472 px)',
        metaDescription:
          'Create a 3×4 cm photo at 300 DPI in your browser. Crop to the right ratio, set a 200 KB target, and download a ready-to-upload JPG.',
        answerQuestion: 'How do I resize a photo to 3×4 cm?',
        shortAnswer:
          'Upload a portrait, and Toolabs crops it to the 3:4 ratio at 354×472 pixels, the standard 3×4 cm size at 300 DPI. It then compresses the JPG to 200 KB by default. Choose a source with the face centred, adjust the target size if your portal uses different rules, then download.',
        intro:
          'A 3×4 cm photo is a standard requirement for applications, ID cards, and government forms, especially in Indonesia. The correct digital size depends on the resolution: at 300 DPI it is 354×472 pixels, at 150 DPI it is 177×236 pixels. This preset uses 300 DPI, crops to a clean 3:4 portrait ratio, and compresses to 200 KB because that is a frequent portal limit. The crop is centred, so choose a source photo with the face near the middle and some space above the head. If a portal specifies a different file size or dimensions, change the target before processing. Rules differ between agencies and selection years, so the official instructions always win.',
        steps: [
          'Upload a recent portrait with the face clearly visible and a plain background.',
          'The crop is set to 3:4 and 354×472 px. Adjust the crop position only by choosing a better source photo.',
          'Keep the 200 KB target, or change it to match your portal.',
          'Process the photo and check the preview, dimensions, and file size.',
          'Download the JPG and submit it where the 3×4 cm photo is required.',
        ],
        benefits: [
          'Correct 3:4 ratio and the exact 354×472 px size at 300 DPI.',
          'Built-in 200 KB compression, a common requirement for Indonesian portals.',
          'No upload: identity photos stay on your device.',
          'JPG output is accepted by virtually every application portal.',
        ],
        useCases: [
          'Preparing a CPNS or government application photo.',
          'Making a 3×4 cm photo for a job application or campus registration.',
          'Creating a standard portrait for an ID card or membership form.',
          'Producing a photo that can be printed at 3×4 cm without extra editing.',
        ],
        faq: [
          {
            q: 'What is the exact pixel size of a 3×4 cm photo?',
            a: 'At 300 DPI it is 354×472 pixels. At 150 DPI it is 177×236 pixels. For online portals, 354×472 px is the safer choice because it keeps enough detail for both screen and print.',
          },
          {
            q: 'Is 354×472 px the same as 3×4 cm?',
            a: 'It becomes 3×4 cm when printed at 300 DPI. The file itself stores pixels; DPI is metadata that tells a printer how densely to place them. Some portals ignore DPI and only check pixels and file size.',
          },
          {
            q: 'Why is the target set to 200 KB?',
            a: 'Many Indonesian government and recruitment portals use a limit around 200 KB. Requirements vary, so change the target if your official instructions say 100 KB, 500 KB, or another number.',
          },
          {
            q: 'What background should a 3×4 photo have?',
            a: 'Follow the specific portal. Red, blue, and white backgrounds are all used in Indonesia for different purposes. This tool does not replace the background; it only crops and compresses the photo you provide.',
          },
          {
            q: 'Can I use a phone photo?',
            a: 'Yes, if the face is well lit and the background is not distracting. Phone cameras produce excellent portraits. Avoid heavy beauty filters and wide-angle distortion, and make sure the head and shoulders fit the 3:4 crop.',
          },
          {
            q: 'Does the tool print the photo?',
            a: 'No. It produces a digital JPG that you can print at a photo shop or upload to a portal. For a print sheet with multiple copies, use your print shop’s layout service.',
          },
        ],
        comparison: {
          caption: 'Common Indonesian photo sizes at 300 DPI',
          headers: ['Print size', 'Pixels at 300 DPI', 'Typical use'],
          rows: [
            ['2×3 cm', '236×354', 'Small application forms, student cards'],
            ['3×4 cm', '354×472', 'CPNS, job applications, general forms'],
            ['4×6 cm', '472×709', 'Larger application photos, visas'],
            ['6×9 cm', '709×1063', 'Some passport and immigration requirements'],
          ],
          note: 'Always confirm the current size, background colour, and file limit in the official portal instructions.',
        },
        tip: 'Use a plain background and soft, even lighting. Compression preserves a clean portrait better than a busy background with fine patterns.',
      },
      id: {
        title: 'Foto 3x4 Online — 354x472 px, Siap Unggah',
        h1: 'Buat foto 3×4 cm (354 × 472 piksel)',
        metaDescription:
          'Buat foto 3×4 cm pada 300 DPI di browser. Potong sesuai rasio, atur target 200 KB, dan unduh JPG siap unggah. Tanpa upload.',
        answerQuestion: 'Bagaimana cara mengubah ukuran foto menjadi 3×4 cm?',
        shortAnswer:
          'Unggah foto portrait, lalu Toolabs memotongnya ke rasio 3:4 pada 354×472 piksel, ukuran standar 3×4 cm di 300 DPI. Hasil JPG kemudian dikompres ke 200 KB secara bawaan. Sesuaikan target bila portal memakai aturan lain, lalu unduh. Pastikan wajah berada di tengah sebelum pemotongan otomatis.',
        intro:
          'Foto 3×4 cm adalah syarat umum untuk lamaran, kartu identitas, dan formulir pemerintah, terutama di Indonesia. Ukuran digital yang benar bergantung pada resolusi: pada 300 DPI menjadi 354×472 piksel, pada 150 DPI menjadi 177×236 piksel. Preset ini memakai 300 DPI, memotong ke rasio portrait 3:4, dan mengompres ke 200 KB karena itu batas portal yang sering muncul. Pemotongan dilakukan di tengah, jadi pilih foto sumber dengan wajah mendekati bagian tengah dan ada ruang di atas kepala. Jika portal menentukan ukuran atau dimensi lain, ubah target sebelum memproses. Aturan berbeda antarinstansi dan tahun seleksi, jadi instruksi resmi selalu menjadi acuan.',
        steps: [
          'Unggah foto terbaru dengan wajah terlihat jelas dan latar polos.',
          'Potongan disetel ke 3:4 dan 354×472 px. Perbaiki posisi hanya dengan memilih foto sumber yang lebih baik.',
          'Biarkan target 200 KB, atau ubah sesuai portal Anda.',
          'Proses foto dan periksa pratinjau, dimensi, serta ukuran file.',
          'Unduh JPG dan kirimkan ke tempat yang membutuhkan foto 3×4 cm.',
        ],
        benefits: [
          'Rasio 3:4 yang benar dan ukuran tepat 354×472 px pada 300 DPI.',
          'Kompresi 200 KB bawaan, syarat umum portal Indonesia.',
          'Tanpa upload: foto identitas tetap di perangkat Anda.',
          'Keluaran JPG diterima hampir semua portal pendaftaran.',
        ],
        useCases: [
          'Menyiapkan foto pendaftaran CPNS atau instansi pemerintah.',
          'Membuat foto 3×4 cm untuk lamaran kerja atau pendaftaran kampus.',
          'Membuat portrait standar untuk kartu identitas atau formulir keanggotaan.',
          'Menghasilkan foto yang bisa dicetak 3×4 cm tanpa edit tambahan.',
        ],
        faq: [
          {
            q: 'Berapa ukuran piksel foto 3×4 cm?',
            a: 'Pada 300 DPI adalah 354×472 piksel. Pada 150 DPI adalah 177×236 piksel. Untuk portal online, 354×472 px lebih aman karena detailnya cukup untuk layar maupun cetak.',
          },
          {
            q: 'Apakah 354×472 px sama dengan 3×4 cm?',
            a: 'Ukuran itu menjadi 3×4 cm saat dicetak pada 300 DPI. File menyimpan piksel; DPI adalah metadata yang memberi tahu printer seberapa rapat piksel ditempatkan. Sebagian portal mengabaikan DPI dan hanya memeriksa piksel serta ukuran file.',
          },
          {
            q: 'Mengapa targetnya 200 KB?',
            a: 'Banyak portal pemerintah dan rekrutmen Indonesia memakai batas sekitar 200 KB. Syarat bisa berbeda, jadi ubah target bila instruksi resmi menyebut 100 KB, 500 KB, atau angka lain.',
          },
          {
            q: 'Latar belakang apa yang harus dipakai untuk foto 3×4?',
            a: 'Ikuti ketentuan portal. Latar merah, biru, dan putih dipakai di Indonesia untuk keperluan berbeda. Tool ini tidak mengganti latar; tool hanya memotong dan mengompres foto yang Anda berikan.',
          },
          {
            q: 'Bisakah memakai foto dari ponsel?',
            a: 'Bisa, asalkan wajah terang dan latar tidak mengganggu. Kamera ponsel menghasilkan portrait yang baik. Hindari filter kecantikan berlebihan dan distorsi lensa lebar, serta pastikan kepala dan bahu masuk ke potongan 3:4.',
          },
          {
            q: 'Apakah tool mencetak foto?',
            a: 'Tidak. Tool menghasilkan JPG digital yang bisa dicetak di studio foto atau diunggah ke portal. Untuk lembar cetak berisi beberapa salinan, gunakan layanan tata letak studio foto.',
          },
        ],
        comparison: {
          caption: 'Ukuran foto umum di Indonesia pada 300 DPI',
          headers: ['Ukuran cetak', 'Piksel pada 300 DPI', 'Kegunaan umum'],
          rows: [
            ['2×3 cm', '236×354', 'Formulir kecil, kartu pelajar'],
            ['3×4 cm', '354×472', 'CPNS, lamaran kerja, formulir umum'],
            ['4×6 cm', '472×709', 'Foto lamaran lebih besar, visa'],
            ['6×9 cm', '709×1063', 'Beberapa syarat paspor dan imigrasi'],
          ],
          note: 'Selalu pastikan ukuran, warna latar, dan batas file terbaru di instruksi portal resmi.',
        },
        tip: 'Gunakan latar polos dan pencahayaan lembut yang merata. Kompresi mempertahankan portrait bersih lebih baik daripada latar ramai dengan pola halus.',
      },
    },
  },
];
