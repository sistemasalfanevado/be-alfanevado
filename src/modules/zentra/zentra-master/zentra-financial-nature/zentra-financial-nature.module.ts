import { Module } from '@nestjs/common';
import { ZentraFinancialNatureService } from './zentra-financial-nature.service';
import { ZentraFinancialNatureController } from './zentra-financial-nature.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraFinancialNatureService],
  controllers: [ZentraFinancialNatureController],
})
export class ZentraFinancialNatureModule {}