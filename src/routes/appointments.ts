import { Router, Request, Response } from "express";
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointments,
  deleteAppointment,
} from "../controllers/appointments";

const router = Router();

router.get("/", getAppointments);
router.get("/:id", getAppointment);
router.post("/", createAppointment);
router.put("/:id", updateAppointments);
router.delete("/:id", deleteAppointment);

export { router };
