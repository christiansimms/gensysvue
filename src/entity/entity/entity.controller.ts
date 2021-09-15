import { Controller, Get } from '@nestjs/common';
import { Entity } from '../entity.entity';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  constructor(private entitysService: EntityService) {}

  @Get()
  async index(): Promise<Entity[]> {
    const results = await this.entitysService.findAll();
    console.log('EntityController', results);
    return results;
  }
}
