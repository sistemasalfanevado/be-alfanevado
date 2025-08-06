import { Module } from '@nestjs/common';
import { ZentraBudgetCategoryService } from './zentra-budget-category.service';
import { ZentraBudgetCategoryController } from './zentra-budget-category.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBudgetCategoryService],
  controllers: [ZentraBudgetCategoryController],
})
export class ZentraBudgetCategoryModule {}