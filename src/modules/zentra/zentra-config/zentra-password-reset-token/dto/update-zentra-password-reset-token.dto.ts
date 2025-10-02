// dto/update-zentra-password-reset-token.dto.ts
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateZentraPasswordResetTokenDto {
  @IsBoolean()
  @IsOptional()
  used?: boolean;
}