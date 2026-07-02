import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RatingsService } from './ratings.service';

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all ratings with highlights' })
  @ApiResponse({ status: 200, description: 'Return all ratings' })
  async findAll() {
    return this.ratingsService.findAll();
  }
}
