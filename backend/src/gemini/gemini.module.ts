import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [GeminiService, PrismaService],
  controllers: [GeminiController],
})
export class GeminiModule {}
