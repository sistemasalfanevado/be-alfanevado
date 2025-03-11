import { Module } from '@nestjs/common';
import { FooterSocialController } from './footer-social.controller';
import { FooterSocialService } from './footer-social.service';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { AuthModule } from '../../../../auth/auth.module';


@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [FooterSocialController],
  providers: [FooterSocialService],
})
export class FooterSocialModule {}