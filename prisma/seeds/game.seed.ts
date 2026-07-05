import { PrismaClient } from '@prisma/client';

export async function seedGames(prisma: PrismaClient) {
  console.log('🎮 Seeding games...');

  // 1. Ambil semua rating untuk mapping code -> id
  const ratings = await prisma.rating.findMany({
    select: { id: true, code: true },
  });
  const ratingMap = Object.fromEntries(ratings.map((r) => [r.code, r.id]));

  // 2. Data mentah game (Setiap game sekarang memiliki 3 content descriptors)
  const gamesData = [
    {
      slug: 'minecraft',
      name: 'Minecraft',
      cover_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/covers/minecraft-cover.webp',
      background_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/backgrounds/minfecraft-background.jpeg',
      description: 'Minecraft adalah game sandbox yang memungkinkan pemain untuk membangun dan menjelajahi dunia yang dibuat dari blok-blok. Game ini menawarkan mode kreatif dan survival yang membebaskan imajinasi pemain.',
      trailer_url: 'https://youtu.be/jLuJbSjo7NA?si=6QH8lXmYaV_zwBls',
      trailer_duration: '02:30',
      platform: ['PC', 'Mobile', 'Nintendo', 'PlayStation'],
      release_year: 2011,
      developer: 'Mojang Studios',
      size: '1 GB',
      game_modes: ['Single Player', 'Multiplayer', 'Online'],
      is_popular: true,
      rating_code: '3+',
      genres: [
        { name: 'Sand Box', slug: 'sand-box' },
        { name: 'Adventure', slug: 'adventure' },
      ],
      content_descriptors: [
        { name: 'Kekerasan Ringan', icon: 'sword', description: 'Mengandung pertarungan ringan melawan monster malam.' },
        { name: 'Interaksi Online', icon: 'message-circle', description: 'Pemain dapat berinteraksi dan bermain bersama di server multiplayer.' },
        { name: 'Pembelian Digital', icon: 'file-text', description: 'Terdapat marketplace internal untuk membeli skin dan tekstur.' },
      ],
    },
    {
      slug: 'elden-ring',
      name: 'Elden Ring',
      cover_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/covers/elden-ring-cover.jpeg',
      background_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/backgrounds/elden-ring-background.jpeg',
      description: 'Elden Ring adalah epik Action-RPG dunia terbuka yang meleburkan desain gameplay legendaris dari FromSoftware dengan mitologi mendalam ciptaan George R.R. Martin.',
      trailer_url: 'https://youtu.be/E3Huy2cdih0?si=Lnoz_cRn4VOMT9GL',
      trailer_duration: '01:34',
      platform: ['PC', 'PlayStation'],
      release_year: 2022,
      developer: 'From Software',
      size: '44.5 GB',
      game_modes: ['Single Player', 'Multiplayer', 'Online'],
      is_popular: true,
      rating_code: '18+',
      genres: [
        { name: 'Souls Like', slug: 'souls-like' },
        { name: 'Adventure', slug: 'adventure' },
        { name: 'Fantasy', slug: 'fantasy' },
      ],
      content_descriptors: [
        { name: 'Kekerasan Intens', icon: 'warning-triangle', description: 'Pertarungan brutal jarak dekat dan sihir melawan boss.' },
        { name: 'Darah dan Gore', icon: 'skull', description: 'Menampilkan efek cipratan darah yang jelas dan mutilasi makhluk mengerikan.' },
        { name: 'Interaksi Online', icon: 'message-circle', description: 'Fitur multiplayer untuk bermain kooperatif atau invasi antar pemain.' },
      ],
    },
    {
      slug: 'genshin-impact',
      name: 'Genshin Impact',
      cover_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/covers/genshin-impact-cover.jpeg',
      background_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/backgrounds/genshin-impact-background.jpeg',
      description: 'Genshin Impact adalah action RPG open-world dengan sistem elemen yang unik. Jelajahi dunia Teyvat yang luas dan temukan misteri di balik setiap sudutnya.',
      trailer_url: 'https://youtu.be/TAlKhARUcoY?si=gooNisSV0xOgJ2Ix',
      trailer_duration: '03:20',
      platform: ['PC', 'Mobile', 'PlayStation'],
      release_year: 2020,
      developer: 'HoYoverse',
      size: '30 GB',
      game_modes: ['Single Player', 'Multiplayer', 'Online'],
      is_popular: true,
      rating_code: '13+',
      genres: [
        { name: 'Action', slug: 'action' },
        { name: 'Anime', slug: 'anime' },
        { name: 'Adventure', slug: 'adventure' },
      ],
      content_descriptors: [
        { name: 'Kekerasan Ringan', icon: 'sword', description: 'Pertarungan menggunakan senjata bergaya fantasi anime.' },
        { name: 'Interaksi Online', icon: 'message-circle', description: 'Fitur co-op dengan pemain lain secara online di dunia open world.' },
        { name: 'Pembelian In-Game', icon: 'file-text', description: 'Mengandung sistem gacha untuk mendapatkan karakter dan senjata.' },
      ],
    },
    {
      slug: 'honkai-star-rail',
      name: 'Honkai: Star Rail',
      cover_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/covers/honkai-star-rail-cover.webp',
      background_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/backgrounds/honkai-star-rail-background.jpeg',
      description: 'Honkai: Star Rail adalah RPG turn-based yang mengajak pemain menjelajahi antariksa bersama Astral Express. Hadapi berbagai ancaman dengan strategi dan tim yang tepat.',
      trailer_url: 'https://youtu.be/GaT1GftoqV0?si=vx9FKp1_E5fAHebE',
      trailer_duration: '02:45',
      platform: ['PC', 'Mobile', 'PlayStation'],
      release_year: 2023,
      developer: 'HoYoverse',
      size: '15 GB',
      game_modes: ['Single Player', 'Online'],
      is_popular: true,
      rating_code: '13+',
      genres: [
        { name: 'Turn Base', slug: 'turn-base' },
        { name: 'Anime', slug: 'anime' },
        { name: 'Action', slug: 'action' },
      ],
      content_descriptors: [
        { name: 'Kekerasan Ringan', icon: 'sword', description: 'Pertarungan turn-based dengan efek animasi visual yang intens.' },
        { name: 'Interaksi Online', icon: 'message-circle', description: 'Fitur online untuk chat, meminjam karakter support friend, dan event.' },
        { name: 'Pembelian In-Game', icon: 'file-text', description: 'Pembelian tiket warp gacha menggunakan mata uang premium.' },
      ],
    },
    {
      slug: 'mobile-legends',
      name: 'Mobile Legends: Bang Bang',
      cover_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/covers/mobile-legends-cover.jpeg',
      background_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/backgrounds/mobile-legends-background.jpeg',
      description: 'Mobile Legends: Bang Bang adalah game MOBA mobile 5v5 yang kompetitif. Pilih hero favoritmu dan raih kemenangan bersama tim.',
      trailer_url: 'https://youtu.be/cftqT7au9gk?si=1fCK81UICkVCxoaL',
      trailer_duration: '01:50',
      platform: ['Mobile'],
      release_year: 2016,
      developer: 'Moonton',
      size: '2 GB',
      game_modes: ['Multiplayer', 'Online'],
      is_popular: true,
      rating_code: '13+',
      genres: [
        { name: 'Action', slug: 'action' },
        { name: 'Fantasy', slug: 'fantasy' },
      ],
      content_descriptors: [
        { name: 'Kekerasan Ringan', icon: 'sword', description: 'Pertarungan antar hero menggunakan sihir dan senjata dalam arena.' },
        { name: 'Interaksi Online', icon: 'message-circle', description: 'Komunikasi tim secara real-time via teks dan voice chat saat pertandingan.' },
        { name: 'Bahasa Kasar Ringan', icon: 'message-x', description: 'Potensi paparan kata-kata kurang pantas dari komunitas pemain online.' },
      ],
    },
    {
      slug: 'valorant',
      name: 'Valorant',
      cover_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/covers/valorant-cover.jpeg',
      background_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/backgrounds/valorant-background.jpeg',
      description: 'Valorant adalah game taktis first-person shooter 5v5 yang menggabungkan akurasi tembakan dan kemampuan unik setiap agen.',
      trailer_url: 'https://youtu.be/lWr6dhTcu-E?si=5upJlHvFP5eu7t86',
      trailer_duration: '02:10',
      platform: ['PC'],
      release_year: 2020,
      developer: 'Riot Games',
      size: '20 GB',
      game_modes: ['Multiplayer', 'Online'],
      is_popular: true,
      rating_code: '18+',
      genres: [
        { name: 'Action', slug: 'action' },
        { name: 'Fantasy', slug: 'fantasy' },
      ],
      content_descriptors: [
        { name: 'Kekerasan Takstis', icon: 'warning-triangle', description: 'Aksi tembak-tembakan senjata api sudut pandang orang pertama dengan efek mati.' },
        { name: 'Interaksi Online', icon: 'message-circle', description: 'Sistem matchmaking kompetitif 5v5 berbasis voice chat koordinasi tinggi.' },
        { name: 'Bahasa Kasar', icon: 'message-x', description: 'Kemungkinan tinggi terpapar bahasa toxic/kasar dari komunikasi antar pemain.' },
      ],
    },
    {
      slug: 'roblox',
      name: 'Roblox',
      cover_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/covers/roblox-cover.jpeg',
      background_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/backgrounds/roblox-background.jpeg',
      description: 'Roblox adalah platform game online yang memungkinkan pengguna membuat dan memainkan berbagai game yang dibuat oleh komunitas.',
      trailer_url: 'https://youtu.be/sme76WoJ_-U?si=zVLma9YilodCOgvg',
      trailer_duration: '01:30',
      platform: ['PC', 'Mobile'],
      release_year: 2006,
      developer: 'Roblox Corporation',
      size: '500 MB',
      game_modes: ['Single Player', 'Multiplayer', 'Online'],
      is_popular: true,
      rating_code: '7+',
      genres: [
        { name: 'Sand Box', slug: 'sand-box' },
        { name: 'Adventure', slug: 'adventure' },
      ],
      content_descriptors: [
        { name: 'Interaksi Online', icon: 'message-circle', description: 'Platform sosial luas berbasis interaksi, berteman, dan nongkrong virtual.' },
        { name: 'Kekerasan Kartun Ringan', icon: 'sword', description: 'Beberapa ruang permainan buatan user mengandung aksi pukul animasi lego.' },
        { name: 'Pembelian Opsional', icon: 'file-text', description: 'Toko Robux terintegrasi untuk membeli akses item buatan kreator.' },
      ],
    },
    {
      slug: 'pokemon-tcg-pocket',
      name: 'Pokemon TCG Pocket',
      cover_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/covers/roblox-cover.jpeg',
      background_image_url: 'https://tbaytbnfqglcnjmireuj.supabase.co/storage/v1/object/public/backgrounds/pokemon-tcg-card-background.jpeg',
      description: 'Pokemon TCG Pocket adalah game kartu digital Pokemon yang memungkinkan pemain mengumpulkan dan bertarung menggunakan kartu Pokemon favorit mereka.',
      trailer_url: 'https://youtu.be/RGQsfOxyL9E?si=nlASQg5Has8tT-pR',
      trailer_duration: '01:45',
      platform: ['Mobile'],
      release_year: 2024,
      developer: 'The Pokemon Company',
      size: '800 MB',
      game_modes: ['Single Player', 'Multiplayer', 'Online'],
      is_popular: false,
      rating_code: '7+',
      genres: [
        { name: 'Card', slug: 'card' },
        { name: 'Anime', slug: 'anime' },
      ],
      content_descriptors: [
        { name: 'Interaksi Online', icon: 'message-circle', description: 'Pertarungan kartu strategis PvP secara real-time dengan user global.' },
        { name: 'Fitur Koleksi Sosial', icon: 'file-text', description: 'Fitur display dan trading kartu digital antar sesama kolektor.' },
        { name: 'Animasi Pertarungan', icon: 'sword', description: 'Efek visual kartun ringan saat kartu Pokemon meluncurkan serangan.' },
      ],
    },
  ];

  // 3. Proses Loop Idempotent (Aman dari Duplikasi Relasi)
  for (const gameData of gamesData) {
    const { genres, content_descriptors, rating_code, ...game } = gameData;

    const ratingId = ratingMap[rating_code];
    if (!ratingId) {
      console.warn(`⚠️ Rating dengan kode "${rating_code}" tidak ditemukan untuk game: ${game.name}. Skipping...`);
      continue;
    }

    // Cari tahu apakah game sudah ada di database Supabase lewat slug
    const existingGame = await prisma.game.findUnique({ where: { slug: game.slug } });

    if (existingGame) {
      // Hapus relasi lama yang datanya masih 1 atau 2 deskriptor agar tidak bentrok
      await prisma.gameGenre.deleteMany({ where: { game_id: existingGame.id } });
      await prisma.contentDescriptor.deleteMany({ where: { game_id: existingGame.id } });
    }

    // Simpan/update data game beserta relasi baru yang berjumlah 3 descriptor
    await prisma.game.upsert({
      where: { slug: game.slug },
      update: {
        ...game,
        rating_id: ratingId,
        genres: { create: genres },
        content_descriptors: { create: content_descriptors },
      },
      create: {
        ...game,
        rating_id: ratingId,
        genres: { create: genres },
        content_descriptors: { create: content_descriptors },
      },
    });
  }

  console.log(`✅ ${gamesData.length} games seeded safely with 3 descriptors each.`);
}