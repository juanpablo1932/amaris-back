import { Router } from "express";
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  updateAdminAppointment,
  deleteAppointment,
  getAppointmentByPatient,
} from "../controllers/appointments";

const router = Router();

router.get("/", getAppointments);
router.get("/:id", getAppointment);
router.get("/patient/:id", getAppointmentByPatient);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.put("/admin/:id", updateAdminAppointment);
router.delete("/:id", deleteAppointment);

export { router };
