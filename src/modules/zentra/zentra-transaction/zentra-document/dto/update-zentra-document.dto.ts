import { IsString, IsOptional, IsNumber, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateZentraDocumentDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
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
}