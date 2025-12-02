import { Module } from '@nestjs/common';
import { ZentraVisibilityService } from './zentra-visibility.service';
import { ZentraVisibilityController } from './zentra-visibility.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraVisibilityService],
  controllers: [ZentraVisibilityController],
})
export class ZentraVisibilityModule {}