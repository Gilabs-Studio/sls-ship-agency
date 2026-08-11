# PRODUCT REQUIREMENT DOCUMENT
## Sistem Manajemen Keagenan Kapal (Ship Agency Management System)

**Disusun untuk:** PT. Solid Lautan Sinergi
**Versi:** 1.0
**Tanggal:** Agustus 2026

---

## 1. Overview Produk

### 1.1 Latar Belakang

PT. Solid Lautan Sinergi bergerak di bidang jasa keagenan kapal, dengan fokus layanan pada pengelolaan sertifikat kapal, monitoring dokumen, dan pengurusan perizinan yang sesuai regulasi maritim. Proses ini saat ini rawan human error karena melibatkan banyak dokumen dengan masa berlaku berbeda-beda, tersebar di banyak klien dan banyak kapal sekaligus.

Sistem ini dirancang untuk menjadi platform digital yang mengubah proses administratif manual menjadi alur kerja yang terpusat, terjadwal otomatis, dan dapat dipantau secara real time oleh internal tim maupun klien (perusahaan pelayaran).

### 1.2 Tujuan Produk

- Mengurangi risiko keterlambatan perpanjangan sertifikat dan dokumen kapal yang dapat berujung pada denda atau detensi kapal oleh otoritas pelabuhan.
- Menyediakan basis data terpusat untuk seluruh dokumen kapal, klien, dan riwayat komunikasi.
- Meningkatkan efisiensi kerja tim operasional melalui otomatisasi reminder dan alur approval digital.
- Memberi nilai tambah kompetitif saat menawarkan kerja sama ke perusahaan pelayaran baru, karena transparansi status dokumen dapat diakses klien secara langsung.

### 1.3 Ruang Lingkup Modul

| Modul | Fungsi Utama |
|---|---|
| Dashboard | Ringkasan kondisi operasional secara keseluruhan |
| CRM | Pengelolaan lead, kontak, dan peluang kerja sama |
| Manajemen Kapal & Sertifikat | Data armada dan siklus hidup sertifikat |
| Manajemen Dokumen | Penyimpanan, approval, dan audit trail dokumen digital |
| Notifikasi & Reminder | Mesin pengingat otomatis lintas modul |
| Laporan & Analitik | Insight kinerja operasional dan kepatuhan |
| Pengaturan & Manajemen Pengguna | Kontrol akses dan konfigurasi sistem |

---

## 2. Definisi Pengguna (User Roles)

| Aktor | Trigger | Logic | Output |
|---|---|---|---|
| **Super Admin** | Login ke sistem | Memiliki akses penuh ke seluruh modul, termasuk pengaturan pengguna, konfigurasi sistem, dan data lintas klien. | Kontrol penuh sistem |
| **Staff Operasional** | Login sesuai divisi | Mengelola data kapal, upload dokumen, memperbarui status sertifikat, menindaklanjuti notifikasi expired. | Data operasional termutakhirkan |
| **Sales / Business Dev** | Login ke modul CRM | Mengelola lead, mencatat aktivitas follow up, mengubah status deal dari prospek menjadi klien aktif. | Pipeline kerja sama terkelola |
| **Klien (Perusahaan Pelayaran)** | Login melalui portal klien | Melihat status dokumen armadanya sendiri secara read-only, mengunduh sertifikat yang sudah disetujui. | Transparansi status dokumen |

---

## 3. Page: Dashboard (Penugasan Agen/Teknisi & Vendor Management System)

### 3.1 Tujuan Halaman

Menjadi pusat kendali operasional utama yang menyajikan ringkasan penugasan agen/teknisi di perusahaan pelayaran klien (kontrak 6 bulan & masa kerja berjalan), sistem Vendor Management System (VMS) mitra supplier, serta grafik Donut sirkular CRM secara bersih, tanpa hardcoded warna, dan berkontras tinggi pada tema terang maupun gelap.

### 3.2 Fitur Utama & Layout Komponen

