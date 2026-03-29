import { Module } from '@nestjs/common';
import { ZentraLotQuotationService } from './zentra-lot-quotation.service';
import { ZentraLotQuotationController } from './zentra-lot-quotation.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule
  ],
  providers: [ZentraLotQuotationService],
  controllers: [ZentraLotQuotationController],
  exports: [ZentraLotQuotationService], 
})
export class ZentraLotQuotationModule {}