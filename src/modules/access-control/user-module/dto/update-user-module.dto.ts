import { IsString, IsOptional } from 'class-validator';

export class UpdateUserModuleDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  moduleId?: string;
}