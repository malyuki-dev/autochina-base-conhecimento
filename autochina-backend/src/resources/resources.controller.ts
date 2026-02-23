import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  async getAll() {
    return await this.resourcesService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() resourceData: { 
      title: string; 
      type: 'BOOK' | 'VIDEO' | 'TEXT'; 
      url: string; 
      category: string 
    }
  ) {
    return await this.resourcesService.create(resourceData);
  }
}