import { Module } from '@nestjs/common';
import { ZentraMovementStatusService } from './zentra-movement-status.service';
import { ZentraMovementStatusController } from './zentra-movement-status.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraMovementStatusService],
  controllers: [ZentraMovementStatusController],
})
export class ZentraMovementStatusModule {}