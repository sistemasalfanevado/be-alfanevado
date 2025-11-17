import { Module } from '@nestjs/common';
import { ZentraDocumentTransactionMethodService } from './zentra-document-transaction-method.service';
import { ZentraDocumentTransactionMethodController } from './zentra-document-transaction-method.controller';

import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ZentraDocumentTransactionMethodController],
  providers: [ZentraDocumentTransactionMethodService],
})
export class ZentraDocumentTransactionMethodModule {}