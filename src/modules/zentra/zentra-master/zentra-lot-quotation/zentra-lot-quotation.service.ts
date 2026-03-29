import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraLotQuotationDto } from './dto/create-zentra-lot-quotation.dto';
import { UpdateZentraLotQuotationDto } from './dto/update-zentra-lot-quotation.dto';

@Injectable()
export class ZentraLotQuotationService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraLotQuotationDto) {
    return this.prisma.zentraLotQuotation.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.zentraLotQuotation.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        lot: true,
        paymentPlan: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const quotation = await this.prisma.zentraLotQuotation.findUnique({
      where: { id },
      include: {
        lot: true,
        paymentPlan: true,
        milestones: {
          where: { deletedAt: null },
          orderBy: { dueDate: 'asc' }
        }
      },
    });

    if (!quotation || quotation.deletedAt) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada`);
    }

    return quotation;
  }

  async update(id: string, updateDto: UpdateZentraLotQuotationDto) {
    await this.findOne(id);

    return this.prisma.zentraLotQuotation.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraLotQuotation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraLotQuotation.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findByLot(lotId: string) {
    // Primero, podrías verificar si el lote existe (opcional)
    const lotExists = await this.prisma.landingLot.findUnique({
      where: { id: lotId },
    });

    if (!lotExists) {
      throw new NotFoundException(`El lote con ID ${lotId} no existe`);
    }

    return this.prisma.zentraLotQuotation.findMany({
      where: {
        lotId: lotId,
        deletedAt: null,
      },
      include: {
        paymentPlan: true,
        milestones: {
          where: { deletedAt: null },
          orderBy: { dueDate: 'asc' },
        },
      },
      orderBy: {
        createdAt: 'desc', // Las más recientes primero
      },
    });
  }

}