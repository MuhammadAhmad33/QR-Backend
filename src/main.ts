import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // Allow all origins
  });

  await app.listen(3001);
}
bootstrap();