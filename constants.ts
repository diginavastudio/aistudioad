

import { GuideSection } from './types';

export const GUIDES: GuideSection[] = [
  // ==========================================
  // MODE: DAILY (CEKLIST HARIAN)
  // ==========================================
  {
    id: 'tab-checklist',
    mode: 'DAILY',
    tab: 'RITME',
    title: '', // Judul dikosongkan agar tidak duplikat dengan Header Content
    content: `
# 📝 CEKLIS HARIAN ADVERTISER
**Contoh ritme kerja — sesuaikan dengan jadwal tim dan kebutuhan akun.**

**Tujuan:** Bukan bikin iklan menang, tapi **mencegah uang bocor** karena kelalaian.

---

### 🕘 09.00 – 10.00 | START DAY CHECK (WARM‑UP)
**Status:** Observasi awal (BELUM eksekusi keras).

*   💸 **Cek Saldo Iklan:** Pastikan cukup untuk 24 jam ke depan. (Jangan sampai iklan stop siang hari).
*   🔭 **Dashboard Monitoring:** Buka dashboard, jangan edit apa pun.
*   💸 **Cek pengeluaran tanpa hasil:** Bandingkan dengan batas risiko/biaya target yang Anda tetapkan. Periksa juga jeda atribusi, chat di CS, dan kendala teknis sebelum memutuskan pause.
*   🚫 **Cek Status:** Pastikan tidak ada iklan Disapproved / Error.
*   🔗 **Cek Teknis:** Test link WA dan auto-reply di HP sendiri.

> ⛔ **DILARANG:** Edit budget, ganti targeting, atau baper lihat angka pagi.

---

### 🕙 10.00 | CEK KESEHATAN KREATIF (RADAR AWAL)
**Fokus:** Bunuh visual gagal sejak lahir.

*   👁️ **Hook rate lebih rendah dari materi pembanding?** Periksa jumlah tayangan dan definisi metrik; gunakan hasilnya sebagai petunjuk revisi hook, bukan vonis tunggal.
*   📉 **CPM tinggi?** Bandingkan dengan kampanye serupa, audiens, placement, dan periode yang sama. CPM saja tidak membuktikan algoritma menolak materi.
*   📢 **Action:** Minta tim kreatif meninjau pembuka dan uji variasi hook jika perbandingan datanya cukup.

> ⛔ **Hindari:** Mengubah atau menghentikan iklan hanya dari satu sinyal visual tanpa memeriksa data dan konteksnya.

---

### 🕒 15.00 | CEK BIAYA & KEPUTUSAN AWAL
**Fokus:** Efisiensi biaya (CPR & CPP Sementara).

*   ⚠️ **CPR di atas target akun?** Periksa volume dan kualitas chat serta closing sebelum memilih lanjut, ubah, atau pause.
*   💬 **Cek Komentar:** Hapus/Hide komentar spam atau negatif di iklan winning.
*   📊 **Cross-Check CS:** Cocokkan percakapan dan closing dengan spend, margin, periode, dan jendela atribusi sebelum menentukan langkah.
*   💀 **CPP melewati batas impas/risiko yang Anda hitung?** Evaluasi data periode yang sama, kualitas closing, dan kendala operasional sebelum menghentikan materi.

> ⛔ **DILARANG:** Nunggu sore tanpa status jelas atau halu "bentar lagi closing".

---

### 🕕 18.00 | CEK CPP REAL (JAM KRUSIAL)
**Fokus:** Hakim Tertinggi (Data Real CS).

*   🧮 **Hitung CPP real:** Total spend ÷ closing terverifikasi pada periode dan jendela atribusi yang sepadan. Jika belum ada closing, jangan membagi dengan nol; evaluasi batas risiko dan data awal.
*   ✅ **CPP sesuai target bisnis** → lanjutkan pemantauan; status ini sendiri belum membuktikan laba bersih.
*   🛑 **CPP melewati batas risiko yang sudah ditetapkan** → evaluasi lalu pause atau ubah sesuai kondisi akun.
*   📣 **Action:** Pastikan CS follow-up semua chat masuk sekarang (wajib).

> ⛔ **DILARANG:** Menyelamatkan iklan mahal dengan doa atau harapan palsu.

---

### 🕘 21.00 – 23.00 | FINALISASI HARIAN
**Fokus:** Evaluasi & Persiapan Besok.

*   🏁 **Status Akhir:** Catat keputusan dan alasan: lanjut, pause, atau uji perubahan.
*   🏆 **Catat kandidat terbaik sementara:** Simpan Post ID dan konteks uji; evaluasi lagi sebelum menaikkan anggaran.
*   ⚠️ **Evaluasi Bahaya:** Iklan mana yang paling merugikan hari ini?
*   📝 **Request Konten:** Siapkan amunisi baru untuk besok pagi.

> ⛔ **DILARANG:** Scale malam hari karena emosi (Revenge Trading).

---

### 🧠 SELF‑AUDIT (Sebelum Tutup Laptop)
**Jawab Jujur:**
1.  Hari ini **untung** atau **rugi**?
2.  Iklan paling berbahaya sudah dimatikan?
3.  Keputusan hari ini jaga **uang** atau **ego**?
4.  Besok fokus **jaga** atau **scale**?

*Jika belum yakin, periksa kualitas data, catat asumsi, dan tentukan kapan evaluasi berikutnya.*

---

### 🔒 KEBIASAAN YANG DISARANKAN
*   Tentukan jadwal pemantauan yang sesuai dengan jam kerja, volume, dan SLA CS.
*   Sesuaikan pengingat dengan kemampuan tim; tidak ada interval yang wajib untuk semua akun.
*   Catat alasan keputusan dan gunakan batas risiko yang ditetapkan sebelum hasil terlihat.

### 🧾 RINGKASAN TEMPEL
*   **Awal hari** → Cek status, tracking, dan operasional
*   **Saat evaluasi** → Bandingkan metrik dengan batas risiko dan target
*   **Akhir periode** → Catat hasil dan keputusan berikutnya
*   **Data belum cukup** → Tetapkan batas uji dan jadwal evaluasi
`
  },

  // ==========================================
  // MODE: TACTICAL (KEPUTUSAN IKLAN)
  // ==========================================
  {
    id: 'tab-mental',
    mode: 'TACTICAL',
    tab: 'MENTAL',
    title: 'Mindset & Mental Baja Advertiser',
    critical: true,
    content: `
# Identitas Mutlak
**Tugasmu hanya satu: MENJAGA UANG.**

Bukan menjaga iklan.
Bukan menjaga ego.
Bukan membuktikan ide.

Iklan adalah alat uji. Jika ada masalah teknis atau risiko melewati batas yang ditetapkan, perbaiki atau pause. Jika performa belum jelas, kumpulkan data sesuai batas uji.

> "Iklan mati itu biasa. Uang bocor itu dosa."

---

# 10 Hukum Keras (Hafalkan)

1. **Ragu = Cek Bukti**
Jika data belum cukup, cek kualitas pengukuran dan tunggu sesuai batas waktu uji yang sudah ditentukan.

2. **Hindari keputusan karena sunk cost**
Tinjau kriteria yang ditetapkan sebelum tayang. Pause jika melewati batas risiko; jangan memutuskan hanya karena ingin membenarkan biaya yang sudah keluar.

3. **Tetapkan batas risiko sebelum tayang**
Jangan memperpanjang uji tanpa batas; jangan pula menghentikan materi hanya dari satu angka atau satu periode pendek.

4. **Angka yang berubah = sinyal untuk diperiksa**
Lihat metrik yang sesuai dengan tujuan, kecukupan data, atribusi, dan ekonomi produk sebelum bertindak.

5. **Nilai hasil pada jendela yang tepat**
Waktu konversi dan pelaporan dapat berbeda; cocokkan periode iklan dengan laporan penjualan/CS.

6. **CS Bukan Penyelamat Sampah**
CS closing, bukan tukang cuci lead jelek.

7. **Tidak Ada Iklan Titipan**
"Bentar lagi" tidak ada di aturan main.

8. **Jaga Uang > Jaga Ego**
Iklan buatan sendiri jelek → bunuh dulu.

9. **Disiplin atau Mati**
Telat cek di jam kritis = bunuh modal pelan‑pelan.

10. **Keputusan Cepat = Pelindung Modal**
Satu keputusan tegas > sepuluh pertimbangan telat.

---

# ⛔ Kalimat Terlarang (Jebakan Pikiran)
Jika muncul pikiran ini → **BERHENTI**.

❌ "Sayang kalau dimatiin, udah abis banyak..." (**Jebakan Takut Rugi**)
❌ "Sebentar lagi kayaknya naik..." (**Harapan Palsu**)
❌ "Duh, matiin gak ya..." (**Kebingungan**)

**Dashboard tidak punya perasaan. Angka tidak bisa dibohongi.**

---

# 🏆 Standar Advertiser Dewasa
✅ Tidak bangga saat iklan hidup (Profit).
✅ Tidak sakit hati saat iklan **MATI**.
✅ Tidak cari alasan pembenaran.
✅ Tenang saat memotong kerugian.

> "Kalau masih baper (bawa perasaan), berarti belum siap pegang uang."

---

# 🧘 Ritual Wajib (Sebelum Klik)
Gunakan jeda pemantauan yang sesuai dengan risiko, volume data, jam kerja, dan jeda konversi:
1. Lepas mouse.
2. Diam 10 detik.
3. Ucapkan dalam hati: **"Tugas saya bukan membuat iklan hidup, tapi memastikan uang tidak bocor."**
4. Ambil keputusan.

---

# ⚡ PEMICU MENTAL
(Tanya Diri Sendiri — WAJIB sebelum klik)

**10 PERTANYAAN KUNCI**

1️⃣ Jika iklan tetap berjalan sampai evaluasi berikutnya, apakah pengeluarannya masih dalam batas risiko?
2️⃣ Kalau ini uang pribadi, masih berani **LANJUT**?
3️⃣ Angkanya masuk akal atau cuma harapan?
4️⃣ Kalau iklan ini baru dibuat sekarang, masih mau dihidupkan?
5️⃣ **Data cukup** untuk memutuskan atau perlu observasi sesuai batas uji?
6️⃣ Apa batas biaya, durasi, dan jumlah data untuk keputusan ini?
7️⃣ Iklan ini bantu nutup setoran hari ini atau nambah beban?
8️⃣ Kalau besok angkanya sama persis, masih **UNTUNG**?
9️⃣ Keputusan ini **jaga uang** atau jaga gengsi?
🔟 Bukti apa yang akan membuatmu lanjut, mengubah, atau menghentikannya?

# 🔒 ALUR KEPUTUSAN
Jika data belum cukup, periksa tracking dan kualitas data. Catat batas pengeluaran, durasi uji, serta kriteria lanjut/pause sebelum evaluasi berikutnya.
`
  },
  {
    id: 'tab-onoff',
    mode: 'TACTICAL',
    tab: 'ON_OFF',
    title: 'Lampu Lalu Lintas Keputusan (On/Off)',
    content: `
# Alur Keputusan (Baca Dari Atas ke Bawah)

Jangan loncat langkah. Ikuti alur ini setiap cek dashboard.

**1️⃣ Apakah data sudah cukup untuk evaluasi?**
Periksa jumlah hasil, durasi, objective, jeda atribusi, dan batas risiko akun. Jumlah spend yang sama dapat berarti risiko berbeda untuk tiap bisnis.

**2️⃣ Apakah Ada Hasil (Pesan/Chat Masuk)?**
*   ❌ Belum ada hasil: bandingkan pengeluaran dengan batas risiko dan waktu konversi yang wajar; pause jika batas yang sudah ditetapkan tercapai.
*   ✅ Ada: Lanjut ke poin 3.

**3️⃣ Apakah biaya per chat sesuai target bisnis?**
*   ❌ Tidak: Masuk **PANTAUAN KETAT** (Cek tiap jam).
*   ⚠️ **Pengecualian:** jika biaya melampaui batas risiko bisnis, lakukan evaluasi dan pause sesuai prosedur akun.
*   ✅ Ya: Lanjut ke poin 4.

**4️⃣ Apakah CPP aktual masih di bawah batas impas dan sesuai target profit?**
Bandingkan penjualan/closing dari periode yang sama dengan spend dan jendela atribusi. Pertimbangkan keterlambatan pencatatan sebelum mengubah status.

---

# Rambu-Rambu Iklan

**🟢 HIJAU (Aman & Untung)**
*   **Data:** biaya per hasil dan CPP berada dalam target bisnis dengan volume data yang memadai.
*   **Sikap:** hindari perubahan tanpa alasan; tetap pantau delivery, margin, dan kapasitas operasional.
*   **Mental:** "Iklan hijau itu aset, jangan dirusak dengan tangan gatal."

**🟡 KUNING (Waspada)**
*   **Data:** Biaya agak mahal atau hasil naik turun.
*   **Sikap:** Pantau tiap jam. **DILARANG TAMBAH MODAL.**
*   **Batas Waktu:** tetapkan durasi uji sebelumnya sesuai volume dan jeda konversi. Jika target tidak tercapai, evaluasi faktor yang mungkin memengaruhi hasil sebelum memutuskan.
*   **Mental:** "Kuning itu bukan aman, tapi sedang diuji."

**🔴 MERAH (Bahaya)**
*   **Data:** hasil belum tercatat setelah batas waktu uji, atau CPP melampaui batas risiko yang ditetapkan.
*   **Sikap:** tinjau kampanye dan pause materi yang melampaui batas risiko yang sudah ditentukan.
*   **Syarat berhenti:** kriteria risiko yang disepakati sebelum uji tercapai, setelah memeriksa atribusi, kualitas lead, dan kendala operasional.
*   **Mental:** "Merah itu perintah berhenti, bukan bahan analisa."

---

# 🔒 PRINSIP KUNCI
**Dashboard adalah sumber data yang perlu dibaca bersama konteks bisnis dan kualitas tracking.**

1. **HIJAU** → Jangan ganggu (haram edit).
2. **KUNING** → Catat ketidakpastian dan evaluasi kembali pada jadwal yang ditetapkan.
3. **MERAH** → Hentikan atau pause bila batas risiko tercapai; dokumentasikan alasannya.
`
  },
  {
    id: 'tab-diagnosa',
    mode: 'TACTICAL',
    tab: 'DIAGNOSA',
    title: 'Bedah Data & Solusi Masalah',
    content: `
# Filosofi Dokter Iklan
Data dashboard adalah rontgen. Tugasmu menemukan penyakit dan mengobati.
**Urutan Prioritas: Uang Bocor > Kualitas Sampah > Performa Turun.**

---

# 🔍 Diagnosa Pola Masalah

Lihat kombinasi angka ini untuk tahu cerita sebenarnya. Jangan baca angka satuan.

### 🧨 KASUS 1: Uang Bocor (Masalah Teknis & Kualitas)

**1. Pola "Hantu WhatsApp" (Ghosting)**
*   📊 **Data:** klik tautan relatif tinggi tetapi chat tercatat sedikit; ukur selisih pada periode yang sama tanpa memakai ambang universal.
*   💡 **Masalah:** Orang klik tombol, tapi malas kirim pesan. Loading lama atau sapaan ribet.
*   💊 **Solusi:** Pakai **Pesan Otomatis** (Pre-filled). Pastikan sapaan di WA = janji di iklan.

**2. Banyak chat, closing rendah**
*   📊 **Data:** Rasio closing lebih rendah dari sasaran bisnis pada periode dan volume data yang sepadan.
*   💡 **Periksa:** Kecocokan prospek, kejelasan penawaran, harga, tindak lanjut, dan kendala operasional sebelum menyimpulkan penyebab.
*   💊 **Solusi:**
    *   Cek Umur/Lokasi (jangan-jangan Bocil).
    *   Cek Iklan: Apakah janji "Gratis" tapi aslinya mahal?
    *   Cek CS: Balas lama? Kaku?

---

### 🗑️ KASUS 2: Iklan Gagal (Masalah Konten)

**3. Sinyal pembuka perlu ditinjau**
*   📊 **Data:** Metrik klik atau tontonan awal lebih lemah daripada materi pembanding yang sepadan.
*   💡 **Catatan:** Metrik agregat tidak membuktikan satu penyebab seperti hook yang buruk.
*   💊 **Uji:** Periksa definisi metrik dan buat variasi pembuka dengan hipotesis yang jelas.

**4. Pola "Video Nanggung" (Bosan di Tengah)**
*   📊 **Data:** banyak pemutaran awal tetapi retensi berikutnya turun dibanding materi sejenis.
*   💡 **Masalah:** Awalnya seru, isinya bertele-tele.
*   💊 **Solusi:** Edit video. Potong basa-basi. Langsung ke inti.

---

### 📉 KASUS 3: Performa Turun (Fatigue)

**5. Sinyal potensi kejenuhan**
*   📊 **Data:** Frekuensi meningkat bersamaan dengan hasil yang melemah dibanding periode atau materi sepadan.
*   💡 **Catatan:** Frekuensi atau CPM saja tidak membuktikan audiens bosan.
*   💊 **Uji:** Periksa jangkauan, kualitas hasil, durasi, audiens, dan perubahan lain; uji konsep baru jika datanya mendukung.

**6. Kemiripan kreatif (hipotesis untuk diuji)**
*   📊 **Data:** CPM iklan baru lebih tinggi dari pembanding.
*   💡 **Catatan:** CPM saja tidak membuktikan penalti kemiripan atau penyebab tertentu.
*   💊 **Uji:** Bandingkan konsep, format, audiens, placement, jadwal, dan penawaran secara terkontrol.

---

### ⚙️ KASUS 4: Masalah Teknis

**7. Pola "Iklan Kurang Gizi" (Learning)**
*   📊 **Data:** CPR berubah-ubah atau jumlah hasil terlalu sedikit untuk dibandingkan.
*   💡 **Catatan:** Tentukan kecukupan data dari objective, volume, anggaran, dan jeda konversi; tidak ada ambang hasil mingguan yang cocok untuk semua akun.
*   💊 **Uji:** Tinjau apakah struktur saat ini membagi anggaran terlalu tipis; sederhanakan hanya jika sesuai tujuan dan data.

**8. Pola "Salah Kolam" (Targeting)**
*   📊 **Data:** CPM lebih tinggi daripada pembanding yang sepadan.
*   💡 **Catatan:** Periksa audiens, placement, objective, kompetisi, jadwal, dan kualitas pengukuran; CPM saja tidak menunjukkan penyebabnya.
*   💊 **Uji:** Bandingkan opsi audiens yang relevan dengan strategi akun, termasuk audiens lebih luas bila layak.

---

# 🧠 Resep Dokter
1.  **Satu Masalah = Satu Solusi.** Jangan ganti konten + targeting + modal sekaligus.
2.  **Jangan Bedah Mayat.** Iklan yang sudah mati (**MERAH**) biarkan mati.
3.  **Catat temuan hari ini, uji revisi pada periode berikutnya.**
`
  },
  {
    id: 'tab-scale',
    mode: 'TACTICAL',
    tab: 'SCALE',
    title: 'SOP Scaling (Tambah Uang)',
    content: `
# 1. Syarat Mutlak Scaling
Jangan pernah scale kalau salah satu ini **TIDAK** terpenuhi:

✅ Biaya per hasil dan CPP memenuhi target yang dihitung dari margin serta tujuan.
✅ Ada volume dan periode pembanding yang memadai untuk menilai kestabilan.
✅ Hasil penjualan dan biaya diukur pada jendela atribusi yang sepadan.
✅ Tim CS, stok, fulfillment, dan arus kas siap menghadapi kenaikan volume.

---

# 2. Cara Scale yang Benar

**A. Scale Vertikal (Naik Budget)**
*   **Caranya:** Edit budget di Ad Set / Campaign.
*   **Aturan:** tentukan kenaikan bertahap sesuai volatilitas, kapasitas, dan batas risiko akun. Tidak ada persentase atau jeda yang cocok untuk semua kampanye.
*   Perubahan budget dapat memengaruhi delivery; pantau hasil dan status learning tanpa menganggap perubahan tertentu selalu meresetnya.

**B. Scale Horizontal (Duplikasi / Ternak)**
*   **Caranya:** Ambil **Post ID** iklan winning → Masukkan ke Kampanye Baru (CBO Broad / ASC).
*   **Tujuan:** Cari kolam audiens baru tanpa mengganggu kolam lama.
*   **Kapan:** Saat iklan utama sudah mentok (jenuh).

---

# 3. SOP Monitoring Pasca-Scale (Wajib)
Banyak advertiser hancur karena lupa mengecek setelah menaikkan budget.

**Jadwal pemantauan setelah perubahan anggaran:**
*   ❓ Apakah biaya per hasil dan CPP masih sesuai target?
*   ❓ Apakah hasil penjualan/CS tercatat pada periode yang sama?
*   ❓ Apakah operasional siap menerima volume tambahan?
*   Atur interval berdasarkan volume, jeda atribusi, tingkat risiko, dan kemampuan tim; tiga jam bukan aturan untuk semua akun.

**Tindakan Darurat:**
*   🔴 Jika batas risiko yang disepakati sebelum uji tercapai: evaluasi dan pause sesuai prosedur akun.
*   🟡 Jika hasil belum membaik: periksa periode, volume data, tracking, dan faktor lain sebelum mengubah anggaran.
*   ❌ Jika metrik tetap di luar target setelah data cukup: evaluasi konteks lalu dokumentasikan keputusan.

---

# 4. Efek Samping Scale (Wajib Tahu)
Ini yang sering membunuh advertiser yang serakah.

**1. Kesiapan materi**
*   Anggaran lebih besar dapat mengubah jangkauan dan pola paparan, tetapi tidak otomatis membuat audiens lebih cepat bosan.
*   **Persiapan:** Sediakan variasi materi sesuai volume, kapasitas produksi, dan rencana pemantauan; jumlahnya bergantung pada bisnis.

**2. Cek Stok & Operasional**
*   Pastikan stok, pemenuhan, dan layanan mampu menangani volume tambahan.
*   Jika kapasitas operasional tidak siap, pengeluaran tambahan berisiko tidak menghasilkan pengalaman pelanggan yang baik.
`
  },
  {
    id: 'tab-sop',
    mode: 'TACTICAL',
    tab: 'SOP',
    title: 'SOP Eksekusi Harian',
    description: 'Protokol Teknis Lapangan',
    content: `
# SOP EKSEKUSI HARIAN

**Filosofi:**
Advertiser bukan penonton. Kita adalah eksekutor.
Setiap klik mouse harus ada alasannya.

---

# 🌅 JADWAL TEMPUR

### ⏰ 10:00 WIB — SESI "PEMBUNUH"
**Tugas:** Membunuh iklan cacat lahir.

1.  Buka Dashboard. Pilih kolom **Performance & Clicks**.
2.  Filter: Iklan Aktif hari ini.
3.  Urutkan berdasarkan **Amount Spent**.
4.  Cek iklan baru:
    *   Bandingkan metrik kreatif dengan baseline sepadan. Jika lemah, uji revisi hook atau konsep dan evaluasi setelah volume data cukup.
5.  Jangan ragu. Iklan jelek pagi ini tidak akan jadi bagus sore nanti.

### ⏰ 15:00 WIB — SESI "PENJAGA"
**Tugas:** Menjaga agar tidak boncos.

1.  Cek **CPR** (Biaya per Chat).
    *   Mahal? → Cek CS. Kalau CS sepi → **PAUSE**.
2.  Cek **Komentar**.
    *   Ada yang hujat? → Hide/Delete/Ban.
    *   Ada yang tanya? → Balas cepat.
3.  Cek **Saldo**.
    *   Jangan sampai iklan mati konyol karena saldo habis.

### ⏰ 23:00 WIB — SESI "STRATEGIS"
**Tugas:** Evaluasi & Setup Besok.

1.  Finalisasi:
    *   Iklan yang melewati batas risiko → tinjau dan dokumentasikan keputusan untuk materi terkait.
    *   Iklan **HIJAU** → Biarkan lanjut besok.
2.  Persiapan Scale:
    *   Pilih kandidat scale.
    *   Jadwalkan perubahan pada waktu yang sesuai dengan tim pemantau dan ritme operasional.
3.  Lapor ke Bos/Tim:
    *   "Hari ini Profit/Rugi sekian."
    *   "Besok rencana kita A/B/C."

---

# 📅 RUTINITAS MINGGUAN (Senin/Jumat)

**1. Evaluasi kandidat scale**
*   Tinjau materi yang memenuhi target bisnis dengan periode, atribusi, dan volume data yang memadai.
*   Pilih struktur campaign dan penggunaan **Post ID** bila sesuai dengan tujuan serta alur iklan.

**2. Bersih-Bersih (Hygiene)**
*   Hapus iklan Rejected.
*   Hapus rule-rule lama yang tidak kepakai.

**3. Restock Amunisi**
*   Rencanakan materi berikutnya sesuai kebutuhan pengujian dan kapasitas produksi.

---

# 🔒 PRINSIP FINAL
1.  **Scale** itu pelan & terukur.
2.  **Panik** = Boncos.
3.  Disiplin proses membantu menjaga evaluasi tetap konsisten, tetapi tidak menjamin profit.
`
  },
  {
    id: 'tab-darurat',
    mode: 'TACTICAL',
    tab: 'DARURAT',
    title: 'Protokol Bahaya (Code Red)',
    critical: true,
    content: `
# Kapan Tombol Ini Ditekan?
1.  Pengeluaran mencapai batas risiko harian yang ditetapkan bisnis sebelum kampanye berjalan.
2.  Satu atau beberapa materi melewati kriteria merah yang sudah ditentukan; nilai jumlah dan dampaknya pada akun.
3.  CPP melampaui batas impas atau target bisnis pada periode dan data yang layak dibandingkan.

---

# 1. Cek Teknis Sebelum Vonis
Seringkali iklan bagus, tapi sistem error. Cek ini dulu:

*   ❓ **Web/Link WA:** Buka di HP sendiri. Jalan gak? Loading lama gak?
*   ❓ **Stok:** Barang habis gak?
*   ❓ **CS:** CS ketiduran / WA error gak?

> ⚠️ Jika tautan, checkout, atau CS mengalami gangguan, pause kampanye yang mengarahkan ke alur tersebut sampai kendala diperbaiki. Periksa tiap tujuan iklan sebelum menghentikan kampanye lain.

---

# 2. Tindakan Penyelamatan (Stop Bleeding)

**Langkah 1: BEKUKAN (Freeze)**
*   Stop Tambah Modal.
*   Stop Testing Iklan Baru.
*   Stop Edit-edit.

**Langkah 2: KILL SWITCH**
*   **Iklan berisiko:** pause atau hentikan materi yang memenuhi kriteria risiko yang sudah disepakati.
*   **Iklan KUNING:** Periksa kualitas data, jeda konversi, dan laporan CS; pause bila batas risiko tercapai.
*   **Iklan HIJAU:** Nilai berdasarkan hasil dan margin masing-masing; jangan menganggapnya otomatis menutup kerugian materi lain.

**Langkah 3: CUT LOSS**
*   Jika kerugian melewati batas harian, hentikan penambahan risiko dan pause kampanye yang menyebabkan kerugian setelah memastikan data pengeluaran benar.
*   Lebih baik hari ini nol, daripada minus dalam.
*   Tidur. Tenangkan pikiran. Jangan "balas dendam" hari ini.

---

# 3. Plan B: Mobilisasi CS
Saat iklan boncos, uang harus ditarik manual.

*   Tinjau antrean pesan dan tindak lanjuti prospek sesuai janji, persetujuan, serta kebijakan komunikasi yang berlaku.
*   Hubungi pelanggan lama hanya melalui kanal dan tujuan yang diizinkan; hormati pilihan berhenti menerima pesan.

---

# 4. Restart (Besok Pagi)
Jangan nyalakan semua iklan lama yang sudah boncos.

**Rencana mulai kembali:**
*   Tetapkan anggaran awal berdasarkan batas risiko, kapasitas, dan data yang sudah dipastikan.
*   Pilih materi yang memenuhi kriteria bisnis dan uji dengan struktur yang dapat dievaluasi.
*   Uji audiens sesuai objective dan strategi akun; audiens luas bisa menjadi salah satu opsi.

**Kunci Mental:**
Evaluasi penyebab sebelum memulai lagi. Kerugian bukan otomatis biaya belajar; pembelajaran perlu hipotesis, batas risiko, dan catatan hasil.
`
  },

  // ==========================================
  // MODE: STRATEGIC (PEDOMAN IKLAN / META ADS 2026)
  // ==========================================
  {
    id: 'tab-era-ai',
    mode: 'STRATEGIC',
    tab: 'ERA_AI',
    title: 'Meta Ads 2026: The New Game',
    description: 'Ringkasan sistem rekomendasi dan pengukuran Meta dengan batasan interpretasinya.',
    critical: true,
    content: `
# Dari Operator ke Arsitek
### Era "Setir Lepas"
Dulu advertiser itu sopir (nyetir manual, ganti gigi, belok interest).
Sekarang advertiser itu **Arsitek**.

**Tugas kita:**
Kasih peta (Tujuan) + Bensin (Konten & Budget).
Sisanya **AI** yang nyetir secara Otonom.

> "Jangan sok ngajarin AI. Kasih makan AI."

---

# Kenalan Sama "Otak Baru" Meta 2026

### 1. Andromeda — sistem retrieval iklan
Andromeda membantu memilih kandidat iklan yang relevan dalam sistem rekomendasi Meta. Ia bekerja sebagai bagian dari proses bertahap yang mempertimbangkan beragam sinyal dan konteks. Ini bukan berarti konten saja menentukan audiens atau pengaturan targeting tidak berpengaruh.

### 2. GEM — model rekomendasi iklan
GEM adalah model generatif yang membantu sistem rekomendasi iklan mempelajari sinyal dan memprediksi relevansi. Hasilnya bersifat probabilistik; model ini tidak dapat memastikan iklan tertentu akan viral, closing, atau diprioritaskan.

### 3. Sinyal pengukuran dan Conversions API
Conversions API dapat membantu mengirim sinyal kejadian dari server ke Meta jika implementasi dan persetujuannya tepat. Manfaatnya bergantung pada setup, kualitas data, deduplikasi, privasi, dan tujuan kampanye. Jangan mengasumsikan satu arsitektur menggabungkan seluruh perjalanan IG, Facebook, dan WhatsApp atau menjamin biaya lebih murah.

---

# Kreatif dan Penentuan Audiens

**❌ Cara Lama (Operator):**
*   Sibuk cari interest "Kucing", "Hamil", "Karyawan".
*   Audiens sempit. **CPM** Mahal.
*   Iterasi minor (ganti warna tombol).

**✅ Cara Baru (Arsitek):**
*   Pertimbangkan audiens luas bila sesuai objective, produk, data, dan strategi akun.
*   Gunakan kreatif untuk menjelaskan relevansi; delivery tetap dipengaruhi banyak sinyal dan pengaturan kampanye.
*   Variasi **Radikal** (Ganti konsep total: UGC, Meme, Founder Story).

---

# Checklist Anti-Boncos 2026

**✅ Periksa:**
*   Pilih audiens berdasarkan objective, produk, data, dan strategi akun; audiens luas dapat diuji bila sesuai.
*   Evaluasi **Pixel/Conversions API** bila sesuai dengan tujuan, platform, persetujuan pengguna, dan kemampuan implementasi.
*   Uji beberapa konsep yang cukup berbeda untuk dipelajari, sesuai anggaran dan kapasitas produksi; jumlah ideal bergantung pada volume data.
*   Siapkan rasio/aset yang sesuai untuk placement yang dipilih; periksa crop, safe zone, dan keterbacaan.

**⚠️ Perhatikan:**
*   Audiens terlalu sempit dapat membatasi jangkauan, tetapi dampaknya harus dinilai dari data akun.
*   Hindari perubahan tanpa alasan; dampak edit bergantung pada jenis perubahan dan status kampanye.
*   Menggunakan aset dengan data pribadi (KTP/SS Chat) -> Kena AI Risk Purge.
`
  },
  {
    id: 'tab-offer',
    mode: 'STRATEGIC',
    tab: 'OFFER',
    title: 'The Offer Architect',
    description: 'Iklan Bagus + Offer Sampah = BONCOS. Baca Ini Sebelum Bikin Konten.',
    critical: true,
    content: `
# Filosofi Dasar
**Iklan** tugasnya hanya mendatangkan Trafik (Orang).
**Offer (Penawaran)** tugasnya membuat mereka Beli.

> "Iklan terbaik di dunia pun tidak bisa menyelamatkan produk yang penawarannya sampah."

Jangan jual produk. Jual **DEAL (Kesepakatan)**.

---

# 4 Pilar Penawaran Gila (Irresistible Offer)

### 1. Bundel (Uji Matematika Profit)
Jual 1 pcs itu capek dan margin tipis. Kalau kena CPR mahal, langsung rugi.
**Solusi:** Buat paket agar AOV (Average Order Value) naik.

*   ✅ **Contoh ilustratif:** bandingkan paket satuan dan bundel memakai harga, HPP, biaya kirim, biaya platform, retur, dan biaya iklan milik bisnis Anda. Hasil hitung tiap bisnis akan berbeda; contoh ini bukan rekomendasi harga.

> **Tips:** Uji paket yang memberi nilai jelas tanpa menyesatkan. Pastikan harga, isi paket, biaya, dan margin sudah dihitung.

### 2. Risk Reversal (Pembalik Risiko)
Orang Indonesia takut tertipu. Hilangkan ketakutan itu.

**Opsi Aman:**
*   ✅ Tawarkan COD hanya jika layanan, area, biaya, dan proses operasional memang mendukung.
*   ✅ Tawarkan penggantian barang rusak hanya bila kebijakan garansi, pengecualian, dan prosedur klaimnya benar-benar tersedia.
*   ✅ Sebutkan garansi uang kembali hanya jika bisnis benar-benar memberikannya; tulis syarat, masa berlaku, dan pengecualiannya.

**⛔ PERINGATAN KERAS (COD):**
Jangan gunakan **"Buka Dulu Baru Bayar"** jika Anda menggunakan ekspedisi umum (JNE, J&T Regular, Sicepat, dll).
*   **Risiko:** Kurir umum biasanya menolak ditungguin. Jika paket dibuka dan pembeli tidak jadi beli (karena tidak sesuai selera), barang retur dalam kondisi **RUSAK/TERBUKA**. Anda rugi barang + rugi ongkir.
*   **Kecuali:** Anda menggunakan Shopee Express atau platform yang memfasilitasi "COD Cek Dulu".

### 3. Batas waktu dan ketersediaan
Sampaikan urgensi atau kelangkaan hanya jika benar, dapat dibuktikan, dan syaratnya jelas. Jika penawaran tidak memiliki batas waktu atau stok terbatas, jangan menambahkan kesan tersebut.

*   Cantumkan periode promo yang benar dan zona waktunya.
*   Cantumkan jumlah stok/slot hanya jika data inventaris mendukungnya.
*   Jelaskan harga, isi paket, dan syarat yang berlaku.

### 4. Bonuses (Gimmick)
Barang yang nilainya tinggi di mata customer, tapi modalnya murah bagi Anda.

*   Jual Panci? -> Bonus **Spatula Kayu** & **E-Book Resep**.
*   Jual Fashion? -> Bonus **Kunciran** atau **Totebag**.
*   Jual Edukasi? -> Bonus **Template** atau **Grup Support**.

---

# Checklist Sebelum Bikin Konten
Cek "Jantung" penawaranmu. Kalau jantungnya lemah, jangan lari (iklan).

1.  Apakah informasi penawaran dan batas waktunya akurat serta dapat dibuktikan?
2.  Apakah beli **PAKET** jauh lebih untung daripada satuan?
3.  Apakah syarat layanan, garansi, dan metode pembayaran dijelaskan dengan jujur?
4.  Apakah bonusnya menarik?

**Prinsip:**
Penawaran yang jelas, akurat, menguntungkan bisnis, dan sesuai kebutuhan pelanggan layak diuji. Tidak ada formula yang menjamin banjir order.
`
  },
  {
    id: 'tab-struktur',
    mode: 'STRATEGIC',
    tab: 'STRUKTUR',
    title: 'Fondasi & Struktur Akun',
    description: 'Jangan mimpi scale kalau fondasinya kerupuk.',
    content: `
# 1. Infrastruktur Data (Pipa)
Jangan biarkan AI "Rabun".

✅ **Evaluasi pengukuran konversi**
*   Browser dan server dapat mengirim sinyal konversi dengan batasan yang berbeda.
*   Pertimbangkan Pixel dan/atau Conversions API sesuai objective, setup teknis, persetujuan, dan kebijakan privasi.
*   Pixel atau Conversions API dapat membantu pengukuran, tetapi tidak menjamin angka sama dengan catatan penjualan. Bandingkan sumber data, jendela atribusi, consent, dan deduplikasi; jangan menerapkan persentase koreksi universal.

✅ **Account Hygiene (Kebersihan)**
*   Periksa status akun dan kebijakan melalui Account Quality.
*   Perbaiki atau banding jika iklan ditolak dan Anda yakin keputusan keliru.
*   Kepatuhan penting untuk menjaga akses akun, tetapi tidak ada jaminan bahwa akun yang rapi selalu memperoleh CPM lebih murah.

---

# 2. Struktur Kampanye
Pilih struktur yang dapat dikelola dan sesuai dengan objective, anggaran, kebutuhan pengujian, serta volume data.

### A. Kampanye Testing (LAB)
*   **Tujuan:** Menguji hipotesis kreatif yang jelas.
*   **Budget:** tentukan porsi testing sesuai anggaran, kebutuhan belajar, dan batas risiko bisnis.
*   **Setting:** Pilih ABO, CBO, atau struktur lain sesuai rancangan eksperimen; tidak ada satu setelan wajib untuk semua akun.
*   **Isi:** uji variasi materi sesuai anggaran, kapasitas produksi, dan volume data yang diperlukan.
*   **Mindset:** Catat asumsi dan hasil setiap pengujian.

### B. Kampanye Scaling (WINNER)
*   **Tujuan:** Mengalokasikan anggaran ke materi yang menunjukkan hasil sesuai target bisnis.
*   **Budget:** alokasikan ke materi yang memenuhi target bisnis dan tetap pantau kapasitas operasional.
*   **Setting:** CBO, Advantage+, atau pilihan lain berdasarkan kebutuhan kontrol dan cara kerja akun.
*   **Isi:** materi yang memenuhi kriteria bisnis dan memiliki data yang layak untuk dievaluasi.
*   **Mindset:** Hindari perubahan tanpa alasan; pantau hasil dan kapasitas operasional.

### C. Challenger ASC (Opsi Scale Lanjut)
*   Jika hasil melemah, periksa faktor kreatif, audiens, penawaran, tracking, dan operasional sebelum memutuskan struktur uji berikutnya.
*   Biarkan dia bertarung di kolam yang lebih luas.

---

# 3. Perpindahan Testing ke Scaling
Ini kunci rahasianya.

Saat iklan bagus di Testing dan mau dipindah ke Scaling:
❌ **JANGAN** upload ulang videonya.
✅ **GUNAKAN POST ID**.

**Kenapa?**
*   Post ID dapat mempertahankan interaksi pada postingan yang sama jika alur iklan mendukungnya.
*   Interaksi dapat memberi konteks sosial, tetapi tidak menjamin CPM lebih murah atau konversi lebih tinggi.

---

# 4. Larangan Keras
❌ **Scale + Edit** di hari yang sama. (AI Bingung).
❌ Testing di kampanye Scaling (Ngerusak performa).
❌ Membuat banyak Ad Set dengan audiens yang sama (Saling bunuh / Overlap).
`
  },
  {
    id: 'tab-kreatif',
    mode: 'STRATEGIC',
    tab: 'KREATIF',
    title: 'Strategi Konten & Hook',
    description: 'Materi membantu menjelaskan relevansi produk; bukan satu-satunya faktor targeting.',
    content: `
# 1. Filosofi Konten
Materi kreatif dapat membantu menyampaikan relevansi kepada calon pelanggan, tetapi bukan satu-satunya faktor delivery atau penargetan. Gunakan kreatif yang jelas dan sesuai produk, lalu evaluasi bersama pengaturan audiens dan tujuan kampanye.

❌ **Mental Operator:** Ganti warna tombol, ganti headline dikit (Iterasi Minor).
✅ **Mental Arsitek:** Ganti **IDE** dan **SUDUT PANDANG** (Variasi Radikal).

---

# 2. Menu Wajib (Archetypes)
Uji beberapa konsep yang benar-benar berbeda jika sumber daya dan volume data memungkinkan. Jumlah yang tepat bergantung pada anggaran, objektif, dan kemampuan produksi.

🎥 **Lo‑Fi UGC (Si Jujur)**
*   Rekam pakai HP, goyang dikit gak apa-apa.
*   Testimoni natural.
*   *Catatan:* performa UGC bergantung pada audiens, produk, eksekusi, dan tujuan; validasi dengan eksperimen sendiri.

🎬 **Cinematic Founder Story (Si Emosional)**
*   Owner muncul, cerita perjuangan/masalah.
*   *Kenapa ampuh?* Membangun trust jangka panjang.

🤡 **Meme / Chaotic (Si Perusuh)**
*   Visual aneh, bikin kaget (Pattern Interrupt).
*   *Kenapa ampuh?* Tugas utamanya cuma satu: **STOP SCROLLING**.

🧠 **Motion Graphic (Si Pintar)**
*   Penjelasan visual cepat & bersih.
*   *Kenapa ampuh?* Menjawab keraguan logis dalam 15 detik.

---

# 3. Sesuaikan format dengan placement
Siapkan versi rasio dan crop yang cocok untuk placement tujuan (misalnya vertikal untuk Stories/Reels). Periksa area aman teks, keterbacaan, dan preview tiap placement. Format saja tidak menjamin CPM lebih efisien.

---

# 4. Anatomi Iklan Pemenang

🧲 **BAB 1: THE HOOK (Detik 0–3)**
*   **Tugas:** Hentikan jempol.
*   **Syarat:** Harus ada wajah, gerakan cepat, atau teks besar yang relevan.
*   **Metrik:** bandingkan hook rate dengan variasi kreatif yang sepadan. Nilai rendah adalah petunjuk untuk diperiksa, bukan bukti bahwa materi tidak layak.

⏳ **BAB 2: BODY (Detik 3–15)**
*   **Tugas:** Jangan membosankan.
*   **Teknik:** Potong basa-basi. Edit cepat.
*   **Metrik:** Hold Rate.

🎯 **BAB 3: CTA (Call to Action)**
*   **Tugas:** Suruh klik.
*   **Teknik:** Perintah jelas. "Klik Tombol WA", "Chat Admin".
*   **Prinsip:** Jangan kasih 2 perintah. Satu saja.

---

# 5. Checklist Kreatif
✅ Apakah 3 detik pertama bikin kaget/penasaran?
✅ Apakah caption menjawab pertanyaan user? (Social SEO).
✅ Apakah videonya Vertikal (9:16)?
❌ Apakah versi baru memberi hipotesis kreatif yang cukup berbeda untuk diuji? Hindari menyimpulkan penalti platform tanpa bukti.
`
  },
  {
    id: 'tab-metrik',
    mode: 'STRATEGIC',
    tab: 'METRIK',
    title: 'Kamus Metrik 2026',
    description: 'Radar Deteksi Dini: Hook, Hold, & CPMr.',
    critical: true,
    content: `
# 📡 Metrik Detak Jantung (Wajib Pantau)

Metrik ini membantu membaca hasil, tetapi keputusan perlu mempertimbangkan objective, margin, kualitas data, atribusi, dan konteks akun.

### 1. Hook Rate (Thumb-stop Ratio)
Persentase orang yang berhenti scroll di 3 detik pertama.
*   **Rumus:** (3-Second Plays ÷ Impressions).
*   **Target:** tetapkan dari baseline akun dan bandingkan materi dengan objective, placement, serta periode yang sepadan.
*   **Artinya:** Bandingkan dengan variasi lain yang sepadan dan pastikan definisi metriknya sama. Gunakan hasil untuk menguji revisi, bukan sebagai ambang universal.

### 2. Retensi tontonan
Pilih metrik retensi yang tersedia pada platform dan bandingkan format serta durasi video yang serupa. Angka rendah dapat menjadi alasan untuk memeriksa alur, tetapi tidak membuktikan bahwa satu bagian video pasti membosankan.

### 3. CPMr (Cost per Mille Reach) - Radar Fatigue
Biaya menjangkau 1.000 orang **BARU**. (Beda dengan CPM biasa).
*   **Target:** bandingkan dengan baseline akun, audiens, placement, musim, dan tujuan kampanye.
*   **Artinya:** Perubahan CPMr dapat menjadi alasan memeriksa jangkauan dan frekuensi; metrik ini sendiri tidak membuktikan fatigue atau bahwa delivery berhenti mencari audiens baru.

### 4. CPR (Cost per Result)
Biaya untuk dapat 1 chat masuk.
*   **Target:** hitung dari margin produk, target profit, biaya lain, serta kualitas hasil yang diinginkan.
*   **Artinya:** Indikator efisiensi harian. Kalau mahal, cek konten atau offer.

---

# 🗑️ Metrik Ego (Jangan Terkecoh)

Angka-angka ini sering bikin advertiser merasa hebat, padahal dompet kosong.

*   **Likes / Comments / Shares:** Bagus untuk social proof, tapi **bukan uang**.
*   **CTR (Link Click-Through Rate):** CTR tinggi bagus, tapi cek Gap Kualitas (Klik vs Chat Masuk).
*   **Video Views:** Jutaan views gak guna kalau gak ada yang klik tombol WA.

---

# 💊 Matrix Diagnosa Dokter

**Gejala 1: Hook rate lebih rendah dari materi pembanding**
*   **Periksa:** definisi metrik, jumlah tayangan, placement, dan kecocokan audiens.
*   **Uji:** variasi pembuka dengan perubahan terkontrol, lalu bandingkan pada kondisi sepadan.

**Gejala 2: Hook Tinggi, Hold Rendah**
*   **Penyakit:** Clickbait atau konten membosankan.
*   **Obat:** Edit video bagian tengah, percepat alur.

**Gejala 3: CPMr meningkat**
*   **Periksa:** jangkauan, frekuensi, audiens, kompetisi, placement, dan periode.
*   **Uji:** materi baru jika ada bukti kelelahan kreatif; jangan menganggap kenaikan biaya saja membuktikan fatigue.

**Gejala 4: CPR Mahal**
*   **Penyakit:** Konten tidak relevan atau offer jelek.
*   **Obat:** Cek ulang penawaran dan hook.
`
  },
  {
    id: 'tab-ctwa',
    mode: 'STRATEGIC',
    tab: 'CTWA',
    title: 'Strategi Click-to-WhatsApp',
    description: 'Mesin Uang Indonesia.',
    content: `
# Kenapa CTWA Raja di Indonesia?
Pasar kita bukan pasar formulir. Pasar kita pasar **OBROLAN**.
Orang Indonesia beli karena **PERCAYA** (Trust), dan trust dibangun lewat chat.

---

# 1. Filosofi "Closing di Chat"
Tugas iklan **HANYA** mengantar orang sampai pintu WA.
Tugas **CS** yang bikin mereka beli.

*   Iklan Bagus + CS Jelek = **Boncos**.
*   Iklan Biasa + CS Dewa = **Profit**.

Jangan bebankan "Closing" ke iklan semata.

---

# 2. Jendela layanan dan persetujuan follow-up
Jendela layanan WhatsApp umumnya 24 jam setelah pesan terakhir dari pengguna; di luar jendela, Platform WhatsApp Business membatasi pesan bisnis ke template yang disetujui. Periode 72 jam pada alur iklan tertentu terkait persetujuan untuk pesan lanjutan, bukan aturan umum bahwa semua follow-up gratis. Selalu cek kebijakan dan tarif terbaru.

*   **Strategi:** jawab pertanyaan yang masuk dengan informasi yang relevan dan akurat.
*   **Tindak lanjut:** kirim pesan lanjutan hanya sesuai persetujuan pengguna dan kebijakan WhatsApp.

---

# 3. Teknik "Anti-Ghosting"
User WA itu manja. Ribet dikit = Kabur.

✅ **Wajib: Pre-filled Message**
Saat user klik link WA, teks sudah terisi otomatis.
*   *Contoh:* "Halo Kak, saya mau promo Diskon 50% dong."
*   User tinggal klik kirim. Gak perlu mikir mau ngetik apa.

✅ **Wajib: Sinkronisasi Janji**
Apa yang ditulis di iklan, harus jadi balasan pertama di WA.
*   Iklan: "Diskon 50%"
*   Balasan CS: "Siap Kak, Diskon 50% masih ada."
*   Jangan sampai Iklan bilang A, CS bilang B.

---

# 4. Integrasi Dashboard & Realita
Perbedaan antara dashboard iklan dan catatan CS dapat terjadi; besar selisihnya tidak tetap.

*   **Masalah:** Dashboard lapor 100 Result, di HP CS cuma ada 70 Chat.
*   **Sebab:** User klik tombol, masuk WA, tapi **batal kirim**. (Ghosting).
*   **Solusi:**
    1.  Pantau data **REAL** dari laporan CS.
    2.  Jika ada selisih, periksa atribusi, definisi event, klik tanpa pesan terkirim, keterlambatan laporan, dan kendala teknis.

> **Kunci:** Gunakan laporan CS sebagai salah satu sumber, lalu cocokkan periode, atribusi, status lead, dan biaya sebelum mengubah keputusan kampanye.
`
  },
  {
    id: 'tab-kosakata',
    mode: 'STRATEGIC',
    tab: 'KOSAKATA',
    title: 'Kamus Istilah',
    description: 'Bahasa resmi mesin uang.',
    content: `
# A - Z Kamus Advertiser

**Andromeda**
Sistem retrieval Meta yang membantu memilih kandidat iklan dalam proses rekomendasi bertahap. Konten adalah salah satu sinyal; jangan anggap materi saja menentukan audiens.

**Broad Targeting**
Pengaturan audiens yang lebih luas dengan kontrol tertentu. Cocok atau tidaknya bergantung pada objective, produk, data, dan aturan platform; kreatif bukan satu-satunya sinyal delivery.

**CAPI (Conversions API)**
Cara mengirim event dari server ke Meta untuk mendukung pengukuran. Implementasi harus sesuai tujuan, consent, dan aturan privasi. CAPI tidak otomatis menggantikan Pixel atau menjamin akurasi lebih tinggi.

**CPM (Cost per Mille)**
Biaya sewa lapak per 1.000 tayangan. Indikator mahal/murahnya persaingan di pasar.

**CPMr (Cost per Mille Reach)**
Biaya per seribu jangkauan sesuai definisi laporan platform. Kenaikan dapat dipengaruhi banyak faktor dan tidak sendirinya membuktikan fatigue.

**CPR (Cost per Result)**
Biaya per hasil (biasanya per Chat masuk).

**CTR (Click Through Rate)**
Persentase orang yang klik iklan setelah melihatnya. Mengukur daya tarik penawaran.

**Hook Rate**
Metrik pemutaran awal yang perlu dibaca berdasarkan definisi platform. Gunakan untuk membandingkan materi dengan kondisi serupa; targetnya ditetapkan dari baseline dan objective akun.

**Hold Rate**
Persentase orang yang lanjut nonton sampai 15 detik. Ukuran kualitas storytelling.

**Learning Phase**
Status pembelajaran delivery Meta setelah perubahan atau publikasi kampanye. Kebutuhan volume dan dampak perubahan bergantung pada objective dan konfigurasi; periksa panduan Meta terbaru, jangan menganggap setiap edit mereset learning.

**Kemiripan materi**
Materi dengan perbedaan kreatif yang kecil bisa memberi sedikit variasi untuk diuji. Jangan menyimpulkan CPM mahal sebagai penalti kemiripan tanpa data atau bukti dari platform.
`
  }
];
