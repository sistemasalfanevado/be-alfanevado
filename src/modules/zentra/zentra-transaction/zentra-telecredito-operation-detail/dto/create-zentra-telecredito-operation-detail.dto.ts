import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateZentraTelecreditoOperationDetailDto {
  @IsString()
  @IsNotEmpty()
  documentId: string;

  @IsString()
  @IsNotEmpty()
  telecreditoOperationId: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
}