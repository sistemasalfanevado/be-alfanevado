import { IsString, IsNotEmpty, MaxLength, IsNumber, IsOptional } from 'class-validator';

export class CreateZentraSubStageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres' })
  name: string;

  @IsNumber()
  @IsOptional()
  percentage?: number;

  @IsString()
  @IsNotEmpty()
  stageId: string;
}