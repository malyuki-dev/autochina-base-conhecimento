import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) { }

  @Get()
  async getResources() {
    return this.prisma.resource.findMany();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createResource(
    @Body()
    data: {
      title: string;
      description?: string;
      fileUrl: string;
      type: string; // TS Reload trigger
      category: string;
    },
  ) {
    return this.prisma.resource.create({
      data: {
        title: data.title,
        description: data.description,
        fileUrl: data.fileUrl,
        type: data.type,
        category: data.category,
      },
    });
  }
}
