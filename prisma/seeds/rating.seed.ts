import { PrismaClient } from '@prisma/client';

export async function seedRatings(prisma: PrismaClient) {
  console.log('📊 Seeding ratings...');

  const ratingsData = [
    {
      code: 'SU',
      label: 'Tersedia untuk Semua Umur',
      short_description: 'Game mengandung konten yang ringan dan aman untuk semua kalangan.',
      badge_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/ratings/SU.svg',
      color: '#22c55e',
      highlights: [
        { icon: 'users', title: 'Melindungi Anak dan Remaja', description: 'Sangat ramah untuk remaja dan anak.', order: 1 },
        { icon: 'file-text', title: 'Informasi yang Transparan', description: 'Memberikan informasi konten secara jelas dan mudah dipahami.', order: 2 },
        { icon: 'shield-check', title: 'Dukungan untuk Orang Tua', description: 'Membantu orang tua memilih game yang tepat untuk anak.', order: 3 },
      ],
    },
    {
      code: '3+',
      label: '3 Tahun ke Atas',
      short_description: 'Game cocok untuk anak usia 3 tahun ke atas dengan konten yang sangat ringan.',
      badge_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/ratings/3+.svg',
      color: '#3b82f6',
      highlights: [
        { icon: 'users', title: 'Melindungi Anak dan Remaja', description: 'Cocok untuk anak-anak usia dini.', order: 1 },
        { icon: 'file-text', title: 'Informasi yang Transparan', description: 'Konten sederhana dan mudah dipahami.', order: 2 },
        { icon: 'shield-check', title: 'Dukungan untuk Orang Tua', description: 'Aman dimainkan dengan pengawasan minimal.', order: 3 },
      ],
    },
    {
      code: '7+',
      label: '7 Tahun ke Atas',
      short_description: 'Game cocok untuk anak usia 7 tahun ke atas, mungkin mengandung konten ringan.',
      badge_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/ratings/7+.svg',
      color: '#eab308',
      highlights: [
        { icon: 'users', title: 'Melindungi Anak dan Remaja', description: 'Sesuai untuk anak usia sekolah dasar.', order: 1 },
        { icon: 'file-text', title: 'Informasi yang Transparan', description: 'Konten ringan dengan sedikit tantangan.', order: 2 },
        { icon: 'shield-check', title: 'Dukungan untuk Orang Tua', description: 'Disarankan dengan pengawasan orang tua.', order: 3 },
      ],
    },
    {
      code: '13+',
      label: '13 Tahun ke Atas',
      short_description: 'Game cocok untuk remaja usia 13 tahun ke atas, mengandung beberapa konten dewasa ringan.',
      badge_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/ratings/13+.svg',
      color: '#f97316',
      highlights: [
        { icon: 'users', title: 'Melindungi Anak dan Remaja', description: 'Sesuai untuk remaja dengan pengawasan.', order: 1 },
        { icon: 'file-text', title: 'Informasi yang Transparan', description: 'Mengandung konten yang perlu perhatian orang tua.', order: 2 },
        { icon: 'shield-check', title: 'Dukungan untuk Orang Tua', description: 'Orang tua disarankan mendampingi.', order: 3 },
      ],
    },
    {
      code: '18+',
      label: '18 Tahun ke Atas',
      short_description: 'Game khusus untuk dewasa usia 18 tahun ke atas, mengandung konten dewasa.',
      badge_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/ratings/18+.svg',
      color: '#ef4444',
      highlights: [
        { icon: 'users', title: 'Khusus Dewasa', description: 'Tidak diperuntukkan untuk anak-anak dan remaja.', order: 1 },
        { icon: 'file-text', title: 'Informasi yang Transparan', description: 'Mengandung konten dewasa yang jelas.', order: 2 },
        { icon: 'shield-check', title: 'Perlindungan Anak', description: 'Dilarang keras untuk dimainkan oleh anak di bawah 18 tahun.', order: 3 },
      ],
    },
  ];

  for (const data of ratingsData) {
    const { highlights, ...rating } = data;

    // 1. Cek dulu apakah rating dengan code ini sudah terdaftar di Supabase
    const existingRating = await prisma.rating.findUnique({ where: { code: rating.code } });

    if (existingRating) {
      // 2. Kalau ada, hapus semua highlight lamanya biar ga numpuk/duplikat
      await prisma.ratingHighlight.deleteMany({ where: { rating_id: existingRating.id } });
    }

    // 3. Jalankan upsert. Sekarang bagian update diisi penuh agar link badge bisa ter-overwrite dengan aman
    await prisma.rating.upsert({
      where: { code: rating.code },
      update: {
        ...rating,
        highlights: { create: highlights },
      },
      create: {
        ...rating,
        highlights: { create: highlights },
      },
    });
  }

  console.log(`✅ ${ratingsData.length} ratings seeded safely.`);
}