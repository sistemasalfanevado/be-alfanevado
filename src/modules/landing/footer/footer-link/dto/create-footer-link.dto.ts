import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFooterLinkDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  link: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  icon: string;
}