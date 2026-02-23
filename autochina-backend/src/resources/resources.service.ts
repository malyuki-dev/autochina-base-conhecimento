import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Importação correta agora

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // Retorna todos os livros/vídeos ordenados pelos mais recentes
    return this.prisma.resource.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(data: { title: string; type: any; url: string; category: string }) {
    return this.prisma.resource.create({ data });
  }
}