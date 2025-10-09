import { Module } from '@nestjs/common';
import { ZentraPartyDocumentTypeService } from './zentra-party-document-type.service';
import { ZentraPartyDocumentTypeController } from './zentra-party-document-type.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraPartyDocumentTypeService],
  controllers: [ZentraPartyDocumentTypeController],
})
export class ZentraPartyDocumentTypeModule {}