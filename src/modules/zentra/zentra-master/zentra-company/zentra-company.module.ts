import { Module } from '@nestjs/common';
import { ZentraCompanyService } from './zentra-company.service';
import { ZentraCompanyController } from './zentra-company.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraCompanyService],
  controllers: [ZentraCompanyController],
})
export class ZentraCompanyModule {}