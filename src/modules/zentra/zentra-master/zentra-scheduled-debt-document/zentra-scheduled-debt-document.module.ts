import { Module } from '@nestjs/common';
import { ZentraScheduledDebtDocumentService } from './zentra-scheduled-debt-document.service';
import { ZentraScheduledDebtDocumentController } from './zentra-scheduled-debt-document.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraScheduledDebtDocumentService],
  controllers: [ZentraScheduledDebtDocumentController],
  exports: [ZentraScheduledDebtDocumentService],
})
export class ZentraScheduledDebtDocumentModule {}