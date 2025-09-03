import { Module } from '@nestjs/common';
import { ZentraLandingProjectRelationService } from './zentra-landing-project-relation.service';
import { ZentraLandingProjectRelationController } from './zentra-landing-project-relation.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraLandingProjectRelationService],
  controllers: [ZentraLandingProjectRelationController],
})
export class ZentraLandingProjectRelationModule {}