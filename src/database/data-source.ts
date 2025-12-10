import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'estagio',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});
