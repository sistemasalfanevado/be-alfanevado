import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  IsDateString,
  IsOptional,
  IsBoolean
} from 'class-validator';

export class CreateZentraDocumentDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  code: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description: string;

  @IsNumber()
  @IsOptional()
  totalAmount: number;

  @IsNumber()
  @IsOptional()
  taxAmount?: number;

  @IsNumber()
  @IsOptional()
  netAmount?: number;

  @IsNumber()
  @IsOptional()
  detractionRate?: number;

  @IsNumber()
  @IsOptional()
  detractionAmount?: number;

  @IsNumber()
  @IsOptional()
  amountToPay?: number;

  @IsNumber()
  @IsOptional()
  paidAmount?: number;

  @IsString()
  @IsNotEmpty()
  transactionTypeId: string;

  @IsString()
  @IsNotEmpty()
  documentTypeId: string;

  @IsString()
  @IsNotEmpty()
  partyId: string;

  @IsString()
  @IsNotEmpty()
  budgetItemId: string;

  @IsString()
  @IsNotEmpty()
  currencyId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  documentStatusId: string;

  @IsString()
  @IsNotEmpty()
  documentCategoryId: string;

  @IsDateString()
  @IsNotEmpty()
  registeredAt: string;

  @IsDateString()
  @IsNotEmpty()
  documentDate: string;

  @IsDateString()
  @IsNotEmpty()
  expireDate: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  observation?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;

  @IsBoolean()
  @IsOptional()
  hasMovements?: boolean;

  @IsNumber()
  @IsOptional()
  totalInflow?: number;

  @IsNumber()
  @IsOptional()
  totalOutflow?: number;

  @IsString()
  @IsOptional()
  financialNatureId?: string;

}