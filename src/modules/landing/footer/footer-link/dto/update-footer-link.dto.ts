import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateFooterLinkDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  link?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  icon?: string;
}