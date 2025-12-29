import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentrPettyCashStatusDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres' })
  name: string;
}