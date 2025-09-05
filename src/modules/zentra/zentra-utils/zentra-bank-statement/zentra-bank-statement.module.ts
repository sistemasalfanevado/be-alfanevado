import { Module } from '@nestjs/common';
import { ZentraBankStatementService } from './zentra-bank-statement.service';
import { ZentraBankStatementController } from './zentra-bank-statement.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBankStatementService],
  controllers: [ZentraBankStatementController],
})
export class ZentraBankStatementModule {}