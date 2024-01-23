import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  createSwaggerDocument(app);

  await app.listen(3000);
}

bootstrap();
