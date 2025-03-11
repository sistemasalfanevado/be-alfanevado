import { IsString, IsOptional, MaxLength, IsUUID } from 'class-validator';

export class UpdateContentDto {
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