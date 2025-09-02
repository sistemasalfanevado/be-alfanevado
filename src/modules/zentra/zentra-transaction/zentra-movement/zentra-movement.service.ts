import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraMovementDto } from './dto/create-zentra-movement.dto';
import { UpdateZentraMovementDto } from './dto/update-zentra-movement.dto';
import { ZentraExchangeRateService } from '../../zentra-master/zentra-exchange-rate/zentra-exchange-rate.service';

import * as moment from 'moment';

@Injectable()
export class ZentraMovementService {
  constructor(
    private prisma: PrismaService,
    private zentraExchangeRateService: ZentraExchangeRateService
  ) { }

  private includeRelations = {
    movementStatus: true,
    document: true,
    transactionType: true,
    movementCategory: true,
    budgetItem: true,
    bankAccount: true,
    currency: true,
  };

  /** Códigos de tipo de transacción */
  private ENTRY_ID = 'fe14bee6-9be4-43a5-9d8f-7fc032751415';
  private EXIT_ID = '8b190f70-cc43-42fa-8d7b-6afde6ed10b5';

  /** IDs de moneda */
  private SOLES_ID = '70684299-05fc-4720-8fca-be3a2ecb67ab';
  private DOLARES_ID = 'a1831dfc-a1f7-4075-a66e-fe3f5694e1e4';

  private calculateAmounts(transactionTypeId: string, currencyId: string, amount: number, exchangeRate: number) {
    const isEntry = transactionTypeId === this.ENTRY_ID;
    const isExit = transactionTypeId === this.EXIT_ID;
    const factor = isEntry ? 1 : isExit ? -1 : 0;

    if (factor === 0) throw new Error('Tipo de transacción no válido');

    const executedAmount = factor * amount;
    const executedSoles = currencyId === this.SOLES_ID ? amount : amount * exchangeRate;
    const executedDolares = currencyId === this.DOLARES_ID ? amount : amount / exchangeRate;

    return {
      factor,
      executedAmount,
      executedSoles: factor * Number(executedSoles.toFixed(2)),
      executedDolares: factor * Number(executedDolares.toFixed(2)),
    };
  }

  private async adjustBalances(tx: any, bankAccountId: string, budgetItemId: string, executedAmount: number, executedSoles: number, executedDolares: number) {
    await tx.zentraBankAccount.update({
      where: { id: bankAccountId },
      data: { amount: { increment: executedAmount } },
    });

    await tx.zentraBudgetItem.update({
      where: { id: budgetItemId },
      data: {
        executedAmount: { increment: executedAmount },
        executedSoles: { increment: executedSoles },
        executedDolares: { increment: executedDolares },
      },
    });
  }

  private async reverseBalances(tx: any, bankAccountId: string, budgetItemId: string, executedAmount: number, executedSoles: number, executedDolares: number) {
    return this.adjustBalances(tx, bankAccountId, budgetItemId, -executedAmount, -executedSoles, -executedDolares);
  }

