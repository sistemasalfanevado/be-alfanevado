import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class CreateLotDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  number: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  block: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty()
  statusId: string; // ID del estado del lote

  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty()
  pageId: string; // ID de la página a la que pertenece el lote
}