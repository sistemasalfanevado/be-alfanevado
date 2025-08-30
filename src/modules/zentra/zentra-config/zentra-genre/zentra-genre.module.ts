import { Module } from '@nestjs/common';
import { ZentraGenreController } from './zentra-genre.controller';
import { ZentraGenreService } from './zentra-genre.service';
import { PrismaModule } from '../../../../prisma/prisma.module';
import { ZentraAuthModule } from '../../../../auth/zentra/zentra-auth.module';

@Module({
  imports: [PrismaModule, ZentraAuthModule],
  controllers: [ZentraGenreController],
  providers: [ZentraGenreService],
})
export class ZentraGenreModule {}