import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  Query,
  Put,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GetGamesQuery } from './dto/get-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    try {
      return await this.gamesService.create(createGameDto);
    } catch (err) {
      const { message } = err;
      throw new BadRequestException(message);
    }
  }

  @Get()
  async find(@Query() getGamesQuery: GetGamesQuery) {
    try {
      return await this.gamesService.find(getGamesQuery);
    } catch (err) {
      const { message } = err;
      throw new BadRequestException(message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.gamesService.findOne(id);
    } catch (err) {
      const { message } = err;
      throw new BadRequestException(message);
    }
  }
  @Get('get-publisher-by-game/:id')
  async getPublisherByGameId(@Param('id') id: string) {
    try {
      const result = await this.gamesService.findOne(id, {
        join: {
          alias: 'game',
          leftJoinAndSelect: { publisher: 'game.publisher' },
        },
      });
      return !result?.publisher ? {} : result.publisher;
    } catch (err) {
      const { message } = err;
      throw new BadRequestException(message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    try {
      return await this.gamesService.update(id, updateGameDto);
    } catch (err) {
      const { message } = err;
      throw new BadRequestException(message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.gamesService.remove(id);
    } catch (err) {
      const { message } = err;
      throw new BadRequestException(message);
    }
  }

  @Post('apply-sales-delete-old-games')
  async deleteOldGamesAndApplySales() {
    try {
      await this.gamesService.deleteOldGames();
      await this.gamesService.applySales();
    } catch (err) {
      const { message } = err;
      throw new BadRequestException(message);
    }
  }
}
