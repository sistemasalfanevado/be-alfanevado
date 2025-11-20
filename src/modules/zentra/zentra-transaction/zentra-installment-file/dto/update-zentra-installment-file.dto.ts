import { IsString, MaxLength, IsOptional, IsDateString } from 'class-validator';

export class UpdateZentraInstallmentFileDto {
  @IsString()
  @IsOptional()
  installmentId?: string;

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