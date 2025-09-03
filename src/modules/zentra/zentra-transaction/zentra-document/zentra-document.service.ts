import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CreateZentraDocumentDto } from './dto/create-zentra-document.dto';
import { UpdateZentraDocumentDto } from './dto/update-zentra-document.dto';

import { ZentraMovementService } from '../../zentra-transaction/zentra-movement/zentra-movement.service';
import { ZentraScheduledIncomeDocumentService } from '../../zentra-master/zentra-scheduled-income-document/zentra-scheduled-income-document.service';

import * as moment from 'moment';

@Injectable()
export class ZentraDocumentService {

  /** Códigos de tipo de transacción */
  private ENTRY_ID = 'fe14bee6-9be4-43a5-9d8f-7fc032751415';
  private EXIT_ID = '8b190f70-cc43-42fa-8d7b-6afde6ed10b5';

  /** IDs de moneda */
  private SOLES_ID = '70684299-05fc-4720-8fca-be3a2ecb67ab';
  private DOLARES_ID = 'a1831dfc-a1f7-4075-a66e-fe3f5694e1e4';

  constructor(private prisma: PrismaService,
    private zentraScheduledIncomeDocumentService: ZentraScheduledIncomeDocumentService,
    private zentraMovementService: ZentraMovementService
  ) { }

  private includeRelations = {
    documentStatus: true,
    transactionType: true,
    documentType: true,
    party: true,
    budgetItem: {
      include: {
        definition: true,
        currency: true
      }
    },
    currency: true,
    user: true,
    movements: true,
    documentCategory: true,
  };

  /** Mapea un registro de Prisma a DTO */
  private mapEntityToDto(item: any) {
    return {
      id: item.id,
      code: item.code,
      description: item.description,

      totalAmount: item.totalAmount,
      taxAmount: item.taxAmount,
      netAmount: item.netAmount,
      detractionRate: item.detractionRate,
      detractionAmount: item.detractionAmount,
      amountToPay: item.amountToPay,
      paidAmount: item.paidAmount,

      registeredAt: moment(item.registeredAt).format('DD/MM/YYYY'),
      documentDate: moment(item.documentDate).format('DD/MM/YYYY'),
      expireDate: moment(item.expireDate).format('DD/MM/YYYY'),

      transactionTypeId: item.transactionType.id,
      transactionTypeName: item.transactionType.name,

      documentTypeId: item.documentType.id,
      documentTypeName: item.documentType.name,

      partyId: item.party.id,
      partyName: item.party.name,

      documentStatusId: item.documentStatus.id,
      documentStatusName: item.documentStatus.name,

      budgetItemId: item.budgetItem.id,
      budgetItemName: item.budgetItem
        ? `${item.budgetItem.definition.name} - ${item.budgetItem.currency.name}`
        : null,

      currencyId: item.currency.id,
      currencyName: item.currency.name,

      userId: item.user.id,

      documentCategoryId: item.documentCategory?.id,
      documentCategoryName: item.documentCategory?.name,
      
      observation: item.observation,
      idFirebase: item.idFirebase
    };
  }

  /** Método reutilizable para búsquedas con mapeo */
  private async findManyWithMapping(where: any) {
    const results = await this.prisma.zentraDocument.findMany({
      where,
      include: this.includeRelations,
      orderBy: {
        documentDate: 'desc'
      }
    });
    return results.map(this.mapEntityToDto);
  }

  async create(createDto: CreateZentraDocumentDto) {

    const {
      documentStatusId,
      transactionTypeId,
      documentTypeId,
      partyId,
      budgetItemId,
      currencyId,
      userId,
      documentCategoryId,
      registeredAt,
      documentDate,
      expireDate,
      ...data
    } = createDto;

    return this.prisma.zentraDocument.create({
      data: {
        ...data,
        registeredAt: new Date(registeredAt),
        documentDate: new Date(documentDate),
        expireDate: new Date(expireDate),
        documentStatus: { connect: { id: documentStatusId } },
        transactionType: { connect: { id: transactionTypeId } },
        documentType: { connect: { id: documentTypeId } },
        party: { connect: { id: partyId } },
        budgetItem: { connect: { id: budgetItemId } },
        currency: { connect: { id: currencyId } },
        user: { connect: { id: userId } },
        documentCategory: { connect: { id: documentCategoryId } },
      },

      include: this.includeRelations
    });
  }

