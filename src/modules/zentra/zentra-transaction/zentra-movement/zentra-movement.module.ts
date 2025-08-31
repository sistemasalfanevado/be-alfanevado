import { Module } from '@nestjs/common';
import { ZentraMovementService } from './zentra-movement.service';
import { ZentraMovementController } from './zentra-movement.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';
import { ZentraExchangeRateModule } from '../../zentra-master/zentra-exchange-rate/zentra-exchange-rate.module';

@Module({
  imports: [PrismaModule, AuthModule, ZentraExchangeRateModule],
  providers: [ZentraMovementService],
  controllers: [ZentraMovementController],
  exports: [ZentraMovementService]
})
export class ZentraMovementModule {}