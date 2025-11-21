import { Module } from '@nestjs/common';
import { ZentraPartyService } from './zentra-party.service';
import { ZentraPartyController } from './zentra-party.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

import { ZentraPartyBankAccountModule } from '../zentra-party-bank-account/zentra-party-bank-account.module';
import { ZentraPartyDocumentModule } from '../zentra-party-document/zentra-party-document.module';

@Module({
  imports: [PrismaModule, AuthModule, ZentraPartyBankAccountModule, ZentraPartyDocumentModule],
  providers: [ZentraPartyService],
  controllers: [ZentraPartyController],
})
export class ZentraPartyModule { }