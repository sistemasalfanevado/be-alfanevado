import { IsString, IsNotEmpty, MaxLength, IsUUID, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  linkImage1: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  linkImage2: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameImage1: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameImage2: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  textButton: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  linkRedirect1?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  linkRedirect2?: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty()
  pageId: string; // ID del page al que pertenece el proyecto
}