import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateZentraTelecreditoOperationDto {
  @IsString()
  @IsOptional()
  bankAccountId?: string;

  @IsString()
  @IsOptional()
  companyId?: string;

  @IsString()
  @IsOptional()
  telecreditoConfigId?: string;

  @IsString()
  @IsOptional()
  stateId?: string;

  @IsDateString()
  @IsOptional()
  datePayment?: string;
}