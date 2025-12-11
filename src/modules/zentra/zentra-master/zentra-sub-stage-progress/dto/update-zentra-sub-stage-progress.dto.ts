import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class UpdateZentraSubStageProgressDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  responsible?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  status?: string;

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
  @IsOptional()
  subStageId?: string;

  @IsUUID()
  @IsOptional()
  projectId?: string;
}