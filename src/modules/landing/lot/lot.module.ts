import { Module } from '@nestjs/common';
import { LotController } from './lot.controller';
import { LotService } from './lot.service';
import { PrismaModule } from '../../../prisma/prisma.module'; // Importa el módulo de Prisma
import { AuthModule } from '../../../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule], // Importa PrismaModule para usar PrismaService
  controllers: [LotController],
  providers: [LotService],
})
export class LotModule { }