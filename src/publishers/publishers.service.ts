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
    if (!publisherData) {
      throw new Error('Publisher data to create is not provided.');
    };
    return this.publishersRepository.save(publisherData);
  }
  update(id: string, publisherData: Omit<Publisher, 'id'>) {
    if (!id || !publisherData) {
      throw new Error('Publisher data to update or id is not provided.');
    }
    return this.publishersRepository.update(id, publisherData);
  }
  remove(id: string) {
    if (!id) {
      throw new Error('Publisher id to remove is not provided.');
    };
    return this.publishersRepository.delete(id);
  }
}
