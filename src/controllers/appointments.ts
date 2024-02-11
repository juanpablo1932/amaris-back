import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { createAppointmentBodyDto } from "../dto/appointment.dto";
import { AppointmentsService } from "../services/appointment.service";
import messages from "../util/messages.json";

const getAppointment = async (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, e.message);
  }
};

const getAppointments = async (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, e.message);
  }
};

const updateAppointments = async (req: Request, res: Response) => {
  try {
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
    const appointmentsService = new AppointmentsService();
    await appointmentsService.createAppointment(appointmentData);
    res.send(messages.appointment.succes.created);
  } catch (e) {
    handleHttp(res, e.message);
  }
};

const deleteAppointment = async (req: Request, res: Response) => {
  try {
  } catch (e) {
    handleHttp(res, e.message);
  }
};

export {
  getAppointment,
  getAppointments,
  updateAppointments,
  createAppointment,
  deleteAppointment,
};
