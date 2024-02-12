import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;

// Database config
export const PORT_DB = Number(process.env.PORT_DB);
export const HOST_DB = process.env.HOST_DB;
export const USERNAME_DB = process.env.USERNAME_DB;
export const DB_PASSWORD = process.env.DB_PASSWORD;
