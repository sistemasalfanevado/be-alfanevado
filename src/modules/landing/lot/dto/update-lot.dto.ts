import { IsString, IsOptional, MaxLength, IsUUID, IsNumber } from 'class-validator';

export class UpdateLotDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  number?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  block?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  code?: string;

  @IsNumber()
  @IsOptional()
  length?: number;

  @IsNumber()
  @IsOptional()
  width?: number;

  @IsUUID() // Valida que sea un UUID válido
  @IsOptional()
  statusId?: string; // ID del estado del lote

  @IsUUID() // Valida que sea un UUID válido
  @IsOptional()
  pageId?: string; // ID de la página a la que pertenece el lote
}