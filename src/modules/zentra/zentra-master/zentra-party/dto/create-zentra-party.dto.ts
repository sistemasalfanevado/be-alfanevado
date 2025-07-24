import { IsString, IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class CreateZentraPartyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  document: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsString()
  @MaxLength(200)
  address: string;

  @IsString()
  @IsNotEmpty()
  partyRoleId: string;
}