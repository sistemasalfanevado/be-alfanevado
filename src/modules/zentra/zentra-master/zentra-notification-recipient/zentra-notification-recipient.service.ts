import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CreateZentraNotificationRecipientDto } from './dto/create-zentra-notification-recipient.dto';
import { UpdateZentraNotificationRecipientDto } from './dto/update-zentra-notification-recipient.dto';

@Injectable()
export class ZentraNotificationRecipientService {

  constructor(private prisma: PrismaService) { }

  async create(dto: CreateZentraNotificationRecipientDto) {

    return this.prisma.zentraNotificationRecipient.create({
      data: {
        userId: dto.userId,
        notificationCategoryId: dto.notificationCategoryId
      },
    });
  }

  async findAll() {
    
    const recipients = await this.prisma.zentraNotificationRecipient.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        notificationCategory: {
          select: {
            id: true,
            name: true,
          },
        }
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return recipients.map((r) => ({
      id: r.id,
      userId: r.userId,
      completeName: r.user.firstName + ' ' + r.user.lastName,
      email: r.user.email,
      createdAt: r.createdAt,
      notificationCategoryId: r.notificationCategory?.id,
      notificationCategoryName: r.notificationCategory?.name,
      
    }));
  }

  async findOne(id: string) {
    const recipient = await this.prisma.zentraNotificationRecipient.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        user: true,
        notificationCategory: true
      },
    });

    if (!recipient) {
      throw new NotFoundException('Receptor de notificaciones no encontrado');
    }

    return recipient;
  }

  async update(id: string, dto: UpdateZentraNotificationRecipientDto) {

    return this.prisma.zentraNotificationRecipient.update({
      where: { id },
      data: {
        userId: dto.userId,
        notificationCategoryId: dto.notificationCategoryId
      },
    });
  }

  async remove(id: string) {
    return this.prisma.zentraNotificationRecipient.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraNotificationRecipient.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }

}