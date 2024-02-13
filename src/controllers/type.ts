import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { TypeService } from "../services/type.service";

const typeService = new TypeService();

const getTypeByDetail = async (req: Request, res: Response) => {
  try {
    const response = await typeService.getTypeByDetail(req.params.detail);
    res.send(response);
  } catch (e) {
    handleHttp(res, e.message);
  }
};

export { getTypeByDetail };
