import "reflect-metadata";
import "dotenv/config";
import AppDataSource from "./config/datasource";
import { app } from "./config/createServer";
import { DataSource } from "typeorm";
import {
  PORT_DB,
  HOST_DB,
  USERNAME_DB,
  DB_PASSWORD,
} from "./config/env-variable";

export const connectionOptions = new DataSource({
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
});

export const startServer = async () => {
  try {
    await AppDataSource.initialize();

    return app;
  } catch (err) {
    console.log(err);
  }
};

startServer();
