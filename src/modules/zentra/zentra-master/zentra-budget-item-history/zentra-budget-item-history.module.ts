import { Module } from '@nestjs/common';
import { ZentraBudgetItemHistoryService } from './zentra-budget-item-history.service';
import { ZentraBudgetItemHistoryController } from './zentra-budget-item-history.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBudgetItemHistoryService],
  controllers: [ZentraBudgetItemHistoryController],
})
export class ZentraBudgetItemHistoryModule {}