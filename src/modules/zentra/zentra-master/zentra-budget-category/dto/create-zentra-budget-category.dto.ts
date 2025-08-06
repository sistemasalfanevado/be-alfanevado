import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateZentraBudgetCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string; // Ejemplo: "Operación", "Financiamiento", "Inversión"

  @IsString()
  @IsOptional()
  @MaxLength(250)
  description?: string; // Texto opcional para explicar la categoría

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}