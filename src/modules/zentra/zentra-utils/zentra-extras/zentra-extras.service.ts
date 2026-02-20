import { Injectable, Logger } from '@nestjs/common';
import * as moment from 'moment';
import { PrismaService } from '../../../../prisma/prisma.service';


@Injectable()
export class ZentraExtrasService {
  private readonly logger = new Logger(ZentraExtrasService.name);

  constructor(private prisma: PrismaService) { }

  async recoverHistoricalRates(startDate: string, endDate: string, isDryRun: boolean = true) {
    const report: any = [];
    
    let currentDate = moment(startDate, 'DD/MM/YYYY').startOf('day');
    const lastDate = moment(endDate, 'DD/MM/YYYY').startOf('day');

    let lastKnownRate = null;

    this.logger.log(`Iniciando recuperación desde ${currentDate.format('DD/MM/YYYY')} hasta ${lastDate.format('DD/MM/YYYY')} (Modo Prueba: ${isDryRun})`);

    while (currentDate.isSameOrBefore(lastDate)) {
      const dateTarget = currentDate.toDate();

      // Buscamos el movimiento con mayor impacto (sea positivo o negativo)
      const movement = await this.prisma.zentraMovement.findFirst({
        where: {
          paymentDate: {
            gte: moment(dateTarget).startOf('day').toDate(),
            lte: moment(dateTarget).endOf('day').toDate(),
          },
          // Capturamos montos > 1 O montos < -1 para no ignorar egresos
          OR: [
            { executedAmount: { gt: 1 } },
            { executedAmount: { lt: -1 } }
          ],
          // Aseguramos que executedDolares no sea 0 para evitar error matemático
          NOT: { executedDolares: 0 }
        },
        // Ordenamos por el valor absoluto del monto ejecutado sería ideal, 
        // pero para Prisma usaremos el monto bruto. 
        // Normalmente los gastos más grandes nos darán el mejor ratio.
        orderBy: { executedAmount: 'desc' }
      });

      let calculatedRate: any = null;
      let status = "";

      if (movement) {
        // Usamos Math.abs para que el tipo de cambio siempre sea positivo
        // independientemente de si el movimiento fue ingreso o egreso
        const soles = Math.abs(Number(movement.executedSoles));
        const dolares = Math.abs(Number(movement.executedDolares));

        calculatedRate = soles / dolares;
        lastKnownRate = calculatedRate;
        status = "CALCULADO";
      } else if (lastKnownRate) {
        calculatedRate = lastKnownRate;
        status = "RELLENADO (FORWARD FILL)";
      } else {
        status = "SIN DATOS";
      }

      if (calculatedRate) {
        // Limitar a 4 decimales para consistencia con la DB
        const finalRate = parseFloat(calculatedRate.toFixed(4));

        if (!isDryRun) {
          const rateRecord = await this.upsertRate(dateTarget, finalRate);

          await this.prisma.zentraMovement.updateMany({
            where: {
              paymentDate: {
                gte: moment(dateTarget).startOf('day').toDate(),
                lte: moment(dateTarget).endOf('day').toDate(),
              }
            },
            data: { exchangeRateId: rateRecord.id }
          });
        }

        report.push({
          fecha: currentDate.format('DD/MM/YYYY'), // Formato solicitado
          tipoCambio: finalRate,
          estado: status,
          idMovimientoReferencia: movement?.id || 'N/A',
          montoOriginal: movement ? Number(movement.executedAmount).toFixed(2) : '0.00'
        });
      }

      currentDate.add(1, 'days');
    }

    return report;
  }

  private async upsertRate(date: Date, rate: number) {
    const existing = await this.prisma.zentraExchangeRate.findFirst({
      where: { date }
    });

    if (existing) {
      return this.prisma.zentraExchangeRate.update({
        where: { id: existing.id },
        data: {
          buyRate: rate,
          sellRate: rate,
          deletedAt: null // Por si acaso estaba marcado como borrado
        }
      });
    }

    return this.prisma.zentraExchangeRate.create({
      data: {
        date,
        buyRate: rate,
        sellRate: rate
      }
    });
  }
}