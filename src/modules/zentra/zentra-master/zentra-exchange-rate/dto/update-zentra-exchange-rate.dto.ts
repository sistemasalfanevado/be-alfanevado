import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateZentraExchangeRateDto {
  @IsDateString()
  @IsOptional()
  date?: string;

  @IsNumber()
  @IsOptional()
  buyRate?: number;

  @IsNumber()
  @IsOptional()
  sellRate?: number;

  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}