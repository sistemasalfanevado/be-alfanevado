import { Module } from '@nestjs/common';
import { ZentraQuotationMilestoneService } from './zentra-quotation-milestone.service';
import { ZentraQuotationMilestoneController } from './zentra-quotation-milestone.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule
  ],
  providers: [ZentraQuotationMilestoneService],
  controllers: [ZentraQuotationMilestoneController],
  exports: [ZentraQuotationMilestoneService], 
})
export class ZentraQuotationMilestoneModule {}