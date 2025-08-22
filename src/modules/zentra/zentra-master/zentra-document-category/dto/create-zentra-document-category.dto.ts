import { IsString, IsNotEmpty, MaxLength, IsOptional, IsDateString } from 'class-validator';

export class CreateZentraDocumentCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;   // 👈 nombre de la categoría

  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @IsDateString()
  @IsOptional()
  updatedAt?: string;

  @IsDateString()
  @IsOptional()
  deletedAt?: string;
}