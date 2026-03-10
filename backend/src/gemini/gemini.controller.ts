import { Controller, Post, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { PrismaService } from '../prisma.service'; // We need to create this if it doesn't exist, but it should since project uses Prisma.
import * as fs from 'fs';
import * as path from 'path';

// Note: I will assume prisma.service.ts exists in src/ as it is standard.

@Controller('gemini')
export class GeminiController {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('sync')
  async syncVideos() {
    const videoDir = path.join(process.cwd(), '..', 'TREINAMENTO DEALERNET');
    // We get all .mp4 files
    const files = fs.readdirSync(videoDir).filter((f) => f.endsWith('.mp4'));
    let syncedCount = 0;

    for (const file of files) {
      const fullPath = path.join(videoDir, file);

      // Check if it already exists in DB
      const existing = await this.prisma.resource.findFirst({
        where: { fileUrl: file },
      });

      if (existing && existing.geminiFileUri) {
        console.log(`Video ${file} is already synced.`);
        continue;
      }

      console.log(`Uploading ${file} to Gemini...`);
      // Upload to Gemini
      try {
        const geminiFileUri =
          await this.geminiService.uploadVideoToGemini(fullPath);

        // Save to DB
        if (existing) {
          await this.prisma.resource.update({
            where: { id: existing.id },
            data: { geminiFileUri },
          });
        } else {
          await this.prisma.resource.create({
            data: {
              title: file,
              fileUrl: `/videos/${file}`, // Assuming standard local URL convention
              type: 'video',
              category: 'Treinamento Dealernet',
              geminiFileUri,
            },
          });
        }
        syncedCount++;
      } catch (err) {
        console.error(`Failed to sync ${file}:`, err.message);
      }
    }

    return { message: 'Sync complete', syncedCount };
  }

  @Post('chat')
  async chatAboutVideo(@Body() body: { resourceId: number; question: string }) {
    const resource = await this.prisma.resource.findUnique({
      where: { id: body.resourceId },
    });

    if (!resource || !resource.geminiFileUri) {
      return { error: 'Resource not found or not synced with Gemini.' };
    }

    const answer = await this.geminiService.askQuestionAboutVideo(
      resource.geminiFileUri,
      body.question,
    );
    return { answer };
  }
}
