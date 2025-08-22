import { Module } from '@nestjs/common';
import { ZentraExchangeRateService } from './zentra-exchange-rate.service';
import { ZentraExchangeRateController } from './zentra-exchange-rate.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraExchangeRateService],
  controllers: [ZentraExchangeRateController],
  exports: [ZentraExchangeRateService]
})
export class ZentraExchangeRateModule {}