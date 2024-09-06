import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with the necessary configurations
  app.enableCors({
    origin: 'http://localhost:9000',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, Content-Encoding',
  });

  await app.listen(3000);
}
bootstrap();
