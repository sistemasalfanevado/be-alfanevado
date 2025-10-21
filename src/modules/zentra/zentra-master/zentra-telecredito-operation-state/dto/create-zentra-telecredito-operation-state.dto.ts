import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraTelecreditoOperationStateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}