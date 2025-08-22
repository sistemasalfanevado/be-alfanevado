import { Module } from '@nestjs/common';
import { ZentraDocumentService } from './zentra-document.service';
import { ZentraDocumentController } from './zentra-document.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';
import { ZentraExchangeRateModule } from '../../zentra-master/zentra-exchange-rate/zentra-exchange-rate.module';

@Module({
  imports: [PrismaModule, AuthModule, ZentraExchangeRateModule],
  providers: [ZentraDocumentService],
  controllers: [ZentraDocumentController],
})
export class ZentraDocumentModule {}