import { IsString, IsNotEmpty, IsOptional, IsNumber, MaxLength, IsDateString } from 'class-validator';

export class UpdateZentraMovementDto {
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
  amount: number;

  @IsString()
  @IsOptional()
  documentId: string;

  @IsString()
  @IsOptional()
  transactionTypeId: string;

  @IsString()
  @IsOptional()
  movementCategoryId: string;

  @IsString()
  @IsOptional()
  budgetItemId: string;

  @IsString()
  @IsOptional()
  bankAccountId: string;

  @IsString()
  @IsOptional()
  movementStatusId: string;

  @IsDateString()
  @IsOptional()
  autorizeDate: string;

  @IsDateString()
  @IsOptional()
  generateDate: string;

  @IsDateString()
  @IsOptional()
  paymentDate: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase: string;

}