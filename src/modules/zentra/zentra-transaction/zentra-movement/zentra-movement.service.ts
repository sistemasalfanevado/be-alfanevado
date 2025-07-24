import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraMovementDto } from './dto/create-zentra-movement.dto';
import { UpdateZentraMovementDto } from './dto/update-zentra-movement.dto';

@Injectable()
export class ZentraMovementService {
  constructor(private prisma: PrismaService) {}

  private includeRelations = {
    document: true,
    transactionType: true,
    movementCategory: true,
    documentType: true,
    party: true,
    budgetItem: true,
    bankAccount: true,
    currency: true
  };

  async create(createDto: CreateZentraMovementDto) {
    const {
      documentId,
      transactionTypeId,
      movementCategoryId,
      documentTypeId,
      partyId,
      budgetItemId,
      bankAccountId,
      currencyId,
      ...data
    } = createDto;

    return this.prisma.zentraMovement.create({
      data: {
        ...data,
        document: { connect: { id: documentId } },
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

  async findAll() {
    return this.prisma.zentraMovement.findMany({
      where: { deletedAt: null },
      include: this.includeRelations
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraMovement.findUnique({
      where: { id, deletedAt: null },
      include: this.includeRelations
    });
  }

  async update(id: string, updateDto: UpdateZentraMovementDto) {
    const {
      documentId,
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

    if (documentId) updateData.document = { connect: { id: documentId } };
    if (transactionTypeId) updateData.transactionType = { connect: { id: transactionTypeId } };
    if (movementCategoryId) updateData.movementCategory = { connect: { id: movementCategoryId } };
    if (documentTypeId) updateData.documentType = { connect: { id: documentTypeId } };
    if (partyId) updateData.party = { connect: { id: partyId } };
    if (budgetItemId) updateData.budgetItem = { connect: { id: budgetItemId } };
    if (bankAccountId) updateData.bankAccount = { connect: { id: bankAccountId } };
    if (currencyId) updateData.currency = { connect: { id: currencyId } };

    return this.prisma.zentraMovement.update({
      where: { id },
      data: updateData,
      include: this.includeRelations
    });
  }

  async remove(id: string) {
    return this.prisma.zentraMovement.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async restore(id: string) {
    return this.prisma.zentraMovement.update({
      where: { id },
      data: { deletedAt: null }
    });
  }
}