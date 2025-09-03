import { Module } from '@nestjs/common';
import { ZentraScheduledIncomeDocumentService } from './zentra-scheduled-income-document.service';
import { ZentraScheduledIncomeDocumentController } from './zentra-scheduled-income-document.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraScheduledIncomeDocumentService],
  controllers: [ZentraScheduledIncomeDocumentController],
})
export class ZentraScheduledIncomeDocumentModule {}