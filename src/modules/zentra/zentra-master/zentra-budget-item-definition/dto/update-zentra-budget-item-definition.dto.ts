import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraBudgetItemDefinitionDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  projectId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}