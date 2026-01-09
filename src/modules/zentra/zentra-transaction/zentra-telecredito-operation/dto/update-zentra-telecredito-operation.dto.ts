import { IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';

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

  @IsString()
  @IsOptional()
  projectId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  imageUrl?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  code?: string;

}