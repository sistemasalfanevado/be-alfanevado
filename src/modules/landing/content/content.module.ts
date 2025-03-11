import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { PrismaModule } from '../../../prisma/prisma.module'; // Importa el módulo de Prisma
import { AuthModule } from '../../../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule], // Importa PrismaModule para usar PrismaService
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}