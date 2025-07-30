import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraMovementDto } from './dto/create-zentra-movement.dto';
import { UpdateZentraMovementDto } from './dto/update-zentra-movement.dto';

import * as moment from 'moment';

@Injectable()
export class ZentraMovementService {
  constructor(private prisma: PrismaService) { }

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
      registeredAt,
      movementDate,
      amount,
      ...data
    } = createDto;

    // Detectar si es entrada o salida
    const isEntry = transactionTypeId === 'fe14bee6-9be4-43a5-9d8f-7fc032751415'; // Entrada
    const isExit = transactionTypeId === '8b190f70-cc43-42fa-8d7b-6afde6ed10b5';  // Salida

    // Factor de signo
    const factor = isEntry ? 1 : isExit ? -1 : 0;
    if (factor === 0) {
      throw new Error('Tipo de transacción no válido');
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Crear el movimiento
      const movement = await tx.zentraMovement.create({
        data: {
          ...data,
          amount,
          registeredAt: new Date(registeredAt),
          movementDate: new Date(movementDate),
          document: { connect: { id: documentId } },
          transactionType: { connect: { id: transactionTypeId } },
          movementCategory: { connect: { id: movementCategoryId } },
          documentType: { connect: { id: documentTypeId } },
          party: { connect: { id: partyId } },
          budgetItem: { connect: { id: budgetItemId } },
          bankAccount: { connect: { id: bankAccountId } },
          currency: { connect: { id: currencyId } },
        },
        include: this.includeRelations,
      });

      // 2. Actualizar bankAccount.amount
      await tx.zentraBankAccount.update({
        where: { id: bankAccountId },
        data: {
          amount: {
            increment: factor * Number(amount),
          },
        },
      });

      // 3. Actualizar budgetItem.executedAmount
      await tx.zentraBudgetItem.update({
        where: { id: budgetItemId },
        data: {
          executedAmount: {
            increment: factor * Number(amount),
          },
        },
      });

      return movement;
    });
  }


  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraMovement.findMany({
      where: { deletedAt: null },
      include: this.includeRelations
    });

    return results.map(this.formatMovement);
  }


  async findOne(id: string) {
    return this.prisma.zentraMovement.findUnique({
      where: { id, deletedAt: null },
      include: this.includeRelations
    });
  }

  async update(id: string, updateDto: UpdateZentraMovementDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Obtener el movimiento original
      const oldMovement = await tx.zentraMovement.findUnique({
        where: { id },
        select: {
          amount: true,
          transactionTypeId: true,
          bankAccountId: true,
          budgetItemId: true,
        },
      });

      if (!oldMovement) throw new Error('Movimiento no encontrado');

      // 2. Revertir impacto del movimiento anterior
      const oldFactor = oldMovement.transactionTypeId === 'fe14bee6-9be4-43a5-9d8f-7fc032751415' ? 1
        : oldMovement.transactionTypeId === '8b190f70-cc43-42fa-8d7b-6afde6ed10b5' ? -1
          : 0;

      await tx.zentraBankAccount.update({
        where: { id: oldMovement.bankAccountId },
        data: {
          amount: {
            increment: -oldFactor * Number(oldMovement.amount),
          },
        },
      });

      await tx.zentraBudgetItem.update({
        where: { id: oldMovement.budgetItemId },
        data: {
          executedAmount: {
            increment: -oldFactor * Number(oldMovement.amount),
          },
        },
      });

      // 3. Preparar nueva data
      const {
        documentId,
        transactionTypeId,
        movementCategoryId,
        documentTypeId,
        partyId,
        budgetItemId,
        bankAccountId,
        currencyId,
        amount,
        registeredAt,
        movementDate,
        ...rest
      } = updateDto;

      const updateData: any = {
        ...rest,
      };

      if (documentId) updateData.document = { connect: { id: documentId } };
      if (transactionTypeId) updateData.transactionType = { connect: { id: transactionTypeId } };
      if (movementCategoryId) updateData.movementCategory = { connect: { id: movementCategoryId } };
      if (documentTypeId) updateData.documentType = { connect: { id: documentTypeId } };
      if (partyId) updateData.party = { connect: { id: partyId } };
      if (budgetItemId) updateData.budgetItem = { connect: { id: budgetItemId } };
      if (bankAccountId) updateData.bankAccount = { connect: { id: bankAccountId } };
      if (currencyId) updateData.currency = { connect: { id: currencyId } };
      if (amount !== undefined) updateData.amount = amount;
      if (registeredAt) updateData.registeredAt = new Date(registeredAt);
      if (movementDate) updateData.movementDate = new Date(movementDate);

      // 4. Actualizar el movimiento
      const updated = await tx.zentraMovement.update({
        where: { id },
        data: updateData,
        include: this.includeRelations,
      });

      // 5. Aplicar nuevo impacto
      const newFactor = transactionTypeId === 'fe14bee6-9be4-43a5-9d8f-7fc032751415' ? 1
        : transactionTypeId === '8b190f70-cc43-42fa-8d7b-6afde6ed10b5' ? -1
          : oldFactor; // fallback si no se cambia tipo

      const finalAmount = amount !== undefined ? amount : oldMovement.amount;
      const finalBankAccountId = bankAccountId ?? oldMovement.bankAccountId;
      const finalBudgetItemId = budgetItemId ?? oldMovement.budgetItemId;

      await tx.zentraBankAccount.update({
        where: { id: finalBankAccountId },
        data: {
          amount: {
            increment: newFactor * Number(finalAmount),
          },
        },
      });

      await tx.zentraBudgetItem.update({
        where: { id: finalBudgetItemId },
        data: {
          executedAmount: {
            increment: newFactor * Number(finalAmount),
          },
        },
      });

      return updated;
    });
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (tx) => {
      const movement = await tx.zentraMovement.findUnique({
        where: { id },
        select: {
          amount: true,
          transactionTypeId: true,
          bankAccountId: true,
          budgetItemId: true,
        },
      });

      if (!movement) throw new Error('Movimiento no encontrado');

      const factor = movement.transactionTypeId === 'fe14bee6-9be4-43a5-9d8f-7fc032751415' ? 1
        : movement.transactionTypeId === '8b190f70-cc43-42fa-8d7b-6afde6ed10b5' ? -1
          : 0;

      if (factor === 0) throw new Error('Tipo de transacción no válido');

      // Revertir impacto en cuenta y partida
      await tx.zentraBankAccount.update({
        where: { id: movement.bankAccountId },
        data: {
          amount: {
            increment: -factor * Number(movement.amount),
          },
        },
      });

      await tx.zentraBudgetItem.update({
        where: { id: movement.budgetItemId },
        data: {
          executedAmount: {
            increment: -factor * Number(movement.amount),
          },
        },
      });

      // Eliminar lógicamente
      return tx.zentraMovement.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    });
  }

  async restore(id: string) {
    return this.prisma.zentraMovement.update({
      where: { id },
      data: { deletedAt: null }
    });
  }


  async findByBudgetItem(budgetItemId: string) {
    const results = await this.prisma.zentraMovement.findMany({
      where: { budgetItemId },
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' },
    });

    return results.map(this.formatMovement);

  }

  async findByCurrency(currencyId: string) {
    const results = await this.prisma.zentraMovement.findMany({
      where: { currencyId },
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' },
    });

    return results.map(this.formatMovement);
  }

  async findByBudgetItemAndCurrency(budgetItemId: string, currencyId: string) {
    const results = await this.prisma.zentraMovement.findMany({
      where: {
        budgetItemId,
        currencyId,
      },
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' },
    });

    return results.map(this.formatMovement);

  }


  private formatMovement(item: any) {
    return {
      id: item.id,

      code: item.code,
      description: item.description,
      amount: item.amount,

      registeredAt: moment(item.registeredAt).format('DD/MM/YYYY'),
      movementDate: moment(item.movementDate).format('DD/MM/YYYY'),

      documentId: item.document.id,
      documentCode: item.document.code,

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
    };
  }


}