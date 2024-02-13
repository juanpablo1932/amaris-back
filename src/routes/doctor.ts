import { Router } from "express";
import { getDoctorByName } from "../controllers/doctor";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/:name", checkJwt, getDoctorByName);

export { router };
