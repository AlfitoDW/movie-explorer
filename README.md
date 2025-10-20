# 🎬 Movie Explorer

**Movie Explorer** adalah aplikasi berbasis React yang memungkinkan pengguna menjelajahi film populer, mencari film, melihat detail, dan menambahkan film ke daftar favorit mereka.  
Aplikasi ini terinspirasi oleh tampilan **Netflix UI** dengan fitur **carousel genre** dan sistem **favorite berbasis localStorage** tanpa perlu login.


---

## 🧩 Fitur Utama

- 🔥 **Film Populer:** Menampilkan daftar film trending dari TMDB API.
- 🎞️ **Detail Film:** Setiap film memiliki halaman detail yang memuat sinopsis, rating, dan poster.
- 🎠 **Carousel Genre:** Film dikelompokkan berdasarkan genre, bisa digeser horizontal seperti Netflix.
- ❤️ **Daftar Favorit:** Simpan film favorit langsung ke localStorage (tanpa akun/login).
- 🔍 **Pencarian Film:** Cari film berdasarkan judul.
- 📱 **Responsive Design:** Tampilan nyaman untuk mobile dan desktop.

---

## 🧱 Struktur Halaman

| Halaman | Deskripsi |
|----------|------------|
| `/` | Menampilkan film populer dan banner utama |
| `/movie/:id` | Menampilkan detail film |
| `/favorites` | Menampilkan daftar film yang disimpan ke favorit |
| `/film` | Menampilkan daftar film berdasarkan genre dengan carousel horizontal |

---

## ⚙️ Teknologi yang Digunakan

| Kategori | Teknologi |
|-----------|------------|
| Frontend | **React + Vite** |
| Styling | **Tailwind CSS** |
| Routing | **React Router DOM** |
| API | **The Movie Database (TMDB)** |
| Icon | **React Icons** |
| Toast Notification | **React Hot Toast** |
| Deployment | **Vercel** |

---

## 🔑 API Configuration

Project ini menggunakan API dari [The Movie Database (TMDB)](https://www.themoviedb.org/).

Buat file `.env` di root project, lalu tambahkan API key kamu:
```bash
VITE_TMDB_API_KEY=your_api_key_here
