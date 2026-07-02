import { Controller, Get } from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  async findAll() {
    return this.ratingsService.findAll();
  }
}
