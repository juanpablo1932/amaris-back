import { Router } from "express";
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointments,
  deleteAppointment,
  getAppointmentByPatient,
} from "../controllers/appointments";

const router = Router();

router.get("/", getAppointments);
router.get("/:id", getAppointment);
router.get("/patient/:id", getAppointmentByPatient);
router.post("/", createAppointment);
router.put("/:id", updateAppointments);
router.delete("/:id", deleteAppointment);

export { router };
