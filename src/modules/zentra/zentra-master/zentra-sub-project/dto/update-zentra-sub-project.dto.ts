import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraSubProjectDto {
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres' })
  name?: string;

  @IsString()
  @IsOptional()
  projectId?: string;
}