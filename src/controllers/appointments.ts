import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";

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
    res.send(req.body);
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
