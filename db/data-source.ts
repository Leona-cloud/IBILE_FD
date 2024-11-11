import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from 'dotenv';
import { UserEntity } from '../src/api/users/entities/user.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  entities: ['dist/**/*.entity.js', UserEntity],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
