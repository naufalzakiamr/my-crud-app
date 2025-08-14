# Aplikasi CRUD Pengguna

Aplikasi CRUD (Create, Read, Update, Delete) sederhana untuk mengelola data pengguna yang dibangun dengan React, Vite, dan Tailwind CSS.

## Fitur

### ✅ CRUD Operations
- **Create**: Tambah pengguna baru dengan form validasi
- **Read**: Tampilkan daftar pengguna dengan informasi lengkap
- **Update**: Edit data pengguna yang sudah ada
- **Delete**: Hapus pengguna dengan konfirmasi

### 🔍 Pencarian & Pengurutan
- Pencarian berdasarkan nama, email, atau nomor telepon
- Pengurutan berdasarkan:
  - Tanggal dibuat (terbaru/terlama)
  - Nama (A-Z/Z-A)
  - Email (A-Z/Z-A)

### 📱 Responsive Design
- Interface yang responsif untuk desktop, tablet, dan mobile
- Modern UI dengan Tailwind CSS
- Animasi dan transisi yang smooth

### 💾 Data Persistence
- Data disimpan di localStorage browser
- Tidak memerlukan backend server
- Data tetap tersimpan setelah refresh halaman

## Teknologi yang Digunakan

- **React 19** - Library JavaScript untuk UI
- **Vite** - Build tool yang cepat
- **Tailwind CSS** - Framework CSS utility-first
- **LocalStorage** - Penyimpanan data di browser

## Struktur Proyek

```
src/
├── components/
│   ├── FormInput.jsx    # Form untuk create/edit user
│   └── ListItem.jsx     # Komponen untuk menampilkan user
├── utils/
│   └── storage.js       # Utility untuk CRUD operations
├── App.jsx              # Komponen utama aplikasi
└── index.css            # Global styles
```

## Cara Menjalankan

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```

3. **Buka browser:**
   ```
   http://localhost:5173
   ```

## Cara Penggunaan

### Menambah Pengguna Baru
1. Klik tombol "Tambah Pengguna"
2. Isi form dengan data lengkap:
   - Nama Lengkap (wajib)
   - Email (wajib, harus valid)
   - Nomor Telepon (wajib)
   - Alamat (wajib)
3. Klik "Simpan"

### Mengedit Pengguna
1. Klik ikon edit (pensil) pada card pengguna
2. Form akan muncul dengan data yang sudah ada
3. Ubah data yang diperlukan
4. Klik "Update"

### Menghapus Pengguna
1. Klik ikon hapus (trash) pada card pengguna
2. Konfirmasi penghapusan di modal yang muncul
3. Klik "Hapus" untuk konfirmasi

### Mencari Pengguna
- Gunakan kotak pencarian di bagian atas
- Pencarian akan mencari berdasarkan nama, email, atau nomor telepon
- Hasil pencarian akan muncul secara real-time

### Mengurutkan Data
- Gunakan dropdown "Sort" untuk mengurutkan data
- Pilihan pengurutan: Terbaru, Terlama, Nama A-Z, Nama Z-A, Email A-Z, Email Z-A

## Validasi Form

- **Nama**: Wajib diisi
- **Email**: Wajib diisi dan harus format email yang valid
- **Nomor Telepon**: Wajib diisi
- **Alamat**: Wajib diisi

## Data yang Disimpan

Setiap pengguna memiliki data:
- `id`: ID unik (auto-generated)
- `name`: Nama lengkap
- `email`: Alamat email
- `phone`: Nomor telepon
- `address`: Alamat lengkap
- `createdAt`: Tanggal dan waktu dibuat
- `updatedAt`: Tanggal dan waktu terakhir diperbarui (jika ada)

## Build untuk Production

```bash
npm run build
```

File hasil build akan tersimpan di folder `dist/`.

## Lisensi

ISC License
