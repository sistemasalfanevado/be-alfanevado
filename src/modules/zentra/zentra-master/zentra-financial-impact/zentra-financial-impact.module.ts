import { Module } from '@nestjs/common';
import { ZentraFinancialImpactService } from './zentra-financial-impact.service';
import { ZentraFinancialImpactController } from './zentra-financial-impact.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraFinancialImpactService],
  controllers: [ZentraFinancialImpactController],
})
export class ZentraFinancialImpactModule {}