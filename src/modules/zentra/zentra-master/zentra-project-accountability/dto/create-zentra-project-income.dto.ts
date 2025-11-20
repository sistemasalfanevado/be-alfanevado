import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateZentraProjectIncomeDto {
  @IsString()
  @IsNotEmpty({ message: 'El projectId es obligatorio' })
  projectId: string;

  @IsString()
  @IsNotEmpty({ message: 'El budgetItemId es obligatorio' })
  budgetItemId: string;

}