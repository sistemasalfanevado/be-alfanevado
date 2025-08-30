import { IsString, IsOptional, MaxLength, MinLength, IsEmail, IsUrl } from 'class-validator';

export class ZentraUpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(300)
  profileUrl?: string;

  @IsOptional()
  @IsString()
  roleId?: string;

  @IsOptional()
  @IsString()
  genreId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}