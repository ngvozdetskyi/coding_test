import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PublishersModule } from '../publishers/publishers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), PublishersModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
