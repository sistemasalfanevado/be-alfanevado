import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraScheduledIncomeDocumentDto {
  @IsString()
  @IsOptional()
  documentId?: string;

  @IsString()
  @IsOptional()
  brokerId?: string;

  @IsString()
  @IsOptional()
  saleTypeId?: string;

  @IsString()
  @IsOptional()
  lotId?: string;

  @IsString()
  @IsOptional()
  statusId?: string;

}