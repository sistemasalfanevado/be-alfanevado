import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraPartyBankAccountDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: 'Account must not exceed 30 characters' })
  account: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'CCI must not exceed 50 characters' })
  cci: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Description must not exceed 100 characters' })
  description: string;

  @IsString()
  @IsNotEmpty()
  partyId: string;

  @IsString()
  @IsOptional()
  @MaxLength(36)
  bankId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(36)
  currencyId?: string;
}