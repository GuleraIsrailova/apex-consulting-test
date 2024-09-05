/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Axel-test')
    .setDescription('The Axel-test API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Api is running on: http://localhost:${port}`
  );
}

bootstrap();
