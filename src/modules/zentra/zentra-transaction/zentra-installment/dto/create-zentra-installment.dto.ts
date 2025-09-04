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

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsNumber()
  @IsNotEmpty()
  capital: number;

  @IsNumber()
  @IsNotEmpty()
  interest: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}