import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraScheduledIncomeDocumentStatusDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;
}