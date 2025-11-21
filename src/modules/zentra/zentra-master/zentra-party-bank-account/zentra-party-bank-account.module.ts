import { Module } from '@nestjs/common';
import { ZentraPartyBankAccountService } from './zentra-party-bank-account.service';
import { ZentraPartyBankAccountController } from './zentra-party-bank-account.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraPartyBankAccountService],
  controllers: [ZentraPartyBankAccountController],
  exports: [ZentraPartyBankAccountService]
})
export class ZentraPartyBankAccountModule {}