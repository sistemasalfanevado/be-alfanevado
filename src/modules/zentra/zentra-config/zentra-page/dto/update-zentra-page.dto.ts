import { IsString, IsOptional, MaxLength, IsUUID } from 'class-validator';

export class UpdateZentraPageDto {
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

  @IsUUID()
  @IsOptional()
  pageGroupId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  idFirebase?: string;
}