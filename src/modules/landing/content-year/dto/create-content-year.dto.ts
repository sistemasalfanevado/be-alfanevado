import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class CreateContentYearDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  year: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  yearMessage: string;

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
  @MaxLength(400)
  linkImage: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameImage: string; 
 
  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty()
  pageId: string; // ID del page al que pertenece el contenido
}