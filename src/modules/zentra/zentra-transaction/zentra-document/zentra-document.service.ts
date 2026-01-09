import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CreateZentraDocumentDto } from './dto/create-zentra-document.dto';
import { UpdateZentraDocumentDto } from './dto/update-zentra-document.dto';
import { ZentraExchangeRateService } from '../../zentra-master/zentra-exchange-rate/zentra-exchange-rate.service';
import { ZentraInstallmentService } from '../../zentra-transaction/zentra-installment/zentra-installment.service';
import { ZentraMovementService } from '../../zentra-transaction/zentra-movement/zentra-movement.service';
import { ZentraScheduledIncomeDocumentService } from '../../zentra-master/zentra-scheduled-income-document/zentra-scheduled-income-document.service';
import { ZentraScheduledDebtDocumentService } from '../../zentra-master/zentra-scheduled-debt-document/zentra-scheduled-debt-document.service';

import { ZentraAccountabilityService } from '../../zentra-transaction/zentra-accountability/zentra-accountability.service';


import {
  TRANSACTION_TYPE, CURRENCY, MOVEMENT_CATEGORY,
  BANK_ACCOUNT_HIERARCHY, EXCHANGE_RATE, DOCUMENT_ORIGIN, INSTALLMENT_STATUS, DOCUMENT_CATEGORY
} from 'src/shared/constants/app.constants';

import * as moment from 'moment';

@Injectable()
export class ZentraDocumentService {

  constructor(private prisma: PrismaService,
    private zentraScheduledDebtDocumentService: ZentraScheduledDebtDocumentService,
    private zentraScheduledIncomeDocumentService: ZentraScheduledIncomeDocumentService,
    private zentraMovementService: ZentraMovementService,
    private zentraExchangeRateService: ZentraExchangeRateService,

    @Inject(forwardRef(() => ZentraAccountabilityService))
    private readonly zentraAccountabilityService: ZentraAccountabilityService,

    @Inject(forwardRef(() => ZentraInstallmentService))
    private readonly zentraInstallmentService: ZentraInstallmentService,
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
    financialNature: {
      include: {
        movementCategory: true,
      }
    },
    documentOrigin: true,
    accountability: true,
  };

  private includeRelationsWithBankAccount = {
    documentStatus: true,
    transactionType: true,
    documentType: true,
    documentOrigin: true,
    accountability: true,
    party: {
      include: {
        partyBankAccounts: {
          where: {
            deletedAt: null,
            hierarchyId: BANK_ACCOUNT_HIERARCHY.PRINCIPAL,
          },
          include: {
            bank: true,
            currency: true,
            type: true,
          },
        },
      }
    },
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
    financialNature: {
      include: {
        movementCategory: true,
      }
    },
  };

  /** Mapea un registro de Prisma a DTO */
  private mapEntityToDto(item: any) {

    const principalAccount = item.party?.partyBankAccounts?.[0] ?? null;
    const partyCurrencyId = principalAccount?.currency?.id;

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
        ? `${item.budgetItem.definition.name}`
        : null,

      currencyId: item.currency.id,
      currencyName: item.currency.name,

      userId: item.user.id,
      userName: item.user.firstName,

      documentCategoryId: item.documentCategory?.id,
      documentCategoryName: item.documentCategory?.name,

      observation: item.observation,
      idFirebase: item.idFirebase,

      totalInflow: item.totalInflow ?? 0,
      totalOutflow: item.totalOutflow ?? 0,

      financialNatureId: item.financialNature?.id ?? null,
      financialNatureName: item.financialNature?.name ?? null,
      movementCategoryId: item.financialNature?.movementCategory?.id ?? null,
      movementCategoryName: item.financialNature?.movementCategory?.name ?? null,

      documentOriginId: item.documentOrigin?.id ?? null,
      accountabilityId: item.accountability?.id ?? null,

      partyBankAccountInfo: principalAccount
        ? `${principalAccount.bank?.name ?? '-'} | ${principalAccount.currency?.name ?? '-'} | ${principalAccount.type?.name ?? '-'} | ${principalAccount.account ?? '-'} | CCI: ${principalAccount.cci ?? '-'}`
        : '',

      partyBankAccountInfoHtml: principalAccount
        ? `
    <div style="display: flex; flex-direction: column; gap: 2px; line-height: 1.3; padding: 2px 0; color: ${partyCurrencyId === CURRENCY.SOLES ? '#1E3A8A' /* azul profundo */ : '#C2410C' /* naranja oscuro */
        };">
      <span style="font-weight: 600; font-size: 15px;">
        ${principalAccount.bank?.name ?? '-'}
      </span>

      <div style="margin-left: 2px;">
        <span style="display: block; font-size: 13.5px; font-weight: 500;">
          ${principalAccount.type?.name ?? '-'}
        </span>
        <span style="display: block; font-size: 13px;">
          ${principalAccount.account ?? '-'}
        </span>
      </div>

      <div style="margin-top: 2px; font-size: 12px; opacity: 0.85;">
        <span style="font-weight: 500;">CCI:</span>
        <span style="font-family: monospace;">${principalAccount.cci ?? '-'}</span>
      </div>

      <span style="margin-top: 3px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
        ${partyCurrencyId === CURRENCY.SOLES ? 'SOLES' : 'DÓLARES'}
      </span>
    </div>
  `
        : '',
      partyBankAccountInfoSimpleHtml: principalAccount
        ? `
  <div style="
    display: flex;
    flex-direction: column;
    line-height: 1.3;
    color: ${partyCurrencyId === CURRENCY.SOLES ? '#1E3A8A' : '#C2410C'};
  ">
    <span style="font-weight: 600; font-size: 12px;">
      ${principalAccount.bank?.name ?? '-'}
    </span>

    <span style="
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
    ">
      ${partyCurrencyId === CURRENCY.SOLES ? 'SOLES' : 'DÓLARES'}
    </span>
  </div>
  `
        : '',

      partyBankAccountCurrency: partyCurrencyId,



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

  async create(createDto: CreateZentraDocumentDto): Promise<{ id: string }> {
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
      financialNatureId,
      documentTransactionMethodId,
      accountabilityId,
      pettyCashId,
      documentOriginId,
      ...data
    } = createDto;

    const created = await this.prisma.zentraDocument.create({
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
        ...(financialNatureId && {
          financialNature: { connect: { id: financialNatureId } },
        }),
        ...(documentTransactionMethodId && {
          documentTransactionMethod: { connect: { id: documentTransactionMethodId } },
        }),
        ...(accountabilityId && {
          accountability: { connect: { id: accountabilityId } },
        }),
        ...(pettyCashId && {
          pettyCash: { connect: { id: pettyCashId } },
        }),
        ...(documentOriginId && {
          documentOrigin: { connect: { id: documentOriginId } },
        }),
      },
      select: {
        id: true,
      },
    });

    return { id: created.id };
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

