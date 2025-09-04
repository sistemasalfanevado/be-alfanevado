import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class UpdateZentraInstallmentDto {
  @IsString()
  @IsOptional()
  scheduledIncomeDocumentId?: string;

  @IsString()
  @IsOptional()
  installmentStatusId?: string;

  @IsNumber()
  @IsOptional()
  number?: number;

  @IsNumber()
  @IsOptional()
  capital?: number;

  @IsNumber()
  @IsOptional()
  interest?: number;

  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}