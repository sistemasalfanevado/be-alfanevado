import { IsString, IsNotEmpty, Length, IsOptional, MaxLength } from 'class-validator';

export class CreateZentraCurrencyDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 3, { message: 'El código debe tener exactamente 3 caracteres' })
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}