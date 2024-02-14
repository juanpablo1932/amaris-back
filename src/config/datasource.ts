import { DataSource, DataSourceOptions } from "typeorm";
import { PORT_DB, HOST_DB, USERNAME_DB, DB_PASSWORD } from "./env-variable";

console.log(__dirname);

const AppDataSource: DataSourceOptions = {
  type: "postgres",
  host: HOST_DB,
  port: PORT_DB,
  username: USERNAME_DB,
  password: DB_PASSWORD,
  database: "postgres",
  entities: [__dirname + "/entity/*.entity.{js,ts}"],
  synchronize: false,
  migrations: [__dirname + "/migrations/*.{js,ts}"],
  dropSchema: false,
  migrationsTableName: "migrations",
};

export default new DataSource(AppDataSource);
