import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Appointments } from "./appointments.entity";

@Entity("doctores")
export class Doctors {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column()
  full_name: string;

  @OneToMany(() => Appointments, (appointment) => appointment.doctor)
  appointments: Appointments[];
}
