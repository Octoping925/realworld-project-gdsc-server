import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const config = new DocumentBuilder()
  .setTitle('GDSC Realworld API')
  .setDescription('GDSC Realworld API 문서')
  .setVersion('1.0')
  .build();

export function createSwaggerDocument(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
