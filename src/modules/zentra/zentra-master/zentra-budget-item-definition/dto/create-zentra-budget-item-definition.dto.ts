import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateZentraBudgetItemDefinitionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}