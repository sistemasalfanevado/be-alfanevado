import { Module } from '@nestjs/common';
import { ZentraPartyDocumentHierarchyService } from './zentra-party-document-hierarchy.service';
import { ZentraPartyDocumentHierarchyController } from './zentra-party-document-hierarchy.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraPartyDocumentHierarchyService],
  controllers: [ZentraPartyDocumentHierarchyController],
})
export class ZentraPartyDocumentHierarchyModule {}