import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { VisitorsModule } from './visitors/visitors.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [UsersModule, VisitorsModule, EmailModule],
})
export class APIModule {}
