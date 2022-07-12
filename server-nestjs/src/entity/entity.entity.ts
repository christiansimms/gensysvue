import { Entity as EntityCl, Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityCl()
export class Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parent_id?: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  fields?: string; // TODO: Should be JSONB?.

  @Column({ nullable: true })
  last_updated_by?: number;

  @Column({ nullable: true })
  last_updated_date?: string; // TODO: should be timestamp
}