  async update(id: string, updateDto: UpdateZentraDocumentDto): Promise<void> {
    const {
      documentStatusId,
      transactionTypeId,
      documentTypeId,
      partyId,
      budgetItemId,
      currencyId,
      userId,
      documentCategoryId,
      financialNatureId, // 👈 añadimos aquí
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
    if (documentCategoryId) updateData.documentCategory = { connect: { id: documentCategoryId } };

    if (financialNatureId) {
      updateData.financialNature = { connect: { id: financialNatureId } };
    }

    await this.prisma.zentraDocument.update({
      where: { id },
      data: updateData,
    });
  }

  async updateSimple(id: string, updateDto: any) {
    await this.prisma.zentraDocument.update({
      where: { id },
      data: {
        ...updateDto
      },
    });

    return {
      id: id
    }
  }

  async updateStatusAndPaidAmount(id: string, updateDto: any) {
    return this.prisma.zentraDocument.update({
      where: { id },
      data: {
        paidAmount: updateDto.paidAmount,
        documentStatusId: updateDto.documentStatusId
      },
    });
  }

  async updateDocumentDebtInvestment(id: string, updateDto: any) {
    return this.prisma.zentraDocument.update({
      where: { id },
      data: {
        paidAmount: updateDto.paidAmount,
        totalInflow: updateDto.totalInflow,
        totalOutflow: updateDto.totalOutflow
      },
    });
  }

  async updateDocumentSale(id: string, updateDto: any) {
    return this.prisma.zentraDocument.update({
      where: { id },
      data: {
        documentStatusId: updateDto.documentStatusId,
        paidAmount: updateDto.paidAmount,
        totalInflow: updateDto.totalInflow,
        totalOutflow: updateDto.totalOutflow
      },
    });
  }

  async updateDocumentExpense(id: string, updateDto: any) {
    return this.prisma.zentraDocument.update({
      where: { id },
      data: {
        documentStatusId: updateDto.documentStatusId,
        paidAmount: updateDto.paidAmount,
        totalInflow: updateDto.totalInflow,
        totalOutflow: updateDto.totalOutflow
      },
    });
  }

  async remove(id: string) {
    return this.removeDocumentWithMovements(id)
  }

  async restore(id: string) {
    return this.prisma.zentraDocument.update({
      where: { id },
      data: { deletedAt: null }
    });
  }


  async findByFilters(filters: {
    transactionTypeId?: string,
    documentStatusId?: string;
    partyId?: string;
    documentCategoryId?: string;
    financialNatureId?: string;
    projectId?: string;
    companyId?: string;
    startDate?: string;
    endDate?: string;
    userId?: string;
    withPartyBankAccount?: boolean;
    accountabilityId?: string;
    documentTypeId?: string;
    excludeDocumentTypeId?: string;
    currencyId?: string;
  }) {
    const { currencyId, documentTypeId, excludeDocumentTypeId, withPartyBankAccount, accountabilityId, documentStatusId, partyId, documentCategoryId, financialNatureId, transactionTypeId, projectId, companyId, userId, startDate, endDate } = filters;

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

    if (currencyId && currencyId.trim() !== '') {
      where.currency = { id: currencyId };
    }

    if (documentCategoryId && documentCategoryId.trim() !== '') {
      where.documentCategory = { id: documentCategoryId };
    }

    if (financialNatureId && financialNatureId.trim() !== '') {
      where.financialNature = { id: financialNatureId };
    }

    if (transactionTypeId && transactionTypeId.trim() !== '') {
      where.transactionType = { id: transactionTypeId };
    }

    if (excludeDocumentTypeId && excludeDocumentTypeId.trim() !== '') {
      where.documentType = { id: { not: excludeDocumentTypeId } };
    }

    if (documentTypeId && documentTypeId.trim() !== '') {
      where.documentType = { id: documentTypeId };
    }

    if (accountabilityId && accountabilityId.trim() !== '') {
      where.accountability = { id: accountabilityId };
    }

    if (userId && userId.trim() !== '') {
      where.user = { id: userId };
    }

    if (projectId && projectId.trim() !== '') {
      where.budgetItem = {
        definition: {
          projectId: projectId,
        },
      };
    }

    if (companyId && companyId.trim() !== '') {
      where.budgetItem = {
        definition: {
          project: {
            companyId
          }
        },
      };
    }

    const results = await this.prisma.zentraDocument.findMany({
      where,
      include: withPartyBankAccount ? this.includeRelationsWithBankAccount : this.includeRelations,
      orderBy: {
        documentDate: 'desc',
      },
    });

    const docIds = results.map(r => r.id);

    const groups = await this.prisma.zentraMovement.groupBy({
      by: ['documentId', 'budgetItemId'],
      where: {
        documentId: { in: docIds },
        deletedAt: null,
      },
      _count: {
        _all: true,
      },
    });

    const mapByDoc = new Map<string, Array<{ budgetItemId: string | null, count: number }>>();

    for (const g of groups) {
      const arr = mapByDoc.get(g.documentId) ?? [];
      arr.push({ budgetItemId: g.budgetItemId ?? null, count: g._count._all });
      mapByDoc.set(g.documentId, arr);
    }

    const resultsWithConsistency = results.map(item => {
      const dto = this.mapEntityToDto(item);
      const docBudgetItemId = item.budgetItem?.id ?? null;

      const groupsForDoc = mapByDoc.get(item.id) ?? [];
      const totalMovements = groupsForDoc.reduce((sum, g) => sum + g.count, 0);
      const inconsistentMovements = groupsForDoc
        .filter(g => g.budgetItemId !== docBudgetItemId)
        .reduce((sum, g) => sum + g.count, 0);

      return {
        ...dto,
        totalMovements,
        inconsistentMovements,
        hasBudgetItemMismatch: inconsistentMovements > 0,
      };
    });

    return resultsWithConsistency;


  }


  async createDocument(dataDocument: any) {

    const created = await this.prisma.zentraDocument.create({
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

        ...(dataDocument.financialNatureId && {
          financialNature: { connect: { id: dataDocument.financialNatureId } },
        }),
        ...(dataDocument.documentTransactionMethodId && {
          documentTransactionMethod: { connect: { id: dataDocument.documentTransactionMethodId } },
        }),
        ...(dataDocument.accountabilityId && {
          accountability: { connect: { id: dataDocument.accountabilityId } },
        }),
        ...(dataDocument.documentOriginId && {
          documentOrigin: { connect: { id: dataDocument.documentOriginId } },
        }),



      },
      select: { id: true, code: true }, // 👈 solo traemos el id
    });

    return created; // devuelve { id: string }
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
    date: string;
    idFirebase: string;
    fromTelecredito?: boolean;
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
      idFirebase: !data.idFirebase ? '' : data.idFirebase,
      fromTelecredito: data.fromTelecredito ?? false,
    });
  }

  private async removeDocumentWithMovements(documentId: string) {
    // 1. Buscar el documento con sus movimientos
    const documentData = await this.prisma.zentraDocument.findUnique({
      where: { id: documentId },
      include: { movements: true },
    });

    if (!documentData) {
      throw new Error("Documento no encontrado");
    }

    // 2. Marcar el documento como eliminado
    await this.prisma.zentraDocument.update({
      where: { id: documentId },
      data: { deletedAt: new Date() },
    });


    // 3. Revisar el accountability

    if (documentData?.documentOriginId === DOCUMENT_ORIGIN.RENDICION_CUENTAS) {
      // Si existe debo de actualizar la rendicion de cuentas
      await this.zentraAccountabilityService.updataAccountabilityData(documentData);
    }

    // 4. Eliminar movimientos relacionados
    for (const movement of documentData.movements) {
      try {
        await this.zentraMovementService.remove(movement.id);
      } catch (error) {
        console.error(`Error al eliminar movimiento ${movement.id}:`, error);
      }
    }

    return { message: "Documento y movimientos eliminados correctamente" };
  }

  private async removeDocumentWithScheduledIncome(id: string) {

    const document = await this.prisma.zentraDocument.findMany({
      where: { id },
      include: {
        scheduledIncomeDocuments: {
          include: {
            installments: true
          }
        }
      },
    });

    if (document.length === 0) throw new Error("Documento no encontrado");

    // Remueveb los installments con sus movimientos
    for (let itemDocument of document) {
      for (let itemScheduledIncomeDocuments of itemDocument.scheduledIncomeDocuments) {
        for (let itemInstallment of itemScheduledIncomeDocuments.installments) {
          await this.zentraInstallmentService.remove(itemInstallment.id)
        }
      }
    }

    // Remuven los schedule income document
    for (let itemDocument of document) {
      for (let itemScheduledIncomeDocuments of itemDocument.scheduledIncomeDocuments) {
        await this.zentraScheduledIncomeDocumentService.remove(itemScheduledIncomeDocuments.id);
      }
    }

    await this.prisma.zentraDocument.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: "Documento y schedule incomes delete" };

  }

  private async removeDocumentWithScheduledDebt(id: string) {

    const document = await this.prisma.zentraDocument.findMany({
      where: { id },
      include: {
        scheduledDebtDocuments: {
          include: {
            installments: true
          }
        }
      },
    });

    if (document.length === 0) throw new Error("Documento no encontrado");

    // Remueveb los installments con sus movimientos
    for (let itemDocument of document) {
      for (let itemScheduledDebtDocuments of itemDocument.scheduledDebtDocuments) {
        for (let itemInstallment of itemScheduledDebtDocuments.installments) {
          await this.zentraInstallmentService.remove(itemInstallment.id)
        }
      }
    }

    // Remuven los schedule income document
    for (let itemDocument of document) {
      for (let itemScheduledDebtDocuments of itemDocument.scheduledDebtDocuments) {
        await this.zentraScheduledDebtDocumentService.remove(itemScheduledDebtDocuments.id);
      }
    }

    await this.prisma.zentraDocument.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: "Documento y schedule debt delete" };

  }

  private buildDocumentFilters(filters: {
    companyId?: string;
    projectId?: string;
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

    if (filters.projectId?.trim()) {
      where.budgetItem = {
        definition: {
          projectId: filters.projectId,
        },
      };
    }

    if (filters.companyId?.trim()) {
      where.budgetItem = {
        definition: {
          project: {
            companyId: filters.companyId,
          }
        },
      };
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

  // Exchange Rate

  async updateExchangeRate(id: string, updateData: any) {

    await this.prisma.zentraDocument.update({
      where: { id },
      data: {
        code: updateData.code,
        description: updateData.description,
        registeredAt: updateData.registeredAt,
        documentDate: updateData.documentDate,
        expireDate: updateData.expireDate,
        observation: updateData.observation,

        party: updateData.partyId
          ? { connect: { id: updateData.partyId } }
          : undefined,

        documentTransactionMethod: updateData.documentTransactionMethodId
          ? { connect: { id: updateData.documentTransactionMethodId } }
          : undefined,

        documentType: updateData.documentTypeId
          ? { connect: { id: updateData.documentTypeId } }
          : undefined,
      },
    });

    const movements = await this.prisma.zentraMovement.findMany({
      where: { documentId: id, deletedAt: null },
    });

    await Promise.all(
      movements.map(movement =>
        this.zentraMovementService.updateSimple(movement.id, {
          code: updateData.code,
        })
      )
    );

    return {
      id,
      updated: true,
    };
  }

  async createExchangeRate(dataDocument: any) {

    const document = await this.createDocument(dataDocument);

    await this.createMovement({
      code: document.code,
      description: EXCHANGE_RATE.SALIDA,
      documentId: document.id,
      amount: dataDocument.amountOrigin,
      transactionTypeId: dataDocument.transactionTypeOrigin,
      movementCategoryId: dataDocument.movementCategoryId,
      budgetItemId: dataDocument.budgetItemId,
      bankAccountId: dataDocument.backAccountOriginId,
      movementStatusId: dataDocument.movementStatusId,
      date: dataDocument.documentDate,
      idFirebase: !dataDocument.idFirebase ? '' : dataDocument.idFirebase,
      fromTelecredito: dataDocument.fromTelecredito ?? false,
    });

    await this.createMovement({
      code: document.code,
      description: EXCHANGE_RATE.ENTRADA,
      documentId: document.id,
      amount: dataDocument.amountDestiny,
      transactionTypeId: dataDocument.transactionTypeDestiny,
      movementCategoryId: dataDocument.movementCategoryId,
      budgetItemId: dataDocument.budgetItemId,
      bankAccountId: dataDocument.backAccountDestinyId,
      movementStatusId: dataDocument.movementStatusId,
      date: dataDocument.documentDate,
      idFirebase: !dataDocument.idFirebase ? '' : dataDocument.idFirebase,
      fromTelecredito: dataDocument.fromTelecredito ?? false,
    });

    if (Number(dataDocument.transferFee) > 0) {
      await this.createMovement({
        code: document.code,
        description: EXCHANGE_RATE.COMISION,
        documentId: document.id,
        amount: dataDocument.transferFee,
        transactionTypeId: dataDocument.transactionTypeOrigin,
        movementCategoryId: MOVEMENT_CATEGORY.RENTABILIDAD,
        budgetItemId: dataDocument.budgetItemId,
        bankAccountId: dataDocument.backAccountOriginId,
        movementStatusId: dataDocument.movementStatusId,
        date: dataDocument.documentDate,
        idFirebase: !dataDocument.idFirebase ? '' : dataDocument.idFirebase,
        fromTelecredito: dataDocument.fromTelecredito ?? false,
      });
    }

    return { message: 'Exchange rate creado correctamente' };
  }

  async removeExchangeRate(id: string) {
    return this.removeDocumentWithMovements(id);
  }

  async findByFiltersExchangeRate(filters: {
    partyId?: string;
    documentCategoryId?: string;
    startDate?: string;
    endDate?: string;
    projectId?: string;
  }) {
    const where = this.buildDocumentFilters(filters);

    const results = await this.prisma.zentraDocument.findMany({
      where,
      orderBy: { documentDate: 'desc' },
      select: {
        id: true,
        code: true,
        description: true,
        documentType: true,
        documentDate: true,
        idFirebase: true,
        party: { select: { name: true, id: true } },
        documentTransactionMethod: true,
        observation: true,
        movements: {
          where: { deletedAt: null },
          select: {
            amount: true,
            transactionTypeId: true,
            description: true,
            bankAccount: {
              select: {
                bank: { select: { name: true } },
                currency: { select: { id: true, name: true } },
                id: true
              },
            },
          },
        },
      },
    });

    return results.map((doc) => {
      const originMovement = doc.movements.find(
        (m) =>
          m.transactionTypeId === TRANSACTION_TYPE.EXIT &&
          m.description === EXCHANGE_RATE.SALIDA
      );
      const destinyMovement = doc.movements.find((m) => m.transactionTypeId === TRANSACTION_TYPE.ENTRY);
      const transferFeeMovement = doc.movements.find((m) => m.description === EXCHANGE_RATE.COMISION);

      return {
        id: doc.id,
        documentDate: moment(doc.documentDate).format("DD/MM/YYYY"),
        partyId: doc.party?.id ?? null,
        partyName: doc.party?.name ?? null,

        backAccountOriginId: originMovement ? originMovement.bankAccount.id : '',
        originBankAccount: originMovement
          ? `${originMovement.bankAccount.bank.name} ${originMovement.bankAccount.currency.name}`
          : null,
        currencyOriginId: originMovement?.bankAccount?.currency?.id,
        currencyOriginName: originMovement?.bankAccount?.currency?.name,

        backAccountDestinyId: destinyMovement ? destinyMovement.bankAccount.id : '',
        destinyBankAccount: destinyMovement
          ? `${destinyMovement.bankAccount.bank.name} ${destinyMovement.bankAccount.currency.name}`
          : null,
        currencyDestinyId: destinyMovement?.bankAccount?.currency?.id,
        currencyDestinyName: destinyMovement?.bankAccount?.currency?.name,

        amountOrigin: originMovement?.amount ?? null,
        amountDestiny: destinyMovement?.amount ?? null,
        transferFee: transferFeeMovement?.amount ?? 0,

        documentTransactionMethodId: doc.documentTransactionMethod?.id ?? '',
        documentTransactionMethodName: doc.documentTransactionMethod?.name ?? '',
        observation: doc.observation,
        idFirebase: doc.idFirebase,
        code: doc.code,
        description: doc.description,
        documentTypeName: doc.documentType.name,
      };
    });
  }

  // Financial Expense

  async createFinancialExpense(dataDocument: any) {

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
      date: dataDocument.documentDate,
      idFirebase: dataDocument.idFirebase,
      fromTelecredito: dataDocument.fromTelecredito ?? false,
    });

    return { message: 'Gasto financiero creado correctamente' };
  }

  async removeFinancialExpense(id: string) {
    return this.removeDocumentWithMovements(id);
  }

  async findByFiltersFinancialExpense(filters: {
    projectId?: string;
    documentCategoryId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const where = this.buildDocumentFilters(filters);

    const results = await this.prisma.zentraDocument.findMany({
      where,
      orderBy: { documentDate: 'desc' },
      select: {
        id: true,
        party: true,
        documentType: true,
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
          documentTypeName: doc.documentType.name,
          partyName: doc.party.name,
        };
      });
  }

  async updateFinancialExpense(id: string, updateData: any) {

    // 1. Actualizar documento principal
    await this.prisma.zentraDocument.update({
      where: { id },
      data: {
        code: updateData.code,
        description: updateData.description,
        budgetItemId: updateData.budgetItemId,
        documentTypeId: updateData.documentTypeId,
      },
    });

    // 2. Buscar el movimiento asociado
    const movement = await this.prisma.zentraMovement.findFirst({
      where: { documentId: id, deletedAt: null },
    });

    // 3. Si existe movimiento, actualizarlo
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

    // 4. Retornar algo (si quieres)
    return {
      id,
      updated: true,
    };
  }


  // Not Identified

  async createNotIdentified(dataDocument: any) {

    const document = await this.createDocument(dataDocument);

    await this.createMovement({
      code: dataDocument.codeMovement,
      description: dataDocument.description,
      documentId: document.id,
      amount: dataDocument.amountOrigin,
      transactionTypeId: dataDocument.transactionTypeId,
      movementCategoryId: dataDocument.movementCategoryId,
      budgetItemId: dataDocument.budgetItemId,
      bankAccountId: dataDocument.backAccountOriginId,
      movementStatusId: dataDocument.movementStatusId,
      date: dataDocument.documentDate,
      idFirebase: dataDocument.idFirebase,
      fromTelecredito: dataDocument.fromTelecredito ?? false,
    });

    return { message: 'Documento no identificado creado correctamente' };
  }

  async removeNotIdentified(id: string) {
    return this.removeDocumentWithMovements(id);
  }

  async findByFiltersNotIdentified(filters: {
    projectId?: string;
    documentCategoryId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const where = this.buildDocumentFilters(filters);

    const results = await this.prisma.zentraDocument.findMany({
      where,
      orderBy: { documentDate: 'desc' },
      select: {
        id: true,
        party: true,
        documentType: true,
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
          documentTypeName: doc.documentType.name,
          partyName: doc.party.name,
        };
      });
  }

  async updateNotIdentified(id: string, updateData: any) {

    // 1. Actualizar documento principal
    await this.prisma.zentraDocument.update({
      where: { id },
      data: {
        code: updateData.code,
        description: updateData.description,
        budgetItemId: updateData.budgetItemId,
        documentTypeId: updateData.documentTypeId,
      },
    });

    // 2. Buscar el movimiento asociado
    const movement = await this.prisma.zentraMovement.findFirst({
      where: { documentId: id, deletedAt: null },
    });

    // 3. Si existe movimiento, actualizarlo
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

    // 4. Retornar algo (si quieres)
    return {
      id,
      updated: true,
    };
  }



  // Scheduled Income Document

  async createScheduledIncome(dataDocument: any) {
    const document = await this.createDocument(dataDocument);
    await this.zentraScheduledIncomeDocumentService.create({
      documentId: document.id,
      brokerId: dataDocument.brokerId,
      saleTypeId: dataDocument.saleTypeId,
      lotId: dataDocument.lotId,
      statusId: dataDocument.statusId,
      transactionNatureId: dataDocument.transactionNatureId,

      // Extra info
      serialNumber: dataDocument.serialNumber,
      referenceCode: dataDocument.referenceCode,
      placeOfIssue: dataDocument.placeOfIssue,

      acceptorName1: dataDocument.acceptorName1,
      acceptorDni1: dataDocument.acceptorDni1,
      acceptorPhone1: dataDocument.acceptorPhone1,

      acceptorName2: dataDocument.acceptorName2,
      acceptorDni2: dataDocument.acceptorDni2,
      acceptorPhone2: dataDocument.acceptorPhone2,

      permanentGuarantorName: dataDocument.permanentGuarantorName,
      permanentGuarantorAddress: dataDocument.permanentGuarantorAddress,
      permanentGuarantorDni: dataDocument.permanentGuarantorDni,
      permanentGuarantorPhone: dataDocument.permanentGuarantorPhone,

      parkingSpot1: dataDocument.parkingSpot1,
      parkingSpot2: dataDocument.parkingSpot2,


    });

    return { message: 'Scheduled Income creado correctamente' };
  }

  async findByFiltersScheduledIncome(filters: {
    documentCategoryId?: string;
    documentStatusId?: string;
    partyId?: string;
    startDate?: string;
    endDate?: string;
    projectId?: string;
    companyId?: string;
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
            definition: {
              include: {
                project: true,
              }
            },
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
            status: true,
            transactionNature: true,
            installments: {
              where: { deletedAt: null },
              include: {
                currency: true,
                installmentStatus: true,
              },
            },
          },
        },
      },
      orderBy: {
        documentDate: 'desc',
      },
    });

    return results.map((doc) => {
      const sched = doc.scheduledIncomeDocuments?.[0];

      // ✅ Cálculo de cuotas e importe total
      const installments = sched?.installments ?? [];
      const totalInstallments = installments.length;
      const totalAmountInstallments = installments.reduce(
        (sum, inst) => sum + Number(inst.totalAmount ?? 0),
        0
      );
      const totalPaidAmountInstallments = installments.reduce(
        (sum, inst) => sum + Number(inst.paidAmount ?? 0),
        0
      );

      return {

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

        registeredAt: moment(doc.registeredAt).format('DD/MM/YYYY'),
        documentDate: moment(doc.documentDate).format('DD/MM/YYYY'),
        expireDate: moment(doc.expireDate).format('DD/MM/YYYY'),

        transactionTypeId: doc.transactionType?.id,
        transactionTypeName: doc.transactionType?.name,

        documentTypeId: doc.documentType?.id,
        documentTypeName: doc.documentType?.name,

        partyId: doc.party?.id,
        partyName: doc.party?.name,
        partyAddress: doc.party?.address,

        documentStatusId: doc.documentStatus?.id,
        documentStatusName: doc.documentStatus?.name,

        budgetItemId: doc.budgetItem?.id,
        budgetItemName: doc.budgetItem
          ? `${doc.budgetItem.definition.project.name} - ${doc.budgetItem.definition.name} - ${doc.budgetItem.currency.name}`
          : null,

        currencyId: doc.currency?.id,
        currencyName: doc.currency?.name,

        userId: doc.user?.id,

        documentCategoryId: doc.documentCategory?.id,
        documentCategoryName: doc.documentCategory?.name,

        observation: doc.observation,
        idFirebase: doc.idFirebase,

        scheduledIncomeDocumentId: sched?.id,

        brokerId: sched?.broker?.id ?? null,
        brokerName: sched?.broker?.name ?? null,

        transactionNatureId: sched?.transactionNature?.id ?? null,
        transactionNatureName: sched?.transactionNature?.name ?? null,

        saleTypeId: sched?.saleType?.id ?? null,
        saleTypeName: sched?.saleType?.name ?? null,

        lotId: sched?.lot?.id ?? null,
        lotName: sched?.lot?.name ?? null,
        lotCode: sched?.lot?.code ?? null,

        lotComplete: `${sched?.saleType?.name ?? null} ${sched?.lot?.name ?? null}`,

        statusId: sched?.status?.id ?? null,
        statusName: sched?.status?.name ?? null,

        totalInstallments: totalInstallments,
        totalAmountInstallments: totalAmountInstallments,
        totalPaidAmountInstallments: totalPaidAmountInstallments,

        serialNumber: sched?.serialNumber ?? '',
        referenceCode: sched?.referenceCode ?? '',
        placeOfIssue: sched?.placeOfIssue ?? '',

        acceptorName1: sched?.acceptorName1 ?? '',
        acceptorDni1: sched?.acceptorDni1 ?? '',
        acceptorPhone1: sched?.acceptorPhone1 ?? '',

        acceptorName2: sched?.acceptorName2 ?? '',
        acceptorDni2: sched?.acceptorDni2 ?? '',
        acceptorPhone2: sched?.acceptorPhone2 ?? '',

        permanentGuarantorName: sched?.permanentGuarantorName ?? '',
        permanentGuarantorAddress: sched?.permanentGuarantorAddress ?? '',
        permanentGuarantorDni: sched?.permanentGuarantorDni ?? '',
        permanentGuarantorPhone: sched?.permanentGuarantorPhone ?? '',

        parkingSpot1: sched?.parkingSpot1 ?? '',
        parkingSpot2: sched?.parkingSpot2 ?? ''

      };
    });

  }

  async findByFiltersScheduledIncomeWithDetail(filters: {
    companyId?: string;
  }) {
    const installments = await this.prisma.zentraInstallment.findMany({
      where: {
        deletedAt: null,
        scheduledIncomeDocument: {
          document: {
            budgetItem: {
              definition: {
                project: { companyId: filters.companyId }
              }
            }
          }
        }
      },
      include: {
        installmentStatus: true,
        currency: true,
        scheduledIncomeDocument: {
          include: {
            lot: true, // Para lotName y lotCode
            document: {
              include: {
                currency: true,
                party: true, // Para partyName
                budgetItem: {
                  include: {
                    definition: {
                      include: {
                        project: true // Para projectName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    const mappedResults = installments.map((inst) => {
      const doc = inst.scheduledIncomeDocument?.document;
      const sched = inst.scheduledIncomeDocument;

      return {
        // 🔹 Cabecera (Desde Document y Scheduled)
        documentId: doc?.id ?? null,
        projectName: doc?.budgetItem?.definition?.project?.name ?? null,
        documentTotalAmount: doc?.totalAmount ?? 0,
        documentAmountToPay: doc?.amountToPay ?? 0,
        documentCurrencyName: doc?.currency?.name ?? null,
        partyName: doc?.party?.name ?? null,

        lotId: sched?.lot?.id ?? null,
        lotName: sched?.lot?.name ?? null,
        lotCode: sched?.lot?.code ?? null,

        // 🔹 Cuota (Desde Installment)
        installmentId: inst.id,
        letra: inst.letra,
        installmentStatusId: inst.installmentStatus?.id,
        installmentStatusName: inst.installmentStatus?.name,
        dueDate: moment(inst.dueDate).format('DD/MM/YYYY'),
        description: inst.description,
        capital: inst.capital,
        interest: inst.interest,
        extra: inst.extra,
        totalAmount: inst.totalAmount,
        paidAmount: inst.paidAmount,

        // Campos adicionales del segundo esquema si los necesitas:
        currencyId: inst.currency?.id,
        currencyName: inst.currency?.name,
        code: inst.code ?? '',
      };
    });

    // Aplicamos el mismo ordenamiento lógico
    return mappedResults.sort((a, b) => {
      // 1️⃣ Proyecto
      const projectCompare = (a.projectName || '').localeCompare(
        b.projectName || '',
        'es',
        { sensitivity: 'base' }
      );
      if (projectCompare !== 0) return projectCompare;

      // 2️⃣ Lote
      if (!a.lotCode) return 1;
      if (!b.lotCode) return -1;
      const lotCompare = a.lotCode.localeCompare(b.lotCode, 'es', { numeric: true });
      if (lotCompare !== 0) return lotCompare;

      // 3️⃣ Letra
      return (a.letra ?? 0) - (b.letra ?? 0);
    });
  }


  async updateScheduledIncome(id: string, updateData: any) {
    return this.prisma.$transaction(
      async (tx) => {
        // 1. Actualizar el documento principal (sin include)
        await tx.zentraDocument.update({
          where: { id },
          data: {
            code: updateData.code,
            description: updateData.description,
            totalAmount: updateData.totalAmount,
            taxAmount: updateData.taxAmount,
            netAmount: updateData.netAmount,
            detractionRate: updateData.detractionRate,
            detractionAmount: updateData.detractionAmount,
            amountToPay: updateData.amountToPay,
            paidAmount: updateData.paidAmount,
            registeredAt: new Date(updateData.registeredAt),
            documentDate: new Date(updateData.documentDate),
            expireDate: new Date(updateData.expireDate),
            transactionTypeId: updateData.transactionTypeId,
            documentTypeId: updateData.documentTypeId,
            partyId: updateData.partyId,
            documentStatusId: updateData.documentStatusId,
            budgetItemId: updateData.budgetItemId,
            currencyId: updateData.currencyId,
            userId: updateData.userId,
            documentCategoryId: updateData.documentCategoryId,
            observation: updateData.observation,
            idFirebase: updateData.idFirebase,
          },
        });

        // 2. Actualizar ScheduledIncomeDocument (si existe)
        const scheduled = await tx.zentraScheduledIncomeDocument.findFirst({
          where: { documentId: id, deletedAt: null },
          select: { id: true }, // solo traer el id
        });

        if (scheduled) {
          await tx.zentraScheduledIncomeDocument.update({
            where: { id: scheduled.id },
            data: {
              brokerId: updateData.brokerId,
              saleTypeId: updateData.saleTypeId,
              lotId: updateData.lotId,
              statusId: updateData.statusId,
              transactionNatureId: updateData.transactionNatureId,

              serialNumber: updateData.serialNumber,
              referenceCode: updateData.referenceCode,
              placeOfIssue: updateData.placeOfIssue,

              acceptorName1: updateData.acceptorName1,
              acceptorDni1: updateData.acceptorDni1,
              acceptorPhone1: updateData.acceptorPhone1,

              acceptorName2: updateData.acceptorName2,
              acceptorDni2: updateData.acceptorDni2,
              acceptorPhone2: updateData.acceptorPhone2,

              permanentGuarantorName: updateData.permanentGuarantorName,
              permanentGuarantorAddress: updateData.permanentGuarantorAddress,
              permanentGuarantorDni: updateData.permanentGuarantorDni,
              permanentGuarantorPhone: updateData.permanentGuarantorPhone,

              parkingSpot1: updateData.parkingSpot1,
              parkingSpot2: updateData.parkingSpot2,

            },
          });
        }



        // 3. Retornar algo simple (ej: solo el id actualizado)
        return {
          id,
          updated: true,
        };
      },
      {
        timeout: 20000,
        maxWait: 15000,
      },
    );
  }


  async removeScheduledIncome(id: string) {
    return this.removeDocumentWithScheduledIncome(id);
  }

  async removeScheduledDocument(id: string) {
    return this.prisma.zentraDocument.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async findByFiltersScheduledIncomeReport(filters: { projectId: string, documentCategoryId: string, transactionNatureId: string }) {

    const documentList = await this.prisma.zentraDocument.findMany({
      where: {
        deletedAt: null,
        budgetItem: {
          definition: {
            projectId: filters.projectId,
          },
        },
        documentCategoryId: filters.documentCategoryId
      },
      include: {
        party: true,
        currency: true,
        budgetItem: {
          include: {
            definition: true,
            currency: true,
          },
        },
        scheduledIncomeDocuments: {
          where: { deletedAt: null, transactionNatureId: filters.transactionNatureId },
          include: {
            broker: true,
            saleType: true,
            lot: {
              include: { status: true }, // importante para lot.status.title
            },
            status: true,
            installments: true
          },
        },
      },
      orderBy: {
        documentDate: 'desc',
      },
    });

    const lots = await this.prisma.landingLot.findMany({
      where: {
        deletedAt: null,
        page: {
          zentraProjects: {
            some: {
              zentraProjectId: filters.projectId,
            },
          },
        },
      },
      include: { status: true },
      orderBy: {
        name: 'asc',
      },
    });


    const reportData = documentList.map((doc) => {
      const lastScheduled = doc.scheduledIncomeDocuments[0];

      const lot = lastScheduled?.lot;
      const lastBroker = lastScheduled?.broker;
      const lastSaleType = lastScheduled?.saleType;

      const installments = lastScheduled?.installments ?? [];



      const amountToPay = installments.reduce((sum, inst) => {
        return sum + Number(inst.totalAmount || 0);
      }, 0);

      const paidAmount = installments.reduce((sum, inst) => {

        if (inst.installmentStatusId === INSTALLMENT_STATUS.PAGADO) {
          return sum + Number(inst.totalAmount || 0);
        }

        if (inst.installmentStatusId === INSTALLMENT_STATUS.PARCIAL) {
          return sum + Number(inst.paidAmount || 0);
        }

        return sum;
      }, 0);

      const paidAmountInstallment = installments.reduce((sumTemp, inst) => {

        if (inst.installmentStatusId === INSTALLMENT_STATUS.PAGADO) {
          return sumTemp + Number(inst.paidAmount || 0);
        }

        if (inst.installmentStatusId === INSTALLMENT_STATUS.PARCIAL) {
          return sumTemp + Number(inst.paidAmount || 0);
        }


        return sumTemp;
      }, 0);


      return {
        id: doc.id,

        lotId: lot?.id || '',
        name: lot?.name || '',
        area: Number(lot?.area || 0),
        block: lot?.block || '',
        number: lot?.number || 0,
        status: lot?.status?.title || '',
        statusId: lot?.status?.id || '',

        documentDate: doc.documentDate
          ? moment(doc.documentDate).format('DD/MM/YYYY')
          : '',
        documentCurrencyName: doc.currency?.name || '',
        documentCurrencyId: doc.currency?.id || '',
        documentAmountToPay: amountToPay,
        documentPaidAmount: paidAmount,

        paidAmountInstallment: paidAmountInstallment,


        documentPendingAmount: Math.round((amountToPay - paidAmount) * 100) / 100,

        brokerName: lastBroker?.name || '',
        saleTypeName: lastSaleType?.name || '',
        saleTypeId: lastSaleType?.id || '',

        partyName: doc.party?.name || '',
        commission1: amountToPay * 0.02,
        commission2: amountToPay * 0.015,
        progressPercent: (() => {
          if (amountToPay <= 0) return '0%';
          const percent = (paidAmount / amountToPay) * 100;
          const rounded = Math.min(Math.round(percent), 100);
          return `${rounded}%`;
        })(),
      };
    });

    const lotIdsWithDocs = new Set(reportData.map((r) => r.lotId));



    const missingLots = lots
      .filter((lot) => !lotIdsWithDocs.has(lot.id))
      .map((lot) => ({
        id: lot.id,
        lotId: lot.id,
        name: lot.name,
        area: Number(lot.area || 0),
        block: lot?.block || '',
        number: lot?.number || 0,
        status: '',
        statusId: lot?.status?.id || '',
        saleTypeId: '',
        saleTypeName: '',
        documentDate: '',
        documentCurrencyName: '',
        documentCurrencyId: '',
        documentAmountToPay: 0,
        documentPaidAmount: 0,
        paidAmountInstallment: 0,
        documentPendingAmount: 0,
        brokerName: '',
        partyName: '',
        commission1: 0,
        commission2: 0,
        progressPercent: '0%',
      }));

    // --- 3️⃣ Unir ambos resultados ---
    const finalReport = [...reportData, ...missingLots];

    finalReport.sort((a, b) => {
      // Si no hay nombre de bloque, los dejamos al final
      const blockA = a.block?.toString() || '';
      const blockB = b.block?.toString() || '';

      // Si ambos tienen el mismo bloque, ordenar por número
      if (blockA === blockB) {
        const numA = Number(a.number || 0);
        const numB = Number(b.number || 0);
        return numA - numB;
      }

      // Si los bloques son distintos, ordenar alfabéticamente
      return blockA.localeCompare(blockB);
    });

    return finalReport;
  }

  async findByFiltersScheduledIncomeReportIa(filters: { projectId: string, documentCategoryId: string }) {

    const documentList = await this.prisma.zentraDocument.findMany({
      where: {
        deletedAt: null,
        budgetItem: {
          definition: {
            projectId: filters.projectId,
          },
        },
        documentCategoryId: filters.documentCategoryId
      },
      include: {
        currency: true,
        budgetItem: {
          include: {
            definition: true,
            currency: true,
          },
        },
        scheduledIncomeDocuments: {
          where: { deletedAt: null },
          include: {
            saleType: true,
            lot: {
              include: { status: true },
            },
            installments: {
              where: { deletedAt: null }
            },
            status: true,
          },
        },
      },
      orderBy: {
        documentDate: 'desc',
      },
    });

    const lots = await this.prisma.landingLot.findMany({
      where: {
        deletedAt: null,
        page: {
          zentraProjects: {
            some: {
              zentraProjectId: filters.projectId,
            },
          },
        },
      },
      include: { status: true },
      orderBy: {
        name: 'asc',
      },
    });


    const reportData = documentList.map((doc) => {
      const lastScheduled = doc.scheduledIncomeDocuments[0];
      const lot = lastScheduled?.lot;
      const lastSaleType = lastScheduled?.saleType;

      const amountToPay = Number(doc.amountToPay || 0);
      const paidAmount = Number(doc.paidAmount || 0);

      return {
        id: doc.id,
        lotId: lot?.id || '',
        name: lot?.name || '',
        area: Number(lot?.area || 0),
        status: lot?.status?.title || '',

        documentDate: doc.documentDate
          ? moment(doc.documentDate).format('DD/MM/YYYY')
          : '',

        documentCurrencyName: doc.currency?.name || '',
        documentCurrencyId: doc.currency?.id || '',

        documentAmountToPay: amountToPay,
        documentPaidAmount: paidAmount,
        documentPendingAmount: amountToPay - paidAmount,

        saleTypeName: lastSaleType?.name || '',

        progressPercent: (() => {
          if (amountToPay <= 0) return '0%';
          const percent = (paidAmount / amountToPay) * 100;
          const rounded = Math.min(Math.round(percent), 100);
          return `${rounded}%`;
        })(),

        installments: lastScheduled.installments || [],
        installmentsTotal: lastScheduled?.installments?.length || 0
      };
    });


    const movementDate = moment()
      .startOf('day')
      .toDate();

    const normalizedDate = moment(movementDate).startOf('day').toDate();

    let exchangeRate = await this.prisma.zentraExchangeRate.findUnique({
      where: { date: normalizedDate },
    });

    if (!exchangeRate) {
      exchangeRate =
        await this.zentraExchangeRateService.upsertTodayRateFromSunat();
    }

    // Aqui neceesito dolarizar los datos de documentAmountToPay documentPaidAmount documentPendingAmount

    const rate = Number(exchangeRate.buyRate);

    // Transformamos el arreglo existente sin mutar el original
    const reportDataUsd = reportData.map((item) => {
      const isSoles = item.documentCurrencyId === CURRENCY.SOLES;

      const factor = isSoles ? 1 / rate : 1; // si está en soles, dividimos

      const round2 = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

      const amountToPayUsd = round2(Number(item.documentAmountToPay) * factor);
      const paidAmountUsd = round2(Number(item.documentPaidAmount) * factor);
      const pendingAmountUsd = round2(Number(item.documentPendingAmount) * factor);

      const installments = item.installments?.map((inst) => {
        const isSolesInstallment = inst.currencyId === CURRENCY.SOLES;
        const instFactor = isSolesInstallment ? 1 / rate : 1;

        return {
          ...inst,
          amountUsd: round2(Number(inst.totalAmount) * instFactor),
          currencyId: CURRENCY.DOLARES,
          currencyName: 'Dólares',
        };
      }) || [];

      // Paso 4: Calcular promedio de cuotas dolarizadas
      const totalInstallments = installments.length;
      const totalInstallmentsUsd = round2(installments.reduce(
        (sum, inst) => sum + (inst.amountUsd || 0),
        0
      ));
      const avgInstallmentUsd =
        totalInstallments > 0 ? round2(totalInstallmentsUsd / totalInstallments) : 0;


      return {
        ...item,
        documentAmountToPay: amountToPayUsd,
        documentPaidAmount: paidAmountUsd,
        documentPendingAmount: pendingAmountUsd,
        documentCurrencyId: CURRENCY.DOLARES,
        documentCurrencyName: 'Dólares',

        avgInstallmentUsd,
        totalInstallmentsUsd,
      };
    });

    const lotIdsWithDocs = new Set(reportDataUsd.map((r) => r.lotId));

    const missingLots = lots
      .filter((lot) => !lotIdsWithDocs.has(lot.id))
      .map((lot) => ({
        id: lot.id,
        lotId: lot.id,
        name: lot.name,
        area: Number(lot.area || 0),
        status: 'Disponible',
        saleTypeName: '',
        documentDate: '',
        documentCurrencyName: '',
        documentCurrencyId: '',
        documentAmountToPay: 0,
        documentPaidAmount: 0,
        documentPendingAmount: 0,
        progressPercent: '0%',
        installmentsTotal: 0,

        avgInstallmentUsd: 0,
        totalInstallmentsUsd: 0,

      }));

    const setReport = [...reportDataUsd, ...missingLots];


    let finalReport: any = [];

    for (let item of setReport) {
      let itemlot = {
        name: item.name,
        area: item.area,
        status: item.status,
        documentDate: item.documentDate,
        documentCurrencyName: item.documentCurrencyName,
        documentAmountToPay: item.documentAmountToPay,
        documentPaidAmount: item.documentPaidAmount,
        documentPendingAmount: item.documentPendingAmount,
        saleTypeName: item.saleTypeName,
        progressPercent: item.progressPercent,
        installmentsTotal: item.installmentsTotal,

        avgInstallmentUsd: item.avgInstallmentUsd,
        totalInstallmentsUsd: item.totalInstallmentsUsd,

      }
      finalReport.push(itemlot)
    }

    return finalReport;
  }


  // Scheduled Debt Document

  async createScheduledDebt(dataDocument: any) {
    const document = await this.createDocument(dataDocument);

    await this.zentraScheduledDebtDocumentService.create({
      documentId: document.id,
    });

    return { message: 'Scheduled Debt creado correctamente' };
  }

  async findByFiltersScheduledDebt(filters: {
    documentCategoryId?: string;
    documentStatusId?: string;
    partyId?: string;
    startDate?: string;
    endDate?: string;
    projectId?: string;
    companyId?: string;
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
            definition: {
              include: {
                project: true,
              }
            },
            currency: true,
          },
        },
        user: true,
        documentCategory: true,
        scheduledDebtDocuments: {
          where: { deletedAt: null },
          include: {
            installments: {
              where: { deletedAt: null },
              include: {
                currency: true,
                installmentStatus: true,
              },
            },
          },
        },
      },
      orderBy: {
        documentDate: 'desc',
      },
    });

    return results.map((doc) => {
      const sched = doc.scheduledDebtDocuments?.[0];

      // ✅ Cálculo de cuotas e importe total
      const installments = sched?.installments ?? [];
      const totalInstallments = installments.length;
      const totalAmountInstallments = installments.reduce(
        (sum, inst) => sum + Number(inst.totalAmount ?? 0),
        0
      );
      const totalPaidAmountInstallments = installments.reduce(
        (sum, inst) => sum + Number(inst.paidAmount ?? 0),
        0
      );

      return {

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

        registeredAt: moment(doc.registeredAt).format('DD/MM/YYYY'),
        documentDate: moment(doc.documentDate).format('DD/MM/YYYY'),
        expireDate: moment(doc.expireDate).format('DD/MM/YYYY'),

        transactionTypeId: doc.transactionType?.id,
        transactionTypeName: doc.transactionType?.name,

        documentTypeId: doc.documentType?.id,
        documentTypeName: doc.documentType?.name,

        partyId: doc.party?.id,
        partyName: doc.party?.name,
        partyAddress: doc.party?.address,

        documentStatusId: doc.documentStatus?.id,
        documentStatusName: doc.documentStatus?.name,

        budgetItemId: doc.budgetItem?.id,
        budgetItemName: doc.budgetItem
          ? `${doc.budgetItem.definition.project.name} - ${doc.budgetItem.definition.name} - ${doc.budgetItem.currency.name}`
          : null,

        currencyId: doc.currency?.id,
        currencyName: doc.currency?.name,

        userId: doc.user?.id,

        documentCategoryId: doc.documentCategory?.id,
        documentCategoryName: doc.documentCategory?.name,

        observation: doc.observation,
        idFirebase: doc.idFirebase,

        scheduledDebtDocumentId: sched?.id,

        totalInstallments: totalInstallments,
        totalAmountInstallments: totalAmountInstallments,
        totalPaidAmountInstallments: totalPaidAmountInstallments,

      };
    });

  }

  async updateScheduledDebt(id: string, updateData: any) {
    return this.prisma.$transaction(
      async (tx) => {
        // 1. Actualizar el documento principal (sin include)
        await tx.zentraDocument.update({
          where: { id },
          data: {
            code: updateData.code,
            description: updateData.description,
            totalAmount: updateData.totalAmount,
            taxAmount: updateData.taxAmount,
            netAmount: updateData.netAmount,
            detractionRate: updateData.detractionRate,
            detractionAmount: updateData.detractionAmount,
            amountToPay: updateData.amountToPay,
            paidAmount: updateData.paidAmount,
            registeredAt: new Date(updateData.registeredAt),
            documentDate: new Date(updateData.documentDate),
            expireDate: new Date(updateData.expireDate),
            transactionTypeId: updateData.transactionTypeId,
            documentTypeId: updateData.documentTypeId,
            partyId: updateData.partyId,
            documentStatusId: updateData.documentStatusId,
            budgetItemId: updateData.budgetItemId,
            currencyId: updateData.currencyId,
            userId: updateData.userId,
            documentCategoryId: updateData.documentCategoryId,
            observation: updateData.observation,
            idFirebase: updateData.idFirebase,
          },
        });

        // 2. Actualizar ScheduledIncomeDocument (si existe)
        const scheduled = await tx.zentraScheduledDebtDocument.findFirst({
          where: { documentId: id, deletedAt: null },
          select: { id: true }, // solo traer el id
        });

        if (scheduled) {
          await tx.zentraScheduledDebtDocument.update({
            where: { id: scheduled.id },
            data: {
            },
          });
        }

        // 3. Retornar algo simple (ej: solo el id actualizado)
        return {
          id,
          updated: true,
        };
      },
      {
        timeout: 20000,
        maxWait: 15000,
      },
    );
  }

  async removeScheduledDebt(id: string) {
    return this.removeDocumentWithScheduledDebt(id);
  }





  async findByFiltersReportExpense(filters: {
    transactionTypeId?: string,
    documentStatusId?: string;
    companyId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { transactionTypeId, documentStatusId, companyId, startDate, endDate } = filters;

    const where: any = {
      deletedAt: null,
    };

    where.documentCategory = {
      id: {
        in: [
          DOCUMENT_CATEGORY.CLASICO,
          DOCUMENT_CATEGORY.RENDICION_CUENTA
        ]
      }
    };

    if ((startDate || endDate)) {
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


    if (transactionTypeId && transactionTypeId.trim() !== '') {
      where.transactionType = { id: transactionTypeId };
    }

    if (companyId && companyId.trim() !== '') {
      where.budgetItem = {
        definition: {
          project: {
            companyId
          }
        },
      };
    }

    let orderBy: any = {
      documentDate: 'desc',
    };


    const results = await this.prisma.zentraDocument.findMany({
      where,
      include: {
        documentStatus: true,
        transactionType: true,
        documentType: true,
        party: true,
        budgetItem: {
          include: {
            definition: {
              include: {
                project: true
              }
            },
          }
        },
        currency: true,
        user: true,
        documentCategory: true,
      },
      orderBy
    });

    return results.map((item) => ({
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
        ? `${item.budgetItem.definition.name}`
        : null,

      projectName: item.budgetItem
        ? `${item.budgetItem.definition.project.name}`
        : null,

      currencyId: item.currency.id,
      currencyName: item.currency.name,

      userId: item.user.id,
      userName: item.user.firstName,

      documentCategoryId: item.documentCategory?.id,
      documentCategoryName: item.documentCategory?.name,

    }));


  }

  async findByFiltersReportSales(filters: {
    transactionTypeId?: string,
    documentStatusId?: string;
    companyId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { transactionTypeId, documentStatusId, companyId, startDate, endDate } = filters;


    const whereInstallment: any = {
      deletedAt: null,
      installmentStatusId: INSTALLMENT_STATUS.PAGADO,
    };

    if (startDate || endDate) {
      whereInstallment.documentDate = {};
      if (startDate) {
        whereInstallment.documentDate.gte = moment(startDate).startOf('day').toDate();
      }
      if (endDate) {
        whereInstallment.documentDate.lte = moment(endDate).endOf('day').toDate();
      }
    }

    if (companyId && companyId.trim() !== '') {
      whereInstallment.scheduledIncomeDocument = {
        document: {
          budgetItem: {
            definition: {
              project: {
                companyId
              }
            }
          }
        }
      }
    }

    const where: any = {
      deletedAt: null,
    };

    where.documentCategory = {
      id: {
        in: [
          DOCUMENT_CATEGORY.CLASICO,
        ]
      }
    };

    if ((startDate || endDate)) {
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


    if (transactionTypeId && transactionTypeId.trim() !== '') {
      where.transactionType = { id: transactionTypeId };
    }

    if (companyId && companyId.trim() !== '') {
      where.budgetItem = {
        definition: {
          project: {
            companyId
          }
        },
      };
    }

    const results = await this.prisma.zentraDocument.findMany({
      where,
      include: {
        documentStatus: true,
        transactionType: true,
        documentType: true,
        party: true,
        budgetItem: {
          include: {
            definition: {
              include: {
                project: true
              }
            },
          }
        },
        currency: true,
        user: true,
        documentCategory: true,
      }
    });


    const installments = await this.prisma.zentraInstallment.findMany({
      where: whereInstallment,
      include: {
        installmentStatus: {
          select: { id: true, name: true },
        },
        currency: {
          select: { id: true, name: true },
        },
        scheduledIncomeDocument: {
          select: {
            id: true,
            documentId: true,
            document: {
              include: {
                budgetItem: {
                  include: {
                    definition: {
                      include: {
                        project: true
                      }
                    }
                  }
                },
                user: true,
                party: true
              }
            }
          },
        },
        documentType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        documentDate: 'desc',
      },
    });

    // 1. Mapear los Documentos (Results)
    const mappedDocuments = results.map((item) => ({
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

      rawDate: item.documentDate,
      registeredAt: moment(item.registeredAt).format('DD/MM/YYYY'),
      documentDate: item.documentDate ? moment(item.documentDate).format('DD/MM/YYYY') : null,
      documentTypeId: item.documentType.id,
      documentTypeName: item.documentType.name,
      partyId: item.party.id,
      partyName: item.party.name,
      documentStatusId: item.documentStatus.id,
      documentStatusName: item.documentStatus.name,
      budgetItemId: item.budgetItem?.id,
      budgetItemName: item.budgetItem?.definition?.name || null,
      projectName: item.budgetItem?.definition?.project?.name || null,
      currencyId: item.currency.id,
      currencyName: item.currency.name,
      userId: item.user.id,
      userName: item.user.firstName,
    }));

    // 2. Mapear los Installments (Cuotas)
    const mappedInstallments = installments.map((item) => ({
      id: item.id,
      code: item.code,
      description: item.description,
      totalAmount: item.totalAmount,
      taxAmount: 0,
      netAmount: item.totalAmount,
      detractionRate: 0,
      detractionAmount: 0,
      amountToPay: item.totalAmount,
      paidAmount: item.paidAmount,

      rawDate: item.documentDate,
      registeredAt: moment(item.createdAt).format('DD/MM/YYYY'),
      documentDate: item.documentDate ? moment(item.documentDate).format('DD/MM/YYYY') : 'Sin Definir',

      documentTypeId: item.documentType?.id || null,
      documentTypeName: item.documentType?.name || 'Sin Documento',

      partyId: item.scheduledIncomeDocument?.document.party.id,
      partyName: item.scheduledIncomeDocument?.document.party.name,

      documentStatusId: '',
      documentStatusName: item.installmentStatus.name,

      budgetItemId: item.scheduledIncomeDocument?.document?.budgetItem?.id || '',
      budgetItemName: item.scheduledIncomeDocument?.document?.budgetItem.definition.name || '',

      projectName: item.scheduledIncomeDocument?.document?.budgetItem.definition.project.name || '',

      currencyId: item.currency.id,
      currencyName: item.currency.name,

      userId: item.scheduledIncomeDocument?.document?.user?.id || null,
      userName: item.scheduledIncomeDocument?.document?.user?.firstName || 'Sin Definir',
    }));

    // 3. Unir y Ordenar
    const allResults = [...mappedDocuments, ...mappedInstallments];

    allResults.sort((a, b) => {
      // Si ambos tienen fecha, comparamos
      if (a.rawDate && b.rawDate) {
        return b.rawDate.getTime() - a.rawDate.getTime(); // Descendente
      }
      // Si uno no tiene fecha, lo enviamos al final
      if (!a.rawDate) return 1;
      if (!b.rawDate) return -1;
      return 0;
    });

    // 4. Opcional: Eliminar la propiedad rawDate antes de enviar al front si no la quieres
    return allResults.map(({ rawDate, ...rest }) => rest);
  }



  async validateDuplicate(filters: { code: string; documentDate: string; partyId: string }) {
    // Normalizamos la fecha para comparar solo el día (YYYY-MM-DD)
    const startOfDay = moment(filters.documentDate).startOf('day').toDate();
    const endOfDay = moment(filters.documentDate).endOf('day').toDate();

    const duplicate = await this.prisma.zentraDocument.findFirst({
      where: {
        code: filters.code.trim(),
        partyId: filters.partyId,
        documentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        deletedAt: null, // No contar documentos eliminados
      },
      include: {
        party: true,
        budgetItem: {
          include: {
            definition: {
              include: { project: true }
            }
          }
        },
        user: true
      }
    });

    if (duplicate) {
      return {
        exists: true,
        document: {
          id: duplicate.id,
          code: duplicate.code,
          projectName: duplicate.budgetItem?.definition?.project?.name,
          partyName: duplicate.party?.name,
          totalAmount: duplicate.totalAmount,
          userName: duplicate.user.firstName + ' ' + duplicate.user.lastName,
          documentDate: moment(duplicate.documentDate).format('DD/MM/YYYY')
        }
      };
    }

    return { exists: false };
  }






}
