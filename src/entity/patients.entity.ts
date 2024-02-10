import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Appointments } from "./appointments.entity";

@Entity("patients")
export class Patients {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  full_name: string;

  @Column()
  password: string;

  @OneToMany(() => Appointments, (appointment) => appointment.patient)
  appointments: Appointments[];
}
