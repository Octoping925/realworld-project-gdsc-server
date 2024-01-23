import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import {
  SWAGGER_API_VERSION,
  SWAGGER_DESCRIPTION,
  SWAGGER_PATH,
  SWAGGER_TITLE,
} from './swagger.constant';

const config = new DocumentBuilder()
  .setTitle(SWAGGER_TITLE)
  .setDescription(SWAGGER_DESCRIPTION)
  .setVersion(SWAGGER_API_VERSION)
  .build();

export function createSwaggerDocument(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document);
}
