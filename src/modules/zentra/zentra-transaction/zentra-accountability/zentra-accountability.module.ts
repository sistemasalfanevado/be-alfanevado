import { Module } from '@nestjs/common';
import { ZentraAccountabilityService } from './zentra-accountability.service';
import { ZentraAccountabilityController } from './zentra-accountability.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';
import { ZentraDocumentModule } from '../zentra-document/zentra-document.module'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ZentraDocumentModule
  ],
  providers: [ZentraAccountabilityService],
  controllers: [ZentraAccountabilityController],
  exports: [ZentraAccountabilityService],
})
export class ZentraAccountabilityModule { }