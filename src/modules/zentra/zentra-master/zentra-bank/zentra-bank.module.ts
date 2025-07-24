import { Module } from '@nestjs/common';
import { ZentraBankService } from './zentra-bank.service';
import { ZentraBankController } from './zentra-bank.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBankService],
  controllers: [ZentraBankController],
})
export class ZentraBankModule {}