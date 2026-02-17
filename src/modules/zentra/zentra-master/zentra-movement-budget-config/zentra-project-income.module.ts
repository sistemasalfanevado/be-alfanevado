import { Module } from '@nestjs/common';
import { ZentraMovementBudgetConfigService } from './zentra-project-income.service';
import { ZentraMovementBudgetConfigController } from './zentra-project-income.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraMovementBudgetConfigService],
  controllers: [ZentraMovementBudgetConfigController],
})
export class ZentraMovementBudgetConfigModule {}