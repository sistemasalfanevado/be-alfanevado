import { Module } from '@nestjs/common';
import { ZentraBudgetItemService } from './zentra-budget-item.service';
import { ZentraBudgetItemController } from './zentra-budget-item.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBudgetItemService],
  controllers: [ZentraBudgetItemController],
})
export class ZentraBudgetItemModule {}