- **Grafik Donut Sirkular CRM & Timespan Ringkasan:**
  - Grafik lingkaran SVG Donut yang merangkum distribusi deal CRM (*Closing 45%*, *Negosiasi 30%*, *Prospek Baru 25%*).
  - Ringkasan statistik alokasi agen/teknisi di klien.
- **Kartu Ringkasan Metrik Bersih:**
  - `Total Teknisi & Kru Terdaftar`: 128 Personel
  - `Penugasan Aktif (Klien)`: 103 Personel
  - `Standby (Siap Tugas)`: 17 Personel
  - `Perlu Perpanjangan`: 8 Dokumen
- **Tabel Penugasan Agen/Teknisi & Vendor Management System (VMS Tabs):**
  - **Tab 1 (Penugasan Agen/Teknisi)**: Nama Teknisi/Agen, Perusahaan Klien, Vendor Supplier, Posisi & Kapal, Durasi Kontrak (6 Bulan), Masa Kerja Berjalan (*Timespan* Bulan ke-X dari 6 Bulan dengan progress bar), dan Fee Rate.
  - **Tab 2 (Vendor Management System - VMS)**: Daftar Vendor Partner Outsourcing (*PT Sea Engine Vendor*, *CV Subsea Engineering*), Kategori Layanan, Jumlah Teknisi Ditugaskan, dan Rating Performa SLA (98.5%).
  - **Tab 3 (Permintaan Alokasi Klien)**: Permintaan penugasan personel baru dari klien pelayaran dan status pemenuhan (*matching*).
- **Skema Warna Terpusat (Zero Hardcoded Color):**
  - Seluruh status tag/badge menggunakan variabel CSS terpusat (`--mint-*`, `--ice-*`, `--warning-*`, `--success-*`) yang otomatis menyesuaikan tingkat kontras tinggi pada Light Theme dan Dark Theme.

### 3.3 Use Case dan Logic Sistem

| Aktor | Trigger | Alur / Logic Sistem | Output |
|---|---|---|---|
| Staff Operasional | Membuka halaman dashboard | Sistem menarik data armada dan posisi kapal secara real time, menghitung persentase kelaikan sertifikat/bahan bakar, dan menyajikan peta rute taktis maritim beserta dial radar kompas. | Dashboard taktis maritim AtlanticX |
| Sales | Membuka filter statistik operasional | Sistem memfilter jumlah armada aktif, kapal di pelabuhan, dan status pesanan keagenan yang sedang berjalan. | Ringkasan armada terfilter |
| Super Admin | Klik shortcut aksi cepat | Sistem membuka modal input kaca melayang tanpa merusak fokus tampilan visual peta maritim. | Modal aksi cepat terbuka |

> **Relasi Modul:** Dashboard bersifat agregator taktis visual. Seluruh parameter posisi rute, sertifikat, dan data kapal bersumber langsung dari modul Manajemen Kapal & Sertifikat, Dokumen, dan CRM.

---

## 4. Page: CRM

### 4.1 Tujuan Halaman

Mengelola seluruh siklus hubungan dengan calon klien maupun klien eksisting, mulai dari prospek pertama sampai menjadi mitra kerja sama aktif, termasuk riwayat komunikasi dan dokumen penawaran.

### 4.2 Sub-Halaman dan Fitur

**4.2.1 Lead**
- Input data calon klien baru (nama perusahaan, jenis armada, PIC, sumber lead).
- Status tahap lead: Baru, Dihubungi, Presentasi, Negosiasi, Menang/Kalah.
- Skor prioritas lead otomatis berdasarkan jumlah armada dan potensi nilai kontrak.

**4.2.2 Contact**
- Daftar seluruh kontak PIC dari perusahaan pelayaran, baik lead maupun klien aktif.
- Riwayat interaksi per kontak (telepon, email, pertemuan).

**4.2.3 Deal / Penawaran**
- Pembuatan dokumen penawaran kerja sama langsung dari data lead.
- Tracking status penawaran: Terkirim, Direview, Disetujui, Ditolak.

