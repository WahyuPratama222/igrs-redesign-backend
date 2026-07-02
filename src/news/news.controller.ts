import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { QueryNewsDto } from './dto/query-news.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get news list with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Return news list' })
  async findAll(@Query() dto: QueryNewsDto) {
    return this.newsService.findAll(dto);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get news detail by slug' })
  @ApiResponse({ status: 200, description: 'Return news detail' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findOne(@Param('slug') slug: string) {
    return this.newsService.findOne(slug);
  }
}
