import { IsString, IsEmail, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  @IsOptional()
  saldo?: number;

  @IsBoolean()
  @IsOptional()
  es_admin?: boolean;
}
