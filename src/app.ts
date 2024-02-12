import "reflect-metadata";
import "dotenv/config";
import AppDataSource from "./config/datasource";
import { app } from "./config/createServer";

export const startServer = async () => {
  try {
    await AppDataSource.initialize();

    return app;
  } catch (err) {
    console.log(err);
  }
};

startServer();
