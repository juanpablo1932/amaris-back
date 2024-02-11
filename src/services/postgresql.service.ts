import { AppDataSource } from "../app";

export async function pgQuery(sql: string, values?: any[]) {
  const manager = AppDataSource.manager;
  try {
    const result = await manager.query(sql, values);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}
