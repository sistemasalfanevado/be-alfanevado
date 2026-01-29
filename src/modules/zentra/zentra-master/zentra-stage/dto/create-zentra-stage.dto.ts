import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber } from 'class-validator';

export class CreateZentraStageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  name: string;

} 