import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

import { ZentraSubStageProgressService } from './zentra-sub-stage-progress.service';
import { ZentraSubStageProgressController } from './zentra-sub-stage-progress.controller';

@Module({
  imports: [
    PrismaModule,
    AuthModule, // necesario solo si usarás guards
  ],
  controllers: [ZentraSubStageProgressController],
  providers: [ZentraSubStageProgressService],
  exports: [ZentraSubStageProgressService], // opcional (borra si no se usa fuera)
})
export class ZentraSubStageProgressModule {}