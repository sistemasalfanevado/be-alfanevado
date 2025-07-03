import { Module } from '@nestjs/common';
import { ZentraPageController } from './zentra-page.controller';
import { ZentraPageService } from './zentra-page.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { ZentraAuthModule } from '../../../auth/zentra/zentra-auth.module';

@Module({
  imports: [PrismaModule, ZentraAuthModule],
  controllers: [ZentraPageController],
  providers: [ZentraPageService],
})
export class ZentraPageModule {}