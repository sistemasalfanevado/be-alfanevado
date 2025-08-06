import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraBudgetCategoryDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(250)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}