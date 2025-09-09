import { 
  IsString, 
  IsOptional, 
  IsNumber, 
  MaxLength, 
  IsDateString 
} from 'class-validator';

export class UpdateZentraBudgetIncreaseRequestDto {
  @IsString()
  @IsOptional()
  budgetItemId?: string;

  @IsString()
  @IsOptional()
  currencyId?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsNumber()
  @IsOptional()
  requestedAmount?: number;

  @IsNumber()
  @IsOptional()
  availableAmount?: number;

  @IsNumber()
  @IsOptional()
  extraNeeded?: number;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'El código del documento no debe exceder los 50 caracteres' })
  documentCode?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, { message: 'La descripción del documento no debe exceder los 255 caracteres' })
  documentDescription?: string;

  @IsString()
  @IsOptional()
  statusId?: string;

  @IsDateString()
  @IsOptional()
  registeredAt?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30, { message: 'El idFirebase no debe exceder los 30 caracteres' })
  idFirebase?: string;
}