import { Module } from '@nestjs/common';
import { ZentraBudgetNatureService } from './zentra-budget-nature.service';
import { ZentraBudgetNatureController } from './zentra-budget-nature.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBudgetNatureService],
  controllers: [ZentraBudgetNatureController],
})
export class ZentraBudgetNatureModule {}