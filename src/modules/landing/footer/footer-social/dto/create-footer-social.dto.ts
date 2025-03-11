import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFooterSocialDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  link: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  icon: string;
}