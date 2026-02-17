import { IsString, IsOptional } from 'class-validator';

export class UpdateZentraMovementBudgetConfigDto {
  @IsString()
  @IsOptional()
  movementCategoryId?: string;

  @IsString()
  @IsOptional()
  budgetItemId?: string;

}