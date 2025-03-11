import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdatePageDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  route?: string;
}