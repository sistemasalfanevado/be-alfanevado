import { IsString, IsNumber, IsNotEmpty, IsDecimal, MaxLength } from 'class-validator';

export class CreateZentraBudgetItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  executedAmount: number;
  
  @IsString()
  @IsNotEmpty()
  currencyId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}