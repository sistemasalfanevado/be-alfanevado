import { IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraBudgetItemDto {
  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsNumber()
  @IsOptional()
  executedAmount?: number;

  @IsNumber()
  @IsOptional()
  executedSoles?: number;

  @IsNumber()
  @IsOptional()
  executedDolares?: number;

  @IsString()
  @IsOptional()
  currencyId?: string;

  @IsString()
  @IsOptional()
  definitionId?: string; // Enlace a la partida

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}