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
  scheduledDebtDocumentId?: string;
  
  @IsString()
  @IsOptional()
  installmentStatusId?: string;

  @IsString()
  @IsOptional()
  currencyId?: string;

  @IsNumber()
  @IsOptional()
  letra?: number;

  @IsNumber()
  @IsOptional()
  capital?: number;

  @IsNumber()
  @IsOptional()
  interest?: number;

  @IsNumber()
  @IsOptional()
  extra?: number;

  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsNumber()
  @IsOptional()
  paidAmount: number;
  
  @IsString()
  @IsOptional()
  @MaxLength(200)
  description: string;
  
  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}