import { Module } from '@nestjs/common';
import { ZentraProjectSubStageProgressFileService } from './zentra-project-sub-stage-progress-file.service';
import { ZentraProjectSubStageProgressFileController } from './zentra-project-sub-stage-progress-file.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraProjectSubStageProgressFileService],
  controllers: [ZentraProjectSubStageProgressFileController],
})
export class ZentraProjectSubStageProgressFileModule {}