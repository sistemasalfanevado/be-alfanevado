import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraPageGroupDto {
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
  @MaxLength(30)
  idFirebase?: string;
}