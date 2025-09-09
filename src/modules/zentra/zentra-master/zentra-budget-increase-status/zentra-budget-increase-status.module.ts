import { Module } from '@nestjs/common';
import { ZentraBudgetIncreaseStatusService } from './zentra-budget-increase-status.service';
import { ZentraBudgetIncreaseStatusController } from './zentra-budget-increase-status.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBudgetIncreaseStatusService],
  controllers: [ZentraBudgetIncreaseStatusController],
})
export class ZentraBudgetIncreaseStatusModule {}