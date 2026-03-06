import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

import { ZentraNotificationCategoryService } from './zentra-notification-category.service';
import { ZentraNotificationCategoryController } from './zentra-notification-category.controller';

@Module({
  imports: [
    PrismaModule,
    AuthModule
  ],
  providers: [
    ZentraNotificationCategoryService
  ],
  controllers: [
    ZentraNotificationCategoryController
  ],
})
export class ZentraNotificationCategoryModule {}