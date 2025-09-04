import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraInstallmentDto } from './dto/create-zentra-installment.dto';
import { UpdateZentraInstallmentDto } from './dto/update-zentra-installment.dto';
import * as moment from 'moment';


@Injectable()
export class ZentraInstallmentService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraInstallmentDto: CreateZentraInstallmentDto) {
    return this.prisma.zentraInstallment.create({
      data: createZentraInstallmentDto,
    });
  }

  async findAll() {
    return this.prisma.zentraInstallment.findMany({
      where: { deletedAt: null },
      orderBy: { letra: 'asc' },
      include: {
        installmentStatus: true,
        scheduledIncomeDocument: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraInstallment.findUnique({
      where: { id },
      include: {
        installmentStatus: true,
        scheduledIncomeDocument: true,
      },
    });
  }

  async update(id: string, updateZentraInstallmentDto: UpdateZentraInstallmentDto) {
    return this.prisma.zentraInstallment.update({
      where: { id },
      data: updateZentraInstallmentDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraInstallment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraInstallment.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findAllByScheduled(scheduledIncomeDocumentId: string) {
    const installments = await this.prisma.zentraInstallment.findMany({
      where: {
        scheduledIncomeDocumentId,
        deletedAt: null,
      },
      orderBy: { letra: 'asc' },
      include: {
        installmentStatus: {
          select: { id: true, name: true },
        },
      },
    });

    return installments.map(i => ({
      id: i.id,
      letra: i.letra,
      capital: i.capital,
      interest: i.interest,
      totalAmount: i.totalAmount,
      extra: i.extra,
      dueDate: moment(i.dueDate).format('DD/MM/YYYY'),
      installmentStatusId: i.installmentStatus.id,
      installmentStatusName: i.installmentStatus.name,
    }));
  }


}