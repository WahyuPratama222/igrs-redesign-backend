import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { QueryGamesDto } from './dto/query-games.dto';
import { SearchGamesDto } from './dto/search-games.dto';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);

  constructor(private prisma: PrismaService) {}

  async getPopularSearch() {
    this.logger.log('Fetching popular games...');
    const start = Date.now();

    const result = await this.prisma.game.findMany({
      where: { is_popular: true },
      select: { id: true, name: true, slug: true },
      orderBy: { name: 'asc' },
    });

    this.logger.log(`Popular games fetched in ${Date.now() - start}ms`);
    return result;
  }

  async search(dto: SearchGamesDto) {
    this.logger.log(`Searching games with query: ${dto.q}`);
    const start = Date.now();

    if (!dto.q) {
      this.logger.log(`Search games finished in ${Date.now() - start}ms`);
      return [];
    }

    const result = await this.prisma.game.findMany({
      where: {
        name: { contains: dto.q, mode: 'insensitive' },
      },
      select: { name: true, slug: true, cover_image_url: true },
      take: 8,
    });

    this.logger.log(`Search games finished in ${Date.now() - start}ms`);
    return result;
  }

  async getGenres() {
    this.logger.log('Fetching genres...');
    const start = Date.now();

    const result = await this.prisma.gameGenre.findMany({
      distinct: ['name'],
      select: { name: true, slug: true },
      orderBy: { name: 'asc' },
    });

    this.logger.log(`Genres fetched in ${Date.now() - start}ms`);
    return result;
  }

  async findAll(dto: QueryGamesDto) {
    this.logger.log('Fetching all games with filters...');
    const start = Date.now();

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

    const result = {
      data: formattedData,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit) || 1,
      },
    };

    this.logger.log(`All games fetched in ${Date.now() - start}ms`);
    return result;
  }

  async findOne(slug: string) {
    this.logger.log(`Fetching game with slug: ${slug}...`);
    const start = Date.now();

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
      this.logger.warn(`Game with slug "${slug}" not found`);
      throw new NotFoundException(`Game "${slug}" tidak ditemukan`);
    }

    const result = {
      ...game,
      genres: game.genres.map((g) => g.name),
    };

    this.logger.log(`Game with slug ${slug} fetched in ${Date.now() - start}ms`);
    return result;
  }
}
