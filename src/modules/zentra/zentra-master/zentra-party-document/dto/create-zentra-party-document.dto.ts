import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraPartyDocumentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  document: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  observation: string;

  @IsString()
  @IsNotEmpty()
  partyId: string;

  @IsString()
  @IsNotEmpty()
  documentTypeId: string;

  @IsString()
  @IsNotEmpty()
  documentHierarchyId: string;
}