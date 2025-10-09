import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraPartyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  document: string;

  @IsString()
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

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}