import { IsString, IsOptional, IsDecimal, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateZentraBudgetItemDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsDecimal()
  @IsOptional()
  @Type(() => Number)
  amount?: number;

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