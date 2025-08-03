import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraBudgetItemCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200, { message: 'El nombre no debe exceder los 200 caracteres' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}