import { pgQuery } from "./postgresql.service";

export class DoctorService {
  async getDoctorByName(name) {
    try {
      const sql = `
        SELECT
          d.id,
          d.full_name
        FROM doctors d
        WHERE d.full_name LIKE '%${name}%'
      `;
      const res = await pgQuery(sql, []);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
