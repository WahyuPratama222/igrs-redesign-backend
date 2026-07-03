import { PrismaClient } from '@prisma/client';

export async function seedNews(prisma: PrismaClient) {
  console.log('📰 Seeding news...');

  const newsData = [
    {
      slug: 'igrs-rilis-kebijakan-baru',
      title: 'Resmi! IGRS Rilis Kebijakan Baru',
      excerpt: 'Kebijakan baru terkait sistem rating game yang disesuaikan oleh keinginan seskab teddy.',
      content: '<p>IGRS resmi merilis kebijakan baru terkait sistem rating game di Indonesia. Kebijakan ini mencakup pembaruan kriteria penilaian konten game yang lebih komprehensif dan sesuai dengan perkembangan industri game saat ini.</p><p>Kebijakan baru ini diharapkan dapat memberikan perlindungan yang lebih baik bagi pemain muda dan membantu orang tua dalam memilih game yang tepat untuk anak-anak mereka.</p>',
      thumbnail_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/news/igrs-kebijakan-baru.jpeg',
      thumbnail_caption: 'Mobile Legends mendapatkan rating untuk usia 13+ dari IGRS',
      type: 'Pengumuman',
      published_at: new Date('2026-06-30'),
    },
    {
      slug: 'panduan-memilih-game-untuk-anak',
      title: 'Panduan Lengkap Memilih Game untuk Anak',
      excerpt: 'Tips dan panduan bagi orang tua dalam memilih game yang aman dan edukatif untuk anak-anak.',
      content: '<p>Memilih game yang tepat untuk anak adalah tanggung jawab orang tua. Dengan sistem rating IGRS, orang tua kini dapat dengan mudah mengetahui konten game sebelum membelinya.</p><p>Berikut adalah panduan lengkap yang dapat membantu orang tua dalam memilih game yang sesuai dengan usia dan kebutuhan anak.</p>',
      thumbnail_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/news/panduan-game-anak.jpeg',
      thumbnail_caption: 'Anak-anak bermain game bareng',
      type: 'Artikel',
      published_at: new Date('2026-06-15'),
    },
    {
      slug: 'igrs-perluas-jangkauan-ke-game-mobile',
      title: 'IGRS Perluas Jangkauan Klasifikasi ke Game Mobile',
      excerpt: 'IGRS kini resmi mengklasifikasikan game mobile setelah sebelumnya fokus pada game PC dan konsol.',
      content: '<p>Dalam upaya memberikan perlindungan yang lebih menyeluruh, IGRS kini memperluas jangkauan sistem klasifikasinya ke platform mobile.</p><p>Langkah ini diambil mengingat tingginya penetrasi smartphone di Indonesia dan banyaknya anak-anak yang mengakses game melalui perangkat mobile.</p>',
      thumbnail_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/news/jangkauan-game.jpeg',
      thumbnail_caption: 'Game mobile populer yang kini terjangkau oleh sistem rating IGRS.',
      type: 'Pengumuman',
      published_at: new Date('2026-05-20'),
    },
    {
      slug: 'dampak-positif-game-edukasi',
      title: 'Dampak Positif Game Edukasi bagi Perkembangan Anak',
      excerpt: 'Penelitian terbaru menunjukkan bahwa game edukasi dengan rating SU dapat meningkatkan kemampuan kognitif anak.',
      content: '<p>Sebuah penelitian terbaru yang dilakukan oleh tim peneliti dari berbagai universitas di Indonesia menunjukkan bahwa game edukasi yang memiliki rating SU dari IGRS dapat memberikan dampak positif bagi perkembangan anak.</p><p>Hasil penelitian ini semakin memperkuat pentingnya sistem rating game dalam memilih konten yang tepat untuk anak.</p>',
      thumbnail_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/news/game-edukasi.jpeg',
      thumbnail_caption: 'Anak-anak bermain game edukasi',
      type: 'Artikel',
      published_at: new Date('2026-05-10'),
    },
    {
      slug: 'kerjasama-igrs-dan-developer-game-lokal',
      title: 'IGRS Jalin Kerjasama dengan Developer Game Lokal',
      excerpt: 'IGRS menandatangani MoU dengan 50 developer game lokal untuk mempercepat proses klasifikasi.',
      content: '<p>IGRS resmi menjalin kerjasama dengan 50 developer game lokal Indonesia dalam rangka mempercepat proses klasifikasi dan memastikan game-game lokal memiliki rating yang sesuai.</p><p>Kerjasama ini diharapkan dapat mendorong pertumbuhan industri game lokal yang sehat dan bertanggung jawab.</p>',
      thumbnail_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/news/game-lokal-developer.jpeg',
      thumbnail_caption: 'Menteri melihat alur kerja developer game lokal',
      type: 'Pengumuman',
      published_at: new Date('2026-04-25'),
    },
    {
      slug: 'tips-orang-tua-dampingi-anak-bermain-game',
      title: 'Tips untuk Orang Tua dalam Mendampingi Anak Bermain Game',
      excerpt: 'Berikut adalah tips praktis bagi orang tua untuk mendampingi anak bermain game secara sehat dan positif.',
      content: '<p>Mendampingi anak bermain game bukan berarti melarang, melainkan mengarahkan. Dengan pemahaman yang tepat tentang sistem rating IGRS, orang tua dapat membuat keputusan yang bijak.</p><p>Berikut beberapa tips praktis yang bisa diterapkan oleh orang tua dalam mendampingi anak bermain game.</p>',
      thumbnail_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/news/dampingin-anak.jpeg',
      thumbnail_caption: 'Orang tua mendampingi anak bermain Jenga',
      type: 'Artikel',
      published_at: new Date('2026-04-10'),
    },
  ];

  for (const news of newsData) {
    await prisma.news.upsert({
      where: { slug: news.slug },
      update: {},
      create: news,
    });
  }

  console.log(`✅ ${newsData.length} news seeded`);
}