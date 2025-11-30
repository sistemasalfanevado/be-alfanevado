import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraAreaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres' })
  name: string;

} 