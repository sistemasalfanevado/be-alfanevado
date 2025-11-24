import { IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateZentraFinancialImpactDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;
}