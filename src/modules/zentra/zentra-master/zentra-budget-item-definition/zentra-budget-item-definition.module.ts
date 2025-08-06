import { Module } from '@nestjs/common';
import { ZentraBudgetItemDefinitionService } from './zentra-budget-item-definition.service';
import { ZentraBudgetItemDefinitionController } from './zentra-budget-item-definition.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBudgetItemDefinitionService],
  controllers: [ZentraBudgetItemDefinitionController],
})
export class ZentraBudgetItemDefinitionModule {}