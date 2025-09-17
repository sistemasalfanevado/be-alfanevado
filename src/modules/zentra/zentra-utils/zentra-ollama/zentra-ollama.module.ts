import { Module } from '@nestjs/common';
import { ZentraOllamaService } from './zentra-ollama.service';
import { ZentraOllamaController } from './zentra-ollama.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ZentraOllamaService],
  controllers: [ZentraOllamaController],
})
export class ZentraOllamaModule {}