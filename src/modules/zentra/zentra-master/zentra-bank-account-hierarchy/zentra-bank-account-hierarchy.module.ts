import { Module } from '@nestjs/common';
import { ZentraBankAccountHierarchyService } from './zentra-bank-account-hierarchy.service';
import { ZentraBankAccountHierarchyController } from './zentra-bank-account-hierarchy.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraBankAccountHierarchyService],
  controllers: [ZentraBankAccountHierarchyController],
})
export class ZentraBankAccountHierarchyModule {}
