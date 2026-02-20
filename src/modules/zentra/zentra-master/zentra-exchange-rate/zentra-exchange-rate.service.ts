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

    const results = await this.prisma.zentraExchangeRate.findMany({
      where: { deletedAt: null },
      orderBy: { date: 'desc' },
    });

    return results.map((item) => ({
      id: item.id,
      date: moment(item.date).format('DD/MM/YYYY'),
      dateReal: item.date,
      sellRate: item.sellRate,
      buyRate: item.buyRate,
    }));


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
    return this.prisma.zentraExchangeRate.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraExchangeRate.update({
      where: { id },
      data: { deletedAt: null },
    });
  }


  async findByFilters(filters: {
    startDate?: string;
    endDate?: string;
  }) {
    const { startDate, endDate } = filters;

    const where: any = {
      deletedAt: null,
    };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = moment(startDate).startOf('day').toDate();
      }
      if (endDate) {
        where.date.lte = moment(endDate).endOf('day').toDate();
      }
    }
    
    const results = await this.prisma.zentraExchangeRate.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    return results.map((item) => ({
      id: item.id,
      date: moment(item.date).format('DD/MM/YYYY'),
      dateReal: item.date,
      sellRate: item.sellRate,
      buyRate: item.buyRate,
    }));
  
  }



  // Extras

  async findOneByDate(date: Date | string) {
    const normalizedDate = moment.utc(date).startOf('day').toDate();

    return this.prisma.zentraExchangeRate.findFirst({
      where: {
        date: normalizedDate,
        deletedAt: null
      },
    });
  }

  async getTodayRate() {
    const today = moment.utc().startOf('day').toDate();
    let rate = await this.prisma.zentraExchangeRate.findFirst({
      where: {
        date: today,
        deletedAt: null // <--- Solo activos
      },
    });

    if (!rate) {
      throw new Error('No se encontró el tipo de cambio activo para hoy.');
    }
    return rate;
  }

  async fetchTodayRateFromSunat() {
    const url = 'https://www.sunat.gob.pe/a/txt/tipoCambio.txt';

    try {
      const { data } = await axios.get(url, { timeout: 5000 });

      const [dateStr, buyStr, sellStr] = data.trim().split('|');
      const buyRate = parseFloat(buyStr);
      const sellRate = parseFloat(sellStr);
      const date = moment(dateStr, 'DD/MM/YYYY').startOf('day').toDate();

      return { date, buyRate, sellRate };
    } catch (error) {

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
    const normalizedDate = moment.utc(date).startOf('day').toDate();

    return await this.prisma.zentraExchangeRate.findFirst({
      where: {
        date: { lte: normalizedDate },
        deletedAt: null, // <--- Evita traer tipos de cambio eliminados
      },
      orderBy: { date: 'desc' },
    });
  }


  async getOrFetchRate(date: Date) {
    const normalizedDate = moment.utc(date).startOf('day').toDate();

    let exchangeRate = await this.prisma.zentraExchangeRate.findFirst({
      where: {
        date: normalizedDate,
        deletedAt: null
      },
    });

    if (!exchangeRate) {
      try {
        exchangeRate = await this.upsertTodayRateFromSunat();
      } catch (error) {
        const lastAvailable = await this.prisma.zentraExchangeRate.findFirst({
          orderBy: { date: 'desc' },
        });

        if (lastAvailable) {
          exchangeRate = await this.prisma.zentraExchangeRate.create({
            data: {
              date: normalizedDate,
              buyRate: lastAvailable.buyRate,
              sellRate: lastAvailable.sellRate,
            },
          });
        }
      }
    }

    if (!exchangeRate) throw new Error('No hay tipo de cambio disponible.');
    return exchangeRate;
  }

  async upsertTodayRateFromSunat() {
    const { date, buyRate, sellRate } = await this.fetchTodayRateFromSunat();
    const normalizedDate = moment.utc(date).startOf('day').toDate();

    const existingRate = await this.prisma.zentraExchangeRate.findFirst({
      where: { date: normalizedDate },
    });

    if (existingRate) {
      return this.prisma.zentraExchangeRate.update({
        where: { id: existingRate.id },
        data: {
          buyRate,
          sellRate,
          deletedAt: null,
        },
      });
    }

    return this.prisma.zentraExchangeRate.create({
      data: {
        date: normalizedDate,
        buyRate,
        sellRate,
      },
    });
  }



}