import { forwardRef, Module } from '@nestjs/common';
import { ZentraInstallmentService } from './zentra-installment.service';
import { ZentraInstallmentController } from './zentra-installment.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';
import { ZentraMovementModule } from '../../zentra-transaction/zentra-movement/zentra-movement.module';
import { ZentraDocumentModule } from '../../zentra-transaction/zentra-document/zentra-document.module';

@Module({
  imports: [PrismaModule, AuthModule, ZentraMovementModule,
    forwardRef(() => ZentraDocumentModule),
  ],
  providers: [ZentraInstallmentService],
  controllers: [ZentraInstallmentController],
  exports: [ZentraInstallmentService]
})
export class ZentraInstallmentModule { }