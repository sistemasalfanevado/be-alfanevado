import { Module } from '@nestjs/common';
import { ZentraCurrencyService } from './zentra-currency.service';
import { ZentraCurrencyController } from './zentra-currency.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraCurrencyService],
  controllers: [ZentraCurrencyController],
})
export class ZentraCurrencyModule {}