  async findAll(): Promise<any[]> {
    return this.findManyWithMapping({ deletedAt: null });
  }

  async findAllByProject(projectId: string): Promise<any[]> {
    return this.findManyWithMapping({
      deletedAt: null,
      budgetItem: {
        definition: { projectId }
      }
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.zentraDocument.findUnique({
      where: { id, deletedAt: null },
      include: this.includeRelations
    });
    return item ? this.mapEntityToDto(item) : null;
  }

  async update(id: string, updateDto: UpdateZentraDocumentDto) {
    const {
      documentStatusId,
      transactionTypeId,
      documentTypeId,
      partyId,
      budgetItemId,
      currencyId,
      userId,
      documentCategoryId,
      expireDate,
      registeredAt,
      documentDate,
      ...data
    } = updateDto;

    const updateData: any = { ...data };

    if (expireDate) updateData.expireDate = new Date(expireDate);
    if (registeredAt) updateData.registeredAt = new Date(registeredAt);
    if (documentDate) updateData.documentDate = new Date(documentDate);

    if (documentStatusId) updateData.documentStatus = { connect: { id: documentStatusId } };
    if (transactionTypeId) updateData.transactionType = { connect: { id: transactionTypeId } };
    if (documentTypeId) updateData.documentType = { connect: { id: documentTypeId } };
    if (partyId) updateData.party = { connect: { id: partyId } };
    if (budgetItemId) updateData.budgetItem = { connect: { id: budgetItemId } };
    if (currencyId) updateData.currency = { connect: { id: currencyId } };
    if (userId) updateData.user = { connect: { id: userId } };

    if (documentCategoryId)
      updateData.documentCategory = { connect: { id: documentCategoryId } };

    return this.prisma.zentraDocument.update({
      where: { id },
      data: updateData,
      include: this.includeRelations
    });
  }

  async remove(id: string) {
    return this.prisma.zentraDocument.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async restore(id: string) {
    return this.prisma.zentraDocument.update({
      where: { id },
      data: { deletedAt: null }
    });
  }

  async findByFilters(filters: {
    documentStatusId?: string;
    partyId?: string;
    documentCategoryId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { documentStatusId, partyId, documentCategoryId, startDate, endDate } = filters;

    const where: any = {
      deletedAt: null,
    };

    if (startDate || endDate) {
      where.documentDate = {};
      if (startDate) {
        where.documentDate.gte = moment(startDate).startOf('day').toDate();
      }
      if (endDate) {
        where.documentDate.lte = moment(endDate).endOf('day').toDate();
      }
    }

    if (documentStatusId && documentStatusId.trim() !== '') {
      where.documentStatus = { id: documentStatusId };
    }

    if (partyId && partyId.trim() !== '') {
      where.party = { id: partyId };
    }

    if (documentCategoryId && documentCategoryId.trim() !== '') {
      where.documentCategory = { id: documentCategoryId };
    }

    const results = await this.prisma.zentraDocument.findMany({
      where,
      include: this.includeRelations,
    });

    return results.map(item => this.mapEntityToDto(item));
  }

  private async createDocument(dataDocument: any) {
    return this.prisma.zentraDocument.create({
      data: {
        code: dataDocument.code,
        description: dataDocument.description,
        totalAmount: dataDocument.totalAmount,
        taxAmount: dataDocument.taxAmount,
        netAmount: dataDocument.netAmount,
        detractionRate: dataDocument.detractionRate,
        detractionAmount: dataDocument.detractionAmount,
        amountToPay: dataDocument.amountToPay,
        paidAmount: dataDocument.paidAmount,
        observation: dataDocument.observation,
        idFirebase: dataDocument.idFirebase,
        hasMovements: dataDocument.hasMovements ?? false,

        registeredAt: new Date(dataDocument.registeredAt),
        documentDate: new Date(dataDocument.documentDate),
        expireDate: new Date(dataDocument.expireDate),

        documentStatus: { connect: { id: dataDocument.documentStatusId } },
        transactionType: { connect: { id: dataDocument.transactionTypeId } },
        documentType: { connect: { id: dataDocument.documentTypeId } },
        party: { connect: { id: dataDocument.partyId } },
        budgetItem: { connect: { id: dataDocument.budgetItemId } },
        currency: { connect: { id: dataDocument.currencyId } },
        user: { connect: { id: dataDocument.userId } },
        documentCategory: { connect: { id: dataDocument.documentCategoryId } },
      },
      include: this.includeRelations,
    });
  }

  private async createMovement(data: {
    code: string;
    description: string;
    documentId: string;
    amount: number;
    transactionTypeId: string;
    movementCategoryId: string;
    budgetItemId: string;
    bankAccountId: string;
    movementStatusId: string;
    currencyId: string;
    date: string;
  }) {
    return this.zentraMovementService.create({
      code: data.code,
      description: data.description,
      documentId: data.documentId,
      amount: data.amount,
      transactionTypeId: data.transactionTypeId,
      movementCategoryId: data.movementCategoryId,
      budgetItemId: data.budgetItemId,
      bankAccountId: data.bankAccountId,
      movementStatusId: data.movementStatusId,
      autorizeDate: data.date,
      generateDate: data.date,
      paymentDate: data.date,
    });
  }

  private async removeDocumentWithMovements(id: string) {
    return this.prisma.$transaction(async (tx) => {
      const document = await tx.zentraDocument.findUnique({
        where: { id },
        include: { movements: true },
      });

      if (!document) throw new Error("Documento no encontrado");

      await tx.zentraDocument.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      for (const movement of document.movements) {
        await this.zentraMovementService.remove(movement.id);
      }

      return { message: "Documento y movimientos eliminados correctamente" };
    }, {
      timeout: 20000, // Aumentar timeout para operaciones largas
      maxWait: 15000, // Tiempo máximo de espera para adquirir la transacción
    });
  }

  private buildDocumentFilters(filters: {
    partyId?: string;
    documentCategoryId?: string;
    documentStatusId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const where: any = { deletedAt: null };

    if (filters.startDate || filters.endDate) {
      where.documentDate = {};
      if (filters.startDate) {
        where.documentDate.gte = moment(filters.startDate).startOf("day").toDate();
      }
      if (filters.endDate) {
        where.documentDate.lte = moment(filters.endDate).endOf("day").toDate();
      }
    }

    if (filters.documentStatusId?.trim()) {
      where.documentStatusId = filters.documentStatusId;
    }

    if (filters.partyId?.trim()) {
      where.partyId = filters.partyId;
    }

    if (filters.documentCategoryId?.trim()) {
      where.documentCategoryId = filters.documentCategoryId;
    }

    return where;
  }

  private async getBankAccountCurrency(bankAccountId: string) {
    const account = await this.prisma.zentraBankAccount.findUnique({
      where: { id: bankAccountId },
      select: { currencyId: true },
    });

    if (!account) {
      throw new Error("Cuenta bancaria no encontrada");
    }

    return account.currencyId;
  }

  // Scheduled Exchange Rate

  async createExchangeRate(dataDocument: any) {
    const bankAccountOriginCurrency = await this.getBankAccountCurrency(dataDocument.backAccountOriginId);
    const bankAccountDestinyCurrency = await this.getBankAccountCurrency(dataDocument.backAccountDestinyId);

    const document = await this.createDocument(dataDocument);

    await this.createMovement({
      code: document.code,
      description: "Mov. Salida",
      documentId: document.id,
      amount: dataDocument.amountOrigin,
      transactionTypeId: dataDocument.transactionTypeOrigin,
      movementCategoryId: dataDocument.movementCategoryId,
      budgetItemId: dataDocument.budgetItemId,
      bankAccountId: dataDocument.backAccountOriginId,
      movementStatusId: dataDocument.movementStatusId,
      currencyId: bankAccountOriginCurrency,
      date: dataDocument.documentDate,
    });

    await this.createMovement({
      code: document.code,
      description: "Mov. Entrada",
      documentId: document.id,
      amount: dataDocument.amountDestiny,
      transactionTypeId: dataDocument.transactionTypeDestiny,
      movementCategoryId: dataDocument.movementCategoryId,
      budgetItemId: dataDocument.budgetItemId,
      bankAccountId: dataDocument.backAccountDestinyId,
      movementStatusId: dataDocument.movementStatusId,
      currencyId: bankAccountDestinyCurrency,
      date: dataDocument.documentDate,
    });

    return this.mapEntityToDto(document);
  }

  async removeExchangeRate(id: string) {
    return this.removeDocumentWithMovements(id);
  }

  async findByFiltersExchangeRate(filters: {
    partyId?: string;
    documentCategoryId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const where = this.buildDocumentFilters(filters);

    const results = await this.prisma.zentraDocument.findMany({
      where,
      select: {
        id: true,
        documentDate: true,
        party: { select: { name: true } },
        movements: {
          where: { deletedAt: null },
          select: {
            amount: true,
            transactionTypeId: true,
            bankAccount: {
              select: {
                bank: { select: { name: true } },
                currency: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    return results.map((doc) => {
      const originMovement = doc.movements.find((m) => m.transactionTypeId === this.EXIT_ID);
      const destinyMovement = doc.movements.find((m) => m.transactionTypeId === this.ENTRY_ID);

      return {
        id: doc.id,
        documentDate: moment(doc.documentDate).format("DD/MM/YYYY"),
        partyName: doc.party?.name ?? null,
        originBankAccount: originMovement
          ? `${originMovement.bankAccount.bank.name} ${originMovement.bankAccount.currency.name}`
          : null,
        destinyBankAccount: destinyMovement
          ? `${destinyMovement.bankAccount.bank.name} ${destinyMovement.bankAccount.currency.name}`
          : null,
        amountOrigin: originMovement?.amount ?? null,
        amountDestiny: destinyMovement?.amount ?? null,
      };
    });
  }

  // Scheduled Financial Expense

  async createFinancialExpense(dataDocument: any) {
    const bankAccountOriginCurrency = await this.getBankAccountCurrency(dataDocument.backAccountOriginId);

    const document = await this.createDocument(dataDocument);

    await this.createMovement({
      code: dataDocument.codeMovement ?? dataDocument.code,
      description: dataDocument.description,
      documentId: document.id,
      amount: dataDocument.amountOrigin,
      transactionTypeId: dataDocument.transactionTypeId,
      movementCategoryId: dataDocument.movementCategoryId,
      budgetItemId: dataDocument.budgetItemId,
      bankAccountId: dataDocument.backAccountOriginId,
      movementStatusId: dataDocument.movementStatusId,
      currencyId: bankAccountOriginCurrency,
      date: dataDocument.documentDate,
    });

    return this.mapEntityToDto(document);
  }

  async removeFinancialExpense(id: string) {
    return this.removeDocumentWithMovements(id);
  }

  async findByFiltersFinancialExpense(filters: {
    documentCategoryId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const where = this.buildDocumentFilters(filters);

    const results = await this.prisma.zentraDocument.findMany({
      where,
      select: {
        id: true,
        movements: {
          where: { deletedAt: null },
          select: {
            id: true,
            amount: true,
            code: true,
            paymentDate: true,
            description: true,
            budgetItem: {
              select: {
                id: true,
              }
            },
            transactionType: {
              select: {
                id: true,
                name: true
              }
            },
            bankAccount: {
              select: {
                id: true,
                bank: { select: { name: true } },
                currency: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    return results
      .filter((doc) => doc.movements.length > 0)
      .map((doc) => {
        const mov = doc.movements[0];
        return {
          id: doc.id,
          documentDate: moment(mov.paymentDate).format("DD/MM/YYYY"),
          description: mov.description ?? null,
          bankAccount: `${mov.bankAccount.bank.name} ${mov.bankAccount.currency.name}`,
          typeTransaction: mov.transactionType.name,
          amountOrigin: mov.amount,
          movementId: mov.id,
          backAccountOriginId: mov.bankAccount.id,
          transactionTypeId: mov.transactionType.id,
          budgetItemId: mov.budgetItem.id,
          codeMovement: mov.code,
        };
      });
  }

  async updateFinancialExpense(id: string, updateData: any) {

    const bankAccountOriginCurrency = await this.getBankAccountCurrency(updateData.backAccountOriginId);

    return this.prisma.$transaction(async (tx) => {

      const movement = await tx.zentraMovement.findFirst({
        where: { documentId: id, deletedAt: null },
      });

      if (movement) {
        await this.zentraMovementService.update(movement.id, {
          amount: updateData.amountOrigin,
          autorizeDate: updateData.documentDate,
          generateDate: updateData.documentDate,
          paymentDate: updateData.documentDate,
          code: updateData.codeMovement,
          description: updateData.description,
          idFirebase: !movement.idFirebase ? '' : movement.idFirebase,
          documentId: !movement.documentId ? '' : movement.documentId,
          transactionTypeId: updateData.transactionTypeId,
          bankAccountId: updateData.backAccountOriginId,
          budgetItemId: updateData.budgetItemId,
          movementCategoryId: movement.movementCategoryId,
          movementStatusId: movement.movementStatusId,
        });
      }

      // 5. Retornar DTO unificado
      return {

      };
    }, {
      timeout: 20000, // Aumentar timeout para operaciones largas
      maxWait: 15000, // Tiempo máximo de espera para adquirir la transacción
    });
  }

  // Scheduled Income Document

  async createScheduledIncome(dataDocument: any) {
    const document = await this.createDocument(dataDocument);
    await this.zentraScheduledIncomeDocumentService.create({
      documentId: document.id,
      brokerId: dataDocument.brokerId,
      saleTypeId: dataDocument.saleTypeId,
      lotId: dataDocument.lotId,
    });
    return this.mapEntityToDto(document);
  }

  async findByFiltersScheduledIncome(filters: {
    documentCategoryId?: string;
    documentStatusId?: string;
    partyId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const where = this.buildDocumentFilters(filters);

    const results = await this.prisma.zentraDocument.findMany({
      where,
      include: {
        transactionType: true,
        documentStatus: true,
        documentType: true,
        party: true,
        currency: true,
        budgetItem: {
          include: {
            definition: true,
            currency: true,
          },
        },
        user: true,
        documentCategory: true,
        scheduledIncomeDocuments: {
          where: { deletedAt: null },
          include: {
            broker: true,
            saleType: true,
            lot: true,
          },
        },
      },
      orderBy: {
        documentDate: 'desc',
      },
    });

    return results.map((doc) => {
      const sched = doc.scheduledIncomeDocuments?.[0];

      return {
        // 🔹 Información del documento
        id: doc.id,
        code: doc.code,
        description: doc.description,

        totalAmount: doc.totalAmount,
        taxAmount: doc.taxAmount,
        netAmount: doc.netAmount,
        detractionRate: doc.detractionRate,
        detractionAmount: doc.detractionAmount,
        amountToPay: doc.amountToPay,
        paidAmount: doc.paidAmount,

        registeredAt: doc.registeredAt,
        documentDate: doc.documentDate,
        expireDate: doc.expireDate,

        transactionTypeId: doc.transactionType?.id,
        transactionTypeName: doc.transactionType?.name,

        documentTypeId: doc.documentType?.id,
        documentTypeName: doc.documentType?.name,

        partyId: doc.party?.id,
        partyName: doc.party?.name,

        documentStatusId: doc.documentStatus?.id,
        documentStatusName: doc.documentStatus?.name,

        budgetItemId: doc.budgetItem?.id,
        budgetItemName: doc.budgetItem
          ? `${doc.budgetItem.definition.name} - ${doc.budgetItem.currency.name}`
          : null,

        currencyId: doc.currency?.id,
        currencyName: doc.currency?.name,

        userId: doc.user?.id,

        documentCategoryId: doc.documentCategory?.id,
        documentCategoryName: doc.documentCategory?.name,

        observation: doc.observation,
        idFirebase: doc.idFirebase,
        
        brokerId: sched?.broker?.id ?? null,
        brokerName: sched?.broker?.name ?? null,

        saleTypeId: sched?.saleType?.id ?? null,
        saleTypeName: sched?.saleType?.name ?? null,

        lotId: sched?.lot?.id ?? null,
        lotName: sched?.lot?.name ?? null,
        lotCode: sched?.lot?.code ?? null,
      };
    });
    
  }
}