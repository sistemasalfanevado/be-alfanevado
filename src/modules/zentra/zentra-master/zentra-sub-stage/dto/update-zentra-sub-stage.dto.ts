import { IsString, IsOptional, MaxLength, IsNumber } from 'class-validator';

export class UpdateZentraSubStageDto {
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres' })
  name?: string;

  @IsNumber()
  @IsOptional()
  percentage?: number;

  @IsString()
  @IsOptional()
  stageId?: string;
}