import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  siret: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  phone: string;
}
