import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraDocumentDto } from './dto/create-zentra-document.dto';
import { UpdateZentraDocumentDto } from './dto/update-zentra-document.dto';

import * as moment from 'moment';

@Injectable()
export class ZentraDocumentService {
  constructor(private prisma: PrismaService) { }

  private includeRelations = {
    transactionType: true,
    movementCategory: true,
    documentType: true,
    party: true,
    budgetItem: true,
    bankAccount: true,
    currency: true,
    movements: true
  };

  async create(createDto: CreateZentraDocumentDto) {
    const {
      transactionTypeId,
      movementCategoryId,
      documentTypeId,
      partyId,
      budgetItemId,
      bankAccountId,
      currencyId,
      registeredAt,
      documentDate,
      ...data
    } = createDto;

    return this.prisma.zentraDocument.create({
      data: {
        ...data,
        registeredAt: new Date(registeredAt),
        documentDate: new Date(documentDate),
        transactionType: { connect: { id: transactionTypeId } },
        movementCategory: { connect: { id: movementCategoryId } },
        documentType: { connect: { id: documentTypeId } },
        party: { connect: { id: partyId } },
        budgetItem: { connect: { id: budgetItemId } },
        bankAccount: { connect: { id: bankAccountId } },
        currency: { connect: { id: currencyId } }
      },
      include: this.includeRelations
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraDocument.findMany({
      where: { deletedAt: null },
      include: this.includeRelations
    });

    return results.map((item) => ({
      id: item.id,

      code: item.code,
      description: item.description,
      totalAmount: item.totalAmount,

      registeredAt: moment(item.registeredAt).format('DD/MM/YYYY'),
      documentDate: moment(item.documentDate).format('DD/MM/YYYY'),
      
      transactionTypeId: item.transactionType.id,
      transactionTypeName: item.transactionType.name,

      movementCategoryId: item.movementCategory.id,
      movementCategoryName: item.movementCategory.name,

      documentTypeId: item.documentType.id,
      documentTypeName: item.documentType.name,

      partyId: item.party.id,
      partyName: item.party.name,

      budgetItemId: item.budgetItem.id,
      budgetItemName: item.budgetItem.name,

      bankAccountId: item.bankAccount.id,
      bankAccountName: item.bankAccount.name,

      currencyId: item.currency.id,
      currencyName: item.currency.name,
    }));
  }




  async findOne(id: string) {
    return this.prisma.zentraDocument.findUnique({
      where: { id, deletedAt: null },
      include: this.includeRelations
    });
  }




  async update(id: string, updateDto: UpdateZentraDocumentDto) {
    const {
      transactionTypeId,
      movementCategoryId,
      documentTypeId,
      partyId,
      budgetItemId,
      bankAccountId,
      currencyId,
      ...data
    } = updateDto;

    const updateData: any = { ...data };

    if (transactionTypeId) updateData.transactionType = { connect: { id: transactionTypeId } };
    if (movementCategoryId) updateData.movementCategory = { connect: { id: movementCategoryId } };
    if (documentTypeId) updateData.documentType = { connect: { id: documentTypeId } };
    if (partyId) updateData.party = { connect: { id: partyId } };
    if (budgetItemId) updateData.budgetItem = { connect: { id: budgetItemId } };
    if (bankAccountId) updateData.bankAccount = { connect: { id: bankAccountId } };
    if (currencyId) updateData.currency = { connect: { id: currencyId } };

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
}