import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraDocumentBudgetStatusDto {
  @IsString()
  @IsOptional()
  @MaxLength(20, { message: 'El nombre no debe exceder los 20 caracteres' })
  name?: string;
}