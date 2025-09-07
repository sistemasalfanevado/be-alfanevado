import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateZentraInstallmentDto {
  @IsString()
  @IsNotEmpty()
  scheduledIncomeDocumentId: string;

  @IsString()
  @IsNotEmpty()
  installmentStatusId: string;

  @IsString()
  @IsNotEmpty()
  currencyId: string;

  @IsNumber()
  @IsNotEmpty()
  letra: number;

  @IsNumber()
  @IsNotEmpty()
  extra: number;

  @IsNumber()
  @IsNotEmpty()
  capital: number;

  @IsNumber()
  @IsNotEmpty()
  interest: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsNumber()
  @IsOptional()
  paidAmount: number;
  
  @IsString()
  @MaxLength(200)
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}