import { IsString, IsNumber, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateZentraBudgetItemDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  executedAmount: number;
  
  @IsString()
  @IsNotEmpty()
  currencyId: string;

  @IsString()
  @IsNotEmpty()
  definitionId: string; // Enlace a la partida (ZentraBudgetItemDefinition)

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}