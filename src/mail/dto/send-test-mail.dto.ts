import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SendTestMailDto {
  @IsEmail()
  to: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;
}