**4.2.4 Activity**
- Log aktivitas follow up terjadwal (reminder untuk sales menghubungi kembali).
- Riwayat lengkap seluruh aktivitas per lead untuk keperluan audit internal.

### 4.3 Use Case dan Logic Sistem

| Aktor | Trigger | Alur / Logic Sistem | Output |
|---|---|---|---|
| Sales | Menambahkan lead baru | Sistem membuat record lead dengan status default Baru, otomatis membuat kontak terkait di sub-halaman Contact, dan menjadwalkan reminder follow up pertama H+2. | Lead dan kontak baru tercatat |
| Sales | Mengubah status lead menjadi Menang | Sistem otomatis mengonversi record lead menjadi entitas Klien Aktif, lalu memicu modul Manajemen Kapal untuk membuka form pendaftaran armada milik klien tersebut. | Klien baru aktif, siap didaftarkan armadanya |
| Sales | Membuat dokumen penawaran dari Deal | Sistem mengambil template penawaran, mengisi otomatis nama perusahaan dan PIC dari data Contact, lalu menyimpan draf ke modul Manajemen Dokumen sebagai dokumen kategori Non-Kapal. | Draf penawaran tersimpan |
| Sistem (otomatis) | Lead tidak ada aktivitas 14 hari | Sistem menandai lead berstatus Stagnan dan mengirim notifikasi ke sales terkait dan atasannya. | Notifikasi lead stagnan |

> **Relasi Modul:** Modul CRM adalah gerbang awal sebelum data masuk ke Manajemen Kapal. Saat lead berubah menjadi klien aktif, data mengalir satu arah dari CRM menuju modul Kapal & Sertifikat, sementara dokumen penawaran yang dibuat tersimpan di modul Manajemen Dokumen untuk keperluan arsip.

---

## 5. Page: Manajemen Kapal & Sertifikat

### 5.1 Tujuan Halaman

Menjadi basis data utama seluruh armada milik klien beserta status sertifikat wajib yang melekat pada tiap kapal, sebagai inti dari layanan keagenan yang ditawarkan perusahaan.

### 5.2 Fitur Utama

- Registrasi data kapal (nama, IMO number, bendera, jenis kapal, pemilik/klien terkait).
- Daftar sertifikat wajib per kapal, misalnya SOLAS, ISM Code, ISPS Code, sertifikat klasifikasi, dan sertifikat kepelabuhanan lainnya.
- Indikator visual status tiap sertifikat: Aktif, Mendekati Expired, Sudah Expired.
- Riwayat perpanjangan sertifikat per kapal.

### 5.3 Use Case dan Logic Sistem

| Aktor | Trigger | Alur / Logic Sistem | Output |
|---|---|---|---|
| Staff Operasional | Mendaftarkan kapal baru | Sistem membuat record kapal dan secara otomatis menyiapkan checklist sertifikat wajib berdasarkan jenis kapal yang dipilih, semisal kapal kargo memiliki daftar wajib berbeda dari kapal tanker. | Checklist sertifikat otomatis tergenerate |
| Staff Operasional | Input tanggal terbit dan masa berlaku sertifikat | Sistem menghitung mundur tanggal expired dan mendaftarkan jadwal ke mesin Notifikasi & Reminder pada ambang 30, 15, dan 7 hari sebelum jatuh tempo. | Jadwal reminder terpasang |
| Sistem (otomatis) | Sertifikat melewati tanggal expired tanpa pembaruan | Status kapal otomatis berubah menjadi Tidak Layak Operasi pada dashboard, dan seluruh notifikasi dieskalasi ke Super Admin. | Status kapal berubah, eskalasi notifikasi |

> **Relasi Modul:** Modul ini adalah sumber data utama bagi Dashboard, dan menjadi pemicu utama mesin Notifikasi & Reminder. Setiap dokumen sertifikat yang diunggah di sini tersimpan fisiknya di modul Manajemen Dokumen, namun statusnya dikendalikan dari sini.

---

## 6. Page: Manajemen Dokumen

### 6.1 Tujuan Halaman

