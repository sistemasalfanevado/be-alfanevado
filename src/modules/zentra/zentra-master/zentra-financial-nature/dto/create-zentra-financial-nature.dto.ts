import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraFinancialNatureDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  movementCategoryId: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}