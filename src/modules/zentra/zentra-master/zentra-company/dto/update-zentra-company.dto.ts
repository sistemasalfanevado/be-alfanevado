import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraCompanyDto {
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Company name must not exceed 50 characters' })
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Business name must not exceed 50 characters' })
  businessName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'Address must not exceed 100 characters' })
  address?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30, { message: 'Document number must not exceed 30 characters' })
  documentNumber?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Legal representative name must not exceed 50 characters' })
  legalRepresentative?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30, { message: 'Representative document number must not exceed 30 characters' })
  representativeDocumentNumber?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}