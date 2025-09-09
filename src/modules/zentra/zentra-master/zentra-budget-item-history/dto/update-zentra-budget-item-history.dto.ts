import { IsString, IsOptional, MaxLength, IsNumber, IsDateString } from 'class-validator';

export class UpdateZentraBudgetItemHistoryDto {
  @IsString()
  @IsOptional()
  budgetItemId?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsNumber()
  @IsOptional()
  oldAmount?: number;

  @IsNumber()
  @IsOptional()
  newAmount?: number;

  @IsNumber()
  @IsOptional()
  percentageChange?: number;

  @IsDateString()
  @IsOptional()
  registeredAt: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}