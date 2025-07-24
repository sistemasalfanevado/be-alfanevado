import { IsString, IsOptional, IsNumber, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateZentraBankAccountDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  amount?: number;

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