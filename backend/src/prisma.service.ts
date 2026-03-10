import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✔ Banco de Dados Autochina conectado.');
    } catch (error) {
      console.error('✘ Erro de conexão:', error.message);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
