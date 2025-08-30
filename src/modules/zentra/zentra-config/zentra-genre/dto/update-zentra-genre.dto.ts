import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraGenreDto {
  @IsString()
  @IsOptional()
  @MaxLength(20)
  name?: string;

}