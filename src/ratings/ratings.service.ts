import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Rating, RatingHighlight } from '@prisma/client';

type RatingWithHighlights = Rating & {
  highlights: RatingHighlight[];
};

@Injectable()
export class RatingsService {
  private readonly logger = new Logger(RatingsService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RatingWithHighlights[]> {
    this.logger.log('Fetching all ratings...');
    const start = Date.now();

    const result = await this.prisma.rating.findMany({
      include: {
        highlights: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { code: 'asc' },
    });

    this.logger.log(`All ratings fetched in ${Date.now() - start}ms`);
    return result;
  }
}
