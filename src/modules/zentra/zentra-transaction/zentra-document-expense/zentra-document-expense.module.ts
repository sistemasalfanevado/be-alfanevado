import { Module, forwardRef } from '@nestjs/common'; // Importar forwardRef
import { ZentraDocumentExpenseService } from './zentra-document-expense.service';
import { ZentraDocumentExpenseController } from './zentra-document-expense.controller';
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
    forwardRef(() => ZentraPettyCashModule)
  ],
  providers: [ZentraDocumentExpenseService],
  controllers: [ZentraDocumentExpenseController],
  exports: [ZentraDocumentExpenseService]
})
export class ZentraDocumentExpenseModule { }