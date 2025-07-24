import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'El nombre no debe exceder los 150 caracteres' })
  name: string;

  @IsString()
  @IsNotEmpty()
  companyId: string; // Nuevo campo requerido
}