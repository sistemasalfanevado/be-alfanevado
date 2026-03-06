import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CreateZentraNotificationCategoryDto } from './dto/create-zentra-notification-category.dto';
import { UpdateZentraNotificationCategoryDto } from './dto/update-zentra-notification-category.dto';

@Injectable()
export class ZentraNotificationCategoryService {

  constructor(private prisma: PrismaService) { }

  async create(dto: CreateZentraNotificationCategoryDto) {

    return this.prisma.zentraNotificationCategory.create({
      data: {
        name: dto.name,
      },
    });
  }

  async findAll() {
    return this.prisma.zentraNotificationCategory.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

  }

  async findOne(id: string) {
    const recipient = await this.prisma.zentraNotificationCategory.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!recipient) {
      throw new NotFoundException('Categoria de notificaciones no encontrado');
    }

    return recipient;
  }

  async update(id: string, dto: UpdateZentraNotificationCategoryDto) {

    return this.prisma.zentraNotificationCategory.update({
      where: { id },
      data: {
        name: dto.name,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.zentraNotificationCategory.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraNotificationCategory.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }
  
}