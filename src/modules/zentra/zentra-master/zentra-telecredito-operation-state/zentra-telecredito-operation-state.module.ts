import { Module } from '@nestjs/common';
import { ZentraTelecreditoOperationStateService } from './zentra-telecredito-operation-state.service';
import { ZentraTelecreditoOperationStateController } from './zentra-telecredito-operation-state.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraTelecreditoOperationStateService],
  controllers: [ZentraTelecreditoOperationStateController],
})
export class ZentraTelecreditoOperationStateModule {}