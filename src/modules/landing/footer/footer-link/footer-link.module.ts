import { Module } from '@nestjs/common';
import { FooterLinkController } from './footer-link.controller';
import { FooterLinkService } from './footer-link.service';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/auth.module';
@Module({
  imports: [PrismaModule, AuthModule], // Importa PrismaModule para usar PrismaService
  controllers: [FooterLinkController],
  providers: [FooterLinkService],
})
export class FooterLinkModule {}