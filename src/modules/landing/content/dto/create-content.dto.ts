import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  subtitle: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty()
  pageId: string; // ID del page al que pertenece el contenido
}