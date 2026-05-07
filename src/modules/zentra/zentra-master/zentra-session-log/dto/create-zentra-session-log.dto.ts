import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateZentraSessionLogDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  userAgent: string;

  @IsString()
  @IsNotEmpty()
  browser: string;

  @IsString()
  @IsNotEmpty()
  os: string;

  @IsString()
  @IsNotEmpty()
  deviceType: string;

  @IsString()
  @IsOptional() // Opcional si no siempre usas fingerprinting
  deviceFingerprint?: string;

  @IsString()
  @IsNotEmpty()
  localCreatedAt: string;
  
}