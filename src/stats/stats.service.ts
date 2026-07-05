import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);

  constructor(private prisma: PrismaService) {}

  async getDashboard(): Promise<{
    games_total: number;
    publishers_total: number;
    genres_total: number;
    rating_distribution: Record<string, number>;
  }> {
    this.logger.log('Fetching dashboard stats...');
    const start = Date.now();

    const [gamesTotal, publishers, genres, ratingDistribution, ratings] =
      await Promise.all([
        this.prisma.game.count(),
        this.prisma.game.findMany({
          distinct: ['developer'],
          select: { developer: true },
        }),
        this.prisma.gameGenre.findMany({
          distinct: ['name'],
          select: { name: true },
        }),
        this.prisma.game.groupBy({
          by: ['rating_id'],
          _count: { id: true },
        }),
        this.prisma.rating.findMany({
          select: { id: true, code: true },
        }),
      ]);

    const ratingCodeMap = new Map<string, string>();
    ratings.forEach((r) => ratingCodeMap.set(r.id, r.code));

    const distribution: Record<string, number> = {};

    ratings.forEach((r) => {
      distribution[r.code] = 0;
    });

    for (const item of ratingDistribution) {
      const code = ratingCodeMap.get(item.rating_id);
      if (code) {
        distribution[code] = item._count.id;
      }
    } 

   const ORDER = ['SU', '3+', '7+', '13+', '18+'];
    const sortedDistribution: Record<string, number> = {};
    ORDER.forEach((code) => {
      sortedDistribution[code] = distribution[code] ?? 0;
    });

    const result = {
      games_total: gamesTotal,
      publishers_total: publishers.length,
      genres_total: genres.length,
      rating_distribution: sortedDistribution,
    };

    this.logger.log(`Dashboard stats fetched in ${Date.now() - start}ms`);
    return result;
  }
}
