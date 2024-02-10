import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AppointmentType } from "./appointmentType.entity";
import { Patients } from "./patients.entity";
import { Doctors } from "./doctors.entity";
@Entity("citas")
export class Appointments {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column()
  date: Date;

  @ManyToOne(() => AppointmentType, (type) => type.appointments)
  @JoinColumn({ name: "type_id" })
  type: AppointmentType;

  @ManyToOne(() => Patients, (patient) => patient.appointments)
  @JoinColumn({ name: "patient_id" })
  patient: Patients;

  @ManyToOne(() => Doctors, (doctor) => doctor.appointments)
  @JoinColumn({ name: "doctor_id" })
  doctor: Doctors;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
