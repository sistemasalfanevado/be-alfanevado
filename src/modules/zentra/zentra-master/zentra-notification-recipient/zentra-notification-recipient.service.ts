import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CreateZentraNotificationRecipientDto } from './dto/create-zentra-notification-recipient.dto';
import { UpdateZentraNotificationRecipientDto } from './dto/update-zentra-notification-recipient.dto';

@Injectable()
export class ZentraNotificationRecipientService {

  constructor(private prisma: PrismaService) { }

  // ✅ Crear receptor
  async create(dto: CreateZentraNotificationRecipientDto) {

    // Evitar duplicados activos
    const exists = await this.prisma.zentraNotificationRecipient.findFirst({
      where: {
        userId: dto.userId,
        deletedAt: null,
      },
    });

    if (exists) {
      throw new BadRequestException('El usuario ya está registrado como receptor de notificaciones');
    }

    return this.prisma.zentraNotificationRecipient.create({
      data: {
        userId: dto.userId,
      },
    });
  }

  // ✅ Listar receptores activos
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
    }));
  }

  // ✅ Obtener uno
  async findOne(id: string) {
    const recipient = await this.prisma.zentraNotificationRecipient.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        user: true,
      },
    });

    if (!recipient) {
      throw new NotFoundException('Receptor de notificaciones no encontrado');
    }

    return recipient;
  }

  // ✏️ Editar receptor (cambiar usuario)
  async update(id: string, dto: UpdateZentraNotificationRecipientDto) {

    if (!dto.userId) {
      throw new BadRequestException('No hay datos para actualizar');
    }

    // Validar duplicado
    const duplicate = await this.prisma.zentraNotificationRecipient.findFirst({
      where: {
        userId: dto.userId,
        deletedAt: null,
        NOT: { id },
      },
    });

    if (duplicate) {
      throw new BadRequestException('El usuario ya está registrado como receptor');
    }

    return this.prisma.zentraNotificationRecipient.update({
      where: { id },
      data: {
        userId: dto.userId,
      },
    });
  }

  // 🗑️ Soft delete
  async remove(id: string) {
    return this.prisma.zentraNotificationRecipient.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  // ♻️ Restaurar
  async restore(id: string) {
    return this.prisma.zentraNotificationRecipient.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }
}