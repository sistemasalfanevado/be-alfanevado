import { IsString, IsOptional, MaxLength, IsUUID } from 'class-validator';

export class UpdateContentYearDto {
  @IsString()
  @IsOptional()
  @MaxLength(10)
  year?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  yearMessage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  subtitle?: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  linkImage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  nameImage?: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsOptional()
  pageId?: string; // ID del page al que pertenece el contenido
}