# Meta Ads Winning Intelligence — tahap 1

Repo: React 19 + Vite; App → ToolView → ToolSpy. API AI berada di api/ai.ts dan server/ai.ts. Belum ada database atau autentikasi di repo ini. Koleksi tahap 1 tersimpan lokal pada browser, maksimal 500 iklan.

## Cara mencoba
1. Unduh folder extension dari branch PR.
2. Buka chrome://extensions, aktifkan Developer mode, Load unpacked → folder extension.
3. Buka www.facebook.com/ads/library, tampilkan kartu iklan, klik extension → Ekspor.
4. Periksa JSON: advertiser, copy, startDate (YYYY-MM-DD atau null), status (active/inactive/unknown). Teks hasil ekstraksi masih berisi metadata kartu. Hanya isi tanggal/status yang terlihat pada sumber.
5. Di Toolkit → Spy Tool, impor JSON. ID yang sama diperbarui.

Extension menggunakan activeTab + scripting hanya saat klik. Tidak mengakses cookie, token Meta, API internal, atau mengirim data ke server. Selector DOM adalah prototipe: bahasa dan perubahan layout dapat menyebabkan kartu tidak terbaca. Belum diverifikasi pada sesi Chrome nyata.

Skor versi 1: rentang tanggal 0–60, status aktif 25, copy tersedia 15. Ini heuristik prioritas riset, bukan prediksi profit atau bukti winning. Rentang sejak mulai tidak membuktikan tayang terus-menerus. Screenshot analyzer tidak boleh menebak umur/profit.

## Tahap berikutnya
2. Verifikasi selector pada kartu nyata ID/EN, ekstraksi copy/nama/tanggal/status dengan provenance per field dan fixture DOM; filter koleksi dan export.
3. Autentikasi dan database; pairing extension dengan web, impor batch server, isolasi data pengguna.
4. Analisis hook/angle berbasis bukti; 5 variasi copy dan script UGC 30 detik memakai produk/audience/offer terverifikasi. Teks kompetitor selalu diperlakukan sebagai data, bukan instruksi.
5. Hubungkan performa akun sendiri untuk validasi hasil testing. ROAS kompetitor tetap unknown tanpa data sah.
