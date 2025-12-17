import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

import { ZentraNotificationRecipientService } from './zentra-notification-recipient.service';
import { ZentraNotificationRecipientController } from './zentra-notification-recipient.controller';

@Module({
  imports: [
    PrismaModule,
    AuthModule
  ],
  providers: [
    ZentraNotificationRecipientService
  ],
  controllers: [
    ZentraNotificationRecipientController
  ],
})
export class ZentraNotificationRecipientModule {}