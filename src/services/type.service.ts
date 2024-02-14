import { pgQuery } from "./postgresql.service";

export class TypeService {
  async getTypeByDetail(detail) {
    try {
      let sql = `
        SELECT
          t.id,
          t.detail
        FROM appointment_type t
        WHERE 1 = 1
      `;
      if (detail) {
        sql += ` AND t.detail LIKE '%${detail}%'`;
      }
      const res = await pgQuery(sql, []);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
