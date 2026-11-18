# FinTrack Pro - Aplikasi Pencatatan Keuangan Pintar & Manajemen Finansial Pribadi

Aplikasi web pencatatan keuangan modern, responsif, dan kaya fitur yang dirancang untuk mengelola arus kas, melacak pengeluaran & pemasukan, menetapkan batasan anggaran (budgeting), memantau target menabung impian (financial goals), hingga transfer saldo antar rekening/dompet.

Dibuat menggunakan **HTML5, Tailwind CSS, JavaScript murni, dan Chart.js** tanpa memerlukan instalasi server atau database backend (menggunakan **LocalStorage** peramban).

---

## 🌟 Fitur-Fitur Terbaru

1. **Dashboard Arus Kas Interaktif (Cashflow & Analytics)**:
   - **Metrik Utama Real-time**: Total Saldo Bersih Gabungan (Net Worth), Total Pemasukan Bulan Ini, Total Pengeluaran Bulan Ini, Tabungan Bersih, Rasio Pengeluaran, dan *Savings Rate %*.
   - **Skor Kesehatan Finansial**: Indikator otomatis status keuangan Anda (Sangat Prima, Sehat, Waspada, atau Defisit).
   - **Grafik Tren Arus Kas (Bar Chart)**: Visualisasi perbandingan pemasukan vs pengeluaran selama 6 bulan terakhir dengan Chart.js.
   - **Distribusi Pengeluaran (Donut Chart)**: Rincian proporsi pengeluaran berdasarkan kategori untuk bulan berjalan.

2. **Manajemen Multi-Akun & Dompet (Wallets)**:
   - Dukungan berbagai tipe akun: **Rekening Bank** (BCA, Mandiri, dll.), **E-Wallet** (GoPay, OVO, ShopeePay), **Uang Tunai (Cash)**, dan **Investasi / Reksadana**.
   - **Fitur Transfer Saldo Antar Akun**: Memindahkan dana antar dompet (misal: tarik tunai ATM dari Bank ke Dompet Tunai, atau top-up e-wallet) tanpa mengacaukan statistik pendapatan/pengeluaran riil.

3. **Pencatatan Transaksi Lengkap (Buku Kas)**:
   - Catat Pemasukan (Income), Pengeluaran (Expense), dan Transfer.
   - Kategori cerdas dengan ikon warna-warni (*Makanan & Minuman, Belanja, Transportasi, Tagihan, Hiburan, dll.*).
   - Dukungan hashtag/label transaksi (misal: `#gajian`, `#rutin`, `#liburan`) dan catatan deskripsi.
   - Pencarian instan dan filter multi-kriteria: per jenis transaksi, per akun, dan rentang periode waktu (Bulan ini, 30 hari terakhir, Tahun ini).
   - **Ekspor Riwayat ke CSV**: Unduh pembukuan dalam format spreadsheet Excel / Google Sheets sekali klik.

4. **Sistem Anggaran Bulanan (Budgeting & Spending Limits)**:
   - Atur batas pengeluaran per kategori setiap bulannya.
   - Progress bar dinamis yang berubah warna (Hijau: Aman, Kuning: Waspada >80%, Merah: Overbudget >100%).
   - Menghitung sisa kuota belanja otomatis agar keuangan tetap disiplin.

5. **Target Menabung & Financial Goals Tracker**:
   - Buat target impian finansial (misal: *Dana Darurat*, *Beli Laptop Baru*, *Liburan Akhir Tahun*).
   - Fitur **"Setor Cepat"**: Tambahkan nominal tabungan yang terkumpul ke target kapan saja.
   - Menghitung persentase progres dan estimasi sisa uang yang masih perlu ditabung.

6. **Desain Modern 2026 & Mode Gelap (Dark Mode)**:
   - Desain antarmuka bersih dengan palet modern Tailwind CSS.
   - **Dark Mode Toggle**: Beralih antara mode terang dan gelap dengan mulus; preferensi tema tersimpan otomatis.
   - Sepenuhnya responsif untuk smartphone, tablet, maupun layar laptop/desktop.

7. **Cadangkan & Pulihkan Data (Backup & Restore)**:
   - Fitur ekspor seluruh data ke file JSON untuk mengamankan data Anda saat berganti peramban atau perangkat.
   - Fitur impor pemulihan file JSON.
   - Opsi reset data ke data sampel bawaan.

---

## 🚀 Cara Menjalankan

Aplikasi ini dapat langsung dibuka di peramban web mana saja (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari) tanpa perlu menjalankan terminal atau instalasi software tambahan:

1. Buka folder proyek di komputer Anda:
   ```
   C:\Users\user\.gemini\antigravity\scratch\aplikasi-keuangan
   ```
2. **Klik dua kali (double-click)** pada file **`index.html`** untuk langsung membukanya di browser.

---

## 📂 Struktur File

```
aplikasi-keuangan/
├── index.html        # Kerangka antarmuka dashboard, mutasi, modal transaksi, anggaran, dan target
├── style.css         # Styling kustom, scrollbar modern, transisi dark mode, dan animasi
├── app.js            # Logika perhitungan saldo, filter, integrasi Chart.js, dan LocalStorage
└── README.md         # Dokumentasi fitur dan petunjuk pemakaian
```
