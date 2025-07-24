import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraBankAccountDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  number?: string;

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