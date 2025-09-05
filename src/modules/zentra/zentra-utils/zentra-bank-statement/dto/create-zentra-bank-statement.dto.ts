
import { IsString, IsOptional, IsNumber, MaxLength, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateZentraBankStatementDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  bankAccountId: string;

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
  @IsNotEmpty()
  balance: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}