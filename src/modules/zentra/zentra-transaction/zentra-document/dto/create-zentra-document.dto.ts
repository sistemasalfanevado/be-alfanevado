import { IsString, IsNotEmpty, IsNumber, MaxLength, IsDateString } from 'class-validator';

export class CreateZentraDocumentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsNumber()
  @IsNotEmpty()
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

  @IsDateString()
  @IsNotEmpty()
  registeredAt: string;

  @IsDateString()
  @IsNotEmpty()
  documentDate: string;

}