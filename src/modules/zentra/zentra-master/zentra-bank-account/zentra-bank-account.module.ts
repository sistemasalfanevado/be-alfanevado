import { Module } from '@nestjs/common';
import { ZentraBankAccountService } from './zentra-bank-account.service';
import { ZentraBankAccountController } from './zentra-bank-account.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBankAccountService],
  controllers: [ZentraBankAccountController],
})
export class ZentraBankAccountModule {}