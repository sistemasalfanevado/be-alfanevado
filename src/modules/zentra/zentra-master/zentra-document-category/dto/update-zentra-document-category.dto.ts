import { IsString, MaxLength, IsOptional, IsDateString } from 'class-validator';

export class UpdateZentraDocumentCategoryDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;  // 👈 editable en update

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