import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import * as moment from 'moment';

import { INSTALLMENT_STATUS, CURRENCY, BUDGET_NATURE } from 'src/shared/constants/app.constants';


@Injectable()
export class ZentraTransactionGeneralService {
  constructor(
    private prisma: PrismaService,
  ) { }


  async getWeeklySummary(projectId: string, month: number, year: number) {

    const startOfMonth = moment({ year, month }).startOf('month').startOf('day');
    const endOfMonth = moment({ year, month }).endOf('month').endOf('day');

    const projectIncome = await this.prisma.zentraProjectIncome.findFirst({
      where: { 
        deletedAt: null, 
        budgetItem: {
          definition: {
            natureId: BUDGET_NATURE.INGRESO
          }
        },
        projectId
      },
      include: { 
        project: true, 
        budgetItem: true 
      },
    }); 
    
    if (!projectIncome) {
      return { weeks: [] };
    }

    const ingresoVentasBudgetItemId = projectIncome.budgetItemId;

    const incomes = await this.prisma.zentraMovement.findMany({
      where: {
        deletedAt: null,
        budgetItem: {
          definition: {
            projectId,
          },
        },
        budgetItemId: ingresoVentasBudgetItemId,
        paymentDate: { gte: startOfMonth.toDate(), lte: endOfMonth.toDate() },
      },
      select: {
        executedDolares: true,
        executedSoles: true,
        executedAmount: true,
        amount: true,
        paymentDate: true,
        bankAccount: {
          select: {
            currency: true
          }
        },
        document: {
          select: {
            party: { select: { name: true } },
          },
        },
        installment: {
          select: {
            letra: true,
            scheduledIncomeDocument: {
              select: {
                lot: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    // Installments (pending debts) - include letra and scheduledIncomeDocument.lot and document.party
    const debts = await this.prisma.zentraInstallment.findMany({
      where: {
        deletedAt: null,
        dueDate: { gte: startOfMonth.toDate(), lte: endOfMonth.toDate() },
        installmentStatusId: { not: INSTALLMENT_STATUS.PAGADO },
        scheduledIncomeDocument: {
          document: {
            budgetItem: {
              definition: {
                projectId, // 👈 filtro por proyecto
              },
            },
            budgetItemId: ingresoVentasBudgetItemId,
          },
        },
      },
      select: {
        id: true,
        letra: true,
        totalAmount: true,
        paidAmount: true,
        dueDate: true,
        currency: true,
        scheduledIncomeDocument: {
          select: {
            lot: { select: { name: true } },
            document: {
              select: {
                party: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    const exchangeRate = await this.getExchangeRateByDate(new Date());

    // 1) Build explicit week ranges for the month (ISO week: Monday - Sunday)
    const weeksRanges: Array<{ weekNumber: number; start: moment.Moment; end: moment.Moment; weekRange: string }> = [];
    let cursor = startOfMonth.clone();
    let weekIndex = 1;
    while (cursor.isSameOrBefore(endOfMonth, 'day')) {
      const weekStart = cursor.clone();
      // end of ISO week (Sunday). then cap to endOfMonth
      const weekEnd = moment.min(endOfMonth.clone(), weekStart.clone().endOf('isoWeek'));
      weeksRanges.push({
        weekNumber: weekIndex,
        start: weekStart,
        end: weekEnd,
        weekRange: `${weekStart.format('DD/MM')} - ${weekEnd.format('DD/MM')}`,
      });
      cursor = weekEnd.clone().add(1, 'day');
      weekIndex++;
    }

    // Helper to check inclusive between date and week
    const isDateInRange = (date: Date | string, start: moment.Moment, end: moment.Moment) =>
      moment(date).isBetween(start, end, 'day', '[]');

    // 2) For each week, filter incomes and debts and build detail arrays
    const weeks = weeksRanges.map(w => {
      // incomes in this week
      const incomesInWeek = incomes
        .filter(mov => isDateInRange(mov.paymentDate, w.start, w.end))
        .map(mov => {
          return {
            amountSoles: (Number(mov.executedSoles).toFixed(2)),
            amountDolares: (Number(mov.executedDolares).toFixed(2)),
            amount: (Number(mov.amount).toFixed(2)),
            currencyId: mov.bankAccount.currency.id,
            currencyName: mov.bankAccount.currency.name,
            provider: mov.document?.party?.name?.trim() ?? null,
            
            paymentDate: moment(mov.paymentDate).format('DD/MM/YYYY'),
            installmentNumber: mov.installment?.letra ?? null,
            lot: mov.installment?.scheduledIncomeDocument?.lot?.name ?? null,
          };
        });

      const totalIncomes = incomesInWeek.reduce((s, it) => s + Number(it.amountDolares), 0);

      // debts in this week
      const debtsInWeek = debts
        .filter(inst => isDateInRange(inst.dueDate, w.start, w.end))
        .map(inst => {
          let amountPending = Number(inst.totalAmount) - Number(inst.paidAmount);
          let pending = amountPending;
          // convert from soles to dollars if needed (assuming exchangeRate.buyRate present)
          if (inst.currency.id === CURRENCY.SOLES && exchangeRate) {
            pending = pending / Number(exchangeRate.buyRate);
          }
          const pendingFixed = Number(pending.toFixed(2));
          return {
            provider: inst.scheduledIncomeDocument?.document?.party?.name?.trim() ?? null,
            dueDate: moment(inst.dueDate).format('DD/MM/YYYY'),
            installmentNumber: inst.letra,
            installmentAmount: Number(Number(inst.totalAmount).toFixed(2)),
            currencyId: inst.currency.id,
            currencyName: inst.currency.name,
            lot: inst.scheduledIncomeDocument?.lot?.name ?? null,

            paidAmount: Number(Number(inst.paidAmount).toFixed(2)),
            pending: pendingFixed,
            exchangeRate: exchangeRate?.buyRate,
            amountPending: Number(amountPending.toFixed(2)),

          };
        });

      const totalPending = debtsInWeek.reduce((s, it) => s + Number(it.pending), 0);

      return {
        weekNumber: w.weekNumber,
        weekRange: 'Semana: ' + w.weekNumber + ' - ' + w.weekRange,        // ex: "01/09 - 07/09"
        incomes: incomesInWeek,        // array of income details for this week
        pendingDebts: debtsInWeek,     // array of debt details for this week
        totalIncomes: Number(totalIncomes.toFixed(2)),
        totalPending: Number(totalPending.toFixed(2)),
      };
    });

    return { weeks };
  }


  async getExchangeRateByDate(date: Date) {
    const normalizedDate = moment(date).startOf('day').toDate();

    let exchangeRate = await this.prisma.zentraExchangeRate.findFirst({
      where: {
        date: {
          lte: normalizedDate,
        },
      },
      orderBy: { date: 'desc' },
    });

    return exchangeRate;
  }






}