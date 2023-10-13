import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' })); // Increase the limit of the body size
  app.enableCors(); // Enable CORS for all origins
  app.use(cookieParser()); // Use cookie parser
  await app.listen(3000);
}
bootstrap();
