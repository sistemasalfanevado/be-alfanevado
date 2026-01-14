import { Module, forwardRef } from '@nestjs/common';
import { ZentraPettyCashService } from './zentra-petty-cash.service';
import { ZentraPettyCashController } from './zentra-petty-cash.controller';

import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';
import { ZentraDocumentModule } from '../zentra-document/zentra-document.module';
import { ZentraDocumentExpenseModule } from '../zentra-document-expense/zentra-document-expense.module';
import { MailModule } from '../../../../mail/mail.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    MailModule,
    forwardRef(() => ZentraDocumentModule),
    forwardRef(() => ZentraDocumentExpenseModule),
  ],
  providers: [ZentraPettyCashService],
  controllers: [ZentraPettyCashController],
  exports: [ZentraPettyCashService],
})
export class ZentraPettyCashModule {}