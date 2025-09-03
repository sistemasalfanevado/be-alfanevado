import { Module } from '@nestjs/common';
import { ZentraDocumentService } from './zentra-document.service';
import { ZentraDocumentController } from './zentra-document.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';
import { ZentraExchangeRateModule } from '../../zentra-master/zentra-exchange-rate/zentra-exchange-rate.module';
import { ZentraMovementModule } from '../../zentra-transaction/zentra-movement/zentra-movement.module';
import { ZentraScheduledIncomeDocumentModule } from '../../zentra-master/zentra-scheduled-income-document/zentra-scheduled-income-document.module';


@Module({
  imports: [PrismaModule, AuthModule, 
    ZentraExchangeRateModule, ZentraMovementModule, ZentraScheduledIncomeDocumentModule],
  providers: [ZentraDocumentService],
  controllers: [ZentraDocumentController],
})
export class ZentraDocumentModule { }