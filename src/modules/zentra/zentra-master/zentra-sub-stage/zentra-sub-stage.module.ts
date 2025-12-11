import { Module } from '@nestjs/common';
import { ZentraSubStageService } from './zentra-sub-stage.service';
import { ZentraSubStageController } from './zentra-sub-stage.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraSubStageService],
  controllers: [ZentraSubStageController],
})
export class ZentraSubStageModule {}