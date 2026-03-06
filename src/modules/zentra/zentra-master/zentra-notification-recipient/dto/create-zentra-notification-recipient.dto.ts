import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateZentraNotificationRecipientDto {

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  notificationCategoryId: string;
  


}