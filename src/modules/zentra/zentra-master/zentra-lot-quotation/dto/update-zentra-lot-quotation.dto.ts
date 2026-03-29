import { IsString, IsOptional, IsNumber, IsUUID, Min, Max, MaxLength } from 'class-validator';

export class UpdateZentraLotQuotationDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  clientName?: string;

  @IsUUID()
  @IsOptional()
  lotId?: string;

  @IsUUID()
  @IsOptional()
  paymentPlanId?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  area?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  pricePerSqMeter?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  totalLotPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  downPaymentPercentage?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  downPaymentAmount?: number;

  @IsOptional()
  @IsNumber()
  totalMonths?: number;

  @IsOptional()
  @IsNumber()
  annualInterest?: number;

  @IsOptional()
  @IsNumber()
  monthlyInstallment?: number;
}