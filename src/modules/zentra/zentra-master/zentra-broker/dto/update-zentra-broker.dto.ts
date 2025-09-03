import { IsString, IsOptional, Length, MaxLength } from 'class-validator';

export class UpdateZentraBrokerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}