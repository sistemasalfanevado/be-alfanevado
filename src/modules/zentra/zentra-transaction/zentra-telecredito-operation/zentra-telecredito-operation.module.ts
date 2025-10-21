import { Module } from '@nestjs/common';
import { ZentraTelecreditoOperationService } from './zentra-telecredito-operation.service';
import { ZentraTelecreditoOperationController } from './zentra-telecredito-operation.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraTelecreditoOperationService],
  controllers: [ZentraTelecreditoOperationController],
})
export class ZentraTelecreditoOperationModule {}