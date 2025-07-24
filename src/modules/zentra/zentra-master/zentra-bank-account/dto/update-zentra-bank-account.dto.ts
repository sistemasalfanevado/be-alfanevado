import { IsString, IsOptional, IsDecimal, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateZentraBankAccountDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsDecimal()
  @IsOptional()
  @Type(() => Number)
  amount?: string;

  @IsString()
  @IsOptional()
  bankId?: string;

  @IsString()
  @IsOptional()
  companyId?: string;

  @IsString()
  @IsOptional()
  currencyId?: string;
}