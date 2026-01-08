import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraBudgetNatureDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres' })
  name: string;

  @IsString()
  @IsOptional()
  visibilityId?: string;

  
  @IsString()
  @IsOptional()
  @MaxLength(30, { message: 'El idFirebase no debe exceder los 30 caracteres' })
  idFirebase?: string;
}