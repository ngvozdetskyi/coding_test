import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { PublishersService } from '../publishers/publishers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { PublisherServiceMock } from './test_doubles/mocks/publisher.servise.mock';
import { getGameRepositoryMock } from './test_doubles/mocks/game.repository.mock';
import {
  gameReturningData,
  createIncomingData,
  returningData,
} from './test_doubles/stubs/game.service.create.stub';
import { updateIncomingData } from './test_doubles/stubs/game.service.update.stub';

describe('GamesService', () => {
  let service: GamesService;
  let GameRepositoryMock;
  beforeEach(async () => {
    GameRepositoryMock = getGameRepositoryMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: getRepositoryToken(Game),
          useValue: GameRepositoryMock,
        },
        {
          provide: PublishersService,
          useValue: PublisherServiceMock,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create game', () => {
    it('it returns undefined', async () => {
      const result = await service.create(null);
      expect(result).toBe(undefined);
    });
    it('it returns created game', async () => {
      const result = await service.create(createIncomingData);
      expect(PublisherServiceMock.create.mock.calls.length).toBe(1);
      expect(GameRepositoryMock.save.mock.calls.length).toBe(1);
      expect(result).toEqual(returningData);
    });
  });
  describe('find games', () => {
    it('it returns undefined', async () => {
      const result = await service.find(null);
      expect(result).toBe(undefined);
    });
    it('it returns an object game', async () => {
      const result = await service.find({ title: 'test99' });
      expect(GameRepositoryMock.find.mock.calls.length).toBe(1);
      expect(result).toEqual([gameReturningData]);
    });
  });
  describe('findOne game', () => {
    it('it returns undefined', async () => {
      const result = await service.findOne(null);
      expect(result).toBe(undefined);
    });
    it('it returns an object game', async () => {
      const result = await service.findOne('1');
      expect(GameRepositoryMock.findOne.mock.calls.length).toBe(1);
      expect(result).toEqual(returningData);
    });
  });
  describe('update game', () => {
    it('it returns undefined', async () => {
      const result = await service.update(null, null);
      expect(result).toBe(undefined);
    });
    it('it updates game and publisher', async () => {
      await service.update('1', updateIncomingData);
      expect(GameRepositoryMock.update.mock.calls.length).toBe(1);
      expect(PublisherServiceMock.update.mock.calls.length).toBe(1);
    });
  });
  describe('remove game', () => {
    it('it returns undefined', async () => {
      const result = await service.remove(null);
      expect(result).toBe(undefined);
    });
    it('it removes game', async () => {
      const result = await service.remove('1');
      expect(GameRepositoryMock.findOne.mock.calls.length).toBe(1);
      expect(PublisherServiceMock.remove.mock.calls.length).toBe(1);
      expect(result).toEqual({ success: true });
    });
  });
});
