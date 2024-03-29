import {
  createAppointmentBodyDto,
  updateAppointmentParamsDto,
} from "../dto/appointment.dto";
import { pgQuery } from "./postgresql.service";
import messages from "../util/messages.json";
import { DoctorService } from "./doctor.service";

export class AppointmentsService {
  async validateAvailability(date: Date, doctor_id: string) {
    try {
      const sql = `
        SELECT COUNT(*) FROM appointments
        WHERE doctor_id = $1
        AND $2 BETWEEN (date - INTERVAL '14 MINUTE 59 SECOND') AND (date + INTERVAL '14 MINUTE 59 SECOND')
        AND deleted_at IS NULL
      `;
      const values = [doctor_id, date];
      const res = await pgQuery(sql, values);

      return res[0]["count"];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createAppointment(appointment: createAppointmentBodyDto) {
    try {
      const validate = await this.validateAvailability(
        appointment.date,
        appointment.doctor_id
      );
      if (parseInt(validate) > 0)
        throw new Error(messages.appointment.error.exists);

      const sql = `INSERT INTO appointments (date, type_id, patient_id, doctor_id) VALUES ($1, $2, $3, $4)`;
      const values = [
        appointment.date,
        appointment.type_id,
        appointment.patient_id,
        appointment.doctor_id,
      ];

      const res = await pgQuery(sql, values);
      if (res.rowCount === 0)
        throw new Error(messages.appointment.error.notCreated);

      return res.rowCount;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAppointments() {
    try {
      const sql = `
        SELECT
          a.id,
          a.date,
          t.detail AS type,
          p.full_name AS patient,
          d.id AS doctor_id,
          d.full_name AS doctor
        FROM appointments a
        JOIN appointment_type t ON a.type_id = t.id
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        WHERE a.deleted_at IS NULL
      `;
      const res = await pgQuery(sql);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAppointment(id: string) {
    try {
      const sql = `
        SELECT
          a.id,
          a.date,
          t.detail AS type,
          p.full_name AS patient,
          d.id AS doctor_id,
          d.full_name AS doctor
        FROM appointments a
        JOIN appointment_type t ON a.type_id = t.id
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        WHERE a.id = $1
      `;
      const values = [id];
      const res = await pgQuery(sql, values);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAppointmentByPatient(patient_id: string) {
    try {
      const sql = `
        SELECT
          a.id,
          a.date,
          t.detail AS type,
          p.full_name AS patient,
          d.id AS doctor_id,
          d.full_name AS doctor
        FROM appointments a
        JOIN appointment_type t ON a.type_id = t.id
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        WHERE a.patient_id = $1
        AND a.deleted_at IS NULL
      `;
      const values = [patient_id];
      const res = await pgQuery(sql, values);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateAppointment(appointment: updateAppointmentParamsDto) {
    try {
      const validateAppointment = await this.getAppointment(appointment.id);
      if (validateAppointment.length === 0)
        throw new Error(messages.appointment.error.notFound);

      const validateDoctor = await this.validateAvailability(
        appointment.date,
        appointment.doctor_id
      );
      if (parseInt(validateDoctor) > 0)
        throw new Error(messages.appointment.error.exists);

      const sql = `UPDATE appointments SET date = $1 WHERE id = $2`;
      const values = [appointment.date, appointment.id];
      const res = await pgQuery(sql, values);
      if (res.rowCount === 0)
        throw new Error(messages.appointment.error.notUpdated);

      return res.rowCount;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateAdminAppointment(appointment: updateAppointmentParamsDto) {
    const doctorService = new DoctorService();
    try {
      const validateAppointment = await this.getAppointment(appointment.id);
      if (validateAppointment.length === 0)
        throw new Error(messages.appointment.error.notFound);

      const getDoctorByName = await doctorService.getDoctorByExactlyName(
        appointment.doctor
      );
      if (getDoctorByName.length === 0)
        throw new Error(messages.doctor.error.notFound);

      const validateDoctor = await this.validateAvailability(
        appointment.date,
        getDoctorByName[0].id
      );
      if (parseInt(validateDoctor) > 0)
        throw new Error(messages.appointment.error.exists);

      const sql = `UPDATE appointments SET doctor_id = $1 WHERE id = $2`;
      const values = [getDoctorByName[0].id, appointment.id];
      const res = await pgQuery(sql, values);
      if (res.rowCount === 0)
        throw new Error(messages.appointment.error.notUpdated);

      return res.rowCount;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAppointment(id: string) {
    try {
      const validate = await this.getAppointment(id);
      if (validate.length === 0)
        throw new Error(messages.appointment.error.notFound);

      const sql = `UPDATE appointments SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1`;
      const values = [id];
      const res = await pgQuery(sql, values);
      if (res.rowCount === 0)
        throw new Error(messages.appointment.error.notDeleted);

      return res.rowCount;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
