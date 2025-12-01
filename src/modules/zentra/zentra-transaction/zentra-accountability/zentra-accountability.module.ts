import { Module, forwardRef } from '@nestjs/common';
import { ZentraAccountabilityService } from './zentra-accountability.service';
import { ZentraAccountabilityController } from './zentra-accountability.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';
import { ZentraDocumentModule } from '../zentra-document/zentra-document.module'
import { ZentraDocumentSalesModule } from '../zentra-document-sales/zentra-document-sales.module'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    forwardRef(() => ZentraDocumentModule), 
    forwardRef(() => ZentraDocumentSalesModule), 
  ],
  providers: [ZentraAccountabilityService],
  controllers: [ZentraAccountabilityController],
  exports: [ZentraAccountabilityService],
})

export class ZentraAccountabilityModule { }