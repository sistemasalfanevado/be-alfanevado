import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraAuditLogDto } from './dto/create-zentra-audit-log.dto';

import * as moment from 'moment';

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
      
      serverCreatedAt: moment(log.serverCreatedAt).format("DD/MM/YYYY HH:MM:SS"),
      localCreatedAt: moment(log.localCreatedAt).format("DD/MM/YYYY HH:MM:SS"),
      
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

}