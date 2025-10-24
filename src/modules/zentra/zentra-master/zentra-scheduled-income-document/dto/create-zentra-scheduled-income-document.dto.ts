import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

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

  @IsString()
  @IsOptional()
  statusId?: string;

  // 🔹 New optional fields (English)
  @IsString()
  @IsOptional()
  serialNumber?: string; // correlativo

  @IsString()
  @IsOptional()
  referenceCode?: string; // código correlativo

  @IsString()
  @IsOptional()
  placeOfIssue?: string; // lugar de giro

  @IsString()
  @IsOptional()
  acceptorName1?: string;

  @IsString()
  @IsOptional()
  acceptorDni1?: string;

  @IsString()
  @IsOptional()
  acceptorPhone1?: string;

  @IsString()
  @IsOptional()
  acceptorName2?: string;

  @IsString()
  @IsOptional()
  acceptorDni2?: string;

  @IsString()
  @IsOptional()
  acceptorPhone2?: string;

  @IsString()
  @IsOptional()
  permanentGuarantorName?: string;

  @IsString()
  @IsOptional()
  permanentGuarantorAddress?: string;

  @IsString()
  @IsOptional()
  permanentGuarantorDni?: string;

  @IsString()
  @IsOptional()
  permanentGuarantorPhone?: string;

  @IsString()
  @IsOptional()
  parkingSpot1?: string; // Cochera 1

  @IsString()
  @IsOptional()
  parkingSpot2?: string; // Cochera 2
}