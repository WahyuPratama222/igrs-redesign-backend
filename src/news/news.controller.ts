import { Controller, Get, Param, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { QueryNewsDto } from './dto/query-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(@Query() dto: QueryNewsDto) {
    return this.newsService.findAll(dto);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.newsService.findOne(slug);
  }
}
