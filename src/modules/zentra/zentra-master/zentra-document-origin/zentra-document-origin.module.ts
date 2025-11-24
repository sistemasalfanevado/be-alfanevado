import { Module } from '@nestjs/common';
import { ZentraDocumentOriginService } from './zentra-document-origin.service';
import { ZentraDocumentOriginController } from './zentra-document-origin.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraDocumentOriginService],
  controllers: [ZentraDocumentOriginController],
})
export class ZentraDocumentOriginModule {}