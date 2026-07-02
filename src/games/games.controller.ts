import { Controller, Get, Param, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { QueryGamesDto } from './dto/query-games.dto';
import { SearchGamesDto } from './dto/search-games.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('popular-search')
  async getPopularSearch() {
    return this.gamesService.getPopularSearch();
  }

  @Get('search')
  async search(@Query() dto: SearchGamesDto) {
    return this.gamesService.search(dto);
  }

  @Get('genres')
  async getGenres() {
    return this.gamesService.getGenres();
  }

  @Get()
  async findAll(@Query() dto: QueryGamesDto) {
    return this.gamesService.findAll(dto);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.gamesService.findOne(slug);
  }
}
