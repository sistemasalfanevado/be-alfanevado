import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraTelecreditoOperationDto } from './dto/create-zentra-telecredito-operation.dto';
import { UpdateZentraTelecreditoOperationDto } from './dto/update-zentra-telecredito-operation.dto';
import * as moment from 'moment';

@Injectable()
export class ZentraTelecreditoOperationService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraTelecreditoOperationDto) {
    return this.prisma.zentraTelecreditoOperation.create({
      data: createDto,
    });
  }

  async findAll() {
    const results = await this.prisma.zentraTelecreditoOperation.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        bankAccount: {
          include: {
            bank: true,
            currency: true,
          },
        },
        company: true,
        telecreditoConfig: true,
        state: true,
      },
    });

    // 🔹 Transformar la data para devolver un objeto plano
    return results.map((item) => ({
      id: item.id,
      datePayment: moment(item.datePayment).format("DD/MM/YYYY"),

      bankAccountId: item.bankAccountId,
      bankName: item.bankAccount?.bank?.name || null,
      currencyName: item.bankAccount?.currency?.name || null,

      companyId: item.companyId,
      companyName: item.company?.name ?? null,

      telecreditoConfigId: item.telecreditoConfigId,

      stateId: item.stateId,
      stateName: item.state?.name ?? null,
    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraTelecreditoOperation.findUnique({
      where: { id },
      include: {
        bankAccount: true,
        company: true,
        telecreditoConfig: true,
        state: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraTelecreditoOperationDto) {
    return this.prisma.zentraTelecreditoOperation.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraTelecreditoOperation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraTelecreditoOperation.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  /**
   * 🔍 Filtro personalizado por fechas y estado
   */
  async findByFilters(filters: {
    stateId?: string;
    companyId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const where = this.buildTelecreditoFilters(filters);

    const results = await this.prisma.zentraTelecreditoOperation.findMany({
      where,
      orderBy: { datePayment: 'desc' },
      include: {
        bankAccount: {
          include: {
            bank: true,
            currency: true,
          },
        },
        company: true,
        telecreditoConfig: true,
        state: true,
      },
    });

    // 🔹 Transformar la data para devolver un objeto plano
    return results.map((item) => ({
      id: item.id,
      datePayment: moment(item.datePayment).format("DD/MM/YYYY"),

      bankAccountId: item.bankAccountId,
      bankName: item.bankAccount?.bank?.name || null,
      currencyName: item.bankAccount?.currency?.name || null,

      companyId: item.companyId,
      companyName: item.company?.name ?? null,

      telecreditoConfigId: item.telecreditoConfigId,

      stateId: item.stateId,
      stateName: item.state?.name ?? null,
    }));


  }

  private buildTelecreditoFilters(filters: {
    stateId?: string;
    companyId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const where: any = { deletedAt: null };

    if (filters.startDate || filters.endDate) {
      where.datePayment = {};
      if (filters.startDate) {
        where.datePayment.gte = moment(filters.startDate).startOf('day').toDate();
      }
      if (filters.endDate) {
        where.datePayment.lte = moment(filters.endDate).endOf('day').toDate();
      }
    }

    if (filters.stateId?.trim()) {
      where.stateId = filters.stateId;
    }

    if (filters.companyId?.trim()) {
      where.companyId = filters.companyId;
    }

    return where;
  }
}