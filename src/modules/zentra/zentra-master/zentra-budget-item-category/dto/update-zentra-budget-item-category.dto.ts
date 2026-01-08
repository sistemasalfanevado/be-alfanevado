import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraBudgetItemCategoryDto {
  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'El nombre no debe exceder los 200 caracteres' })
  name?: string;

  @IsString()
  @IsOptional()
  budgetCategoryId?: string;

  @IsString()
  @IsOptional()
  visibilityId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}