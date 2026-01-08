import { IsString, IsNumber, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateZentraBudgetItemDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number; // Monto presupuestado en la moneda base

  @IsNumber()
  @IsOptional()
  executedAmount?: number; // Normalmente debería inicializarse en 0

  @IsNumber()
  @IsOptional()
  executedSoles?: number; // Normalmente 0 al crear

  @IsNumber()
  @IsOptional()
  executedDolares?: number; // Normalmente 0 al crear

  @IsString()
  @IsNotEmpty()
  currencyId: string; // Moneda base

  @IsString()
  @IsNotEmpty()
  definitionId: string; // Enlace a la definición (partida)

  @IsString()
  @IsOptional()
  visibilityId?: string;

  
  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}