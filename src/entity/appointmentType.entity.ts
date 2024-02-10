import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appointments } from "./appointments.entity";
@Entity("appointment_type")
export class AppointmentType {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column()
  detail: string;

  @OneToMany(() => Appointments, (appointment) => appointment.type)
  appointments: Appointments[];
}
