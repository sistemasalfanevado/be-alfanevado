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
    budgetItem: true,
    bankAccount: true,
    currency: true,
  };


  async create(createDto: CreateZentraMovementDto) {
    const {
      documentId,
      transactionTypeId,
      movementCategoryId,
      budgetItemId,
      bankAccountId,
      currencyId,
      autorizeDate,
      generateDate,
      paymentDate,
      code,
      description,
      amount,
      exchangeRate = 1,
      idFirebase = '',
    } = createDto;

    // Verificar tipo de transacción
    const isEntry = transactionTypeId === 'fe14bee6-9be4-43a5-9d8f-7fc032751415'; // Entrada
    const isExit = transactionTypeId === '8b190f70-cc43-42fa-8d7b-6afde6ed10b5';  // Salida
    const factor = isEntry ? 1 : isExit ? -1 : 0;

    if (factor === 0) {
      throw new Error('Tipo de transacción no válido');
    }

    return this.prisma.$transaction(async (tx) => {
      // Obtener moneda
      const currency = await tx.zentraCurrency.findUnique({
        where: { id: currencyId },
      });
      if (!currency) {
        throw new Error('Moneda no encontrada');
      }

      const amountNumber = Number(amount);
      const rateNumber = Number(exchangeRate);

      const executedAmount = factor * amountNumber;

      const executedSoles =
        currencyId === '70684299-05fc-4720-8fca-be3a2ecb67ab'
          ? amountNumber
          : amountNumber * rateNumber;

      const executedDolares =
        currencyId === 'a1831dfc-a1f7-4075-a66e-fe3f5694e1e4'
          ? amountNumber
          : amountNumber / rateNumber;

      // Crear movimiento
      const movement = await tx.zentraMovement.create({
        data: {
          amount,
          exchangeRate: rateNumber,
          autorizeDate: new Date(autorizeDate),
          generateDate: new Date(generateDate),
          paymentDate: new Date(paymentDate),

          code,
          description,
          idFirebase,

          document: { connect: { id: documentId } },
          transactionType: { connect: { id: transactionTypeId } },
          movementCategory: { connect: { id: movementCategoryId } },
          budgetItem: { connect: { id: budgetItemId } },
          bankAccount: { connect: { id: bankAccountId } },
          currency: { connect: { id: currencyId } },
        },
        include: this.includeRelations,
      });

      // Actualizar cuenta bancaria
      await tx.zentraBankAccount.update({
        where: { id: bankAccountId },
        data: {
          amount: {
            increment: executedAmount,
          },
        },
      });

      // Actualizar presupuesto
      await tx.zentraBudgetItem.update({
        where: { id: budgetItemId },
        data: {
          executedAmount: {
            increment: executedAmount,
          },
          executedSoles: {
            increment: factor * Number(executedSoles.toFixed(2)),
          },
          executedDolares: {
            increment: factor * Number(executedDolares.toFixed(2)),
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
      // 1. Obtener movimiento actual
      const movement = await tx.zentraMovement.findUnique({
        where: { id },
        select: {
          amount: true,
          exchangeRate: true,
          currencyId: true,
          transactionTypeId: true,
          bankAccountId: true,
          budgetItemId: true,
        },
      });

      if (!movement) throw new Error('Movimiento no encontrado');

      const {
        amount,
        exchangeRate,
        currencyId,
        transactionTypeId,
        bankAccountId,
        budgetItemId,
      } = movement;

      const isEntry = transactionTypeId === 'fe14bee6-9be4-43a5-9d8f-7fc032751415';
      const isExit = transactionTypeId === '8b190f70-cc43-42fa-8d7b-6afde6ed10b5';
      const factor = isEntry ? 1 : isExit ? -1 : 0;
      if (factor === 0) throw new Error('Tipo de transacción no válido');

      const amountNumber = Number(amount);
      const rateNumber = Number(exchangeRate);

      const executedAmount = factor * amountNumber;

      const executedSoles =
        currencyId === '70684299-05fc-4720-8fca-be3a2ecb67ab'
          ? amountNumber
          : amountNumber * rateNumber;

      const executedDolares =
        currencyId === 'a1831dfc-a1f7-4075-a66e-fe3f5694e1e4'
          ? amountNumber
          : amountNumber / rateNumber;

      // 2. Revertir efectos contables
      await tx.zentraBankAccount.update({
        where: { id: bankAccountId },
        data: {
          amount: {
            increment: -executedAmount,
          },
        },
      });

      await tx.zentraBudgetItem.update({
        where: { id: budgetItemId },
        data: {
          executedAmount: {
            increment: -executedAmount,
          },
          executedSoles: {
            increment: -factor * Number(executedSoles.toFixed(2)),
          },
          executedDolares: {
            increment: -factor * Number(executedDolares.toFixed(2)),
          },
        },
      });

      // 3. Eliminar movimiento de forma definitiva
      await tx.zentraMovement.delete({
        where: { id },
      });

      // 4. Crear nuevo movimiento con los datos actualizados
      const {
        documentId,
        transactionTypeId: newTransactionTypeId,
        movementCategoryId,
        budgetItemId: newBudgetItemId,
        bankAccountId: newBankAccountId,
        currencyId: newCurrencyId,
        autorizeDate,
        generateDate,
        paymentDate,
        code,
        description,
        amount: newAmount,
        exchangeRate: newExchangeRate = 1,
        idFirebase = '',
      } = updateDto;

      const newIsEntry = newTransactionTypeId === 'fe14bee6-9be4-43a5-9d8f-7fc032751415';
      const newIsExit = newTransactionTypeId === '8b190f70-cc43-42fa-8d7b-6afde6ed10b5';
      const newFactor = newIsEntry ? 1 : newIsExit ? -1 : 0;
      if (newFactor === 0) throw new Error('Tipo de transacción no válido');

      const newAmountNumber = Number(newAmount);
      const newRateNumber = Number(newExchangeRate);

      const newExecutedAmount = newFactor * newAmountNumber;

      const newExecutedSoles =
        newCurrencyId === '70684299-05fc-4720-8fca-be3a2ecb67ab'
          ? newAmountNumber
          : newAmountNumber * newRateNumber;

      const newExecutedDolares =
        newCurrencyId === 'a1831dfc-a1f7-4075-a66e-fe3f5694e1e4'
          ? newAmountNumber
          : newAmountNumber / newRateNumber;

      const newMovement = await tx.zentraMovement.create({
        data: {
          amount: newAmount,
          exchangeRate: newRateNumber,
          autorizeDate: new Date(autorizeDate),
          generateDate: new Date(generateDate),
          paymentDate: new Date(paymentDate),
          code,
          description,
          idFirebase,
          document: { connect: { id: documentId } },
          transactionType: { connect: { id: newTransactionTypeId } },
          movementCategory: { connect: { id: movementCategoryId } },
          budgetItem: { connect: { id: newBudgetItemId } },
          bankAccount: { connect: { id: newBankAccountId } },
          currency: { connect: { id: newCurrencyId } },
        },
        include: this.includeRelations,
      });

      await tx.zentraBankAccount.update({
        where: { id: newBankAccountId },
        data: {
          amount: {
            increment: newExecutedAmount,
          },
        },
      });

      await tx.zentraBudgetItem.update({
        where: { id: newBudgetItemId },
        data: {
          executedAmount: {
            increment: newExecutedAmount,
          },
          executedSoles: {
            increment: newFactor * Number(newExecutedSoles.toFixed(2)),
          },
          executedDolares: {
            increment: newFactor * Number(newExecutedDolares.toFixed(2)),
          },
        },
      });

      return newMovement;
    });
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Obtener movimiento
      const movement = await tx.zentraMovement.findUnique({
        where: { id },
        select: {
          amount: true,
          exchangeRate: true,
          currencyId: true,
          transactionTypeId: true,
          bankAccountId: true,
          budgetItemId: true,
        },
      });

      if (!movement) {
        throw new Error('Movimiento no encontrado');
      }

      const { transactionTypeId, currencyId, exchangeRate, amount, bankAccountId, budgetItemId } = movement;

      // 2. Determinar factor
      const isEntry = transactionTypeId === 'fe14bee6-9be4-43a5-9d8f-7fc032751415'; // Entrada
      const isExit = transactionTypeId === '8b190f70-cc43-42fa-8d7b-6afde6ed10b5';  // Salida
      const factor = isEntry ? 1 : isExit ? -1 : 0;

      if (factor === 0) throw new Error('Tipo de transacción no válido');

      const amountNumber = Number(amount);
      const rateNumber = Number(exchangeRate);

      // 3. Calcular montos
      const executedAmount = factor * amountNumber;

      const executedSoles =
        currencyId === '70684299-05fc-4720-8fca-be3a2ecb67ab'
          ? amountNumber
          : amountNumber * rateNumber;

      const executedDolares =
        currencyId === 'a1831dfc-a1f7-4075-a66e-fe3f5694e1e4'
          ? amountNumber
          : amountNumber / rateNumber;

      // 4. Revertir cuenta bancaria
      await tx.zentraBankAccount.update({
        where: { id: bankAccountId },
        data: {
          amount: {
            increment: -executedAmount,
          },
        },
      });

      // 5. Revertir presupuesto
      await tx.zentraBudgetItem.update({
        where: { id: budgetItemId },
        data: {
          executedAmount: {
            increment: -executedAmount,
          },
          executedSoles: {
            increment: -factor * Number(executedSoles.toFixed(2)),
          },
          executedDolares: {
            increment: -factor * Number(executedDolares.toFixed(2)),
          },
        },
      });

      // 6. Eliminar lógicamente
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


      bankAccountId: item.bankAccount.id,
      //bankAccountName: item.bankAccount.name,

      currencyId: item.currency.id,
      currencyName: item.currency.name,
    };
  }


}