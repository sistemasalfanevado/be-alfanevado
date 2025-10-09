import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraPartyDocumentTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}