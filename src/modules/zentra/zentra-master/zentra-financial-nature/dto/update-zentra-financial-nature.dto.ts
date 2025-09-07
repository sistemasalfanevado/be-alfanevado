import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraFinancialNatureDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @IsString()
  @IsOptional()
  movementCategoryId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}