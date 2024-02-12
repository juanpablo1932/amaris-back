import { authDto } from "../dto/auth.dto";
import { Repository } from "typeorm";
import { Patients } from "../entity/patients.entity";
import { Staff } from "../entity/staff.entity";
import AppDataSource from "../config/datasource";
import { generateToken } from "../util/jwt.handle";

const loginUser = async ({ email, password }: authDto) => {
  const patientRepo: Repository<Patients> =
    AppDataSource.getRepository(Patients);
  const patient = await patientRepo.findOne({ where: { email } });
  if (!patient) {
    throw new Error("User not found");
  }
  if (patient.password !== password) {
    throw new Error("Invalid password");
  }

  const token = generateToken(patient);

  return {
    token,
    id: patient.id,
    email: patient.email,
    full_name: patient.full_name,
  };
};
const loginAdmin = async ({ email, password, rol }: authDto) => {
  const staffRepo: Repository<Staff> = AppDataSource.getRepository(Staff);
  const staff = await staffRepo.findOne({ where: { email } });
  if (!staff) {
    throw new Error("staff not found");
  }
  if (staff.password !== password) {
    throw new Error("Invalid password");
  }
  if (staff.rol !== rol) {
    throw new Error("You are not an admin");
  }

  const token = generateToken(staff);

  return {
    token,
    id: staff.id,
    email: staff.email,
    full_name: staff.full_name,
    rol: staff.rol,
  };
};

export { loginUser, loginAdmin };
