import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraBankAccountTypeDto {
  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name?: string;
}