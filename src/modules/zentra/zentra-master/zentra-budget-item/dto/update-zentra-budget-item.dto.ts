import { IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraBudgetItemDto {
  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsNumber()
  @IsOptional()
  executedAmount?: number;
  
  @IsString()
  @IsOptional()
  currencyId?: string;

  @IsString()
  @IsOptional()
  definitionId?: string; // Enlace a la partida (ZentraBudgetItemDefinition)

  @IsString()
  @IsOptional()
  projectId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}