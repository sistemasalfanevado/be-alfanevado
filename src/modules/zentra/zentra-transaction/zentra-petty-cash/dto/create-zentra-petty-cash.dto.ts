import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateZentraPettyCashDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  code: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  registeredAt: string;

  @IsNumber()
  @IsOptional()
  requestedAmount?: number;

  @IsNumber()
  @IsOptional()
  approvedAmount?: number;

  @IsNumber()
  @IsOptional()
  accountedAmount?: number;

  // Relaciones obligatorias
  @IsString()
  @IsNotEmpty()
  partyId: string;

  @IsString()
  @IsNotEmpty()
  currencyId: string;

  @IsString()
  @IsNotEmpty()
  pettyCashStatusId: string;

  @IsString()
  @IsNotEmpty()
  budgetItemId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}