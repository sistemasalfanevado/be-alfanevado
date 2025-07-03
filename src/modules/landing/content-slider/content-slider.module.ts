import { Module } from '@nestjs/common';
import { ContentSliderController } from './content-slider.controller';
import { ContentSliderService } from './content-slider.service';
import { PrismaModule } from '../../../prisma/prisma.module'; // Importa el módulo de Prisma
import { AuthModule } from '../../../auth/landing/auth.module';


@Module({
  imports: [PrismaModule, AuthModule], // Importa PrismaModule para usar PrismaService
  controllers: [ContentSliderController],
  providers: [ContentSliderService],
})
export class ContentSliderModule {}