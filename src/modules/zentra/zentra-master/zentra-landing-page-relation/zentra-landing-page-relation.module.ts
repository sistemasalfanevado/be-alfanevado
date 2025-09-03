import { Module } from '@nestjs/common';
import { ZentraLandingPageRelationService } from './zentra-landing-page-relation.service';
import { ZentraLandingPageRelationController } from './zentra-landing-page-relation.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraLandingPageRelationService],
  controllers: [ZentraLandingPageRelationController],
})
export class ZentraLandingPageRelationModule {}