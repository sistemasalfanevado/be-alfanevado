import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraScheduledIncomeDocumentStatusDto {
  @IsString()
  @IsOptional()
  @MaxLength(30)
  name?: string;
}