import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ResourcesService } from '../src/resources/resources.service';
import { ResourcesController } from '../src/resources/resources.controller';

@Module({
  imports: [],
  controllers: [ResourcesController],
  providers: [PrismaService, ResourcesService],
})
export class AppModule {}