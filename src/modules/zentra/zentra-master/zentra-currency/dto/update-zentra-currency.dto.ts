import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateZentraCurrencyDto {
  @IsString()
  @IsOptional()
  @Length(3, 3, { message: 'El código debe tener exactamente 3 caracteres' })
  code?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  symbol?: string;
}