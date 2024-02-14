import { pgQuery } from "./postgresql.service";

export class DoctorService {
  async getDoctorByName(name) {
    try {
      let sql = `
        SELECT
          d.id,
          d.full_name
        FROM doctors d
        WHERE 1 = 1
      `;
      if (name) {
        sql += ` AND d.full_name LIKE '%${name}%'`;
      }
      const res = await pgQuery(sql, []);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getDoctorByExactlyName(name) {
    try {
      let sql = `
        SELECT
          d.id,
          d.full_name
        FROM doctors d
        WHERE d.full_name = '${name}'
      `;
      const res = await pgQuery(sql, []);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
