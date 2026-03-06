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

    if (userId && userId.trim() !== '') {
      where.userId = userId;
    }

    if (startDate || endDate) {
      where.localCreatedAt = {};
      if (startDate) {
        where.localCreatedAt.gte = DateTime.fromISO(startDate).setZone('America/Lima').startOf('day').toJSDate();
      }
      if (endDate) {
        where.localCreatedAt.lte = DateTime.fromISO(endDate).setZone('America/Lima').endOf('day').toJSDate();
      }
    }

    const logs = await this.prisma.zentraAuditLog.findMany({
      where,
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: { serverCreatedAt: 'desc' },
    });

    const budgetItemIds = logs
      .filter(log => log.module === 'ZENTRA-BUDGET-ITEMS' && log.recordId)
      .map(log => log.recordId as string);

    const documentModules = ['ZENTRA-DOCUMENTS'];
    const documentIds = logs
      .filter(log => documentModules.includes(log.module) && log.recordId)
      .map(log => log.recordId as string);

    const movementModules = ['ZENTRA-DOCUMENT-EXPENSES', 'ZENTRA-DOCUMENT-SALES'];
    const movementIds = logs
      .filter(log => movementModules.includes(log.module) && log.recordId)
      .map(log => log.recordId as string);
    

    const [budgetItemsData, documentsData, movementsData] = await Promise.all([
      
      budgetItemIds.length > 0
        ? this.prisma.zentraBudgetItem.findMany({
          where: { id: { in: budgetItemIds } },
          include: { definition: { include: { project: true } } }
        })
        : Promise.resolve([] as any[]),
      
        documentIds.length > 0
        ? this.prisma.zentraDocument.findMany({
          where: { id: { in: documentIds } },
          include: {
            budgetItem: {
              include: { definition: { include: { project: true } } }
            }
          }
        })
        : Promise.resolve([] as any[]),

        movementIds.length > 0
        ? this.prisma.zentraMovement.findMany({
          where: { id: { in: movementIds } },
          include: {
            budgetItem: {
              include: { definition: { include: { project: true } } }
            }
          }
        })
        : Promise.resolve([] as any[]),


    ]);

    
    const budgetMap = new Map<string, any>(budgetItemsData.map(item => [item.id, item]));
    const documentMap = new Map<string, any>(documentsData.map(doc => [doc.id, doc]));
    const movementMap = new Map<string, any>(movementsData.map(mov => [mov.id, mov]));

    return logs.map((log) => {
      let extraDescription = '';

      if (log.module === 'ZENTRA-BUDGET-ITEMS') {
        const budgetData = budgetMap.get(log.recordId);
        if (budgetData) {
          const defName = budgetData.definition?.name || 'N/A';
          const projName = budgetData.definition?.project?.name || 'N/A';
          extraDescription = `${projName} - ${defName}`;
        }
      }

      if (documentModules.includes(log.module)) {
        const docData = documentMap.get(log.recordId);
        if (docData) {
          const code = docData.code || '';
          // Usamos DateTime de Luxon para ser consistentes o moment si ya lo tienes
          const docDate = docData.documentDate
            ? moment(docData.documentDate).format('DD/MM/YYYY')
            : '';
          const desc = docData.description || '';
          const budgetName = docData.budgetItem?.definition?.name || 'Sin Presupuesto';
          const projectName = docData.budgetItem?.definition?.project?.name || 'Sin Proyecto';

          extraDescription = `[${code}] ${docDate} | ${projectName} - ${budgetName} | ${desc}`;
        }
      }

      if (movementModules.includes(log.module)) {
        const movData = movementMap.get(log.recordId);
        if (movData) {
          const code = movData.code || '';
          const docDate = movData.paymentDate
            ? moment(movData.paymentDate).format('DD/MM/YYYY')
            : '';
          const desc = movData.description || '';
          const budgetName = movData.budgetItem?.definition?.name || 'Sin Presupuesto';
          const projectName = movData.budgetItem?.definition?.project?.name || 'Sin Proyecto';

          extraDescription = `[${code}] ${docDate} | ${projectName} - ${budgetName} | ${desc}`;
        }
      }

      return {
        id: log.id,
        module: log.module,
        action: log.action,
        recordId: log.recordId,
        description: extraDescription,
        serverCreatedAt: DateTime.fromJSDate(log.serverCreatedAt)
          .setZone('America/Lima')
          .toFormat('dd/MM/yyyy HH:mm:ss'),
        localCreatedAt: DateTime.fromJSDate(log.localCreatedAt)
          .setZone('America/Lima')
          .toFormat('dd/MM/yyyy HH:mm:ss'),
        userId: log.userId,
        userComplete: `${log.user?.firstName || ''} ${log.user?.lastName || ''}`.trim(),
      };
    });
  }


}