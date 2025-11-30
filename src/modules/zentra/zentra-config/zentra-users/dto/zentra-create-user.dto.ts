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

  @IsOptional()
  @MaxLength(300)
  profileUrl?: string;

  @IsOptional()
  @MaxLength(200)
  mainRoute?: string;

  @IsNotEmpty()
  @IsString()
  roleId: string;

  @IsOptional()
  @IsString()
  genreId?: string;

  @IsOptional()
  @IsString()
  areaId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}