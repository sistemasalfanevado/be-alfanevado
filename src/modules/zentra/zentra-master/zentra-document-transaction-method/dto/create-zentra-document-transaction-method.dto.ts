import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraDocumentTransactionMethodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

}