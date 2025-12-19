
# Mpey & Adelliarn Wedding Invitation 💍

Website undangan pernikahan Gen Z style.

## Cara Menjalankan Project (Local)

1.  **Pastikan Folder Project Benar**
    Pastikan semua file (App.tsx, index.tsx, package.json, dll) berada di dalam satu folder.

2.  **Install Dependencies**
    Buka terminal di folder ini, lalu ketik:
    ```bash
    npm install
    ```

3.  **Download Aset Gambar**
    Jalankan script otomatis untuk membuat folder `public/images` dan mengunduh gambar contoh:
    ```bash
    npm run setup-assets
    ```
    *Atau jalankan manual: `node setup-assets.js`*

4.  **Jalankan Website**
    Ketik perintah ini untuk memulai:
    ```bash
    npm run dev
    ```
    Buka link yang muncul (biasanya `http://localhost:5173`) di browser.

## Struktur Folder

- `components/` - Komponen UI (Hero, Story, RSVP, dll)
- `public/images/` - Tempat menyimpan foto asli kamu (Ganti foto di sini!)
- `site-config.ts` - Pengaturan teks, tanggal, dan nama file gambar.
- `index.tsx` - Entry point aplikasi.
