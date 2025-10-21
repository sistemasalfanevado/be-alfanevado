import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

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
}