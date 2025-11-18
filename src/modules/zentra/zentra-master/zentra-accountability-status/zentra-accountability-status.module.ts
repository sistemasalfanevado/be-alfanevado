import { Module } from '@nestjs/common';
import { ZentraAccountabilityStatusService } from './zentra-accountability-status.service';
import { ZentraAccountabilityStatusController } from './zentra-accountability-status.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraAccountabilityStatusService],
  controllers: [ZentraAccountabilityStatusController],
})
export class ZentraAccountabilityStatusModule {}