import { Module } from '@nestjs/common';
import { EntityService } from './entity/entity.service';
import { EntityController } from './entity/entity.controller';
import { Entity } from './entity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: [EntityService],
  controllers: [EntityController],
})
export class EntityModule {}
