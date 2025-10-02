import { Module } from '@nestjs/common';
import { ZentraPasswordResetTokenController } from './zentra-password-reset-token.controller';
import { ZentraPasswordResetTokenService } from './zentra-password-reset-token.service';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { ZentraAuthModule } from '../../../../auth/zentra/zentra-auth.module';

@Module({
  imports: [PrismaModule, ZentraAuthModule],
  controllers: [ZentraPasswordResetTokenController],
  providers: [ZentraPasswordResetTokenService],
  exports: [ZentraPasswordResetTokenService], // 👈 export por si otro módulo lo necesita
})
export class ZentraPasswordResetTokenModule {}