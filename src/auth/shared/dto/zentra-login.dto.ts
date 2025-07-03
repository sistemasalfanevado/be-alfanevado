import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ZentraLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}