import { IsString, IsOptional, IsNumber, MaxLength, IsDateString } from 'class-validator';

export class UpdateZentraBankStatementDto {
  @IsString()
  @IsOptional()
  projectId?: string;

  @IsString()
  @IsOptional()
  bankAccountId?: string;

  @IsDateString()
  @IsOptional()
  statementDate?: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  documentUrl?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  documentName?: string;

  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}