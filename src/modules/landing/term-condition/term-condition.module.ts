import { Module } from '@nestjs/common';
import { TermConditionService } from './term-condition.service';
import { TermConditionController } from './term-condition.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AuthModule } from '../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [TermConditionService],
  controllers: [TermConditionController],
})
export class TermConditionModule {}