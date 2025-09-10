import { DataSource, DataSourceOptions } from 'typeorm';

import dotenv from 'dotenv';

import fs from 'fs';

import { join } from 'path';

dotenv.config({ path: '.env' });

export const config = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, './entities/*.entity{.ts,.js}')],
  logging: process.env.DATABASE_LOG === 'true' ? true : false,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' ? true : false,
  dropSchema: process.env.DATABASE_DROP_SCHEMA === 'true' ? true : false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
  migrations: ['./src/infrastructure/database/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(config as DataSourceOptions);

export default dataSource;
