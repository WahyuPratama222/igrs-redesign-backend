import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StatsModule } from './stats/stats.module';
import { RatingsModule } from './ratings/ratings.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [PrismaModule, StatsModule, RatingsModule, GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
