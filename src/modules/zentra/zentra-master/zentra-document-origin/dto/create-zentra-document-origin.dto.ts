import { IsString, IsNotEmpty, MaxLength, IsOptional, IsDateString } from 'class-validator';

export class CreateZentraDocumentOriginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}