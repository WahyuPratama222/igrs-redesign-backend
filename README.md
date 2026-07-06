<div align="center">
  <h1>🎮 IGRS Backend API</h1>

  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Prisma_5-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
    <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
    <img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white" />
  </p>

  <p>
    <strong>Public Read-Only REST API untuk Indonesia Game Rating System (IGRS)</strong><br />
  </p>

  <p>
    <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" />
    <img src="https://img.shields.io/badge/Version-1.3.0-blue?style=flat-square" />
    <img src="https://img.shields.io/badge/License-UNLICENSED-lightgrey?style=flat-square" />
  </p>

  <p>
    <a href="https://igrs-redesign-backend-team9.up.railway.app/api/docs">
      <img src="https://img.shields.io/badge/Live_API-igrs--redesign--backend--team9.up.railway.app-0B0D0E?style=flat-square&logo=railway&logoColor=white" />
    </a>
    <a href="https://igrs-redesign-backend-team9.up.railway.app/docs">
      <img src="https://img.shields.io/badge/Swagger_Docs-Available-85EA2D?style=flat-square&logo=swagger&logoColor=black" />
    </a>
  </p>
</div>

---

## 🌟 Overview

> Backend service yang menyediakan data klasifikasi game secara publik — mencakup rating usia, detail game, pencarian, genre, statistik dashboard, hingga berita/pengumuman — untuk platform **IGRS (Indonesia Game Rating System)**.

Seluruh endpoint bersifat **public** dan **read-only** (`GET` only), dibangun dengan pendekatan REST API menggunakan **NestJS** sebagai framework, **Prisma ORM** untuk akses database, dan **PostgreSQL (Supabase)** sebagai database utama.

### 🔗 Live Deployment

