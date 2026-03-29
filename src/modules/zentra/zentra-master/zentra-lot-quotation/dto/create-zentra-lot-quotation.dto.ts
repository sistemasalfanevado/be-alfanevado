import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min, Max, MaxLength } from 'class-validator';

export class CreateZentraLotQuotationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  clientName: string;

  @IsUUID()
  @IsNotEmpty()
  lotId: string;

  @IsUUID()
  @IsNotEmpty()
  paymentPlanId: string;

  @IsNumber()
  @Min(0)
  area: number;

  @IsNumber()
  @Min(0)
  pricePerSqMeter: number;

  @IsNumber()
  @Min(0)
  totalLotPrice: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  downPaymentPercentage: number;

  @IsNumber()
  @Min(0)
  downPaymentAmount: number;

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