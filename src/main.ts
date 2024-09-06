import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with the necessary configurations
  app.enableCors({
    origin: 'https://your-netlify-site.netlify.app',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, Content-Encoding, X-Content-Compressed',
  });

  // Increase payload size limit
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(3000);
}
bootstrap();
