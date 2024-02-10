import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST_DB,
  port: 54320,
  username: process.env.USERNAME_DB,
  password: process.env.DB_PASSWORD,
  database: "postgres",
  entities: [__dirname + "/entity/*.entity.{js,ts}"],
  synchronize: false,
  migrations: [__dirname + "/migrations/*.{js,ts}"],
  dropSchema: false,
  migrationsTableName: "migrations",
});

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
