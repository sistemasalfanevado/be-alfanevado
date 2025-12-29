import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPettyCashDto } from './dto/create-zentra-petty-cash.dto';
import { UpdateZentraPettyCashDto } from './dto/update-zentra-petty-cash.dto';

import { ZentraDocumentService } from '../zentra-document/zentra-document.service';
import { ZentraDocumentSalesService } from '../zentra-document-sales/zentra-document-sales.service';
import { MailService } from '../../../../mail/mail.service';

import {
  DOCUMENT_CATEGORY,
  DOCUMENT_STATUS,
  DOCUMENT_ORIGIN,
  DOCUMENT_TYPE,
  PARTY_DOCUMENT_HIERARCHY,
} from 'src/shared/constants/app.constants';

import * as moment from 'moment';

@Injectable()
export class ZentraPettyCashService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ZentraDocumentService))
    private readonly zentraDocumentService: ZentraDocumentService,
    @Inject(forwardRef(() => ZentraDocumentSalesService))
    private readonly zentraDocumentSalesService: ZentraDocumentSalesService,
    private mailService: MailService,
  ) {}

  private includeRelations = {
    party: true,
    currency: true,
    pettyCashStatus: true,
    budgetItem: {
      include: {
        definition: true,
      },
    },
    user: true,
  };

  private mapEntityToDto(item: any) {
    return {
      id: item.id,
      code: item.code,
      description: item.description,

      requestedAmount: item.requestedAmount,
      approvedAmount: item.approvedAmount,
      accountedAmount: item.accountedAmount,

      balance: Number(item.approvedAmount) - Number(item.accountedAmount),

      registeredAt: moment(item.registeredAt).format('DD/MM/YYYY'),

      partyId: item.party?.id,
      partyName: item.party?.name,

      currencyId: item.currency?.id,
      currencyName: item.currency?.name,

      pettyCashStatusId: item.pettyCashStatus?.id,
      pettyCashStatusName: item.pettyCashStatus?.name,

      budgetItemId: item.budgetItem.id,
      budgetItemName: `${item.budgetItem.definition.name}`,

      userId: item.user?.id,
      userName: item.user?.firstName,
    };
  }

  // -------------------------
  // CREATE
  // -------------------------
  async create(createDto: CreateZentraPettyCashDto) {
    const last = await this.prisma.zentraPettyCash.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { code: true },
    });

    let nextNumber = 1;
    if (last?.code) {
      const number = parseInt(last.code.split('-')[1], 10);
      if (!isNaN(number)) nextNumber = number + 1;
    }

    const newCode = `CC-${String(nextNumber).padStart(4, '0')}`;

    return ''
  }

  // -------------------------
  // READ
  // -------------------------
  async findAll() {
    const items = await this.prisma.zentraPettyCash.findMany({
      where: { deletedAt: null },
      orderBy: { registeredAt: 'desc' },
      include: this.includeRelations,
    });

    return items.map(item => this.mapEntityToDto(item));
  }

  async findOne(id: string) {
    return this.prisma.zentraPettyCash.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        approvedAmount: true,
        accountedAmount: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        budgetItem: {
          select: {
            definition: {
              select: {
                project: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }


  
  async update(id: string, dto: UpdateZentraPettyCashDto) {
    return this.prisma.zentraPettyCash.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraPettyCash.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraPettyCash.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  // -----------------------------
  // FILTERS
  // -----------------------------
  async findByFilters(filters: {
    pettyCashStatusId?: string;
    partyId?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const where: any = { deletedAt: null };

    if (filters.pettyCashStatusId) {
      where.pettyCashStatusId = filters.pettyCashStatusId;
    }

    if (filters.partyId) {
      where.partyId = filters.partyId;
    }

    if (filters.userId) {
      where.userId = filters.userId;
    }

    if (filters.startDate || filters.endDate) {
      where.registeredAt = {};
      if (filters.startDate) {
        where.registeredAt.gte = moment(filters.startDate).startOf('day').toDate();
      }
      if (filters.endDate) {
        where.registeredAt.lte = moment(filters.endDate).endOf('day').toDate();
      }
    }

    return this.prisma.zentraPettyCash.findMany({
      where,
      include: { pettyCashStatus: true },
      orderBy: { registeredAt: 'desc' },
    });
  }

  // -----------------------------
  // DOCUMENTS
  // -----------------------------
  async addDocument(data: {
    pettyCashId: string;
    documentId: string;
  }) {
    return this.prisma.zentraDocument.update({
      where: { id: data.documentId },
      data: { pettyCashId: data.pettyCashId },
    });
  }

  async removeDocument(documentId: string) {
    return this.prisma.zentraDocument.update({
      where: { id: documentId },
      data: { pettyCashId: null },
    });
  }

  // -----------------------------
  // AMOUNTS
  // -----------------------------
  async addIncrement(data: { pettyCashId: string; amount: number }) {
    return this.prisma.zentraPettyCash.update({
      where: { id: data.pettyCashId },
      data: {
        approvedAmount: {
          increment: data.amount,
        },
      },
    });
  }

  async addRefund(data: { pettyCashId: string; amount: number }) {
    return this.prisma.zentraPettyCash.update({
      where: { id: data.pettyCashId },
      data: {
        accountedAmount: {
          increment: data.amount,
        },
      },
    });
  }

  // -----------------------------
  // REPORT
  // -----------------------------
  async getAllDataReport(pettyCashId: string) {
    return this.prisma.zentraDocument.findMany({
      where: {
        deletedAt: null,
        pettyCashId,
      },
      select: {
        code: true,
        description: true,
        amountToPay: true,
        paidAmount: true,
        registeredAt: true,
        documentType: true,
        party: {
          select: {
            name: true,
            partyDocuments: {
              where: {
                deletedAt: null,
                documentHierarchyId: PARTY_DOCUMENT_HIERARCHY.PRINCIPAL,
              },
              select: { document: true },
            },
          },
        },
        budgetItem: {
          select: {
            definition: {
              select: {
                name: true,
                category: { select: { name: true } },
              },
            },
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            area: { select: { name: true } },
          },
        },
        documentStatus: { select: { name: true } },
        files: { where: { deletedAt: null } },
      },
    });
  }
}