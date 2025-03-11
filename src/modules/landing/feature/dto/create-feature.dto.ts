import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  detail: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  icon: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty()
  pageId: string; // ID del page al que pertenece el feature
}