import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraDocumentTransactionMethodDto {
  @IsString()
  @IsOptional()
  name?: string;

}