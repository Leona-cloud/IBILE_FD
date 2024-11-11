import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../src/api/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { seedUsers } from './user.seed';

@Injectable()
export class SeedsService {
  constructor(private dataSource: DataSource) {}

  async runSeed() {
    await this.dataSource.initialize();
    const userRepository = this.dataSource.getRepository(UserEntity);

    await seedUsers(userRepository);

    await this.dataSource.destroy();
    console.log('Database seeding completed.');
  }
}
