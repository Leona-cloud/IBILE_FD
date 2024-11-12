import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorsEntity } from './entities/visitors.entity';
import { VisitorsController } from './visitors.controllers';
import { VisitorsService } from './visitors.services';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitorsEntity, UserEntity])],
  controllers: [VisitorsController],
  providers: [VisitorsService],
})
export class VisitorsModule {}
