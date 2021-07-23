import { Module } from '@nestjs/common';
import { EntityService } from './entity/entity.service';
import { EntityController } from './entity/entity.controller';

@Module({
  providers: [EntityService],
  controllers: [EntityController]
})
export class EntityModule {}
