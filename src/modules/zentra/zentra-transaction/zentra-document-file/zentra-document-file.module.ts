import { Module } from '@nestjs/common';
import { ZentraDocumentFileService } from './zentra-document-file.service';
import { ZentraDocumentFileController } from './zentra-document-file.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraDocumentFileService],
  controllers: [ZentraDocumentFileController],
})
export class ZentraDocumentFileModule {}