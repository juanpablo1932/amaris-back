import { Router } from "express";
import { getTypeByDetail } from "../controllers/type";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/:detail?", checkJwt, getTypeByDetail);

export { router };
