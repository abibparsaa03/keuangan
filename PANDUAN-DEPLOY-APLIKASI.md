# 🚀 Panduan Lengkap Deploy Menjadi Aplikasi (Desktop, Android, & PWA)

Kode web Anda di **FinTrack Pro** kini telah dikonfigurasi secara lengkap agar dapat dideploy menjadi **aplikasi nyata** (bukan sekadar halaman web biasa).

Berikut adalah **3 metode terbaik** untuk mengubahnya menjadi aplikasi native:

---

## 📱 METODE 1: Progressive Web App (PWA) — *Sudah Siap 100%, Paling Praktis!*

Aplikasi FinTrack Pro sudah dilengkapi dengan file **`manifest.json`**, **`sw.js` (Service Worker)**, dan icon aplikasi (**`icon-192.png`** & **`icon-512.png`**). 

Dengan fitur PWA, aplikasi ini bisa **di-install langsung ke HP Android, iPhone, dan Komputer Windows/Mac** tanpa perlu download dari app store:
- Muncul icon aplikasi di layar utama HP (Home Screen) & Desktop Windows.
- Terbuka di jendela aplikasi tersendiri (fullscreen tanpa address bar browser).
- Bisa dibuka secara **offline** tanpa koneksi internet.

### Cara Menginstall:
1. **Di HP Android (Google Chrome / Edge):**
   - Buka website aplikasi.
   - Klik tombol **"Install App"** di bagian atas kanan atau klik menu titik tiga di browser $\rightarrow$ pilih **"Tambahkan ke Layar Utama"** / **"Install Aplikasi"**.
2. **Di iPhone / iPad (Safari):**
   - Buka website di Safari.
   - Klik tombol **Share** (ikon kotak dengan panah ke atas) $\rightarrow$ scroll dan pilih **"Add to Home Screen"** (*Tambah ke Layar Utama*).
3. **Di Laptop / PC Windows (Chrome / Edge):**
   - Klik tombol **"Install App"** di header aplikasi, atau klik ikon install (+ / komputer kecil) di pojok kanan bilah alamat (URL bar).

> **Agar bisa diakses dari HP Anda:** Cukup unggah (upload) folder ini ke hosting gratis seperti **Vercel** atau **Netlify** (cukup drag and drop folder, langsung aktif dengan HTTPS gratis dalam 1 menit).

---

## 💻 METODE 2: Build Menjadi Aplikasi Desktop Windows (.EXE)

Kami sudah menyiapkan file konfigurasi **`package.json`** dan **`electron-main.js`**. Anda dapat memaketkan kode ini menjadi file instalasi **`.exe`** mandiri (seperti software kasir / desktop pro).

### Langkah-langkah (Membutuhkan Node.js di komputer Anda):
1. Buka Terminal / PowerShell di folder proyek ini:
   ```powershell
   cd C:\Users\user\.gemini\antigravity\scratch\aplikasi-keuangan
   ```
2. Pasang library Electron & builder:
   ```powershell
   npm install
   ```
3. Uji coba jalankan aplikasi sebagai Desktop Windows:
   ```powershell
   npm run desktop:dev
   ```
4. Build menjadi file `.exe` installer / portable:
   ```powershell
   npm run desktop:build
   ```
5. File installer `.exe` yang siap dibagikan dan di-install akan otomatis muncul di dalam folder baru bernama **`dist/`**.

---

## 🤖 METODE 3: Build Menjadi Aplikasi Android (.APK / Google Play Store)

Ada dua cara mudah untuk membuat file installer Android **`.apk`**:

### Opsi A: Cara Otomatis Tanpa Instalasi (PWABuilder by Microsoft) — *Paling Direkomendasikan*
1. Upload folder `aplikasi-keuangan` ke hosting gratis seperti **Netlify Drop** ([app.netlify.com/drop](https://app.netlify.com/drop)) atau **Vercel**.
2. Anda akan mendapatkan URL web publik (contoh: `https://fintrack-pro.vercel.app`).
3. Buka situs resmi **[PWABuilder.com](https://www.pwabuilder.com)**.
4. Masukkan URL aplikasi Anda lalu klik **Start**.
5. PWABuilder akan mendeteksi `manifest.json` dan `sw.js` yang sudah kita buat.
6. Klik **"Package for Stores"** $\rightarrow$ pilih **Android**.
7. Download paket file **`.apk`** (bisa langsung di-install ke HP Android) atau **`.aab`** (siap diunggah ke Google Play Store).

---

### Opsi B: Menggunakan Capacitor (Native Android Project)
Jika Anda memiliki Android Studio dan ingin mengontrol perizinan perangkat secara native:
1. Di terminal folder proyek, jalankan:
   ```powershell
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "FinTrack Pro" com.fintrack.app --web-dir .
   npx cap add android
   npx cap open android
   ```
2. Android Studio akan terbuka secara otomatis dengan proyek native Android.
3. Di Android Studio, pilih menu **Build $\rightarrow$ Build Bundle(s) / APK(s) $\rightarrow$ Build APK(s)**.

---

## 📋 Ringkasan File Deploy yang Sudah Dibuat

- [manifest.json](file:///C:/Users/user/.gemini/antigravity/scratch/aplikasi-keuangan/manifest.json) : Konfigurasi PWA (nama aplikasi, icon, tema, fullscreen).
- [sw.js](file:///C:/Users/user/.gemini/antigravity/scratch/aplikasi-keuangan/sw.js) : Service Worker untuk offline-first caching.
- [icon-192.png](file:///C:/Users/user/.gemini/antigravity/scratch/aplikasi-keuangan/icon-192.png) & [icon-512.png](file:///C:/Users/user/.gemini/antigravity/scratch/aplikasi-keuangan/icon-512.png) : Icon aplikasi resolusi tinggi.
- [electron-main.js](file:///C:/Users/user/.gemini/antigravity/scratch/aplikasi-keuangan/electron-main.js) : Script pembungkus window Desktop Electron.
- [package.json](file:///C:/Users/user/.gemini/antigravity/scratch/aplikasi-keuangan/package.json) : Perintah build desktop `.exe` dan mobile.
