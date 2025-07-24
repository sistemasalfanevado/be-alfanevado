import { Module } from '@nestjs/common';
import { ZentraBudgetItemCategoryService } from './zentra-budget-item-category.service';
import { ZentraBudgetItemCategoryController } from './zentra-budget-item-category.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBudgetItemCategoryService],
  controllers: [ZentraBudgetItemCategoryController],
})
export class ZentraBudgetItemCategoryModule {}