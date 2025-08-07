import { IsString, IsOptional, IsNumber, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateZentraBankAccountDto {
  @IsNumber()
  @IsNotEmpty()
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
  @MaxLength(30)
  idFirebase?: string;
}