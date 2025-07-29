import { IsString, IsOptional, IsNumber, IsNotEmpty, MaxLength, IsDateString } from 'class-validator';

export class UpdateZentraDocumentDto {
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount?: number;
  
  @IsString()
  @IsOptional()
  transactionTypeId?: string;

  @IsString()
  @IsOptional()
  movementCategoryId?: string;

  @IsString()
  @IsOptional()
  documentTypeId?: string;

  @IsString()
  @IsOptional()
  partyId?: string;

  @IsString()
  @IsOptional()
  budgetItemId?: string;

  @IsString()
  @IsOptional()
  bankAccountId?: string;

  @IsString()
  @IsOptional()
  currencyId?: string;

  @IsDateString()
  @IsOptional()
  registeredAt?: string;

  @IsDateString()
  @IsOptional()
  documentDate?: string;

}