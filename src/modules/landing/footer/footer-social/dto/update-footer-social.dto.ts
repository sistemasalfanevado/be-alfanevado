import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateFooterSocialDto {
  @IsString()
  @IsOptional()
  @MaxLength(200)
  link?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  icon?: string;
}