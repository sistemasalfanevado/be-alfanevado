import { IsUUID, IsOptional } from 'class-validator';

export class UpdateZentraNotificationRecipientDto {
  @IsUUID()
  @IsOptional()
  userId?: string;
}