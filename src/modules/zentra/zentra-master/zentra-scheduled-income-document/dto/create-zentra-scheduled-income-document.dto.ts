import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraScheduledIncomeDocumentDto {
  @IsString()
  @IsNotEmpty()
  documentId: string;

  @IsString()
  @IsOptional()
  brokerId?: string;

  @IsString()
  @IsOptional()
  saleTypeId?: string;

  @IsString()
  @IsOptional()
  lotId?: string;

}