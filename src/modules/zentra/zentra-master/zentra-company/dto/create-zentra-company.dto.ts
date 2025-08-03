import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateZentraCompanyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Company name must not exceed 50 characters' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}