Menjadi pusat penyimpanan seluruh file digital, baik dokumen kapal, dokumen klien, maupun dokumen internal seperti penawaran kerja sama, lengkap dengan alur persetujuan dan jejak audit.

### 6.2 Fitur Utama

- Upload dokumen dengan kategori (Sertifikat Kapal, Dokumen Klien, Dokumen Internal).
- Alur approval berjenjang, semisal Staff mengunggah lalu Supervisor menyetujui sebelum berstatus final.
- Riwayat versi dokumen (versioning), sehingga revisi sebelumnya tetap tersimpan.
- Jejak audit siapa mengunggah, siapa menyetujui, dan kapan waktunya.

### 6.3 Use Case dan Logic Sistem

| Aktor | Trigger | Alur / Logic Sistem | Output |
|---|---|---|---|
| Staff Operasional | Mengunggah dokumen sertifikat baru | Sistem menyimpan file dengan status Menunggu Approval, mengaitkan otomatis ke record kapal terkait dari modul Manajemen Kapal, dan mengirim notifikasi ke Supervisor. | Dokumen berstatus Menunggu Approval |
| Supervisor | Menyetujui dokumen | Status dokumen berubah menjadi Final, sistem otomatis memperbarui tanggal masa berlaku sertifikat pada modul Manajemen Kapal, dan mereset ulang jadwal reminder. | Sertifikat pada kapal diperbarui |
| Klien | Membuka portal untuk melihat dokumen | Sistem hanya menampilkan dokumen berstatus Final milik armada klien tersebut, dokumen berstatus draf atau menunggu approval tidak tampil. | Klien melihat dokumen resmi saja |

> **Relasi Modul:** Manajemen Dokumen bersifat lintas modul, menjadi tempat penyimpanan fisik file yang dirujuk oleh modul Kapal & Sertifikat maupun CRM. Perubahan status dokumen di sini akan memantik pembaruan otomatis pada modul lain yang merujuknya.

---

## 7. Page: Notifikasi & Reminder

### 7.1 Tujuan Halaman

Menjadi mesin pengingat terpusat yang memastikan tidak ada satu pun dokumen atau follow up klien yang terlewat batas waktunya.

### 7.2 Fitur Utama

- Aturan reminder yang dapat dikonfigurasi (ambang H-30, H-15, H-7, H-1).
- Pengiriman notifikasi lewat email dan WhatsApp secara otomatis.
- Pusat notifikasi in-app untuk seluruh pengguna sesuai perannya masing-masing.
- Eskalasi otomatis ke jenjang lebih tinggi jika tidak ada tindak lanjut dalam waktu tertentu.

### 7.3 Use Case dan Logic Sistem

| Aktor | Trigger | Alur / Logic Sistem | Output |
|---|---|---|---|
| Sistem (terjadwal harian) | Cron job berjalan tiap pukul 06.00 | Sistem memindai seluruh tanggal expired pada modul Kapal & Sertifikat, membandingkan dengan tanggal hari ini, lalu mencocokkan dengan ambang reminder yang berlaku. | Daftar notifikasi harian tergenerate |
| Sistem (otomatis) | Notifikasi H-7 tidak direspon dalam 3 hari | Sistem mengeskalasi notifikasi yang sama ke Super Admin, sekaligus menandai prioritas tinggi pada Dashboard. | Eskalasi notifikasi ke level atas |
| Staff Operasional | Klik notifikasi di pusat notifikasi | Sistem mengarahkan langsung ke record dokumen atau kapal terkait pada modul asalnya. | Navigasi langsung ke sumber data |

> **Relasi Modul:** Modul ini tidak memiliki data sendiri, murni sebagai lapisan orkestrasi yang membaca data dari Kapal & Sertifikat, Manajemen Dokumen, dan Activity pada CRM, lalu mendistribusikan pesan ke saluran komunikasi yang sesuai.

---

## 8. Page: Laporan & Analitik

### 8.1 Tujuan Halaman

Menyediakan insight terukur bagi manajemen untuk mengevaluasi kinerja operasional dan tingkat kepatuhan dokumen, sekaligus menjadi bahan pendukung saat menawarkan kerja sama ke klien baru.

