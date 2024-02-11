import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import {
  createAppointmentBodyDto,
  updateAppointmentParamsDto,
} from "../dto/appointment.dto";
import { AppointmentsService } from "../services/appointment.service";
import messages from "../util/messages.json";

const appointmentsService = new AppointmentsService();

const getAppointment = async (req: Request, res: Response) => {
  try {
    const response = await appointmentsService.getAppointment(req.params.id);
    res.send(response);
  } catch (e) {
    handleHttp(res, e.message);
  }
};

const getAppointments = async (req: Request, res: Response) => {
  try {
    const response = await appointmentsService.getAppointments();
    res.send(response);
  } catch (e) {
    handleHttp(res, e.message);
  }
};

const getAppointmentByPatient = async (req: Request, res: Response) => {
  try {
    const response = await appointmentsService.getAppointmentByPatient(
      req.params.id
    );
    res.send(response);
  } catch (e) {
    handleHttp(res, e.message);
  }
};

const updateAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentData: updateAppointmentParamsDto = {
      date: req.body.date,
      doctor_id: req.body.doctor_id,
      id: req.params.id,
    };
    await appointmentsService.updateAppointment(appointmentData);
    res.send({ mesage: messages.appointment.succes.updated });
  } catch (e) {
    handleHttp(res, e.message);
  }
};

const updateAdminAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentData: updateAppointmentParamsDto = {
      date: req.body.date,
      doctor_id: req.body.doctor_id,
      id: req.params.id,
    };
    await appointmentsService.updateAdminAppointment(appointmentData);
    res.send({ mesage: messages.appointment.succes.updated });
  } catch (e) {
    handleHttp(res, e.message);
  }
};

const createAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentData: createAppointmentBodyDto = {
      date: req.body.date,
      type_id: req.body.type_id,
      patient_id: req.body.patient_id,
      doctor_id: req.body.doctor_id,
    };

    await appointmentsService.createAppointment(appointmentData);
    res.send({ mesage: messages.appointment.succes.created });
  } catch (e) {
    handleHttp(res, e.message);
  }
};

const deleteAppointment = async (req: Request, res: Response) => {
  try {
    await appointmentsService.deleteAppointment(req.params.id);
    res.send({ mesage: messages.appointment.succes.deleted });
  } catch (e) {
    handleHttp(res, e.message);
  }
};

export {
  getAppointment,
  getAppointments,
  getAppointmentByPatient,
  updateAppointment,
  updateAdminAppointment,
  createAppointment,
  deleteAppointment,
};
