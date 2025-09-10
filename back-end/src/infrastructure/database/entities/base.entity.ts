import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class BaseEntity {

  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  ID: number;
}
