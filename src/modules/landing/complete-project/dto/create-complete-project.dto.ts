import { IsString, IsNotEmpty, MaxLength, IsUUID, IsInt } from 'class-validator';

export class CreateCompleteProjectDto {

  @IsString()
  @MaxLength(400)
  linkImage: string;

  @IsString()
  @MaxLength(100)
  nameImage: string;

  @IsString()
  @MaxLength(400)
  subtitle: string;

  @IsInt()
  position: number;

  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty()
  pageId: string;
  
}
