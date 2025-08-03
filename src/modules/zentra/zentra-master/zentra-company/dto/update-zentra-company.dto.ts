import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraCompanyDto {
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Company name must not exceed 50 characters' })
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}