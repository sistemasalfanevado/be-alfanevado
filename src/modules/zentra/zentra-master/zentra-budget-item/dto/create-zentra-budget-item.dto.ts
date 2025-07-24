import { IsString, IsNotEmpty, IsDecimal, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateZentraBudgetItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsDecimal()
  @Type(() => Number)
  amount: number;

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