import { IsUUID, IsNotEmpty, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateZentraPasswordResetTokenDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @IsOptional()
  @Min(5)
  @Max(1440) // 24 horas máximo
  expiresInMinutes?: number = 30;
}