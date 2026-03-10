import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  async getAll() {
    return await this.resourcesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.resourcesService.findOne(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    resourceData: {
      title: string;
      type: 'BOOK' | 'VIDEO' | 'TEXT';
      url: string;
      category: string;
    },
  ) {
    return await this.resourcesService.create(resourceData);
  }
}
