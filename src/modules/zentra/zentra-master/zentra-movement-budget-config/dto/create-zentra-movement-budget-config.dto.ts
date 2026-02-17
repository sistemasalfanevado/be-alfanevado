import { IsString, IsNotEmpty } from 'class-validator';

export class CreateZentraMovementBudgetConfigDto {
  @IsString()
  @IsNotEmpty({ message: 'El movementCategoryId es obligatorio' })
  movementCategoryId: string;

  @IsString()
  @IsNotEmpty({ message: 'El budgetItemId es obligatorio' })
  budgetItemId: string;

}