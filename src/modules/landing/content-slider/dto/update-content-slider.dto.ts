import { IsString, IsOptional, MaxLength, IsUUID } from 'class-validator';

export class UpdateContentSliderDto {
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
  linkImage1?: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  linkImage2?: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  linkImage3?: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  linkImage4?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  nameImage1?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  nameImage2?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  nameImage3?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  nameImage4?: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsOptional()
  pageId?: string; // ID del page al que pertenece el slider
}