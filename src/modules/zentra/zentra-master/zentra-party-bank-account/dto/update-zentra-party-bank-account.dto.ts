import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraPartyBankAccountDto {
  @IsString()
  @IsOptional()
  @MaxLength(30, { message: 'Account must not exceed 30 characters' })
  account?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'CCI must not exceed 50 characters' })
  cci?: string;
  
  @IsString()
  @IsOptional()
  partyId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(36)
  bankId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(36)
  currencyId?: string;
}