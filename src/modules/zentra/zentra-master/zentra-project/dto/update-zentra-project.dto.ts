import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraProjectDto {
  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'El nombre no debe exceder los 150 caracteres' })
  name?: string;

  @IsString()
  @IsOptional()
  companyId?: string;

  @IsOptional()
  @MaxLength(300)
  imageUrl?: string;
  
  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}