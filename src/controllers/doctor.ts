import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { DoctorService } from "../services/doctor.service";

const doctorService = new DoctorService();

const getDoctorByName = async (req: Request, res: Response) => {
  try {
    const response = await doctorService.getDoctorByName(req.params.name);
    res.send(response);
  } catch (e) {
    handleHttp(res, e.message);
  }
};

export { getDoctorByName };
