import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraTelecreditoOperationStateDto {
  @IsString()
  @IsOptional()
  @MaxLength(20)
  name?: string;
}