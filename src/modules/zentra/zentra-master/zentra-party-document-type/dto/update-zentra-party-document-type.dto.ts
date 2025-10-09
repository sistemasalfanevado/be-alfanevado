import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraPartyDocumentTypeDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;
}