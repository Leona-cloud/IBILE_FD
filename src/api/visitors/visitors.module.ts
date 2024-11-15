import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorsEntity } from './entities/visitors.entity';
import { VisitorsController } from './visitors.controllers';
import { VisitorsService } from './visitors.services';
import { UserEntity } from '../users/entities/user.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([VisitorsEntity, UserEntity]), EmailModule],
  controllers: [VisitorsController],
  providers: [VisitorsService],
})
export class VisitorsModule {}
