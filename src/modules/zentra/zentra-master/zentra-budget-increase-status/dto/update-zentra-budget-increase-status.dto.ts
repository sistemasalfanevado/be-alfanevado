import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraBudgetIncreaseStatusDto {
  @IsString()
  @IsOptional()
  @MaxLength(20, { message: 'El nombre no debe exceder los 20 caracteres' })
  name?: string;
}