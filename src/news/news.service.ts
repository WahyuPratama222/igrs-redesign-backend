import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { QueryNewsDto } from './dto/query-news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll(dto: QueryNewsDto) {
    const page = parseInt(dto.page || '1', 10);
    const limit = parseInt(dto.limit || '9', 10);
    const skip = (page - 1) * limit;

    const where: Prisma.NewsWhereInput = {
      ...(dto.type && { type: dto.type }),
      ...(dto.exclude && { slug: { not: dto.exclude } }),
    };

    const [data, total] = await Promise.all([
      this.prisma.news.findMany({
        where,
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          thumbnail_url: true,
          type: true,
          published_at: true,
        },
        orderBy: { published_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.news.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findOne(slug: string) {
    const news = await this.prisma.news.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        content: true,
        thumbnail_url: true,
        thumbnail_caption: true,
        type: true,
        published_at: true,
      }
    });

    if (!news) {
      throw new NotFoundException(`Berita "${slug}" tidak ditemukan`);
    }

    return news;
  }
}
