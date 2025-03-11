import { IsString, IsOptional, MaxLength, IsUUID } from 'class-validator';

export class UpdateProjectDto {
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
  @MaxLength(100)
  nameImage1?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  nameImage2?: string;

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
  @MaxLength(50)
  textButton?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  linkRedirect1?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  linkRedirect2?: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsOptional()
  pageId?: string; // ID del page al que pertenece el proyecto
}