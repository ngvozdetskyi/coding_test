import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private publishersRepository: Repository<Publisher>,
  ) {}
  create(publisherData: Omit<Publisher, 'id'>) {
    if (!publisherData) return;
    return this.publishersRepository.save(publisherData);
  }
  update(id: string, publisherData: Omit<Publisher, 'id'>) {
    if (!id || !publisherData) return;
    return this.publishersRepository.update(id, publisherData);
  }
  remove(id: string) {
    if (!id) return;
    return this.publishersRepository.delete(id);
  }
}
