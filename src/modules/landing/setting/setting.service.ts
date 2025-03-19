import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SettingDto } from './dto/setting.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) { }
 
  async create(settingDto: SettingDto) {
    return this.prisma.landingSetting.create({
      data: {
        site: settingDto.site,
        maintenanceMode: settingDto.maintenanceMode,
      },
    });
  }

  async getMaintenanceMode(site: string): Promise<boolean> {
    const setting = await this.prisma.landingSetting.findFirst({
      where: { site, deletedAt: null },
    });

    if (!setting) {
      throw new NotFoundException(`Setting not found for site: ${site}`);
    }

    return setting.maintenanceMode;
  }

  async findAll() {
    return this.prisma.landingSetting.findMany({
      where: { deletedAt: null },
    });
  }

  async findOne(id: string) {
    return this.prisma.landingSetting.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, settingDto: SettingDto) {
    return this.prisma.landingSetting.update({
      where: { id },
      data: settingDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingSetting.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.landingSetting.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

}