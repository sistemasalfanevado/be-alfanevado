import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraGenreDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

}