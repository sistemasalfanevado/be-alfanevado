import {
  IsString,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateZentraTelecreditoConfigDto {
  @IsUUID()
  @IsOptional()
  companyId?: string;

  @IsUUID()
  @IsOptional()
  bankAccountId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  clientCode?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  payrollType?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1)
  recordType?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1)
  accountType?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  accountNumber?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  reference?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1)
  checkItf?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1)
  checkParty?: string;
}