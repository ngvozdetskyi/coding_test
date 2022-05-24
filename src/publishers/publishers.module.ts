import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublishersService],
  exports: [PublishersService],
})
export class PublishersModule {}
