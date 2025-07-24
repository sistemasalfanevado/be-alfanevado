import { Module } from '@nestjs/common';
import { ZentraTransactionTypeService } from './zentra-transaction-type.service';
import { ZentraTransactionTypeController } from './zentra-transaction-type.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraTransactionTypeService],
  controllers: [ZentraTransactionTypeController],
})
export class ZentraTransactionTypeModule {}