  async create(createDto: CreateZentraMovementDto) {

    const movementDate = moment(createDto.paymentDate || new Date()).startOf('day').toDate();

    let exchangeRate = await this.prisma.zentraExchangeRate.findUnique({
      where: { date: movementDate },
    });

    if (!exchangeRate) {
      exchangeRate = await this.zentraExchangeRateService.upsertTodayRateFromSunat();
    }

    const {
      movementStatusId,
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
      idFirebase = '',
    } = createDto;

    const { factor, executedAmount, executedSoles, executedDolares } =
      this.calculateAmounts(transactionTypeId, currencyId, Number(amount), Number(exchangeRate.buyRate));

    return this.prisma.$transaction(async (tx) => {
      const movement = await tx.zentraMovement.create({
        data: {
          amount,
          autorizeDate: new Date(autorizeDate),
          generateDate: new Date(generateDate),
          paymentDate: new Date(paymentDate),
          code,
          description,
          idFirebase,
          movementStatus: { connect: { id: movementStatusId } },
          document: { connect: { id: documentId } },
          transactionType: { connect: { id: transactionTypeId } },
          movementCategory: { connect: { id: movementCategoryId } },
          budgetItem: { connect: { id: budgetItemId } },
          bankAccount: { connect: { id: bankAccountId } },
          currency: { connect: { id: currencyId } },
          exchangeRate: { connect: { id: exchangeRate.id } },
        },
        include: this.includeRelations,
      });

      await this.adjustBalances(tx, bankAccountId, budgetItemId, executedAmount, executedSoles, executedDolares);

      return movement;
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraMovement.findMany({
      where: { deletedAt: null },
      include: this.includeRelations,
    });
    return results.map(this.formatMovement);
  }

  async findOne(id: string) {
    return this.prisma.zentraMovement.findUnique({
      where: { id, deletedAt: null },
      include: this.includeRelations,
    });
  }

  async update(id: string, updateDto: UpdateZentraMovementDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Obtener y revertir movimiento actual
      const current = await tx.zentraMovement.findUnique({
        where: { id },
        select: {
          amount: true,
          currencyId: true,
          transactionTypeId: true,
          bankAccountId: true,
          budgetItemId: true,
          exchangeRate: {
            select: { buyRate: true }, // ✅ Solo traemos el buyRate
          },
        },
      });

      if (!current) throw new Error('Movimiento no encontrado');

      const currentAmounts = this.calculateAmounts(
        current.transactionTypeId,
        current.currencyId,
        Number(current.amount),
        Number(current.exchangeRate!.buyRate)
      );

      await this.reverseBalances(
        tx,
        current.bankAccountId,
        current.budgetItemId,
        currentAmounts.executedAmount,
        currentAmounts.executedSoles,
        currentAmounts.executedDolares
      );

      // 2. Eliminar movimiento anterior (soft-delete si prefieres)
      await tx.zentraMovement.delete({ where: { id } });

      // 3. Crear nuevo movimiento
      const {
        documentId,
        transactionTypeId,
        movementCategoryId,
        budgetItemId,
        bankAccountId,
        currencyId,
        movementStatusId,
        autorizeDate,
        generateDate,
        paymentDate,
        code,
        description,
        amount,
        idFirebase = '',
      } = updateDto;

      // Obtener fecha de referencia del movimiento
      const movementDate = moment(generateDate || paymentDate || new Date())
        .startOf('day')
        .toDate();

      // Buscar tipo de cambio en esa fecha
      let exchangeRate = await this.prisma.zentraExchangeRate.findUnique({
        where: { date: movementDate },
      });

      // Si no existe, usar TC actual de Sunat (fallback)
      if (!exchangeRate) {
        exchangeRate = await this.zentraExchangeRateService.upsertTodayRateFromSunat();
      }

      const newAmounts = this.calculateAmounts(
        transactionTypeId,
        currencyId,
        Number(amount),
        Number(exchangeRate.buyRate)
      );

      const newMovement = await tx.zentraMovement.create({
        data: {
          amount,
          autorizeDate: new Date(autorizeDate),
          generateDate: new Date(generateDate),
          paymentDate: new Date(paymentDate),
          code,
          description,
          idFirebase,
          document: { connect: { id: documentId } },
          movementStatus: { connect: { id: movementStatusId } },
          transactionType: { connect: { id: transactionTypeId } },
          movementCategory: { connect: { id: movementCategoryId } },
          budgetItem: { connect: { id: budgetItemId } },
          bankAccount: { connect: { id: bankAccountId } },
          currency: { connect: { id: currencyId } },
          exchangeRate: { connect: { id: exchangeRate.id } }, // ✅ Relacionar con TC
        },
        include: this.includeRelations,
      });

      await this.adjustBalances(
        tx,
        bankAccountId,
        budgetItemId,
        newAmounts.executedAmount,
        newAmounts.executedSoles,
        newAmounts.executedDolares
      );

      return newMovement;
    });
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (tx) => {
      const movement = await tx.zentraMovement.findUnique({
        where: { id },
        select: {
          amount: true,
          currencyId: true,
          transactionTypeId: true,
          bankAccountId: true,
          budgetItemId: true,
          exchangeRate: {
            select: { buyRate: true },
          },
        },
      });

      if (!movement) throw new Error('Movimiento no encontrado');

      const amounts = this.calculateAmounts(
        movement.transactionTypeId,
        movement.currencyId,
        Number(movement.amount),
        Number(movement.exchangeRate!.buyRate)
      );

      await this.reverseBalances(
        tx,
        movement.bankAccountId,
        movement.budgetItemId,
        amounts.executedAmount,
        amounts.executedSoles,
        amounts.executedDolares
      );

      // Soft delete (mantienes el historial) ✅
      return tx.zentraMovement.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    });
  }

  async restore(id: string) {
    return this.prisma.zentraMovement.update({
      where: { id },
      data: { deletedAt: null },
    });
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
      documentTypeId: item.documentType?.id,
      documentTypeName: item.documentType?.name,
      partyId: item.party?.id,
      partyName: item.party?.name,
      movementStatusId: item.movementStatus.id,
      movementStatusName: item.movementStatus.name,
      budgetItemId: item.budgetItem.id,
      bankAccountId: item.bankAccount.id,
      currencyId: item.currency.id,
      currencyName: item.currency.name,
    };
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


  



}