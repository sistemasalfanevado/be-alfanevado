import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SettingDto {

  @IsString()
  site: string;
  
  @IsBoolean()
  @IsOptional()
  maintenanceMode: boolean;
}