import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private ai: any;

  constructor() {
    void this.initAi();
  }

  private async initAi() {
    // Dynamically import the ESM module to avoid CommonJS/ESM interop issues in NestJS
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const genai = await Function('return import("@google/genai")')();
    this.ai = new genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async uploadVideoToGemini(filePath: string): Promise<string> {
    this.logger.log(`Uploading video to Gemini: ${filePath}`);
    // Wait for the AI client to initialize if it hasn't
    while (!this.ai) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    try {
      const uploadResult = await this.ai.files.upload({
        file: filePath,
        config: { mimeType: 'video/mp4' },
      });
      this.logger.log(`Upload complete. URI: ${uploadResult.uri}`);

      let file = await this.ai.files.get({ name: uploadResult.name });
      while (file.state === 'PROCESSING') {
        this.logger.log('Waiting for video processing to complete...');
        // Wait for 10 seconds before checking again
        await new Promise((resolve) => setTimeout(resolve, 10000));
        file = await this.ai.files.get({ name: uploadResult.name });
      }

      if (file.state === 'FAILED') {
        throw new Error('Video processing failed in Gemini.');
      }

      this.logger.log(`Video processing complete. Ready for prompts.`);
      return uploadResult.uri;
    } catch (error) {
      this.logger.error(`Error uploading video: ${error.message}`);
      throw error;
    }
  }

  async askQuestionAboutVideo(
    geminiFileUri: string,
    question: string,
  ): Promise<string> {
    this.logger.log(`Asking question to Gemini for URI ${geminiFileUri}`);
    while (!this.ai) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-1.5-pro',
        contents: [
          {
            role: 'user',
            parts: [
              { fileData: { fileUri: geminiFileUri, mimeType: 'video/mp4' } },
              { text: question },
            ],
          },
        ],
      });
      // the new SDK returns the text via response.text property (getter) or response.text() depending on version
      return typeof response.text === 'function'
        ? response.text()
        : response.text;
    } catch (error) {
      this.logger.error(`Error asking question: ${error.message}`);
      throw error;
    }
  }
}
