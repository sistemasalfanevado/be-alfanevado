import { Module } from '@nestjs/common';
import { ZentraDocumentStatusService } from './zentra-document-status.service';
import { ZentraDocumentStatusController } from './zentra-document-status.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraDocumentStatusService],
  controllers: [ZentraDocumentStatusController],
})
export class ZentraDocumentStatusModule {}