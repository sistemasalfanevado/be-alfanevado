import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  MaxLength, 
  IsDateString, 
  IsOptional 
} from 'class-validator';

export class CreateZentraBudgetIncreaseRequestDto {
  @IsString()
  @IsNotEmpty()
  budgetItemId: string;

  @IsString()
  @IsNotEmpty()
  currencyId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  requestedAmount: number;

  @IsNumber()
  @IsNotEmpty()
  availableAmount: number;

  @IsNumber()
  @IsNotEmpty()
  extraNeeded: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'El código del documento no debe exceder los 50 caracteres' })
  documentCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'La descripción del documento no debe exceder los 255 caracteres' })
  documentDescription: string;

  @IsString()
  @IsNotEmpty()
  statusId: string;

  @IsDateString()
  @IsNotEmpty()
  registeredAt: string;

  @IsString()
  @IsOptional()
  @MaxLength(30, { message: 'El idFirebase no debe exceder los 30 caracteres' })
  idFirebase?: string;
}