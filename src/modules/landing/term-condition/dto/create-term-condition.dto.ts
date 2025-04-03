import { IsString, IsNotEmpty, MaxLength, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class CreateTermConditionDto {
  
  @IsString()
  description: string;
  
}