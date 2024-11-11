import { NestFactory } from '@nestjs/core';
import dataSource from './db/data-source';
import { SeedsService } from './db/seeding/seed.service';
import { SeedsModule } from './db/seeding/index';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedsModule);
  const seedsService = app.get(SeedsService);

  try {
    await seedsService.runSeed();
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
