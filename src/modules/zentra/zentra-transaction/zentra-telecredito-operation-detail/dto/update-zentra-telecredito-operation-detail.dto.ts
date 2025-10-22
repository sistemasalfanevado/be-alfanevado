import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateZentraTelecreditoOperationDetailDto {
  @IsString()
  @IsOptional()
  documentId?: string;

  @IsString()
  @IsOptional()
  telecreditoOperationId?: string;

  @IsNumber()
  @IsOptional()
  totalAmount?: number;
}