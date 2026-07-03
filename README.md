# IGRS Backend API

> Indonesia Game Rating System  
> Version: 1.3.0  
> Tech Stack: NestJS + Prisma 5 + PostgreSQL (Supabase)

API backend public *read-only* untuk platform IGRS (Indonesia Game Rating System).

## 🚀 Prerequisites

Sebelum memulai, pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
- [npm](https://www.npmjs.com/) atau yarn/pnpm
- Akses ke PostgreSQL database (project ini menggunakan Supabase)

## 🛠️ Installation & Setup

Ikuti langkah-langkah berikut untuk menjalankan aplikasi secara lokal:

1. **Clone repository** (jika belum):
   ```bash
   git clone <url-repo-anda>
   cd igrs-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Buat file `.env` di root direktori dengan menyalin dari `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Sesuaikan value di dalam file `.env` dengan kredensial database Anda.

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

5. **(Opsional) Seed Database**:
   Untuk mengisi database dengan data dummy awal (ratings, games, news), jalankan:
   ```bash
   npm run seed
   ```

6. **Jalankan Aplikasi**:
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## ⚙️ Environment Variables

File `.env` membutuhkan variabel berikut:

| Variabel | Deskripsi | Contoh |
|----------|-----------|--------|
| `DATABASE_URL` | Connection string utama PostgreSQL (Supabase) | `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres` |
| `DIRECT_URL` | Connection string langsung (untuk Prisma) | `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres` |
| `PORT` | Port aplikasi berjalan | `3000` (default jika kosong) |

### 🗄️ Database Flexibility (PostgreSQL & MySQL)
Project ini menggunakan **Prisma ORM** yang mendukung berbagai relational database. Secara bawaan, project ini menggunakan PostgreSQL. 

**Jika Anda ingin menggunakan PostgreSQL Lokal:**
Anda tidak perlu mengubah kode apapun. Cukup sesuaikan `.env` Anda dengan koneksi lokal:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/igrs_db"
# DIRECT_URL bisa dihapus atau disamakan dengan DATABASE_URL
```

**Jika Anda ingin menggunakan MySQL:**
1. Buka file `prisma/schema.prisma`
2. Ubah `provider` dari `"postgresql"` menjadi `"mysql"`:
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
   ```
3. Ubah `DATABASE_URL` di `.env` menjadi koneksi MySQL:
   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/igrs_db"
   ```
4. Jalankan `npx prisma db push` untuk mensinkronisasi skema ke database.

## 📦 Available Scripts

Berikut adalah beberapa perintah npm utama yang tersedia:

| Perintah | Deskripsi |
|----------|-----------|
| `npm run start` | Menjalankan aplikasi secara normal |
| `npm run start:dev` | Menjalankan aplikasi dalam watch mode (auto-reload) |
| `npm run build` | Meng-compile aplikasi ke folder `dist/` |
| `npm run seed` | Menjalankan script seeding database Prisma |
| `npm run lint` | Menjalankan ESLint |
| `npm run format`| Menjalankan Prettier |

## 📡 API Endpoints

Semua endpoint bersifat public dan berjalan dengan awalan prefix `/api`.

| Module | Method | Endpoint | Deskripsi | Query Params (Opsional) |
|--------|--------|----------|-------------|-------------------------|
| **Stats** | `GET` | `/api/stats/dashboard` | Statistik total game, publisher, dll | - |
| **Ratings**| `GET` | `/api/ratings` | List semua kategori umur & highlights | - |
| **Games** | `GET` | `/api/games/popular-search`| List pencarian game populer | - |
| | `GET` | `/api/games/search` | Autocomplete search bar | `q` (required) |
| | `GET` | `/api/games/genres` | List genre unik yang tersedia | - |
| | `GET` | `/api/games` | List semua game lengkap dengan filter | `q`, `platform`, `rating`, `genre`, `mode`, `sort`, `page`, `limit` |
| | `GET` | `/api/games/:slug` | Detail game berdasarkan slug | - |
| **News** | `GET` | `/api/news` | List berita dengan paginasi | `limit`, `page`, `type`, `exclude` |
| | `GET` | `/api/news/:slug` | Detail berita berdasarkan slug | - |

## 📖 Swagger Documentation

Aplikasi ini dilengkapi dengan Swagger UI untuk kemudahan testing dan eksplorasi API.
Setelah aplikasi berjalan, buka browser dan akses:

👉 **`http://localhost:3000/docs`** *(sesuaikan port jika Anda mengubahnya)*

## 📁 Project Structure (src/)

```
src/
├── common/             # Utility global, interceptors (misal: LoggingInterceptor)
├── games/              # Module terkait Data Game (Controller, Service, DTO)
├── news/               # Module terkait Berita (Controller, Service, DTO)
├── prisma/             # Module global untuk PrismaService
├── ratings/            # Module terkait Kategori Rating (Controller, Service)
├── stats/              # Module terkait Statistik Dashboard
├── app.module.ts       # Root module aplikasi NestJS
└── main.ts             # Entry point aplikasi (konfigurasi pipe, prefix, swagger)
```
