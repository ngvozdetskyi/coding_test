import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PublishersService } from '../publishers/publishers.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GetGamesQuery } from './dto/get-game.dto';
import { Publisher } from '../publishers/entities/publisher.entity';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    private readonly publishersService: PublishersService,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    if (!createGameDto) {
      throw new Error('Game create data is not provided.');
    }
    const { publisher, ...restData } = createGameDto;
    const createdPublisher = await this.publishersService.create(publisher);
    return this.gamesRepository.save({
      publisher: createdPublisher,
      ...restData,
    });
  }

  find(query: GetGamesQuery) {
    if (!query) {
      throw new Error('Query to find games is not provided.');
    }
    return this.gamesRepository.find(query);
  }

  findOne<T extends FindOneOptions<Game>, K extends Pick<T, 'select'>>(
    id: string,
    options?: T,
  ): Promise<Pick<Game, K['select'][number]> & { publisher?: Publisher }> {
    if (!id) {
      throw new Error('Id to find game is not provided.');
    }
    return this.gamesRepository.findOne(id, options);
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    if (!id || !updateGameDto) {
      throw new Error('Game update data or id is not provided.');
    }
    const { publisher, ...restData } = updateGameDto;
    await this.gamesRepository.update(id, restData);
    const { id: publisherId, ...restPublisherData } = publisher;
    if (publisherId) {
      await this.publishersService.update(publisherId, restPublisherData);
    }
  }

  async remove(id: string) {
    if (!id) {
      throw new Error('Id to delete game is not provided.');
    }
    const foundGame = await this.findOne(id, {
      join: {
        alias: 'game',
        leftJoinAndSelect: { publisher: 'game.publisher' },
      },
    });
    await this.publishersService.remove(foundGame?.publisher?.id);
  }

  async applySales(percentsOfSale: number, from: string, to: string) {
    if (typeof percentsOfSale !== 'number') {
      return;
    }
    await this.gamesRepository
      .createQueryBuilder()
      .update(Game)
      .set({ price: () => `price - (price / 100.0 * ${percentsOfSale})` })
      .where(
        "\"releaseDate\" between (current_date - INTERVAL concat(:from, 'month')) and (current_date - INTERVAL  :to 'month')",
        { from, to },
      )
      .execute();
  }

  async deleteOldGames(from: string) {
    const gamesWithOnlyId: Pick<Game, 'id'>[] = await this.gamesRepository
      .createQueryBuilder()
      .select('id')
      .where('"releaseDate" < (current_date - INTERVAL \':from month\')', {
        from,
      })
      .execute();
    await Promise.all(gamesWithOnlyId.map((game) => this.remove(game.id)));
    return { deletedGames: gamesWithOnlyId.length };
  }
}
