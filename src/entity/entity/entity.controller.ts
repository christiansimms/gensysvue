import {Controller, Get} from '@nestjs/common';

@Controller('entity')
export class EntityController {
  @Get()
  index(): string {
    return 'This action will return data';
  }
}
