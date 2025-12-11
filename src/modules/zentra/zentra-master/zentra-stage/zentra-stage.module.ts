import { Module } from '@nestjs/common';
import { ZentraStageService } from './zentra-stage.service';
import { ZentraStageController } from './zentra-stage.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraStageService],
  controllers: [ZentraStageController],
})
export class ZentraStageModule {}