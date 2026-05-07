import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraSessionLogDto } from './dto/create-zentra-session-log.dto';
import { UpdateZentraSessionLogDto } from './dto/update-zentra-session-log.dto';
import { DateTime } from 'luxon';

@Injectable()
export class ZentraSessionLogService {
  constructor(private prisma: PrismaService) { }

  /**
   * Crea el registro de inicio de sesión.
   * Recibe el DTO del front y la IP capturada por el controller.
   */
  async create(data: CreateZentraSessionLogDto, ip: string) {
    return this.prisma.zentraSessionLog.create({
      data: {
        ...data,
        ipAddress: ip,
        // Aseguramos que localCreatedAt sea un objeto Date de JS
        localCreatedAt: new Date(data.localCreatedAt),
      },
    });
  }
  
  /**
   * Obtiene el historial de sesiones formateado.
   */
  async findAll() {
    const logs = await this.prisma.zentraSessionLog.findMany({
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

    return logs.map((log) => this.formatLog(log));
  }

  /**
   * Búsqueda con filtros para detectar ingresos sospechosos
   */
  async findByFilters(filters: {
    userId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { userId, startDate, endDate } = filters;
    const where: any = {};

    if (userId) where.userId = userId;
    
    if (startDate || endDate) {
      where.localCreatedAt = {};
      if (startDate) {
        where.localCreatedAt.gte = DateTime.fromISO(startDate).setZone('America/Lima').startOf('day').toJSDate();
      }
      if (endDate) {
        where.localCreatedAt.lte = DateTime.fromISO(endDate).setZone('America/Lima').endOf('day').toJSDate();
      }
    }

    const logs = await this.prisma.zentraSessionLog.findMany({
      where,
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: { serverCreatedAt: 'desc' },
    });

    return logs.map((log) => this.formatLog(log));
  }

  async findOne(id: string) {
    const log = await this.prisma.zentraSessionLog.findUnique({
      where: { id },
      include: { user: true },
    });
    return log ? this.formatLog(log) : null;
  }

  async update(id: string, data: UpdateZentraSessionLogDto) {
    return this.prisma.zentraSessionLog.update({
      where: { id },
      data,
    });
  }

  /**
   * Helper privado para formatear fechas y nombres
   * Aquí es donde "chapurreamos" la info para que sea legible
   */
  private formatLog(log: any) {
    return {
      id: log.id,
      userId: log.userId,
      userComplete: `${log.user?.firstName || ''} ${log.user?.lastName || ''}`.trim(),
      email: log.user?.email,
      
      // Datos del dispositivo
      browser: log.browser,
      os: log.os,
      deviceType: log.deviceType,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      fingerprint: log.deviceFingerprint,

      // Formateo de fechas con Luxon para Lima
      serverCreatedAt: DateTime.fromJSDate(log.serverCreatedAt)
        .setZone('America/Lima')
        .toFormat('dd/MM/yyyy HH:mm:ss'),

      localCreatedAt: DateTime.fromJSDate(log.localCreatedAt)
        .setZone('America/Lima')
        .toFormat('dd/MM/yyyy HH:mm:ss'),
      
      // Una descripción amigable para la tabla del front
      description: `Acceso desde ${log.browser} (${log.os}) - IP: ${log.ipAddress}`
    };
  }
}