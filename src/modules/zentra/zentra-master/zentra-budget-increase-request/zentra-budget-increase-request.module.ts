import { Module } from '@nestjs/common';
import { ZentraBudgetIncreaseRequestService } from './zentra-budget-increase-request.service';
import { ZentraBudgetIncreaseRequestController } from './zentra-budget-increase-request.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBudgetIncreaseRequestService],
  controllers: [ZentraBudgetIncreaseRequestController],
})
export class ZentraBudgetIncreaseRequestModule {}