import { Module } from '@nestjs/common';
import { ZentraDocumentBudgetStatusService } from './zentra-document-budget-status.service';
import { ZentraDocumentBudgetStatusController } from './zentra-document-budget-status.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraDocumentBudgetStatusService],
  controllers: [ZentraDocumentBudgetStatusController],
})
export class ZentraDocumentBudgetStatusModule {}