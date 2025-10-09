import { Module } from '@nestjs/common';
import { ZentraBankAccountTypeService } from './zentra-bank-account-type.service';
import { ZentraBankAccountTypeController } from './zentra-bank-account-type.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBankAccountTypeService],
  controllers: [ZentraBankAccountTypeController],
})
export class ZentraBankAccountTypeModule {}