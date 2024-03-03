import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://realworld-project-gdsc-client.vercel.app/',
    ],
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  createSwaggerDocument(app);

  await app.listen(3000);
}

bootstrap();
