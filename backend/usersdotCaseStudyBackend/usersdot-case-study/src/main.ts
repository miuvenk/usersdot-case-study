import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { createDatabaseIfNotExists } from './database-setup';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const configService = new ConfigService(); 

  await createDatabaseIfNotExists(configService);

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(4000);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap the application:', err);
  process.exit(1); 
});
