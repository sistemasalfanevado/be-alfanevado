import { Module, forwardRef } from '@nestjs/common';
import { ZentraAccountabilityService } from './zentra-accountability.service';
import { ZentraAccountabilityController } from './zentra-accountability.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';
import { ZentraDocumentModule } from '../zentra-document/zentra-document.module';
import { ZentraDocumentExpenseModule } from '../zentra-document-expense/zentra-document-expense.module'; // Asegúrate que la ruta sea correcta
import { ZentraDocumentSalesModule } from '../zentra-document-sales/zentra-document-sales.module';
import { MailModule } from '../../../../mail/mail.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    MailModule,
    // 1. CORRECCIÓN: Agregar forwardRef aquí también
    forwardRef(() => ZentraDocumentExpenseModule), 
    forwardRef(() => ZentraDocumentModule), 
    forwardRef(() => ZentraDocumentSalesModule), 
  ],
  providers: [ZentraAccountabilityService],
  controllers: [ZentraAccountabilityController],
  exports: [ZentraAccountabilityService],
})
export class ZentraAccountabilityModule { }