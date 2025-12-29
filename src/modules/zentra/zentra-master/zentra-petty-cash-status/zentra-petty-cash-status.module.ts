import { Module } from '@nestjs/common';
import { ZentraPettyCashStatusService } from './zentra-petty-cash-status.service';
import { ZentraPettyCashStatusController } from './zentra-petty-cash-status.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraPettyCashStatusService],
  controllers: [ZentraPettyCashStatusController],
})
export class ZentraPettyCashStatusModule {}