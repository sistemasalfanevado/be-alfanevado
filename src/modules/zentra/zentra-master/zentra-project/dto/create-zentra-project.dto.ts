import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'El nombre no debe exceder los 150 caracteres' })
  name: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsOptional()
  @MaxLength(300)
  imageUrl?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}