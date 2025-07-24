import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateZentraRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;
}