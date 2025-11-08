import { IsString, IsOptional } from 'class-validator';

export class UpdateZentraScheduledDebtDocumentDto {
  @IsString()
  @IsOptional()
  documentId?: string;

}