import { Module } from '@nestjs/common';
import { ZentraTransactionGeneralService } from './zentra-transaction-general.service';
import { ZentraTransactionGeneralController } from './zentra-transaction-general.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

import { ZentraExchangeRateModule } from '../../zentra-master/zentra-exchange-rate/zentra-exchange-rate.module';
import { ZentraInstallmentModule } from '../../zentra-transaction/zentra-installment/zentra-installment.module';
import { ZentraMovementModule } from '../../zentra-transaction/zentra-movement/zentra-movement.module';


@Module({
  imports: [PrismaModule, AuthModule, ZentraExchangeRateModule, ZentraInstallmentModule, ZentraMovementModule],
  providers: [ZentraTransactionGeneralService],
  controllers: [ZentraTransactionGeneralController],
  exports: [ZentraTransactionGeneralService]
})
export class ZentraTransactionGeneralModule { }