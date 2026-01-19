import { Module, forwardRef } from '@nestjs/common';
import { ZentraDocumentSalesService } from './zentra-document-sales.service';
import { ZentraDocumentSalesController } from './zentra-document-sales.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';
import { ZentraMovementModule } from '../zentra-movement/zentra-movement.module';

import { ZentraDocumentModule } from '../zentra-document/zentra-document.module';

import { ZentraAccountabilityModule } from '../zentra-accountability/zentra-accountability.module';
import { ZentraPettyCashModule } from '../zentra-petty-cash/zentra-petty-cash.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ZentraMovementModule,
    forwardRef(() => ZentraDocumentModule),
    forwardRef(() => ZentraAccountabilityModule),
    forwardRef(() => ZentraPettyCashModule),
  ],
  providers: [ZentraDocumentSalesService],
  controllers: [ZentraDocumentSalesController],
  exports: [ZentraDocumentSalesService]
})
export class ZentraDocumentSalesModule { }