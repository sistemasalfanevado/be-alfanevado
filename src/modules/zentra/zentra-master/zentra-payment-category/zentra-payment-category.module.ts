import { Module } from '@nestjs/common';
import { ZentraPaymentCategoryService } from './zentra-payment-category.service';
import { ZentraPaymentCategoryController } from './zentra-payment-category.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraPaymentCategoryService],
  controllers: [ZentraPaymentCategoryController],
})
export class ZentraPaymentCategoryModule {}