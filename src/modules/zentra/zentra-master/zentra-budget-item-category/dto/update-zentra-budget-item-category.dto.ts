import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraBudgetItemCategoryDto {
  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'El nombre no debe exceder los 50 caracteres' })
  name?: string;
}