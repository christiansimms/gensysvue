import { Controller, Get } from '@nestjs/common';
import { Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Entity } from '../entity.entity';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  constructor(private entitysService: EntityService) {}

  @Get()
  async index(): Promise<Entity[]> {
    const results = await this.entitysService.findAll();
    return results;
  }

  @Get(':id')
  async getOne(@Param('id') id): Promise<Entity> {
    const results = await this.entitysService.findOne(id);
    return results;
  }

  @Post()
  async create(@Body() entityData: Entity): Promise<any> {
    return this.entitysService.create(entityData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() entityData: Entity): Promise<any> {
    entityData.id = Number(id);
    return this.entitysService.update(entityData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.entitysService.delete(id);
  }
}
