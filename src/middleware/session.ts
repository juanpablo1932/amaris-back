import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt.handle";
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request {
  user?: string | JwtPayload;
}

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const headersToken = req.headers.authorization || "";

    const token = headersToken.split(" ")[1];

    const userData = verifyToken(token);

    if (!userData) throw new Error("Unauthorized");

    req.user = userData;
    next();
  } catch (e) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export { checkJwt };
