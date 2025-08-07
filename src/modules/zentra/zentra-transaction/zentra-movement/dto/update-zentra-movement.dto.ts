import { IsString, IsNotEmpty, IsOptional, IsNumber, MaxLength, IsDateString } from 'class-validator';

export class UpdateZentraMovementDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  exchangeRate: number;

  @IsString()
  @IsNotEmpty()
  documentId: string;

  @IsString()
  @IsNotEmpty()
  transactionTypeId: string;

  @IsString()
  @IsNotEmpty()
  movementCategoryId: string;

  @IsString()
  @IsNotEmpty()
  budgetItemId: string;

  @IsString()
  @IsNotEmpty()
  bankAccountId: string;

  @IsString()
  @IsNotEmpty()
  currencyId: string;

  @IsDateString()
  @IsNotEmpty()
  autorizeDate: string;

  @IsDateString()
  @IsNotEmpty()
  generateDate: string;

  @IsDateString()
  @IsNotEmpty()
  paymentDate: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}