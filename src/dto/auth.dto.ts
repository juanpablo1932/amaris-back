import { IsOptional, IsString } from "class-validator";

export class authDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  rol?: string;
}
