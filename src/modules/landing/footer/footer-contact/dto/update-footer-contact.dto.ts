import { IsString, IsOptional } from 'class-validator';

export class UpdateFooterContactDto {
  
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  detail?: string;

  @IsString()
  @IsOptional()
  icon?: string;

}