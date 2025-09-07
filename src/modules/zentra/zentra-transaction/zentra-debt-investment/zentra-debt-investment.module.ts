import { Module } from '@nestjs/common';
import { ZentraDebtInvestmentService } from './zentra-debt-investment.service';
import { ZentraDebtInvestmentController } from './zentra-debt-investment.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';
import { ZentraMovementModule } from '../zentra-movement/zentra-movement.module';
import { ZentraDocumentModule } from '../zentra-document/zentra-document.module';

@Module({
  imports: [PrismaModule, AuthModule, ZentraMovementModule, ZentraDocumentModule],
  providers: [ZentraDebtInvestmentService],
  controllers: [ZentraDebtInvestmentController],
  exports: [ZentraDebtInvestmentService]
})
export class ZentraDebtInvestmentModule { }