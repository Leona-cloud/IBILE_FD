import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.services';

@Controller('staffs')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async fetchAllStaff() {
    return this.usersService.fetchAllStaff();
  }
}
