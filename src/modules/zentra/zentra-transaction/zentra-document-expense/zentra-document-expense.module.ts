import { Module } from '@nestjs/common';
import { ZentraDocumentExpenseService } from './zentra-document-expense.service';
import { ZentraDocumentExpenseController } from './zentra-document-expense.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';
import { ZentraMovementModule } from '../zentra-movement/zentra-movement.module';
import { ZentraDocumentModule } from '../zentra-document/zentra-document.module';

@Module({
  imports: [PrismaModule, AuthModule, ZentraMovementModule, ZentraDocumentModule],
  providers: [ZentraDocumentExpenseService],
  controllers: [ZentraDocumentExpenseController],
  exports: [ZentraDocumentExpenseService]
})
export class ZentraDocumentExpenseModule { }