import { IsString, IsOptional } from 'class-validator';

export class UpdateModuleSubModuleDto {
  @IsString()
  @IsOptional()
  moduleId?: string;

  @IsString()
  @IsOptional()
  subModuleId?: string;
}