import { IsString, IsOptional, MaxLength, IsUUID, IsInt } from 'class-validator';

export class UpdateCompleteProjectDto {

  @IsString()
  @IsOptional()
  @MaxLength(400)
  linkImage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  nameImage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  subtitle?: string;

  @IsInt()
  @IsOptional()
  position?: number;

  @IsUUID() // Valida que sea un UUID válido
  @IsOptional()
  pageId?: string; // ID del page al que pertenece el hero-banner
  
}