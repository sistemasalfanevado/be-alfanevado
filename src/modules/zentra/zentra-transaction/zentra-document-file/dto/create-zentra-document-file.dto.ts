import { IsString, IsNotEmpty, MaxLength, IsOptional, IsDateString } from 'class-validator';

export class CreateZentraDocumentFileDto {
  @IsString()
  @IsNotEmpty()
  documentId: string; // Relación con ZentraDocument

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fileName: string; // Nombre original del archivo

  @IsString()
  @IsNotEmpty()
  @MaxLength(700)
  fileUrl: string; // URL completa en Firebase Storage

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