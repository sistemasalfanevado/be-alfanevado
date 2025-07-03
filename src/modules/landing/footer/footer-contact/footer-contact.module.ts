import { Module } from '@nestjs/common';
import { FooterContactService } from './footer-contact.service';
import { FooterContactController } from './footer-contact.controller';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/landing/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [FooterContactService],
  controllers: [FooterContactController]
})
export class FooterContactModule {}
