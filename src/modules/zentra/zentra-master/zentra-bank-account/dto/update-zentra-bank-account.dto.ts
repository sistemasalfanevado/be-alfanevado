import { IsString, IsOptional, IsNumber, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateZentraBankAccountDto {
  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  bankId?: string;

  @IsString()
  @IsOptional()
  projectId?: string;

  @IsString()
  @IsOptional()
  currencyId?: string;

  @IsString()
  @IsOptional()
  partyId?: string;
  
  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}