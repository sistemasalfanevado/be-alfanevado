import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraMovementStatusDto {
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres' })
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}