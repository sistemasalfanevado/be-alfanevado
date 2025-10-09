import { Module } from '@nestjs/common';
import { ZentraPartyDocumentService } from './zentra-party-document.service';
import { ZentraPartyDocumentController } from './zentra-party-document.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraPartyDocumentService],
  controllers: [ZentraPartyDocumentController],
})
export class ZentraPartyDocumentModule {}