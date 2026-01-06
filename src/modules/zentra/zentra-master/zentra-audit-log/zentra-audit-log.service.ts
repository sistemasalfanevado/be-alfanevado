import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraAuditLogDto } from './dto/create-zentra-audit-log.dto';

import * as moment from 'moment';
import { DateTime } from 'luxon';


@Injectable()
export class ZentraAuditLogService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateZentraAuditLogDto) {
    return this.prisma.zentraAuditLog.create({
      data: data,
    });
  }

  async findAll() {
    const logs = await this.prisma.zentraAuditLog.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        serverCreatedAt: 'desc',
      },
    });

    // Transformamos el array para aplanar el objeto user
    return logs.map((log) => ({

      id: log.id,
      module: log.module,
      action: log.action,
      recordId: log.recordId,

      serverCreatedAt: DateTime.fromJSDate(log.serverCreatedAt)
        .setZone('America/Lima')
        .toFormat('dd/MM/yyyy HH:mm:ss'),

      localCreatedAt: DateTime.fromJSDate(log.localCreatedAt)
        .setZone('America/Lima')
        .toFormat('dd/MM/yyyy HH:mm:ss'),

      userId: log.userId,
      userComplete: log.user?.firstName + ' ' + log.user?.lastName,

    }));
  }

  // 3. Obtener un log específico con detalle completo
  async findOne(id: string) {
    return this.prisma.zentraAuditLog.findUnique({
      where: { id },
      include: {
        user: true, // Incluye todo el perfil del usuario para el detalle
      },
    });
  }

  async findByFilters(filters: {
    userId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { userId, startDate, endDate } = filters;

    const where: any = {};

    // Filtro por Usuario
    if (userId && userId.trim() !== '') {
      where.userId = userId;
    }

    // Filtro por Fecha (localCreatedAt)
    if (startDate || endDate) {
      where.localCreatedAt = {};

      if (startDate) {
        // Creamos el inicio del día en zona Lima y lo pasamos a Date para Prisma
        where.localCreatedAt.gte = DateTime.fromISO(startDate)
          .setZone('America/Lima')
          .startOf('day')
          .toJSDate();
      }

      if (endDate) {
        // Creamos el fin del día en zona Lima
        where.localCreatedAt.lte = DateTime.fromISO(endDate)
          .setZone('America/Lima')
          .endOf('day')
          .toJSDate();
      }
    }

    const logs = await this.prisma.zentraAuditLog.findMany({
      where,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        serverCreatedAt: 'desc',
      },
    });

    // Mapeo y formateo de respuesta
    return logs.map((log) => ({
      id: log.id,
      module: log.module,
      action: log.action,
      recordId: log.recordId,
      serverCreatedAt: DateTime.fromJSDate(log.serverCreatedAt)
        .setZone('America/Lima')
        .toFormat('dd/MM/yyyy HH:mm:ss'),
      localCreatedAt: DateTime.fromJSDate(log.localCreatedAt)
        .setZone('America/Lima')
        .toFormat('dd/MM/yyyy HH:mm:ss'),
      userId: log.userId,
      userComplete: `${log.user?.firstName || ''} ${log.user?.lastName || ''}`.trim(),
    }));
  }


}