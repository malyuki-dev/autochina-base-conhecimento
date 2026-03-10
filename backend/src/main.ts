import * as dotenv from 'dotenv';
import { join } from 'path';
import * as express from 'express';

// Carrega o arquivo .env explicitamente antes de iniciar o NestJS
dotenv.config({ path: join(process.cwd(), '.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Mapear pastas externas pesadas diretamente no servidor da API
  const videosPath = join(process.cwd(), '..', 'TREINAMENTO DEALERNET');
  const portalPublic = join(videosPath, 'portal-treinamento', 'public');

  app.use('/assets/videos', express.static(videosPath));
  app.use(
    '/assets/thumbnails',
    express.static(join(portalPublic, 'thumbnails')),
  );
  app.use('/assets/docs', express.static(join(portalPublic, 'docs')));

  await app.listen(3000);
  console.log('✔ Backend Autochina operacional.');
}
void bootstrap();
