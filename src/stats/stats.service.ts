import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(): Promise<{
    games_total: number;
    publishers_total: number;
    genres_total: number;
    rating_distribution: Record<string, number>;
  }> {
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

    // Map rating distribution by rating code instead of id
    const ratingCodeMap = new Map<string, string>();
    ratings.forEach((r) => ratingCodeMap.set(r.id, r.code));

    const distribution: Record<string, number> = {};
    for (const item of ratingDistribution) {
      const code = ratingCodeMap.get(item.rating_id);
      if (code) {
        distribution[code] = item._count.id;
      }
    }

    return {
      games_total: gamesTotal,
      publishers_total: publishers.length,
      genres_total: genres.length,
      rating_distribution: distribution,
    };
  }
}
