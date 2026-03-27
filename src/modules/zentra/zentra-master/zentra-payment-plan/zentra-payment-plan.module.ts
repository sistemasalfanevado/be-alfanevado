import { Module } from '@nestjs/common';
import { ZentraPaymentPlanService } from './zentra-payment-plan.service';
import { ZentraPaymentPlanController } from './zentra-payment-plan.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraPaymentPlanService],
  controllers: [ZentraPaymentPlanController],
})
export class ZentraPaymentPlanModule {}