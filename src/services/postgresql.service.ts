import { Client } from "pg";
import { AppDataSource } from "../app";

// export async function pgQuery(
//   sql: string,
//   values?: any[],
//   pagination?: { offset: number; limit: number }
// ) {
//   const dbProvider = await getConnection();
//   try {
//     let total;
//     if (pagination) {
//       const { offset, limit } = pagination;
//       total = await await dbProvider.query(sql, values);
//       total = total.rowCount;
//       sql += ` OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;
//     }
//     const result = await dbProvider.query(sql, values);
//     await dbProvider.end();
//     return pagination ? { rows: result.rows, total } : result.rows;
//   } catch (error) {
//     throw new Error(error.message);
//   } finally {
//     await dbProvider.end();
//   }
// }

export async function pgInsert(sql: string, values?: any[]) {
  const manager = AppDataSource.manager;
  try {
    const result = await manager.query(sql, values);
    return result.rowCount;
  } catch (error) {
    throw new Error(error.message);
  }
}
