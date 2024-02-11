import { Request, Response } from "express";
import { loginUser, loginAdmin } from "../services/auth.service";
import { handleHttp } from "../util/error.handler";

const loginCtrl = async (req: Request, res: Response) => {
  const { email, password, rol } = req.body;
  try {
    if (!req.body.rol) {
      const response = await loginUser({ email, password });
      res.send(response);
    } else {
      const response = await loginAdmin({ email, password, rol });
      res.send(response);
    }
  } catch (e) {
    handleHttp(res, e.message);
  }
};

export { loginCtrl };
