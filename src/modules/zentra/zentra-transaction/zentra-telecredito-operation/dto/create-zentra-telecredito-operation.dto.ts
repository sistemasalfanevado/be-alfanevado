import { IsString, IsNotEmpty, IsDateString, IsOptional, MaxLength } from 'class-validator';

export class CreateZentraTelecreditoOperationDto {
  @IsString()
  @IsNotEmpty()
  bankAccountId: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsString()
  @IsNotEmpty()
  telecreditoConfigId: string;

  @IsString()
  @IsNotEmpty()
  stateId: string;

  @IsDateString()
  @IsNotEmpty()
  datePayment: string;

  // Nuevo campo opcional
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