import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { QueryGamesDto } from './dto/query-games.dto';
import { SearchGamesDto } from './dto/search-games.dto';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('popular-search')
  @ApiOperation({ summary: 'Get popular search games' })
  @ApiResponse({ status: 200, description: 'Return popular games' })
  async getPopularSearch() {
    return this.gamesService.getPopularSearch();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search games by name (autocomplete)' })
  @ApiResponse({ status: 200, description: 'Return search suggestions' })
  async search(@Query() dto: SearchGamesDto) {
    return this.gamesService.search(dto);
  }

  @Get('genres')
  @ApiOperation({ summary: 'Get all unique genres' })
  @ApiResponse({ status: 200, description: 'Return list of genres' })
  async getGenres() {
    return this.gamesService.getGenres();
  }

  @Get()
  @ApiOperation({ summary: 'Get games list with filters and pagination' })
  @ApiResponse({ status: 200, description: 'Return games list' })
  async findAll(@Query() dto: QueryGamesDto) {
    return this.gamesService.findAll(dto);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get game detail by slug' })
  @ApiResponse({ status: 200, description: 'Return game detail' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findOne(@Param('slug') slug: string) {
    return this.gamesService.findOne(slug);
  }
}
