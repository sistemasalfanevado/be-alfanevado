import { Module } from '@nestjs/common';
import { ZentraProjectSubStageService } from './zentra-project-sub-stage.service';
import { ZentraProjectSubStageController } from './zentra-project-sub-stage.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule
  ],
  providers: [ZentraProjectSubStageService],
  controllers: [ZentraProjectSubStageController],
  exports: [ZentraProjectSubStageService], 
})
export class ZentraProjectSubStageModule {}