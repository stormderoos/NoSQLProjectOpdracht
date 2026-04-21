import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
  ApiResponseInterceptor,
} from '@avans-nx-workshop/backend/dto';
import { AppModule } from './app/app.module';
import { environment } from '@avans-nx-workshop/shared/util-env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://jolly-meadow-00d0ed103.5.azurestaticapps.net'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  Logger.log('Running in production mode?', environment.production);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  const appUrl = await app.getUrl();
  Logger.log(`DATA-API server is running on: ${appUrl}/api`);
}

bootstrap();