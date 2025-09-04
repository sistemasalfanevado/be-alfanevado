import { Module } from '@nestjs/common';
import { ZentraInstallmentStatusService } from './zentra-installment-status.service';
import { ZentraInstallmentStatusController } from './zentra-installment-status.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraInstallmentStatusService],
  controllers: [ZentraInstallmentStatusController],
})
export class ZentraInstallmentStatusModule {}