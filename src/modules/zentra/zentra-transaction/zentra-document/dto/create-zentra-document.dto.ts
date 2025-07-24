import { IsString, IsNotEmpty, IsDecimal, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateZentraDocumentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsDecimal()
  @Type(() => Number)
  totalAmount: number;

  @IsString()
  @IsNotEmpty()
  transactionTypeId: string;

  @IsString()
  @IsNotEmpty()
  movementCategoryId: string;

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
  bankAccountId: string;

  @IsString()
  @IsNotEmpty()
  currencyId: string;
}