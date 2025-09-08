import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraMovementDto } from './dto/create-zentra-movement.dto';
import { UpdateZentraMovementDto } from './dto/update-zentra-movement.dto';
import { ZentraExchangeRateService } from '../../zentra-master/zentra-exchange-rate/zentra-exchange-rate.service';
import * as moment from 'moment';

import { TRANSACTION_TYPE, CURRENCY } from 'src/shared/constants/app.constants';


@Injectable()
export class ZentraMovementService {
  constructor(
    private prisma: PrismaService,
    private zentraExchangeRateService: ZentraExchangeRateService
  ) { }

  private includeRelations = {
    movementStatus: true,
    document: {
      include: {
        party: true,
      },
    },
    transactionType: true,
    movementCategory: true,
    budgetItem: {
      include: {
        definition: true,
        currency: true,
      },
    },
    bankAccount: {
      include: {
        bank: true,
        currency: true,
      },
    },
    exchangeRate: true,
    installment: {
      include: {
        currency: true,
      },
    },
  };


  /** Códigos de tipo de transacción */
  private EXIT_ID = '8b190f70-cc43-42fa-8d7b-6afde6ed10b5';

  /** IDs de moneda */
  private SOLES_ID = '70684299-05fc-4720-8fca-be3a2ecb67ab';
  private DOLARES_ID = 'a1831dfc-a1f7-4075-a66e-fe3f5694e1e4';

  private calculateAmounts(
    transactionTypeId: string,
    currencyId: string,
    amount: number,
    exchangeRate: number
  ) {
    const isEntry = transactionTypeId === TRANSACTION_TYPE.ENTRY;
    const isExit = transactionTypeId === TRANSACTION_TYPE.EXIT;
    const factor = isEntry ? 1 : isExit ? -1 : 0;

    if (factor === 0) throw new Error('Tipo de transacción no válido');

    const executedAmount = factor * amount;
    const executedSoles =
      currencyId === CURRENCY.SOLES ? amount : amount * exchangeRate;
    const executedDolares =
      currencyId === CURRENCY.DOLARES ? amount : amount / exchangeRate;

    return {
      factor,
      executedAmount,
      executedSoles: factor * Number(executedSoles.toFixed(2)),
      executedDolares: factor * Number(executedDolares.toFixed(2)),
    };
  }

