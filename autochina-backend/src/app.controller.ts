import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('resources')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  // Rota para listar todos os livros/vídeos
  @Get()
  async getResources() {
    return this.prisma.resource.findMany();
  }

  // Rota para anexar um novo recurso
  @Post()
  async createResource(@Body() data: { 
    title: string, 
    type: 'BOOK' | 'VIDEO' | 'TEXT', 
    url: string, 
    category: string 
  }) {
    return this.prisma.resource.create({
      data: {
        title: data.title,
        type: data.type,
        url: data.url,
        category: data.category,
      }
    });
  }
}