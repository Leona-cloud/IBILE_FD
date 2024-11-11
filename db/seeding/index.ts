import { Module } from '@nestjs/common';
import { SeedsService } from './seed.service';
import dataSource from '../data-source';
import { DataSource } from 'typeorm';

@Module({
  providers: [
    SeedsService,
    {
      provide: DataSource,
      useValue: dataSource,
    },
  ],
  exports: [SeedsService],
})
export class SeedsModule {}
