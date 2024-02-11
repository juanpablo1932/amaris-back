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
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/", checkJwt, getAppointments);
router.get("/:id", checkJwt, getAppointment);
router.get("/patient/:id", checkJwt, getAppointmentByPatient);
router.post("/", checkJwt, createAppointment);
router.put("/:id", checkJwt, updateAppointment);
router.put("/admin/:id", checkJwt, updateAdminAppointment);
router.delete("/:id", checkJwt, deleteAppointment);

export { router };
