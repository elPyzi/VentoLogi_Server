import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { ENV } from '@shared/schemes/configScheme';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const configService = app.get<ConfigService<ENV>>(ConfigService);

  const apiPrefix = configService.get<string>('API_PREFIX');
  const port = configService.get<number>('PORT');

  if (!apiPrefix || !port) {
    process.exit(1);
  }

  app.setGlobalPrefix(apiPrefix);
  await app.listen(port);
}
bootstrap();
