import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraPartyDocumentDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  document?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  observation?: string;

  @IsString()
  @IsOptional()
  partyId?: string;

  @IsString()
  @IsOptional()
  documentTypeId?: string;

  @IsString()
  @IsOptional()
  documentHierarchyId?: string;
}