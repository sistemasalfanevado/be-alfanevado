import { IsDateString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateZentraExchangeRateDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  buyRate: number;

  @IsNumber()
  @IsNotEmpty()
  sellRate: number;

}