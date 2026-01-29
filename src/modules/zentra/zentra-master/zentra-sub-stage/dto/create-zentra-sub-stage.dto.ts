import { IsString, IsNotEmpty, MaxLength, IsNumber, IsOptional } from 'class-validator';

export class CreateZentraSubStageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  name: string;

  @IsString()
  @IsNotEmpty()
  stageId: string;
}