import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { QueryGamesDto } from './dto/query-games.dto';
import { SearchGamesDto } from './dto/search-games.dto';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async getPopularSearch() {
    return this.prisma.game.findMany({
      where: { is_popular: true },
      select: { id: true, name: true, slug: true },
      orderBy: { name: 'asc' },
    });
  }

  async search(dto: SearchGamesDto) {
    if (!dto.q) return [];
    return this.prisma.game.findMany({
      where: {
        name: { contains: dto.q, mode: 'insensitive' },
      },
      select: { name: true, slug: true, cover_image_url: true },
      take: 8,
    });
  }

  async getGenres() {
    return this.prisma.gameGenre.findMany({
      distinct: ['name'],
      select: { name: true, slug: true },
      orderBy: { name: 'asc' },
    });
  }

  async findAll(dto: QueryGamesDto) {
    const page = parseInt(dto.page || '1', 10);
    const limit = parseInt(dto.limit || '12', 10);
    const skip = (page - 1) * limit;

    const modes = dto.mode ? (Array.isArray(dto.mode) ? dto.mode : [dto.mode]) : undefined;

    const where: Prisma.GameWhereInput = {
      ...(dto.q && {
        OR: [
          { name: { contains: dto.q, mode: 'insensitive' } },
          { developer: { contains: dto.q, mode: 'insensitive' } },
          { genres: { some: { name: { contains: dto.q, mode: 'insensitive' } } } },
        ],
      }),
      ...(dto.platform && { platform: { has: dto.platform } }),
      ...(dto.rating && { rating: { code: dto.rating } }),
      ...(dto.genre && { genres: { some: { slug: dto.genre } } }),
      ...(modes?.length && { game_modes: { hasSome: modes } }),
    };

    const [data, total] = await Promise.all([
      this.prisma.game.findMany({
        where,
        select: {
          id: true,
          name: true,
          slug: true,
          cover_image_url: true,
          developer: true,
          release_year: true,
          platform: true,
          rating: {
            select: { code: true, badge_image_url: true, color: true },
          },
          genres: {
            select: { name: true },
          },
        },
        orderBy: dto.sort === 'popular' ? { is_popular: 'desc' } : { name: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.game.count({ where }),
    ]);

    const formattedData = data.map((game) => ({
      ...game,
      genres: game.genres.map((g) => g.name),
    }));

    return {
      data: formattedData,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findOne(slug: string) {
    const game = await this.prisma.game.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        cover_image_url: true,
        background_image_url: true,
        description: true,
        trailer_url: true,
        trailer_duration: true,
        platform: true,
        release_year: true,
        developer: true,
        size: true,
        game_modes: true,
        rating: {
          select: { code: true, label: true, badge_image_url: true, color: true },
        },
        genres: {
          select: { name: true },
        },
        content_descriptors: {
          select: { name: true, icon: true, description: true },
        },
      },
    });

    if (!game) {
      throw new NotFoundException(`Game "${slug}" tidak ditemukan`);
    }

    return {
      ...game,
      genres: game.genres.map((g) => g.name),
    };
  }
}
