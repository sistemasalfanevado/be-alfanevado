import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraMovementDto } from './dto/create-zentra-movement.dto';
import { UpdateZentraMovementDto } from './dto/update-zentra-movement.dto';
import { ZentraExchangeRateService } from '../../zentra-master/zentra-exchange-rate/zentra-exchange-rate.service';
import * as moment from 'moment';

import { TRANSACTION_TYPE, CURRENCY, BUDGET_NATURE, PARTY_DOCUMENT_HIERARCHY, PAYMENT_CATEGORY } from 'src/shared/constants/app.constants';


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
        party: {
          include: {
            partyDocuments: {
              where: {
                deletedAt: null,
                documentHierarchyId: PARTY_DOCUMENT_HIERARCHY.PRINCIPAL,
              },
              take: 1,
              include: {
                documentType: true,
                documentHierarchy: true,
              },
            },
            partyRole: true,
          },
        },
        documentType: true,
      },
    },
    transactionType: true,
    movementCategory: true,
    budgetItem: {
      include: {
        definition: {
          include: {
            project: true,
            category: {
              include: {
                budgetCategory: true,
              }
            },
            nature: true,
          },
        },
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
        documentType: true,
      },
    },
    paymentCategory: true
  };

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
    const principalDoc = item.document?.party?.partyDocuments?.[0];
    const inst = item.installment;
    const doc = item.document;

    const executedAmount = Number(item.executedAmount || 0);
    const executedSoles = Number(item.executedSoles || 0);
    const executedDolares = Number(item.executedDolares || 0);

    let exchangeRateNumber = '';

    if (Math.abs(executedAmount) > 0.10) {
      if (executedAmount === executedDolares) {
        exchangeRateNumber = '' + (executedSoles / executedDolares);
      } else {
        exchangeRateNumber = '' + (executedAmount / executedDolares);
      }

      exchangeRateNumber = Number(exchangeRateNumber).toFixed(2);
    }

    return {
      id: item.id,
      code: item.code,
      description: item.description,
      amount: item.amount,

      autorizeDate: moment(item.autorizeDate).format('DD/MM/YYYY'),
      generateDate: moment(item.generateDate).format('DD/MM/YYYY'),
      paymentDate: moment(item.paymentDate).format('DD/MM/YYYY'),

      documentId: item.document.id,
      documentDetractionAmount: item.document.detractionAmount,
      documentTaxAmount: item.document.taxAmount,

      documentCode: inst?.code || doc?.code || 'Sin definir',
      documentDescription: inst?.description || doc?.description || 'Sin definir',

      documentDate: moment(inst?.documentDate ?? doc.documentDate).format('DD/MM/YYYY'),
      documentTypeId: inst?.documentType?.id ?? doc.documentType?.id,
      documentType: inst?.documentType?.name ?? doc.documentType?.name,
      documentAmountToPay: inst?.totalAmount ?? doc.amountToPay,


      transactionTypeId: item.transactionType.id,
      transactionTypeName: item.transactionType.name,

      movementCategoryId: item.movementCategory.id,
      movementCategoryName: item.movementCategory.name,

      partyId: item.document.party.id,
      partyName: item.document.party.name,
      partyDocument: principalDoc?.document ?? '',

      movementStatusId: item.movementStatus.id,
      movementStatusName: item.movementStatus.name,

      budgetItemId: item.budgetItem?.id,
      budgetItemName: item.budgetItem
        ? `${item.budgetItem.definition.name}`
        : null,
      budgetSubCategoryName: item.budgetItem
        ? `${item.budgetItem.definition.category.name}`
        : null,
      budgetCategoryName: item.budgetItem
        ? `${item.budgetItem.definition.category.budgetCategory.name}`
        : null,

      budgetNatureId: item.budgetItem
        ? `${item.budgetItem.definition.nature.id}`
        : null,
      budgetNatureName: item.budgetItem
        ? `${item.budgetItem.definition.nature.name}`
        : null,

      projectName: item.budgetItem.definition.project.name,

      bankAccountId: item.bankAccount.id,
      bankAccountName: item.bankAccount.bank.name,
      bankAccountCurrencyId: item.bankAccount.currency.id,
      bankAccountCurrency: item.bankAccount.currency.name,
      bankAccountComplete: item.bankAccount.bank.name + ' - ' + item.bankAccount.currency.name,

      installmentId: !item.installment?.id ? '' : item.installment?.id,
      installmentCuota: !item.installment?.letra ? '' : 'Cuota: ' + item.installment?.letra,

      paymentCategoryId: !item.paymentCategory?.id ? '' : item.paymentCategory?.id,
      paymentCategoryName: !item.paymentCategory?.name ? '' : '' + item.paymentCategory?.name,


      documentUrl: item.documentUrl,
      documentName: item.documentName,

      executedAmount: item.executedAmount,
      executedSoles: item.executedSoles,
      executedDolares: item.executedDolares,

      idFirebase: !item.idFirebase ? '' : item.idFirebase,
      fromTelecredito: item.fromTelecredito ?? false,

      exchangeRateNumber: exchangeRateNumber,

    };
  }

  private formatMovementSummary(item: any) {
    return {
      id: item.id,
      code: item.code,
      description: item.description,
      paymentDate: moment(item.paymentDate).format('DD/MM/YYYY'),

      amount: Number(item.amount || 0),

      executedAmount: Math.abs(Number(item.executedAmount || 0)),
      executedSoles: Math.abs(Number(item.executedSoles || 0)),
      executedDolares: Math.abs(Number(item.executedDolares || 0)),

      budgetItemId: item.budgetItem?.id,
      budgetItemName: item.budgetItem?.definition?.name || 'Sin definir',

      natureId: item.budgetItem?.definition?.nature?.id,
      NatureName: item.budgetItem?.definition?.nature?.name || 'Sin definir',

      transactionTypeId: item.transactionType?.id,
      transactionTypeName: item.transactionType?.name,

      partyId: item.document?.party?.id,
      partyName: item.document?.party?.name,

      documentUrl: item.documentUrl || '',
      fromTelecredito: item.fromTelecredito ?? false,

      bankAccountCurrencyId: item.bankAccount.currency.id,
      bankAccountCurrency: item.bankAccount.currency.name,

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
        paymentCategoryId = PAYMENT_CATEGORY.REGULAR,
        autorizeDate,
        generateDate,
        paymentDate,
        code,
        description,
        amount,
        documentUrl = '',
        documentName = '',
        idFirebase = '',
        fromTelecredito = false,
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
          fromTelecredito,
          movementStatus: { connect: { id: movementStatusId } },
          document: { connect: { id: documentId } },
          transactionType: { connect: { id: transactionTypeId } },
          movementCategory: { connect: { id: movementCategoryId } },
          budgetItem: { connect: { id: budgetItemId } },
          bankAccount: { connect: { id: bankAccountId } },
          exchangeRate: { connect: { id: exchangeRate.id } },
          installment: installmentId ? { connect: { id: installmentId } } : undefined,
          paymentCategory: paymentCategoryId ? { connect: { id: paymentCategoryId } } : undefined,
        },
        select: { id: true }, // 👈 solo devolvemos el id
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
      include: {
        installment: true
      },
    });
  }

  async updateSimple(id: string, updateDto: any) {
    await this.prisma.zentraMovement.update({
      where: { id },
      data: {
        ...updateDto
      },
    });

    return {
      id: id
    }
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
          paymentCategoryId: updateDto.paymentCategoryId ?? existing.paymentCategoryId,
          idFirebase: updateDto.idFirebase ?? existing.idFirebase,
          documentUrl: updateDto.documentUrl ?? existing.documentUrl,
          documentName: updateDto.documentName ?? existing.documentName,
          executedAmount,
          executedSoles,
          executedDolares,
          fromTelecredito: updateDto.fromTelecredito ?? existing.fromTelecredito,
        },
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

  async updateExchangeRate(id: string, updateDto: any) {
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

      // Nuevos montos
      const executedAmount = Number(updateDto.executedAmount);
      const executedSoles = Number(updateDto.executedSoles);
      const executedDolares = Number(updateDto.executedDolares);

      // Actualizar movimiento
      const updated = await tx.zentraMovement.update({
        where: { id },
        data: {
          amount: Number(updateDto.amount),
          executedAmount,
          executedSoles,
          executedDolares,
        },
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
      where: { budgetItemId, deletedAt: null },
      include: this.includeRelations,
      orderBy: { paymentDate: 'desc' },
    });
    return results.map(this.formatMovement);
  }

  async findByCurrency(currencyId: string) {
    const results = await this.prisma.zentraMovement.findMany({
      where: { bankAccount: { currencyId }, deletedAt: null },
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' },
    });
    return results.map(this.formatMovement);
  }

  async findByBudgetItemAndCurrency(budgetItemId: string, currencyId: string) {
    const results = await this.prisma.zentraMovement.findMany({
      where: { budgetItemId, bankAccount: { currencyId }, deletedAt: null },
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' },
    });
    return results.map(this.formatMovement);
  }

  async findByInstallmentSimple(installmentId: string) {
    return this.prisma.zentraMovement.findMany({
      where: { installmentId, deletedAt: null },
      select: {
        executedSoles: true,
        executedDolares: true,
        paymentDate: true, // si realmente necesitas ordenar
      },
    });
  }

  async findByInstallment(installmentId: string) {
    const results = await this.prisma.zentraMovement.findMany({
      where: { installmentId, deletedAt: null },
      include: this.includeRelations,
      orderBy: { paymentDate: 'desc' },
    });
    return results.map(this.formatMovement);
  }

  async findByDocumentSimple(documentId: string) {
    return this.prisma.zentraMovement.findMany({
      where: { documentId, deletedAt: null },
      select: {
        executedSoles: true,
        executedDolares: true,
        paymentDate: true,
        transactionTypeId: true,
      },
    });
  }

  async findByDocument(documentId: string) {
    const results = await this.prisma.zentraMovement.findMany({
      where: { documentId, deletedAt: null },
      include: this.includeRelations,
      orderBy: { paymentDate: 'desc' },
    });
    return results.map(this.formatMovement);
  }

  async findByFilters(filters: {
    companyId?: string;
    projectId?: string;
    bankAccountId?: string,
    partyId?: string;
    budgetItemId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { companyId, projectId, partyId, bankAccountId, budgetItemId, startDate, endDate } = filters;

    const where: any = {
      deletedAt: null,
    };

    if (startDate || endDate) {
      where.paymentDate = {};
      if (startDate) {
        where.paymentDate.gte = moment(startDate).startOf('day').toDate();
      }
      if (endDate) {
        where.paymentDate.lte = moment(endDate).endOf('day').toDate();
      }
    }

    if (budgetItemId && budgetItemId.trim() !== '') {
      where.budgetItem = { id: budgetItemId };
    }

    if (projectId && projectId.trim() !== '') {
      where.budgetItem = {
        ...(where.budgetItem || {}),
        definition: {
          ...(where.budgetItem?.definition || {}),
          projectId: projectId,
        },
      };
    }

    if (companyId && companyId.trim() !== '') {
      where.budgetItem = {
        ...(where.budgetItem || {}),
        definition: {
          ...(where.budgetItem?.definition || {}),
          project: {
            companyId
          }
        },
      };
    }

    if (bankAccountId && bankAccountId.trim() !== '') {
      where.bankAccount = {
        deletedAt: null,
        id: bankAccountId
      };
    } else {
      where.bankAccount = {
        deletedAt: null
      };
    }

    if (partyId && partyId.trim() !== '') {
      where.document = {
        partyId
      }
    }

    const results = await this.prisma.zentraMovement.findMany({
      where,
      include: this.includeRelations,
      orderBy: {
        paymentDate: 'desc',
      },
    });

    const bankSummary: Record<string, { bankAccountName: string, entry: number, exit: number, balance: number }> = {};

    for (const item of results) {
      const accountId = item.bankAccount.id;

      if (!bankSummary[accountId]) {
        bankSummary[accountId] = {
          bankAccountName: `${item.bankAccount.bank.name} - ${item.bankAccount.currency.name}`,
          entry: 0,
          exit: 0,
          balance: 0,
        };
      }

      if (item.transactionType.id === TRANSACTION_TYPE.ENTRY) {
        bankSummary[accountId].entry += Number(item.amount);
        bankSummary[accountId].balance += Number(item.amount);
      } else if (item.transactionType.id === TRANSACTION_TYPE.EXIT) {
        bankSummary[accountId].exit += Number(item.amount);
        bankSummary[accountId].balance -= Number(item.amount);
      }
    }

    return {
      movements: results.map(item => this.formatMovement(item)),
      bankSummary: Object.values(bankSummary),
    };

  }

  private async getMovementsInRange(projectId: string, start: Date, end: Date) {
    return this.prisma.zentraMovement.findMany({
      where: {
        deletedAt: null,
        paymentDate: {
          gte: start,
          lte: end,
        },
        budgetItem: {
          definition: {
            projectId,
          },
        },
      },
      include: {
        document: {
          include: {
            party: true,
          }
        },
        budgetItem: {
          include: {
            definition: {
              include: {
                nature: true
              }
            }
          },
        },
        transactionType: true,
        bankAccount: {
          include: {
            currency: true
          }
        }
      },
    });
  }

  private classifyMovements(movements: any[]) {
    const ingresos: typeof movements = [];
    const gastos: typeof movements = [];

    for (const mov of movements) {
      const natureId = mov.budgetItem.definition.natureId;

      if (natureId === BUDGET_NATURE.INGRESO) {
        ingresos.push(mov);
      } else if (
        natureId === BUDGET_NATURE.GASTO ||
        natureId === BUDGET_NATURE.COSTO_DIRECTO ||
        natureId === BUDGET_NATURE.RENDICION_CUENTA
      ) {
        gastos.push(mov);
      }
    }

    return { ingresos, gastos };
  }

  private sumMovements(
    arr: any[],
    key: 'ingresos' | 'gastos',
    result: any
  ) {
    arr.forEach((mov) => {
      let amount = Number(mov.executedDolares) || 0;
      if (mov.transactionType.id === TRANSACTION_TYPE.EXIT && key === 'ingresos') {
        amount = -amount;
      }

      if (Array.isArray(result)) {
        // caso anual
        const month = mov.paymentDate.getMonth(); // 0 = enero
        result[month][key] += amount;
      } else {
        // caso mensual
        result[key] += amount;
      }
    });
  }

  async getYearlyProfitability(projectId: string) {
    const startOfYear = moment().startOf('year').toDate();
    const endOfYear = moment().endOf('year').toDate();

    const movements = await this.getMovementsInRange(projectId, startOfYear, endOfYear);
    const { ingresos, gastos } = this.classifyMovements(movements);

    const result = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      ingresos: 0,
      gastos: 0,
    }));

    this.sumMovements(ingresos, 'ingresos', result);
    this.sumMovements(gastos, 'gastos', result);

    return result;
  }

  async getMonthlyProfitability(projectId: string, month: number, year: number) {
    const startOfMonth = moment({ year, month }).startOf('month').toDate();
    const endOfMonth = moment({ year, month }).endOf('month').toDate();

    const allMovements = await this.getMovementsInRange(projectId, startOfMonth, endOfMonth);

    const ingresos: any[] = [];
    const gastos: any[] = [];
    const rendicionCuenta: any[] = [];
    const cajaChica: any[] = [];

    for (const mov of allMovements) {
      const natureId = mov.budgetItem.definition.natureId;
      const transactionTypeId = mov.transactionType.id;
      const formatted = this.formatMovementSummary(mov);


      if (natureId === BUDGET_NATURE.INGRESO) {
        if (transactionTypeId === TRANSACTION_TYPE.ENTRY) {
          ingresos.push(formatted);
        }
        if (transactionTypeId === TRANSACTION_TYPE.EXIT) {
          gastos.push(formatted);
        }
      }
      if (natureId === BUDGET_NATURE.GASTO || natureId === BUDGET_NATURE.COSTO_DIRECTO) {

        if (transactionTypeId === TRANSACTION_TYPE.ENTRY) {
          ingresos.push(formatted);
        }
        if (transactionTypeId === TRANSACTION_TYPE.EXIT) {
          gastos.push(formatted);
        }
      }
      

      if (natureId === BUDGET_NATURE.RENDICION_CUENTA) {
        rendicionCuenta.push(formatted);
      }

      if (natureId === BUDGET_NATURE.CAJA_CHICA) {
        cajaChica.push(formatted);
      }


    }

    const result = {
      detalleIngresos: ingresos,
      detalleGastos: gastos,
      detalleRendicionCuenta: rendicionCuenta,
      detalleCajaChica: cajaChica,
    };

    return result;
  }




  async findAllByProject(projectId: string): Promise<any[]> {
    const results = await this.prisma.zentraMovement.findMany({
      where: {
        deletedAt: null,
        budgetItem: {
          definition: {
            projectId: projectId,
          },
        }
      },
      include: this.includeRelations,
    });
    return results.map(this.formatMovement);
  }

  async findAllByCompany(companyId: string): Promise<any[]> {
    const results = await this.prisma.zentraMovement.findMany({
      where: {
        deletedAt: null,
        budgetItem: {
          definition: {
            project: {
              companyId: companyId,
            }
          },
        }
      },
      include: this.includeRelations,
    });
    return results.map(this.formatMovement);
  }


  async findAllByBankStatement(bankAccountId: string): Promise<any[]> {

    const movements = await this.prisma.zentraMovement.findMany({
      where: {
        deletedAt: null,
        bankAccountId
      },
      include: {
        transactionType: true,
        bankAccount: {
          include: {
            bank: true,
            currency: true,
          },
        }
      }
    });

    if (!movements.length) return [];

    const accountsMap: Record<string, any> = {};

    let minDate = moment(movements[0].paymentDate);
    let maxDate = moment(movements[0].paymentDate);

    // Procesar movimientos
    for (const m of movements) {
      const accountKey = `${m.bankAccount.bank.name}-${m.bankAccount.currency.name}`;

      if (!accountsMap[accountKey]) {
        accountsMap[accountKey] = {
          bankAccountId: m.bankAccountId,
          months: {}
        };
      }

      const months = accountsMap[accountKey].months;

      const date = moment(m.paymentDate);

      if (date.isBefore(minDate)) minDate = date.clone();
      if (date.isAfter(maxDate)) maxDate = date.clone();

      const monthKey = date.format("YYYY-MM");

      if (!months[monthKey]) months[monthKey] = 0;

      const amount = Number(m.amount);

      if (m.transactionTypeId === TRANSACTION_TYPE.ENTRY) {
        months[monthKey] += amount;
      } else if (m.transactionTypeId === TRANSACTION_TYPE.EXIT) {
        months[monthKey] -= amount;
      }
    }

    // Construir meses completos
    const allMonths: string[] = [];
    const cursor = minDate.clone().startOf("month");
    const end = maxDate.clone().endOf("month");

    while (cursor.isSameOrBefore(end)) {
      allMonths.push(cursor.format("YYYY-MM"));
      cursor.add(1, "month");
    }

    // Construir respuesta final
    const result: any[] = [];

    for (const accountKey of Object.keys(accountsMap)) {
      const { bankAccountId, months } = accountsMap[accountKey];

      let cumulative = 0;

      for (const month of allMonths) {
        const movementAmount = months[month] || 0;
        cumulative += movementAmount;

        const lastDay = moment(month + "-01").endOf("month").format("DD/MM/YYYY");

        result.push({
          date: lastDay,
          account: accountKey,
          bankAccountId, // 👈 AGREGADO AQUÍ
          amount: Number(cumulative.toFixed(2)),
        });
      }
    }

    // Orden final
    result.sort((a, b) => {
      const da = moment(a.date, "DD/MM/YYYY").toDate().getTime();
      const db = moment(b.date, "DD/MM/YYYY").toDate().getTime();
      if (da !== db) return db - da; // Descendente
      return a.account.localeCompare(b.account);
    });

    return result;
  }


  // Utilidad para dividir en lotes
  chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  async recalculateBudgetItems(companyId: string, preview: boolean) {
    // 1. Traer partidas
    const budgetItems = await this.prisma.zentraBudgetItem.findMany({
      where: { definition: { project: { companyId } } },
      select: { id: true },
    });

    // 2. Traer movimientos
    const movements = await this.prisma.zentraMovement.findMany({
      where: {
        deletedAt: null,
        budgetItem: {
          definition: { project: { companyId } },
        },
      },
      select: {
        budgetItemId: true,
        executedAmount: true,
        executedSoles: true,
        executedDolares: true,
      },
    });

    // Solo preview
    if (preview) {
      return {
        preview: true,
        totalPartidas: budgetItems.length,
        totalMovimientos: movements.length,
      };
    }

    // 3. Agrupar por partida
    const grouped = movements.reduce((acc, m) => {
      if (!acc[m.budgetItemId]) acc[m.budgetItemId] = [];
      acc[m.budgetItemId].push(m);
      return acc;
    }, {} as Record<string, typeof movements>);

    const updates: any[] = [];

    // 4. Construir updates
    for (const item of budgetItems) {
      const list = grouped[item.id] || [];

      const executedAmount = Number(
        list.reduce((s, m) => s + Number(m.executedAmount), 0).toFixed(2)
      );
      const executedSoles = Number(
        list.reduce((s, m) => s + Number(m.executedSoles), 0).toFixed(2)
      );
      const executedDolares = Number(
        list.reduce((s, m) => s + Number(m.executedDolares), 0).toFixed(2)
      );

      updates.push({
        id: item.id,
        executedAmount,
        executedSoles,
        executedDolares,
      });
    }

    const chunks = this.chunkArray(updates, 100);

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map((u) =>
          this.prisma.zentraBudgetItem.update({
            where: { id: u.id },
            data: {
              executedAmount: u.executedAmount,
              executedSoles: u.executedSoles,
              executedDolares: u.executedDolares,
            },
          })
        )
      );
    }

    return {
      preview: false,
      message: "Partidas recalculadas correctamente",
      totalPartidas: budgetItems.length,
      totalMovimientos: movements.length,
    };


  }

  async recalculateBankAccount(companyId: string, preview: boolean) {
    // 1. Traer cuentas bancarias
    const bankAccounts = await this.prisma.zentraBankAccount.findMany({
      where: { project: { companyId } },
      select: { id: true },
    });

    // 2. Traer movimientos
    const movements = await this.prisma.zentraMovement.findMany({
      where: {
        deletedAt: null,
        budgetItem: {
          definition: { project: { companyId } },
        },
      },
      select: {
        transactionTypeId: true,
        amount: true,
        bankAccountId: true,
      },
    });

    // Solo preview
    if (preview) {
      return {
        preview: true,
        totalBankAccount: bankAccounts.length,
        totalMovimientos: movements.length,
      };
    }

    // 3. Agrupar por bank Account
    const grouped = movements.reduce((acc, m) => {
      if (!acc[m.bankAccountId]) acc[m.bankAccountId] = [];
      acc[m.bankAccountId].push(m);
      return acc;
    }, {} as Record<string, typeof movements>);

    const updates: any[] = [];

    // 4. Construir updates
    for (const item of bankAccounts) {
      const list = grouped[item.id] || [];

      let amount: number = 0;

      for (let itemMov of list) {
        if (itemMov.transactionTypeId === TRANSACTION_TYPE.ENTRY) {
          amount = Number((amount + Number(itemMov.amount)).toFixed(2))
        }
        if (itemMov.transactionTypeId === TRANSACTION_TYPE.EXIT) {
          amount = Number((amount - Number(itemMov.amount)).toFixed(2))
        }
      }

      updates.push({
        id: item.id,
        amount,
      });
    }

    const chunks = this.chunkArray(updates, 100);

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map((u) =>
          this.prisma.zentraBankAccount.update({
            where: { id: u.id },
            data: {
              amount: u.amount,
            },
          })
        )
      );
    }

    return {
      preview: false,
      message: "Bank Accounts recalculados correctamente",
      totalBankAccount: bankAccounts.length,
      totalMovimientos: movements.length,
    };


  }


  async updateMovementBudgetItem(movementId: string, newBudgetItemId: string) {
    // 1. Buscamos el movimiento usando el cliente directo de prisma
    const movement = await this.prisma.zentraMovement.findUnique({
      where: { id: movementId }
    });

    if (!movement || movement.budgetItemId === newBudgetItemId) return;

    // 2. Revertir impacto en partida antigua (usando this.prisma dentro de adjustBalances)
    await this.adjustBalances(
      this.prisma,
      movement.bankAccountId,
      movement.budgetItemId,
      -Number(movement.executedAmount),
      -Number(movement.executedSoles),
      -Number(movement.executedDolares)
    );

    // 3. Aplicar impacto en partida nueva
    await this.adjustBalances(
      this.prisma,
      movement.bankAccountId,
      newBudgetItemId,
      Number(movement.executedAmount),
      Number(movement.executedSoles),
      Number(movement.executedDolares)
    );

    // 4. Actualizar el registro del movimiento
    await this.prisma.zentraMovement.update({
      where: { id: movementId },
      data: { budgetItemId: newBudgetItemId }
    });
  }


  async findByBudgetItems(filters: {
    startDate?: string;
    endDate?: string;
    budgetItemIds: string[];
  }) {
    const { startDate, endDate, budgetItemIds } = filters;

    const where: any = {
      deletedAt: null,
      budgetItemId: {
        in: budgetItemIds
      }
    };

    // 1. Filtro de Fechas (se mantiene igual)
    if (startDate || endDate) {
      where.paymentDate = {};
      if (startDate) {
        where.paymentDate.gte = moment(startDate).startOf('day').toDate();
      }
      if (endDate) {
        where.paymentDate.lte = moment(endDate).endOf('day').toDate();
      }
    }
    const results = await this.prisma.zentraMovement.findMany({
      where,
      include: this.includeRelations,
      orderBy: {
        paymentDate: 'desc',
      },
    });

    return {
      movements: results.map(item => this.formatMovement(item))
    };
  }




}