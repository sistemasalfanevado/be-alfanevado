import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateSubModuleDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  route?: string;
}