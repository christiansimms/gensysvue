import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Entity } from '../entity.entity';

@Injectable()
export class EntityService {
  constructor(
    @InjectRepository(Entity)
    private entityRepository: Repository<Entity>,
  ) {}

  async findAll(): Promise<Entity[]> {
    return await this.entityRepository.find();
  }

  async findOne(id: number): Promise<Entity> {
    return await this.entityRepository.findOne(id);
  }

  async create(entity: Entity): Promise<Entity> {
    return await this.entityRepository.save(entity);
  }

  async update(entity: Entity): Promise<UpdateResult> {
    return await this.entityRepository.update(entity.id, entity);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.entityRepository.delete(id);
  }
}
