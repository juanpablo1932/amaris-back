import { authDto } from "../dto/auth.dto";
import { generateToken } from "../util/jwt.handle";
import { pgQuery } from "./postgresql.service";

const loginUser = async ({ email, password }: authDto) => {
  const sql = `
  SELECT * FROM patients WHERE email = $1 LIMIT 1;
`;
  const values = [email];
  const patient = await pgQuery(sql, values);
  if (!patient) {
    throw new Error("User not found");
  }
  if (patient[0].password !== password) {
    throw new Error("Invalid password");
  }

  const token = generateToken(patient);

  return {
    statusCode: 200,
    user: {
      token,
      id: patient[0].id,
      email: patient[0].email,
      full_name: patient[0].full_name,
    },
  };
};
const loginAdmin = async ({ email, password, rol }: authDto) => {
  const sql = `
  SELECT * FROM staff WHERE email = $1 LIMIT 1;
`;
  const values = [email];
  const staff = await pgQuery(sql, values);
  if (!staff) {
    throw new Error("staff not found");
  }
  if (staff[0].password !== password) {
    throw new Error("Invalid password");
  }
  if (staff[0].rol !== rol) {
    throw new Error("You are not an admin");
  }

  const token = generateToken(staff);

  return {
    statusCode: 200,
    user: {
      token,
      id: staff[0].id,
      email: staff[0].email,
      full_name: staff[0].full_name,
      rol: staff[0].rol,
    },
  };
};

export { loginUser, loginAdmin };
