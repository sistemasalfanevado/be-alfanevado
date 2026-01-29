import { IsString, IsOptional, MaxLength, IsNumber } from 'class-validator';

export class UpdateZentraSubStageDto {
  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  name?: string;

  @IsString()
  @IsOptional()
  stageId?: string;
}