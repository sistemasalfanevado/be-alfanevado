import { IsString, IsNotEmpty, IsDecimal, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateZentraBankAccountDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsDecimal()
  @Type(() => Number)
  amount: number;

  @IsString()
  @IsNotEmpty()
  bankId: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsString()
  @IsNotEmpty()
  currencyId: string;
}