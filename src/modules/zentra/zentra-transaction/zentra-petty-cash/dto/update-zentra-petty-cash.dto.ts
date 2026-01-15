import {
  IsString,
  IsOptional,
  IsNumber,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class UpdateZentraPettyCashDto {
  @IsString()
  @IsOptional()
  @MaxLength(20)
  code?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsDateString()
  @IsOptional()
  registeredAt?: string;

  @IsNumber()
  @IsOptional()
  requestedAmount?: number;

  @IsNumber()
  @IsOptional()
  approvedAmount?: number;

  @IsNumber()
  @IsOptional()
  accountedAmount?: number;

  @IsString()
  @IsOptional()
  partyId?: string;

  @IsString()
  @IsOptional()
  currencyId?: string;

  @IsString()
  @IsOptional()
  pettyCashStatusId?: string;

  @IsString()
  @IsOptional()
  budgetItemId?: string;

  @IsString()
  @IsOptional()
  userId?: string;

}