import { Module } from '@nestjs/common';
import { ZentraSubProjectService } from './zentra-sub-project.service';
import { ZentraSubProjectController } from './zentra-sub-project.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraSubProjectService],
  controllers: [ZentraSubProjectController],
})
export class ZentraSubProjectModule {}