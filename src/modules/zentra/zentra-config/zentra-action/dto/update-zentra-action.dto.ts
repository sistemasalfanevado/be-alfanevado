import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateZentraActionDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}