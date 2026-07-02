import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StatsModule } from './stats/stats.module';
import { RatingsModule } from './ratings/ratings.module';
import { GamesModule } from './games/games.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [PrismaModule, StatsModule, RatingsModule, GamesModule, NewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
