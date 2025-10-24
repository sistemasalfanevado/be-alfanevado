import { Module } from '@nestjs/common';
import { ZentraLandingLeadService } from './zentra-landing-lead.service';
import { ZentraLandingLeadController } from './zentra-landing-lead.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraLandingLeadService],
  controllers: [ZentraLandingLeadController],
})
export class ZentraLandingLeadModule {}