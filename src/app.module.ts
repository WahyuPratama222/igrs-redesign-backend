import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StatsModule } from './stats/stats.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [PrismaModule, StatsModule, RatingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