### 8.2 Fitur Utama

- Laporan tingkat kepatuhan dokumen per klien dan per periode.
- Laporan konversi pipeline CRM (lead menjadi klien aktif).
- Ekspor laporan ke format PDF dan Excel.
- Filter laporan berdasarkan rentang tanggal, klien, atau jenis kapal.

### 8.3 Use Case dan Logic Sistem

| Aktor | Trigger | Alur / Logic Sistem | Output |
|---|---|---|---|
| Super Admin | Memilih rentang tanggal dan generate laporan kepatuhan | Sistem mengagregasi data historis status sertifikat dari modul Kapal & Sertifikat dalam rentang waktu terpilih, menghitung persentase dokumen yang diperbarui tepat waktu. | Laporan kepatuhan dokumen |
| Sales Manager | Membuka laporan konversi CRM | Sistem menghitung rasio lead yang berubah status menjadi Menang dibanding total lead pada periode terpilih. | Rasio konversi pipeline |

> **Relasi Modul:** Laporan & Analitik bersifat read-only terhadap seluruh modul lain, tidak pernah menulis atau mengubah data sumber, hanya membaca dan menyajikan ulang dalam bentuk ringkas.

---

## 9. Page: Pengaturan & Manajemen Pengguna

### 9.1 Tujuan Halaman

Mengendalikan konfigurasi sistem secara keseluruhan, termasuk hak akses tiap peran pengguna dan parameter otomatisasi seperti ambang batas reminder.

### 9.2 Fitur Utama

- Manajemen akun pengguna dan peran (role-based access control).
- Konfigurasi ambang waktu reminder per kategori dokumen.
- Pengaturan template dokumen penawaran dan sertifikat.
- Log aktivitas seluruh pengguna untuk keperluan audit keamanan.

### 9.3 Use Case dan Logic Sistem

| Aktor | Trigger | Alur / Logic Sistem | Output |
|---|---|---|---|
| Super Admin | Menambahkan akun staff baru | Sistem membuatkan akun dengan peran default sesuai divisi yang dipilih, otomatis membatasi akses modul yang tidak relevan dengan perannya. | Akun baru dengan hak akses sesuai peran |
| Super Admin | Mengubah ambang reminder dari H-30 menjadi H-45 | Perubahan berlaku pada seluruh perhitungan mesin Notifikasi & Reminder untuk kategori dokumen yang dipilih, tanpa memengaruhi kategori lain. | Aturan reminder termutakhirkan |

> **Relasi Modul:** Pengaturan berada pada lapisan paling atas, mengendalikan parameter yang dipakai oleh seluruh modul lain, khususnya Notifikasi & Reminder dan kontrol akses tiap halaman.

---

## 10. Ringkasan Relasi Antar Modul

Untuk memudahkan pemahaman alur data secara menyeluruh, berikut rangkuman keterkaitan tiap modul dalam satu alur besar:

- CRM menangkap prospek, begitu closing data mengalir ke Manajemen Kapal sebagai klien baru.
- Manajemen Kapal menyimpan data armada dan memicu checklist sertifikat wajib.
- Manajemen Dokumen menjadi tempat penyimpanan fisik seluruh file, dirujuk balik oleh Kapal & Sertifikat maupun CRM.
- Notifikasi & Reminder membaca tanggal jatuh tempo dari Kapal & Sertifikat serta aktivitas dari CRM, lalu mendistribusikan pesan ke pengguna terkait.
- Dashboard dan Laporan bersifat read-only, murni menyajikan ulang data dari seluruh modul operasional di atas.
- Pengaturan berada di lapisan tertinggi, mengatur parameter dan hak akses yang berlaku ke seluruh modul.

*Dengan struktur ini, sistem tidak berjalan sebagai kumpulan modul terpisah, melainkan satu rangkaian alur kerja yang saling memicu satu sama lain, dari prospek awal sampai kapal benar benar layak berlayar dengan dokumen lengkap.*