import { 
  IsString, 
  IsOptional, 
  IsNumber, 
  MaxLength, 
  IsDateString, 
  IsBoolean 
} from 'class-validator';

export class UpdateZentraDocumentDto {
  @IsString()
  @IsOptional()
  @MaxLength(250)
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
  taxAmount: number;

  @IsNumber()
  @IsOptional()
  netAmount: number;

  @IsNumber()
  @IsOptional()
  detractionRate: number;

  @IsNumber()
  @IsOptional()
  detractionAmount: number;

  @IsNumber()
  @IsOptional()
  amountToPay: number;

  @IsNumber()
  @IsOptional()
  paidAmount: number;

  @IsString()
  @IsOptional()
  transactionTypeId: string;

  @IsString()
  @IsOptional()
  documentTypeId: string;

  @IsString()
  @IsOptional()
  partyId: string;

  @IsString()
  @IsOptional()
  budgetItemId: string;

  @IsString()
  @IsOptional()
  currencyId: string;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  documentStatusId: string;

  @IsString()
  @IsOptional()
  documentCategoryId: string;

  @IsDateString()
  @IsOptional()
  registeredAt: string;

  @IsDateString()
  @IsOptional()
  documentDate: string;

  @IsDateString()
  @IsOptional()
  expireDate: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  observation: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase: string;

  @IsBoolean()
  @IsOptional()
  hasMovements: boolean;

  @IsNumber()
  @IsOptional()
  totalInflow?: number;

  @IsNumber()
  @IsOptional()
  totalOutflow?: number;

  @IsString()
  @IsOptional()
  financialNatureId?: string;

  @IsString()
  @IsOptional()
  documentTransactionMethodId?: string;
}