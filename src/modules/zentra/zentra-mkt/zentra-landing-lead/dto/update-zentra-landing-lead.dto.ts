import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraLandingLeadDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  lastname?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  message?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  project?: string;
}