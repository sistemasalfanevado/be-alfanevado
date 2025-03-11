import { IsString, IsNotEmpty, MaxLength, IsUUID, IsOptional } from 'class-validator';

export class CreateContentSliderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  subtitle: string;

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
  @MaxLength(100)
  nameImage1?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  nameImage2?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  nameImage3?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  nameImage4?: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty()
  pageId: string; // ID del page al que pertenece el slider
}