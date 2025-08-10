import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraDocumentDto } from './dto/create-zentra-document.dto';
import { UpdateZentraDocumentDto } from './dto/update-zentra-document.dto';
import * as moment from 'moment';

@Injectable()
export class ZentraDocumentService {
  constructor(private prisma: PrismaService) { }

  private includeRelations = {
    documentStatus: true,
    transactionType: true,
    documentType: true,
    party: true,
    budgetItem: true,
    currency: true,
    user: true,
    movements: true
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
      guaranteeFundAmount: item.guaranteeFundAmount,
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
      //budgetItemName: item.budgetItem.name,

      currencyId: item.currency.id,
      currencyName: item.currency.name,

      userId: item.user.id,

      observation: item.observation,
      idFirebase: item.idFirebase
    };
  }

  /** Método reutilizable para búsquedas con mapeo */
  private async findManyWithMapping(where: any) {
    const results = await this.prisma.zentraDocument.findMany({
      where,
      include: this.includeRelations
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
        user: { connect: { id: userId } }
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
    startDate?: string;
    endDate?: string;
  }) {
    const { documentStatusId, partyId, startDate, endDate } = filters;

    const where: any = {
      deletedAt: null,
    };

    // Filtrar por fechas solo si vienen definidas
    if (startDate || endDate) {
      where.documentDate = {};
      if (startDate) {
        where.documentDate.gte = moment(startDate).startOf('day').toDate();
      }
      if (endDate) {
        where.documentDate.lte = moment(endDate).endOf('day').toDate();
      }
    }

    // Agregar condicionalmente documentStatusId si no es vacío
    if (documentStatusId && documentStatusId.trim() !== '') {
      where.documentStatus = { id: documentStatusId };
    }

    // Agregar condicionalmente partyId si no es vacío
    if (partyId && partyId.trim() !== '') {
      where.party = { id: partyId };
    }

    const results = await this.prisma.zentraDocument.findMany({
      where,
      include: this.includeRelations
    });

    return results.map(item => this.mapEntityToDto(item));
  }
}