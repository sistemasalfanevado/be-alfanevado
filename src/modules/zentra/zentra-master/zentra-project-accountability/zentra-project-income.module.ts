import { Module } from '@nestjs/common';
import { ZentraProjectIncomeService } from './zentra-project-income.service';
import { ZentraProjectIncomeController } from './zentra-project-income.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraProjectIncomeService],
  controllers: [ZentraProjectIncomeController],
})
export class ZentraProjectIncomeModule {}