import { Entity as EntityCl, Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityCl()
export class Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parent_id?: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  fields?: string; // TODO: Should be JSONB?.

  @Column()
  last_updated_by?: number;

  @Column()
  last_updated_date?: string; // TODO: should be timestamp
}
