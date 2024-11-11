import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { VisitorsModule } from './visitors/visitors.module';

@Module({
  imports: [UsersModule, VisitorsModule],
})
export class APIModule {}
