import { forwardRef, Module } from '@nestjs/common';
import { ZentraDocumentService } from './zentra-document.service';
import { ZentraDocumentController } from './zentra-document.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

import { ZentraExchangeRateModule } from '../../zentra-master/zentra-exchange-rate/zentra-exchange-rate.module';
import { ZentraMovementModule } from '../../zentra-transaction/zentra-movement/zentra-movement.module';
import { ZentraScheduledIncomeDocumentModule } from '../../zentra-master/zentra-scheduled-income-document/zentra-scheduled-income-document.module';
import { ZentraScheduledDebtDocumentModule } from '../../zentra-master/zentra-scheduled-debt-document/zentra-scheduled-debt-document.module';

import { ZentraInstallmentModule } from '../../zentra-transaction/zentra-installment/zentra-installment.module';
import { ZentraAccountabilityModule } from '../../zentra-transaction/zentra-accountability/zentra-accountability.module';
import { ZentraPettyCashModule } from '../../zentra-transaction/zentra-petty-cash/zentra-petty-cash.module';


@Module({
  imports: [PrismaModule, AuthModule,
    ZentraExchangeRateModule,
    ZentraMovementModule,
    ZentraScheduledIncomeDocumentModule,
    ZentraScheduledDebtDocumentModule,
    forwardRef(() => ZentraInstallmentModule),
    forwardRef(() => ZentraAccountabilityModule),
    forwardRef(() => ZentraPettyCashModule)
  ],
  providers: [ZentraDocumentService],
  controllers: [ZentraDocumentController],
  exports: [ZentraDocumentService]
})
export class ZentraDocumentModule { }