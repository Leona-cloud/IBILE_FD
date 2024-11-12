import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async fetchAllStaff() {
    const staffs = await this.usersRepository.find();

    return {
      message: 'Staffs fetched successfully',
      statusCode: HttpStatus.OK,
      data: staffs,
    };
  }
}
