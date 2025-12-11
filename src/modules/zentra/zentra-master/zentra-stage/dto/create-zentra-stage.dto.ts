import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber } from 'class-validator';

export class CreateZentraStageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres' })
  name: string;

  @IsNumber()
  @IsOptional()
  percentage?: number;

} 