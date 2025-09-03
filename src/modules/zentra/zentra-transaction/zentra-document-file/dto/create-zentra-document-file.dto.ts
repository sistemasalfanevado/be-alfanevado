import { IsString, IsNotEmpty, MaxLength, IsOptional, IsDateString } from 'class-validator';

export class CreateZentraDocumentFileDto {
  @IsString()
  @IsNotEmpty()
  documentId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fileName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(700)
  fileUrl: string;

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