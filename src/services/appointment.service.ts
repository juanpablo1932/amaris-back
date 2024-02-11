import { createAppointmentBodyDto } from "../dto/appointment.dto";
import { pgInsert } from "./postgresql.service";
import messages from "../util/messages.json";

export class AppointmentsService {
  async createAppointment(appointment: createAppointmentBodyDto) {
    try {
      // const rolExist = await this.getRolByDetail(rol.detail);
      // if (rolExist.length > 0) throw new Error(messages.rol.error.exists);

      const sql = `INSERT INTO appointments (date, type_id, patient_id, doctor_id) VALUES ($1, $2, $3, $4)`;
      const values = [
        appointment.date,
        appointment.type_id,
        appointment.patient_id,
        appointment.doctor_id,
      ];

      const rowCount = await pgInsert(sql, values);
      if (rowCount === 0)
        throw new Error(messages.appointment.error.notCreated);

      return rowCount;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
