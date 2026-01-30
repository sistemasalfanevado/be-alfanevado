import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

import { ZentraProjectSubStageProgressService } from './zentra-project-sub-stage-progress.service';
import { ZentraProjectSubStageProgressController } from './zentra-project-sub-stage-progress.controller';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
  ],
  controllers: [ZentraProjectSubStageProgressController],
  providers: [ZentraProjectSubStageProgressService],
  exports: [ZentraProjectSubStageProgressService],
})
export class ZentraProjectSubStageProgressModule {}