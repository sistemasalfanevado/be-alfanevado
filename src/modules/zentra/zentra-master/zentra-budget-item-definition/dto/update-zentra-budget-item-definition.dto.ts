import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraBudgetItemDefinitionDto {
  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  name?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  projectId?: string;

  @IsString()
  @IsOptional()
  natureId?: string;

  @IsString()
  @IsOptional()
  visibilityId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30, { message: 'El idFirebase no debe exceder los 30 caracteres' })
  idFirebase?: string;
}