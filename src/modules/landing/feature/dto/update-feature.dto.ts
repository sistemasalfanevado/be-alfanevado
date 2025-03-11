import { IsString, IsOptional, MaxLength, IsUUID } from 'class-validator';

export class UpdateFeatureDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  detail?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  icon?: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsOptional()
  pageId?: string; // ID del page al que pertenece el feature
}