  private async adjustBalances(
    tx: any,
    bankAccountId: string,
    budgetItemId: string,
    executedAmount: number,
    executedSoles: number,
    executedDolares: number
  ) {
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

  private async reverseBalances(
    tx: any,
    bankAccountId: string,
    budgetItemId: string,
    executedAmount: number,
    executedSoles: number,
    executedDolares: number
  ) {
    return this.adjustBalances(
      tx,
      bankAccountId,
      budgetItemId,
      -executedAmount,
      -executedSoles,
      -executedDolares
    );
  }

  private async getBankAccountCurrency(
    prismaOrTx: any,
    bankAccountId: string
  ) {
    const account = await prismaOrTx.zentraBankAccount.findUnique({
      where: { id: bankAccountId },
      select: { currencyId: true },
    });

    if (!account) {
      throw new Error("Cuenta bancaria no encontrada");
    }

    return account.currencyId;
  }

  private formatMovement(item: any) {
    return {
      id: item.id,
      code: item.code,
      description: item.description,
      amount: item.amount,

      autorizeDate: moment(item.autorizeDate).format('DD/MM/YYYY'),
      generateDate: moment(item.generateDate).format('DD/MM/YYYY'),
      paymentDate: moment(item.paymentDate).format('DD/MM/YYYY'),

      documentId: item.document.id,
      documentCode: item.document.code,

      transactionTypeId: item.transactionType.id,
      transactionTypeName: item.transactionType.name,

      movementCategoryId: item.movementCategory.id,
      movementCategoryName: item.movementCategory.name,

      partyId: item.document.party.id,
      partyName: item.document.party.name,

      movementStatusId: item.movementStatus.id,
      movementStatusName: item.movementStatus.name,

      budgetItemId: item.budgetItem?.id,
      budgetItemName: item.budgetItem
        ? `${item.budgetItem.definition.name} - ${item.budgetItem.currency.name}`
        : null,

      bankAccountId: item.bankAccount.id,
      bankAccountName: `${item.bankAccount.bank.name} - ${item.bankAccount.currency.name}`,

      installmentId: !item.installment?.id ? '' : item.installment?.id,
      installmentCuota: !item.installment?.letra ? '': 'Cuota: ' + item.installment?.letra,

      documentUrl: item.documentUrl,
      documentName: item.documentName,

      executedAmount: item.executedAmount,
      executedSoles: item.executedSoles,
      executedDolares: item.executedDolares,

    };
  }


  async create(createDto: CreateZentraMovementDto) {
    const movementDate = moment(createDto.paymentDate || new Date())
      .startOf('day')
      .toDate();

    return this.prisma.$transaction(async (tx) => {

      const bankAccountCurrency = await this.getBankAccountCurrency(
        tx,
        createDto.bankAccountId
      );

      const normalizedDate = moment(movementDate).startOf('day').toDate();

      let exchangeRate = await this.prisma.zentraExchangeRate.findUnique({
        where: { date: normalizedDate },
      });

      if (!exchangeRate) {
        exchangeRate =
          await this.zentraExchangeRateService.upsertTodayRateFromSunat();
      }

      const {
        movementStatusId,
        documentId,
        transactionTypeId,
        movementCategoryId,
        budgetItemId,
        bankAccountId,
        installmentId = null,
        autorizeDate,
        generateDate,
        paymentDate,
        code,
        description,
        amount,
        documentUrl = '',
        documentName = '',
        idFirebase = '',
      } = createDto;

      // Calcular montos ejecutados
      const { executedAmount, executedSoles, executedDolares } =
        this.calculateAmounts(
          transactionTypeId,
          bankAccountCurrency,
          Number(amount),
          Number(exchangeRate.buyRate)
        );

      const movement = await tx.zentraMovement.create({
        data: {
          executedAmount,
          executedSoles,
          executedDolares,
          amount: Number(amount),
          autorizeDate,
          generateDate,
          paymentDate,
          code,
          description,
          idFirebase,
          documentUrl,
          documentName,
          movementStatus: { connect: { id: movementStatusId } },
          document: { connect: { id: documentId } },
          transactionType: { connect: { id: transactionTypeId } },
          movementCategory: { connect: { id: movementCategoryId } },
          budgetItem: { connect: { id: budgetItemId } },
          bankAccount: { connect: { id: bankAccountId } },
          exchangeRate: { connect: { id: exchangeRate.id } },
          installment: installmentId ? { connect: { id: installmentId } } : undefined,
        },
        include: this.includeRelations,
      });

      // Ajustar saldos
      await this.adjustBalances(
        tx,
        bankAccountId,
        budgetItemId,
        executedAmount,
        executedSoles,
        executedDolares
      );

      return movement;
    }, {
      timeout: 20000, // Aumentar timeout para operaciones largas
      maxWait: 15000, // Tiempo máximo de espera para adquirir la transacción
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
      const existing = await tx.zentraMovement.findUnique({ where: { id } });

      if (!existing) throw new Error('Movimiento no encontrado');

      // Revertir balances
      await this.reverseBalances(
        tx,
        existing.bankAccountId,
        existing.budgetItemId,
        Number(existing.executedAmount),
        Number(existing.executedSoles),
        Number(existing.executedDolares)
      );

      const bankAccountCurrency = await this.getBankAccountCurrency(
        tx, // ✅ usar el mismo `tx`
        updateDto.bankAccountId ?? existing.bankAccountId
      );


      // Usar el exchangeRateId ya existente en el movimiento
      const exchangeRateId = existing.exchangeRateId;
      if (!exchangeRateId) {
        throw new Error(
          `El movimiento ${id} no tiene un tipo de cambio asociado`
        );
      }

      const exchangeRate = await tx.zentraExchangeRate.findUnique({
        where: { id: exchangeRateId },
      });

      if (!exchangeRate) {
        throw new Error(
          `El tipo de cambio asociado al movimiento ${id} no existe`
        );
      }

      // Nuevos montos
      const { executedAmount, executedSoles, executedDolares } =
        this.calculateAmounts(
          updateDto.transactionTypeId ?? existing.transactionTypeId,
          bankAccountCurrency,
          Number(updateDto.amount ?? existing.amount),
          Number(exchangeRate.buyRate)
        );

      // Actualizar movimiento
      const updated = await tx.zentraMovement.update({
        where: { id },
        data: {
          code: updateDto.code ?? existing.code,
          description: updateDto.description ?? existing.description,
          amount: Number(updateDto.amount ?? existing.amount),
          paymentDate: updateDto.paymentDate ?? existing.paymentDate,
          transactionTypeId:
            updateDto.transactionTypeId ?? existing.transactionTypeId,
          bankAccountId: updateDto.bankAccountId ?? existing.bankAccountId,
          budgetItemId: updateDto.budgetItemId ?? existing.budgetItemId,
          documentId: updateDto.documentId ?? existing.documentId,
          installmentId: updateDto.installmentId ?? existing.installmentId,
          idFirebase: updateDto.idFirebase ?? existing.idFirebase,
          documentUrl: updateDto.documentUrl ?? existing.documentUrl,
          documentName: updateDto.documentName ?? existing.documentName,
          executedAmount,
          executedSoles,
          executedDolares,
        },
        include: this.includeRelations,
      });

      // Ajustar balances con los nuevos valores
      await this.adjustBalances(
        tx,
        updated.bankAccountId,
        updated.budgetItemId,
        executedAmount,
        executedSoles,
        executedDolares
      );

      return updated;
    }, {
      timeout: 20000, // Aumentar timeout para operaciones largas
      maxWait: 15000, // Tiempo máximo de espera para adquirir la transacción
    });
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (tx) => {
      const movement = await tx.zentraMovement.findUnique({
        where: { id },
        include: { bankAccount: true, budgetItem: true },
      });

      if (!movement) throw new Error('Movimiento no encontrado');

      await this.reverseBalances(
        tx,
        movement.bankAccountId,
        movement.budgetItemId,
        Number(movement.executedAmount),
        Number(movement.executedSoles),
        Number(movement.executedDolares)
      );

      return tx.zentraMovement.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    
    }, {
      timeout: 20000, // Aumentar timeout para operaciones largas
      maxWait: 15000, // Tiempo máximo de espera para adquirir la transacción
    });
  }

  async restore(id: string) {
    return this.prisma.zentraMovement.update({
      where: { id },
      data: { deletedAt: null },
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
      where: { bankAccount: { currencyId } },
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' },
    });
    return results.map(this.formatMovement);
  }

  async findByBudgetItemAndCurrency(budgetItemId: string, currencyId: string) {
    const results = await this.prisma.zentraMovement.findMany({
      where: { budgetItemId, bankAccount: { currencyId } },
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' },
    });
    return results.map(this.formatMovement);
  }

  async findByInstallment(installmentId: string) {
    const results = await this.prisma.zentraMovement.findMany({
      where: { installmentId, deletedAt: null },
      include: this.includeRelations,
      orderBy: { paymentDate: 'desc' },
    });
    return results.map(this.formatMovement);
  }

  async findByDocument(documentId: string) {
    const results = await this.prisma.zentraMovement.findMany({
      where: { documentId, deletedAt: null }, 
      include: this.includeRelations,
      orderBy: { paymentDate: 'desc' },
    });
    return results.map(this.formatMovement);
  }
  

}