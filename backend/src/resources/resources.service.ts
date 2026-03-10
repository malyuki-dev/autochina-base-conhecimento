import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; //

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.resource.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        steps: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.resource.findUnique({
      where: { id },
      include: {
        steps: true,
      },
    });
  }

  async create(data: any) {
    return this.prisma.resource.create({ data });
  }
}
