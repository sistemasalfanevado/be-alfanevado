import { IsString, IsOptional, MaxLength, IsNumber } from 'class-validator';

export class UpdateZentraStageDto {
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres' })
  name?: string;

  @IsNumber()
  @IsOptional()
  percentage?: number;

}