import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsNumber,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class CreateZentraSubStageProgressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  responsible: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  status: string;

  @IsDateString()
  @IsOptional()
  finishDate?: string;

  @IsNumber()
  @IsOptional()
  progressPercentage?: number;

  @IsNumber()
  @IsOptional()
  investmentAmount?: number;

  @IsUUID()
  @IsNotEmpty()
  subStageId: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;
}