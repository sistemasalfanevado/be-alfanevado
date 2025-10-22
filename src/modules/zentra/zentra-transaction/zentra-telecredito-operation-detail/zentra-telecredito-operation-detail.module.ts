import { Module } from '@nestjs/common';
import { ZentraTelecreditoOperationDetailService } from './zentra-telecredito-operation-detail.service';
import { ZentraTelecreditoOperationDetailController } from './zentra-telecredito-operation-detail.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ZentraTelecreditoOperationDetailController],
  providers: [ZentraTelecreditoOperationDetailService],
})
export class ZentraTelecreditoOperationDetailModule {}