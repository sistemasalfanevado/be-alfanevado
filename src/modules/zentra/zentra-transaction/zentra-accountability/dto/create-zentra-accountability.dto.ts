import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateZentraAccountabilityDto {
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description: string;

  @IsNumber()
  @IsOptional()
  requestedAmount: number;

  @IsNumber()
  @IsOptional()
  approvedAmount: number;

  @IsNumber()
  @IsOptional()
  accountedAmount: number;

  @IsDateString()
  @IsNotEmpty()
  registeredAt: string;

  // Relaciones obligatorias según tu modelo
  @IsString()
  @IsNotEmpty()
  partyId: string;

  @IsString()
  @IsNotEmpty()
  currencyId: string;

  @IsString()
  @IsNotEmpty()
  documentTypeId: string;

  @IsString()
  @IsNotEmpty()
  accountabilityStatusId: string;

  @IsString()
  @IsNotEmpty()
  transactionTypeId: string;

  @IsString()
  @IsNotEmpty()
  budgetItemId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

}