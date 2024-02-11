import { IsDate, IsString } from "class-validator";

export class createAppointmentBodyDto {
  @IsDate()
  date: Date;

  @IsString()
  type_id: string;

  @IsString()
  patient_id: string;

  @IsString()
  doctor_id: string;
}

export class updateAppointmentBodyDto {
  @IsDate()
  date: Date;

  @IsString()
  doctor_id: string;
}

export class updateAppointmentParamsDto extends updateAppointmentBodyDto {
  @IsString()
  id: string;
}
