import { seedRatings } from './seeds/rating.seed';
import { seedGames } from './seeds/game.seed';
import { seedNews } from './seeds/news.seed';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  
  await seedRatings(prisma);
  await seedGames(prisma);
  await seedNews(prisma);
  
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });