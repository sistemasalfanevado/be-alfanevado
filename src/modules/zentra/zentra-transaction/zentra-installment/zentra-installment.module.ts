import { Module } from '@nestjs/common';
import { ZentraInstallmentService } from './zentra-installment.service';
import { ZentraInstallmentController } from './zentra-installment.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraInstallmentService],
  controllers: [ZentraInstallmentController],
})
export class ZentraInstallmentModule {}