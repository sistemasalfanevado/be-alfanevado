import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraPageGroupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;
}