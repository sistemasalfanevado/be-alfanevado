import { IsString, IsOptional, MaxLength, IsUUID, IsNumber } from 'class-validator';

export class UpdateContentDto {

  @IsNumber()
  @IsOptional()
  position?: number;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  subtitle?: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsOptional()
  pageId?: string; // ID del page al que pertenece el contenido
}