| Environment | URL |
|-------------|-----|
| **Base API** | [`https://igrs-redesign-backend-team9.up.railway.app/api`](https://igrs-redesign-backend-team9.up.railway.app/api) |
| **Swagger Docs** | [`https://igrs-redesign-backend-team9.up.railway.app/docs`](https://igrs-redesign-backend-team9.up.railway.app/docs) |

Coba langsung tanpa perlu setup lokal:
```bash
curl https://igrs-redesign-backend-team9.up.railway.app/api/stats/dashboard
```

---

## ✨ Fitur Utama

- 📊 **Dashboard Statistik** — total game, publisher, genre, dan distribusi rating
- 🏷️ **Rating & Klasifikasi Usia** — kategori rating lengkap dengan highlight/penjelasan
- 🎮 **Manajemen Data Game** — list, detail, filter multi-kriteria, dan pencarian
- 🔍 **Autocomplete Search** — pencarian cepat dengan minimum 3 karakter
- 📰 **Berita & Pengumuman** — list dengan pagination dan filter tipe
- ✅ **Validasi Input** global menggunakan `class-validator` + `ValidationPipe`
- 📝 **Swagger/OpenAPI Documentation** otomatis via `@nestjs/swagger`
- 🛡️ **Security Headers** dengan `helmet`
- 🪵 **Request Logging** dengan durasi eksekusi via `LoggingInterceptor` global
- 🗄️ **Database Fleksibel** — mendukung PostgreSQL maupun MySQL melalui Prisma

---

## 📋 Daftar Isi

1. [Prerequisites](#-1-prerequisites)
2. [Installation](#-2-installation)
3. [Database Setup](#️-3-database-setup)
4. [Environment Configuration](#️-4-environment-configuration)
5. [Running the Application](#-5-running-the-application)
6. [Project Structure](#-6-project-structure)
7. [API Endpoints](#-7-api-endpoints)
8. [Swagger Documentation](#-8-swagger-documentation)
9. [Deployment](#️-9-deployment)
10. [Troubleshooting](#️-10-troubleshooting)

---

## 🔧 1. Prerequisites

Pastikan environment pengembangan sudah memiliki:

- **Node.js** (versi LTS direkomendasikan)
- **npm** (atau yarn/pnpm)
- Akses ke database **PostgreSQL** (project ini menggunakan Supabase)

---

## 📦 2. Installation

**Langkah 1 — Clone repository:**
```bash
git clone https://github.com/WahyuPratama222/igrs-redesign-backend.git
cd igrs-redesign-backend
```

**Langkah 2 — Install seluruh dependency:**
```bash
npm install
```

> Perintah ini akan menginstall semua package di `dependencies` & `devDependencies` (NestJS, Prisma, class-validator, helmet, dll) sesuai `package.json`.

Setelah `npm install` selesai, lanjut ke bagian **Database Setup** di bawah sebelum menjalankan aplikasi.

---

## 🗄️ 3. Database Setup

Project ini menggunakan **Prisma ORM** untuk mengelola schema dan migrasi database.

### 🔹 Generate Prisma Client

```bash
npx prisma generate
```

### 🔹 Jalankan Migrasi

```bash
npx prisma migrate deploy
```

### 🔹 (Opsional) Seed Database

Mengisi database dengan data dummy awal (ratings, games, news):

```bash
npm run seed
```

### 🔄 Database Flexibility (PostgreSQL & MySQL)

Secara bawaan project ini menggunakan **PostgreSQL**, namun bisa diarahkan ke database lain yang didukung Prisma.

**Menggunakan PostgreSQL lokal** — tidak perlu ubah kode, cukup sesuaikan `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/igrs_db"
```

**Menggunakan MySQL:**
1. Buka `prisma/schema.prisma`, ubah `provider` menjadi `"mysql"`
2. Sesuaikan `DATABASE_URL` ke format koneksi MySQL
3. Jalankan `npx prisma db push` untuk sinkronisasi schema

---

## ⚙️ 4. Environment Configuration

Buat file `.env` di root direktori (bisa disalin dari `.env.example`):

```bash
cp .env.example .env
```

Isi dengan konfigurasi berikut:

```env
# Database
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# App
PORT=3001
```

| Variabel | Deskripsi | Wajib |
|----------|-----------|:-----:|
| `DATABASE_URL` | Connection string utama PostgreSQL (dipakai Prisma Client saat runtime, umumnya lewat pooler) | ✅ |
| `DIRECT_URL` | Connection string langsung ke database (dipakai Prisma untuk migrasi) | ✅ |
| `PORT` | Port aplikasi berjalan | ❌ (default `3000`) |

---

## 🚀 5. Running the Application

```bash
# Development mode (auto-reload)
npm run start:dev

# Production build
npm run build
npm run start:prod
```

> ⚠️ **Catatan:** `start:prod` menjalankan `node dist/src/main.js` karena TypeScript meng-compile struktur folder `src/` apa adanya ke dalam `dist/src/`.

Aplikasi akan berjalan di `http://localhost:3000` (atau sesuai `PORT` yang dikonfigurasi), dengan seluruh route diawali prefix **`/api`**.

---

## 📁 6. Project Structure

```
igrs-redesign-backend/
├── prisma/
│   ├── schema.prisma          # Definisi model & datasource
│   ├── seed.ts                 # Script seeding database
│   ├── seeds/                  # Data dummy (ratings, games, news)
│   └── migrations/             # Riwayat migrasi database
├── src/
│   ├── common/
│   │   └── interceptors/
│   │       └── logging.interceptor.ts   # Logging global (durasi request)
│   ├── prisma/
│   │   ├── prisma.module.ts    # Module global PrismaService
│   │   └── prisma.service.ts
│   ├── stats/                   # Statistik dashboard
│   │   ├── stats.controller.ts
│   │   ├── stats.service.ts
│   │   └── stats.module.ts
│   ├── ratings/                 # Kategori rating & highlight
│   │   ├── ratings.controller.ts
│   │   ├── ratings.service.ts
│   │   └── ratings.module.ts
│   ├── games/                   # Data game (list, detail, search, genre)
│   │   ├── dto/
│   │   │   ├── query-games.dto.ts
│   │   │   └── search-games.dto.ts
│   │   ├── games.controller.ts
│   │   ├── games.service.ts
│   │   └── games.module.ts
│   ├── news/                    # Berita & pengumuman
│   │   ├── dto/
│   │   │   └── query-news.dto.ts
│   │   ├── news.controller.ts
│   │   ├── news.service.ts
│   │   └── news.module.ts
│   ├── app.module.ts             # Root module aplikasi
│   └── main.ts                   # Entry point (pipe, prefix, swagger, helmet)
├── test/                         # E2E test setup
├── .env.example
└── package.json
```

### Architecture Flow

```
Client Request
      ↓
   Controller (routing, DTO validation via ValidationPipe)
      ↓
   Service (business logic, query building, formatting response)
      ↓
   PrismaService (query ke database)
      ↓
   PostgreSQL (Supabase)
      ↓
   Response ke Client (dicatat LoggingInterceptor)
```

---

## 🔌 7. API Endpoints

> Semua endpoint bersifat **public** dan **read-only** (`GET`), diawali prefix `/api`.

### 📊 Stats

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/stats/dashboard` | Statistik total game, publisher, genre, dan distribusi rating |

**Contoh Response:**
```json
{
  "games_total": 42,
  "publishers_total": 18,
  "genres_total": 12,
  "rating_distribution": {
    "SU": 10,
    "3+": 8,
    "7+": 9,
    "13+": 7,
    "18+": 8
  }
}
```

---

### 🏷️ Ratings

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/ratings` | List semua kategori rating usia beserta highlight-nya |

Diurutkan otomatis berdasarkan tingkat usia: `SU → 3+ → 7+ → 13+ → 17+ → 18+`.

---

### 🎮 Games

| Method | Endpoint | Deskripsi | Query Params |
|--------|----------|-----------|---------------|
| `GET` | `/api/games/popular-search` | List game populer (untuk quick suggestion) | - |
| `GET` | `/api/games/search` | Autocomplete pencarian game by nama | `q` (**wajib**, min. 3 karakter) |
| `GET` | `/api/games/genres` | List genre unik yang tersedia | - |
| `GET` | `/api/games` | List semua game dengan filter & pagination | `q`, `platform`, `rating`, `genre`, `mode`, `sort`, `page`, `limit` |
| `GET` | `/api/games/:slug` | Detail game berdasarkan slug | - |

**Detail Query Params `/api/games`:**

| Param | Tipe | Keterangan |
|-------|------|------------|
| `q` | string | Cari berdasarkan nama atau developer (case-insensitive) |
| `platform` | string | Filter berdasarkan platform |
| `rating` | string | Filter berdasarkan kode rating (misal `13+`) |
| `genre` | string | Filter berdasarkan slug genre |
| `mode` | string / string[] | Filter game modes, mendukung multi-value (contoh: `?mode=Online&mode=Offline`) |
| `sort` | string | `popular` untuk urutkan game populer lebih dulu |
| `page` | number | Halaman pagination (default `1`) |
| `limit` | number | Jumlah data per halaman (default `12`) |

**Contoh Response `/api/games`:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Contoh Game",
      "slug": "contoh-game",
      "cover_image_url": "https://...",
      "developer": "Studio X",
      "release_year": 2024,
      "platform": ["PC", "PS5"],
      "game_modes": ["Online", "Offline"],
      "rating": { "code": "13+", "badge_image_url": "...", "color": "#..." },
      "genres": ["Action", "RPG"]
    }
  ],
  "meta": { "total": 1, "page": 1, "limit": 12, "total_pages": 1 }
}
```

---

### 📰 News

| Method | Endpoint | Deskripsi | Query Params |
|--------|----------|-----------|---------------|
| `GET` | `/api/news` | List berita/pengumuman dengan pagination | `limit`, `page`, `type`, `exclude` |
| `GET` | `/api/news/:slug` | Detail berita berdasarkan slug | - |

| Param | Keterangan |
|-------|------------|
| `type` | Filter tipe berita (`Pengumuman` / `Artikel`) |
| `exclude` | Exclude satu slug tertentu dari hasil (misal berita yang sedang dibuka) |
| `page`, `limit` | Pagination (default `limit=9`) |

---

## 📖 8. Swagger Documentation

Setelah aplikasi berjalan, dokumentasi interaktif Swagger tersedia di:

👉 **`http://localhost:3000/docs`** *(sesuaikan dengan `PORT` yang digunakan)*

Swagger UI memungkinkan eksplorasi seluruh endpoint langsung dari browser tanpa perlu tool tambahan seperti Postman/Bruno.

---

## ☁️ 9. Deployment

Project ini di-deploy menggunakan:

- **Backend (API ini)** → [Railway](https://railway.app)

### 🔗 Live URL

| Service | URL |
|---------|-----|
| Base API | `https://igrs-redesign-backend-team9.up.railway.app/api` |
| Swagger Docs | `https://igrs-redesign-backend-team9.up.railway.app/docs` |

Pastikan environment variable (`DATABASE_URL`, `DIRECT_URL`, `PORT`) sudah dikonfigurasi di dashboard Railway sebelum deploy, dan jalankan `npx prisma migrate deploy` sebagai bagian dari build/release step.

---

## 🛠️ 10. Troubleshooting

### Problem: `Cannot find module 'dist/main.js'` saat `start:prod`

**Penyebab:** TypeScript meng-compile struktur folder `src/` apa adanya, sehingga output berada di `dist/src/main.js`, bukan `dist/main.js`.

**Solusi:** pastikan script `start:prod` menunjuk ke path yang benar:
```json
"start:prod": "node dist/src/main.js"
```

### Problem: Filter `mode` (game_modes) tidak mengembalikan hasil yang sesuai

**Solusi:**
- Pastikan `@Transform` pada DTO menangani `value === undefined` sebelum di-wrap jadi array
- Pastikan field `game_modes` disertakan pada `select` Prisma query
- Pastikan konsistensi huruf besar/kecil pada data di database dengan value yang dikirim dari query param (memengaruhi operator `hasSome`)

### Problem: Error koneksi ke database Supabase

**Solusi:**
```bash
# Pastikan DATABASE_URL dan DIRECT_URL sudah benar di .env
# Coba generate ulang Prisma Client
npx prisma generate

# Cek koneksi langsung
npx prisma db pull
```

### Problem: Port sudah digunakan

**Solusi:**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

<div align="center">
  <sub>Dibuat dan dikembangkan oleh <strong>Wahyu Pratama</strong></sub>
</div>
