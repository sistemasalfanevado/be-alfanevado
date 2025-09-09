import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraBudgetIncreaseStatusDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'El nombre no debe exceder los 20 caracteres' })
  name: string;
}