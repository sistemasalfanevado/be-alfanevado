import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateZentraBudgetItemHistoryDto {
  @IsString()
  @IsNotEmpty()
  budgetItemId: string; // Relación obligatoria con presupuesto

  @IsString()
  @IsNotEmpty()
  userId: string; // Usuario que hace el cambio

  @IsNumber()
  @IsNotEmpty()
  oldAmount: number;

  @IsNumber()
  @IsNotEmpty()
  newAmount: number;

  @IsNumber()
  @IsNotEmpty()
  percentageChange: number;


  @IsDateString()
  @IsNotEmpty()
  registeredAt: string;


  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}