import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Rating, RatingHighlight } from '@prisma/client';

type RatingWithHighlights = Rating & {
  highlights: RatingHighlight[];
};

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RatingWithHighlights[]> {
    return this.prisma.rating.findMany({
      include: {
        highlights: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { code: 'asc' },
    });
  }
}
