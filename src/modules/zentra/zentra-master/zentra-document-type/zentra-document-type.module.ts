import { Module } from '@nestjs/common';
import { ZentraDocumentTypeService } from './zentra-document-type.service';
import { ZentraDocumentTypeController } from './zentra-document-type.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraDocumentTypeService],
  controllers: [ZentraDocumentTypeController],
})
export class ZentraDocumentTypeModule {}