import { Module } from '@nestjs/common';
import { ZentraUserProjectController } from './zentra-user-project.controller';
import { ZentraUserProjectService } from './zentra-user-project.service';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { ZentraAuthModule } from '../../../../auth/zentra/zentra-auth.module';

@Module({
  imports: [PrismaModule, ZentraAuthModule],
  controllers: [ZentraUserProjectController],
  providers: [ZentraUserProjectService],
})
export class ZentraUserProjectModule {}