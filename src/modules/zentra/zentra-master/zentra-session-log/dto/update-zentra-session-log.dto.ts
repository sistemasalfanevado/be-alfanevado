import { IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class UpdateZentraSessionLogDto {
  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  userAgent?: string;

  @IsString()
  @IsOptional()
  browser?: string;

  @IsString()
  @IsOptional()
  os?: string;

  @IsString()
  @IsOptional()
  deviceType?: string;

  @IsString()
  @IsOptional()
  ipAddress?: string; // Por si necesitas actualizarla manualmente

  @IsString()
  @IsOptional()
  deviceFingerprint?: string;

  @IsDateString()
  @IsOptional()
  localCreatedAt?: string;

}