import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraPartyDocumentHierarchyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}