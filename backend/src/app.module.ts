import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GeminiModule } from './gemini/gemini.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [AuthModule, UsersModule, GeminiModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
