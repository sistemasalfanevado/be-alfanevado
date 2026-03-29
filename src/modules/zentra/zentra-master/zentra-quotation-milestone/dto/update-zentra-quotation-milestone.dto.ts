import { IsString, IsOptional, IsDateString, IsNumber, Min, MaxLength, IsUUID } from 'class-validator';

export class UpdateZentraQuotationMilestoneDto {
  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'La descripción no debe exceder los 200 caracteres' })
  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @IsNumber({ maxDecimalPlaces: 4 })
  @IsOptional()
  amount?: number;
}