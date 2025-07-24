import { IsString, IsOptional, IsDecimal, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateZentraMovementDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsDecimal()
  @IsOptional()
  @Type(() => Number)
  amount?: number;

  @IsString()
  @IsOptional()
  documentId?: string;

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