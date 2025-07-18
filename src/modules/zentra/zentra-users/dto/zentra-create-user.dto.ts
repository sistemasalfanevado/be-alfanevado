import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class ZentraCreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  gender: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(300)
  profileUrl?: string;

  @IsNotEmpty()
  @IsString()
  roleId: string;
}