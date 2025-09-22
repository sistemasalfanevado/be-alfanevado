import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { ZentraInstallmentService } from '../../zentra-transaction/zentra-installment/zentra-installment.service';
import { ZentraMovementService } from '../../zentra-transaction/zentra-movement/zentra-movement.service';
import { ZentraExchangeRateService } from '../../zentra-master/zentra-exchange-rate/zentra-exchange-rate.service';

import * as moment from 'moment';

import { INSTALLMENT_STATUS, CURRENCY } from 'src/shared/constants/app.constants';


@Injectable()
export class ZentraTransactionGeneralService {
  constructor(
    private prisma: PrismaService,
    private zentraInstallmentService: ZentraInstallmentService,
    private zentraMovementService: ZentraMovementService,
    private zentraExchangeRateService: ZentraExchangeRateService
  ) { }

  async getWeeklySummary(projectId: string) {
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');

    const projectIncome = await this.prisma.zentraProjectIncome.findFirst({
      where: { deletedAt: null, projectId },
      include: { budgetItem: true },
    });

    if (!projectIncome) {
      return { ingresos: [], deudasPendientes: [] };
    }

    const ingresoVentasBudgetItemId = projectIncome.budgetItemId;

    // INGRESOS (Movements)
    const ingresos = await this.prisma.zentraMovement.findMany({
      where: {
        deletedAt: null,
        budgetItemId: ingresoVentasBudgetItemId,
        paymentDate: { gte: startOfMonth.toDate(), lte: endOfMonth.toDate() },
      },
      select: { executedDolares: true, paymentDate: true },
    });

    // DEUDAS (Installments)
    const deudas = await this.prisma.zentraInstallment.findMany({
      where: {
        deletedAt: null,
        dueDate: { gte: startOfMonth.toDate(), lte: endOfMonth.toDate() },
        installmentStatusId: { not: INSTALLMENT_STATUS.PAGADO },
        scheduledIncomeDocument: { document: { budgetItemId: ingresoVentasBudgetItemId } },
      },
      select: { totalAmount: true, paidAmount: true, dueDate: true, currencyId: true },
    });

    const exchangeRate = await this.getExchangeRateByDate(new Date());

    // Función helper para obtener número de semana y rango de fecha
    const getWeekInfo = (date: Date) => {
      const mDate = moment(date);
      const weekStart = moment.max(startOfMonth, mDate.clone().startOf('week'));
      const weekEnd = moment.min(endOfMonth, mDate.clone().endOf('week'));
      return {
        weekText: `${weekStart.format('DD/MM')} - ${weekEnd.format('DD/MM')}`,
        weekNumber: Math.floor(weekStart.diff(startOfMonth, 'days') / 7) + 1,
      };
    };

    // Agrupar ingresos por semana
    const ingresosSemanal = ingresos.reduce((acc, mov) => {
      const { weekText, weekNumber } = getWeekInfo(mov.paymentDate);
      if (!acc[weekNumber]) acc[weekNumber] = { weekText, total: 0 };
      acc[weekNumber].total += Number(mov.executedDolares);
      return acc;
    }, {} as Record<number, { weekText: string; total: number }>);

    // Agrupar deudas por semana
    const deudasSemanal = deudas.reduce((acc, inst) => {
      const { weekText, weekNumber } = getWeekInfo(inst.dueDate);
      let pending = Math.abs(Number(inst.totalAmount) - Number(inst.paidAmount));
      if (inst.currencyId === CURRENCY.SOLES && exchangeRate) {
        pending = pending / Number(exchangeRate.buyRate);
      }
      if (!acc[weekNumber]) acc[weekNumber] = { weekText, total: 0 };
      acc[weekNumber].total += pending;
      return acc;
    }, {} as Record<number, { weekText: string; total: number }>);

    // Convertir a arrays y ordenar por número de semana
    const ingresosArray = Object.entries(ingresosSemanal)
      .map(([weekNumber, data]) => ({ weekNumber: Number(weekNumber), week: data.weekText, total: Number(data.total.toFixed(2)) }))
      .sort((a, b) => a.weekNumber - b.weekNumber);

    const deudasArray = Object.entries(deudasSemanal)
      .map(([weekNumber, data]) => ({ weekNumber: Number(weekNumber), week: data.weekText, total: Number(data.total.toFixed(2)) }))
      .sort((a, b) => a.weekNumber - b.weekNumber);

    return { ingresos: ingresosArray, deudasPendientes: deudasArray };
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