import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorsEntity } from './entities/visitors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitorsEntity])],
  controllers: [],
  providers: [],
})
export class VisitorsModule {}
