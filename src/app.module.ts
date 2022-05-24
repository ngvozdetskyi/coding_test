import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { PublishersModule } from './publishers/publishers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './games/entities/game.entity';
import { Publisher } from './publishers/entities/publisher.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: '0000',
      host: 'nest-postgres',
      port: 5432,
      database: 'postgres',
      retryAttempts: 3,
      entities: [Publisher, Game],
      synchronize: true,
    }),
    PublishersModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
