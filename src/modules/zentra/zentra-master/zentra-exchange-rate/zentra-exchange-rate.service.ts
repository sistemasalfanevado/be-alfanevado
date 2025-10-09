import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraExchangeRateDto } from './dto/create-zentra-exchange-rate.dto';
import { UpdateZentraExchangeRateDto } from './dto/update-zentra-exchange-rate.dto';
import * as moment from 'moment';
import axios from 'axios';

@Injectable()
export class ZentraExchangeRateService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraExchangeRateDto) {
    return this.prisma.zentraExchangeRate.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.zentraExchangeRate.findMany({
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraExchangeRate.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDto: UpdateZentraExchangeRateDto) {
    return this.prisma.zentraExchangeRate.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraExchangeRate.delete({
      where: { id },
    });
  }

  async restore(id: string) {
    // Si quieres implementar "restore" como soft delete, deberías agregar deletedAt al modelo
    throw new Error('Restore no implementado. Para soft delete agrega deletedAt al modelo.');
  }

  async findOneByDate(date: Date) {
    return this.prisma.zentraExchangeRate.findUnique({
      where: { date },
    });
  }


  /** Obtiene el tipo de cambio del día de hoy */
  async getTodayRate() {
    const today = moment().startOf('day').toDate();
    let rate = await this.prisma.zentraExchangeRate.findUnique({
      where: { date: today },
    });

    if (!rate) {
      throw new Error('No se encontró el tipo de cambio para hoy.');
    }

    return rate;
  }

  /** Obtiene el tipo de cambio actual desde SUNAT, o usa el último guardado si falla */
  async fetchTodayRateFromSunat() {
    const url = 'https://www.sunat.gob.pe/a/txt/tipoCambio.txt';

    try {
      const { data } = await axios.get(url, { timeout: 5000 });

      const [dateStr, buyStr, sellStr] = data.trim().split('|');
      const buyRate = parseFloat(buyStr);
      const sellRate = parseFloat(sellStr);
      const date = moment(dateStr, 'DD/MM/YYYY').startOf('day').toDate();

      // Devolvemos el tipo de cambio obtenido de SUNAT
      return { date, buyRate, sellRate };
    } catch (error) {

      // Si falla, usamos el último tipo de cambio guardado en BD
      const lastExchangeRate = await this.getExchangeRateByDate(new Date());

      if (!lastExchangeRate) {
        throw new Error('No se pudo obtener tipo de cambio ni de SUNAT ni de la base de datos.');
      }

      return {
        date: lastExchangeRate.date,
        buyRate: lastExchangeRate.buyRate,
        sellRate: lastExchangeRate.sellRate,
      };
    }
  }

  /** Inserta o actualiza el tipo de cambio para hoy */
  async upsertTodayRateFromSunat() {
    const { date, buyRate, sellRate } = await this.fetchTodayRateFromSunat();
    return this.prisma.zentraExchangeRate.upsert({
      where: { date },
      create: { date, buyRate, sellRate },
      update: { buyRate, sellRate },
    });
  }

  async getLatestRate() {
    const rate = await this.prisma.zentraExchangeRate.findFirst({
      orderBy: { date: 'desc' },
    });

    if (!rate) {
      throw new Error('No se encontró ningún tipo de cambio registrado.');
    }

    return rate;
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