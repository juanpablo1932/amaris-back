import { sign, verify } from "jsonwebtoken";
import { payloadDto } from "../dto/payload.dto";

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user: payloadDto) => {
  const payload = {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    rol: user.rol,
  };
  const jwt = sign(payload, JWT_SECRET, { expiresIn: "10h" });
  return jwt;
};

const verifyToken = (jwt: string) => {
  try {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
  } catch (e) {
    return false;
  }
};

export { generateToken, verifyToken };
