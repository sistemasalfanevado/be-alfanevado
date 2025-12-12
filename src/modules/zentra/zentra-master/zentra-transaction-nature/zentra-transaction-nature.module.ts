import { Module } from '@nestjs/common';
import { ZentraTransactionNatureService } from './zentra-transaction-nature.service';
import { ZentraTransactionNatureController } from './zentra-transaction-nature.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraTransactionNatureService],
  controllers: [ZentraTransactionNatureController],
})
export class ZentraTransactionNatureModule {}