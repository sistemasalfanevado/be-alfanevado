import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraProjectIncomeDto {
  @IsString()
  @IsOptional()
  projectId?: string;

  @IsString()
  @IsOptional()
  budgetItemId?: string;

}