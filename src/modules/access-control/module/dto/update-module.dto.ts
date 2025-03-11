import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateModuleDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;
}