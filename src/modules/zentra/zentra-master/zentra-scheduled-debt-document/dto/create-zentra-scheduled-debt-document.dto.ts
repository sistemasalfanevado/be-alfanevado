import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateZentraScheduledDebtDocumentDto {
  @IsString()
  @IsNotEmpty()
  documentId: string;

}