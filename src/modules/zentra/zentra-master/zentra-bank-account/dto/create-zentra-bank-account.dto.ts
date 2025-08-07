import { IsString, IsNumber, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateZentraBankAccountDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  bankId: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  currencyId: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}