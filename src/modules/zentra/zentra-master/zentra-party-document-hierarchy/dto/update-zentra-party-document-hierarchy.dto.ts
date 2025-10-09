import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraPartyDocumentHierarchyDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;
}