import { IsString, IsNotEmpty, IsDate, IsUUID, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateZentraAuditLogDto {
  @IsString()
  @IsNotEmpty()
  module: string;

  @IsString()
  @IsOptional() // O IsEnum si tienes acciones fijas como 'DELETE', 'UPDATE', etc.
  action: string;

  @IsDateString()
  @IsNotEmpty()
  localCreatedAt: Date;

  @IsString()
  @IsNotEmpty()
  recordId: string;

  @IsUUID() // Validamos que sea un UUID válido para la relación con User
  @IsNotEmpty()
  userId: string;
}