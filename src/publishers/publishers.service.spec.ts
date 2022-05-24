import { Test, TestingModule } from '@nestjs/testing';
import { PublishersService } from './publishers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';

describe('PublishersService', () => {
  let service: PublishersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublishersService,
        {
          provide: getRepositoryToken(Publisher),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PublishersService>(PublishersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
