import { Module } from '@nestjs/common';
import { SettingsService } from './setting.service';
import { SettingsController } from './setting.controller';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService, PrismaService],
  exports: [SettingsService],
})
export class SettingsModule {}