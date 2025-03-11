import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFooterContactDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsString()
  @IsNotEmpty()
  icon: string;
}