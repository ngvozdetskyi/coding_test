import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Publisher } from '../../publishers/entities/publisher.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  price: number;

  @OneToOne(() => Publisher, { onDelete: 'CASCADE' })
  @JoinColumn()
  publisher: Publisher;

  @Column({ nullable: false, type: 'simple-array' })
  tags: string[];

  @Column({ nullable: false, type: 'date' })
  releaseDate: string;
}
