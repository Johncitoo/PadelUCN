import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCanchaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;

  @IsBoolean()
  disponible: boolean;
}