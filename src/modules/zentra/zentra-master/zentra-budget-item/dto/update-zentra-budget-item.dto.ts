import { IsString, IsNumber, IsNotEmpty, IsOptional, IsDecimal, MaxLength } from 'class-validator';

export class UpdateZentraBudgetItemDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  amount?: number;

  @IsNumber()
  @IsNotEmpty()
  executedAmount?: number;
  
  @IsString()
  @IsOptional()
  currencyId?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  projectId?: string;
}