import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraUserPartyDto {
  
  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  partyId?: string;

}