import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraBudgetItemCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200, { message: 'El nombre no debe exceder los 50 caracteres' })
  name: string;
}