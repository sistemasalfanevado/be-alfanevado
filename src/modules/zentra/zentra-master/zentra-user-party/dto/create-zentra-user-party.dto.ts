import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraUserPartyDto {
  
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  partyId: string;

}