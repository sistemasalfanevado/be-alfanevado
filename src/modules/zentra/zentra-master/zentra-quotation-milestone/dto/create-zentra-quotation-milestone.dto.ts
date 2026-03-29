import { IsString, IsNotEmpty, IsDateString, IsNumber, Min, MaxLength, IsUUID } from 'class-validator';

export class CreateZentraQuotationMilestoneDto {
  @IsUUID()
  @IsNotEmpty()
  quotationId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200, { message: 'La descripción no debe exceder los 200 caracteres' })
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsNumber({ maxDecimalPlaces: 4 })
  amount: number;
}