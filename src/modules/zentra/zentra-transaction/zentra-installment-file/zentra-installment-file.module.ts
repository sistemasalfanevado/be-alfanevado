import { Module } from '@nestjs/common';
import { ZentraInstallmentFileService } from './zentra-installment-file.service';
import { ZentraInstallmentFileController } from './zentra-installment-file.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraInstallmentFileService],
  controllers: [ZentraInstallmentFileController],
})
export class ZentraInstallmentFileModule {}