import { Module } from '@nestjs/common';
import { ZentraScheduledIncomeDocumentStatusService } from './zentra-scheduled-income-document-status.service';
import { ZentraScheduledIncomeDocumentStatusController } from './zentra-scheduled-income-document-status.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ZentraScheduledIncomeDocumentStatusController],
  providers: [ZentraScheduledIncomeDocumentStatusService],
  exports: [ZentraScheduledIncomeDocumentStatusService],
})
export class ZentraScheduledIncomeDocumentStatusModule {}