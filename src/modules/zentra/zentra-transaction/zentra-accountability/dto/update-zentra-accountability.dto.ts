import {
  IsString,
  IsOptional,
  IsNumber,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class UpdateZentraAccountabilityDto {
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsNumber()
  @IsOptional()
  amountToPay?: number;

  @IsNumber()
  @IsOptional()
  paidAmount?: number;

  @IsDateString()
  @IsOptional()
  registeredAt?: string;

  @IsString()
  @IsOptional()
  partyId?: string;

  @IsString()
  @IsOptional()
  currencyId?: string;

  @IsString()
  @IsOptional()
  documentTypeId?: string;

  @IsString()
  @IsOptional()
  accountabilityStatusId?: string;

  @IsString()
  @IsOptional()
  transactionTypeId?: string;

  @IsString()
  @IsOptional()
  budgetItemId?: string;

  @IsString()
  @IsOptional()
  userId?: string;

}