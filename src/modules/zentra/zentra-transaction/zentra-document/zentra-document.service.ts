import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CreateZentraDocumentDto } from './dto/create-zentra-document.dto';
import { UpdateZentraDocumentDto } from './dto/update-zentra-document.dto';

import { ZentraExchangeRateService } from '../../zentra-master/zentra-exchange-rate/zentra-exchange-rate.service';
import { ZentraMovementService } from '../../zentra-transaction/zentra-movement/zentra-movement.service';

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
    private zentraExchangeRateService: ZentraExchangeRateService,
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
    exchangeRate: true
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

      exchangeRateId: item.exchangeRate?.id,
      exchangeRateBuyRate: item.exchangeRate?.buyRate,
      exchangeRateSellRate: item.exchangeRate?.sellRate,

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

    // 1. Obtener tipo de cambio del día
    let exchangeRate = await this.prisma.zentraExchangeRate.findFirst({
      where: { date: moment().startOf('day').toDate() },
    });

    if (!exchangeRate) {
      // 2. Si no existe, obtenerlo de SUNAT y guardarlo
      const { date, buyRate, sellRate } = await this.zentraExchangeRateService.fetchTodayRateFromSunat();
      exchangeRate = await this.zentraExchangeRateService.upsertTodayRateFromSunat();
    }

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
        exchangeRate: { connect: { id: exchangeRate.id } },
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


  async createExchangeRate(dataDocument: any) {

    const bankAccountOrigin = await this.prisma.zentraBankAccount.findUnique({
      where: { id: dataDocument.backAccountOriginId },
      select: { currencyId: true },
    });

    if (!bankAccountOrigin) {
      throw new Error('Cuenta bancaria no encontrada');
    }

    const bankAccountDestiny = await this.prisma.zentraBankAccount.findUnique({
      where: { id: dataDocument.backAccountDestinyId },
      select: { currencyId: true },
    });

    if (!bankAccountDestiny) {
      throw new Error('Cuenta bancaria no encontrada');
    }



    // 🔹 1. Obtener tipo de cambio vigente
    let exchangeRate = await this.prisma.zentraExchangeRate.findFirst({
      where: { date: moment().startOf('day').toDate() },
    });

    if (!exchangeRate) {
      exchangeRate = await this.zentraExchangeRateService.upsertTodayRateFromSunat();
    }

    const document = await this.prisma.zentraDocument.create({
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
        exchangeRate: { connect: { id: exchangeRate.id } },
      },
      include: this.includeRelations,
    });

    // 3. Movimientos: Origen Salida
    await this.zentraMovementService.create({
      code: `Mov. Salida`,
      description: `${document.code}`,

      documentId: document.id,

      amount: dataDocument.amountOrigin,
      transactionTypeId: dataDocument.transactionTypeOrigin,
      movementCategoryId: dataDocument.movementCategoryId,
      budgetItemId: dataDocument.budgetItemId,
      bankAccountId: dataDocument.backAccountOriginId,
      movementStatusId: dataDocument.movementStatusId,

      currencyId: bankAccountOrigin.currencyId,

      autorizeDate: dataDocument.documentDate,
      generateDate: dataDocument.documentDate,
      paymentDate: dataDocument.documentDate,
    });

    // 4. Movimientos: Destino Entrada
    await this.zentraMovementService.create({
      code: `Mov. Entrada`,
      description: `${document.code}`,

      documentId: document.id,

      amount: dataDocument.amountDestiny,
      transactionTypeId: dataDocument.transactionTypeDestiny,
      movementCategoryId: dataDocument.movementCategoryId,
      budgetItemId: dataDocument.budgetItemId,
      bankAccountId: dataDocument.backAccountDestinyId,
      movementStatusId: dataDocument.movementStatusId,

      currencyId: bankAccountDestiny.currencyId,

      autorizeDate: dataDocument.documentDate,
      generateDate: dataDocument.documentDate,
      paymentDate: dataDocument.documentDate,
    });




    return this.mapEntityToDto(document);
  }

  async removeExchangeRate(id: string) {
    return this.prisma.$transaction(async (tx) => {
      const document = await tx.zentraDocument.findUnique({
        where: { id },
        include: { movements: true },
      });

      if (!document) {
        throw new Error('Documento no encontrado');
      }

      await tx.zentraDocument.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      for (const movement of document.movements) {
        await this.zentraMovementService.remove(movement.id);
      }

      return { message: 'Documento y movimientos eliminados correctamente' };
    });
  }


  async findByFiltersExchangeRate(filters: {
    partyId?: string;
    documentCategoryId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { partyId, documentCategoryId, startDate, endDate } = filters;

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

    if (partyId && partyId.trim() !== '') {
      where.partyId = partyId;
    }

    if (documentCategoryId && documentCategoryId.trim() !== '') {
      where.documentCategoryId = documentCategoryId;
    }

    const results = await this.prisma.zentraDocument.findMany({
      where,
      select: {
        documentDate: true,
        party: {
          select: { name: true },
        },
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
      const originMovement = doc.movements.find(
        (m) => m.transactionTypeId === this.EXIT_ID,
      );
      const destinyMovement = doc.movements.find(
        (m) => m.transactionTypeId === this.ENTRY_ID,
      );

      return {
        documentDate: moment(doc.documentDate).format('DD/MM/YYYY'),
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



}