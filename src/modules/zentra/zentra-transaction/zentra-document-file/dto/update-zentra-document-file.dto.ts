import { IsString, MaxLength, IsOptional, IsDateString } from 'class-validator';

export class UpdateZentraDocumentFileDto {
  @IsString()
  @IsOptional()
  documentId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  fileName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(700)
  fileUrl?: string;

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