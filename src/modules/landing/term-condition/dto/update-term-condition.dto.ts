import { IsString, IsOptional, MaxLength, IsUUID, IsNumber } from 'class-validator';

export class UpdateTermConditionDto {

  @IsString()
  @IsOptional()
  description?: string;
  
}