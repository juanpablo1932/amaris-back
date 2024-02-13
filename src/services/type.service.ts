import { pgQuery } from "./postgresql.service";

export class TypeService {
  async getTypeByDetail(detail) {
    try {
      const sql = `
        SELECT
          t.id,
          t.detail
        FROM appointment_type t
        WHERE t.detail LIKE '%${detail}%'
      `;
      const res = await pgQuery(sql, []);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
