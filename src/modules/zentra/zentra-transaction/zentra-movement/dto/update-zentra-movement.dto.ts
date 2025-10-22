import { 
  IsString, 
  IsOptional, 
  IsNumber, 
  MaxLength, 
  IsDateString,
  IsBoolean
} from 'class-validator';

export class UpdateZentraMovementDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  code?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  documentId?: string;

  @IsString()
  @IsOptional()
  transactionTypeId?: string;

  @IsString()
  @IsOptional()
  movementCategoryId?: string;

  @IsString()
  @IsOptional()
  budgetItemId?: string;

  @IsString()
  @IsOptional()
  bankAccountId?: string;

  @IsString()
  @IsOptional()
  movementStatusId?: string;

  @IsDateString()
  @IsOptional()
  autorizeDate?: string;

  @IsDateString()
  @IsOptional()
  generateDate?: string;

  @IsDateString()
  @IsOptional()
  paymentDate?: string;

  // 🔹 Relación opcional con una cuota
  @IsString()
  @IsOptional()
  installmentId?: string;

  // 🔹 Campos opcionales de documentos
  @IsString()
  @IsOptional()
  @MaxLength(300)
  documentUrl?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  documentName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;

  @IsBoolean()
  @IsOptional()
  fromTelecredito?: boolean;

}