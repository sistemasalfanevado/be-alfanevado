import { Module } from '@nestjs/common';
import { ZentraProjectService } from './zentra-project.service';
import { ZentraProjectController } from './zentra-project.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraProjectService],
  controllers: [ZentraProjectController]
})
export class ZentraProjectModule {}