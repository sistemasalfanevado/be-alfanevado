import { Module } from '@nestjs/common';
import { ZentraActionController } from './zentra-action.controller';
import { ZentraActionService } from './zentra-action.service';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { ZentraAuthModule } from '../../../../auth/zentra/zentra-auth.module';

@Module({
  imports: [PrismaModule, ZentraAuthModule],
  controllers: [ZentraActionController],
  providers: [ZentraActionService],
  exports: [ZentraActionService], // 👈 útil si lo vas a usar en otros módulos
})
export class ZentraActionModule {}