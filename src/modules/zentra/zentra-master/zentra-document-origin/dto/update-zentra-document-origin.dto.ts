import { IsString, MaxLength, IsOptional, IsDateString } from 'class-validator';

export class UpdateZentraDocumentOriginDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;
}