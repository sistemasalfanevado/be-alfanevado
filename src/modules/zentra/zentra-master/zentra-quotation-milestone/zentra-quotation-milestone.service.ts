import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraQuotationMilestoneDto } from './dto/create-zentra-quotation-milestone.dto';
import { UpdateZentraQuotationMilestoneDto } from './dto/update-zentra-quotation-milestone.dto';

@Injectable()
export class ZentraQuotationMilestoneService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraQuotationMilestoneDto) {
    return this.prisma.zentraQuotationMilestone.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.zentraQuotationMilestone.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        dueDate: 'asc',
      },
    });
  }

  async findByQuotation(quotationId: string) {
    return this.prisma.zentraQuotationMilestone.findMany({
      where: { 
        quotationId, 
        deletedAt: null 
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  async findOne(id: string) {
    const milestone = await this.prisma.zentraQuotationMilestone.findUnique({
      where: { id },
    });

    if (!milestone || milestone.deletedAt) {
      throw new NotFoundException(`Hito con ID ${id} no encontrado`);
    }

    return milestone;
  }

  async update(id: string, updateDto: UpdateZentraQuotationMilestoneDto) {
    return this.prisma.zentraQuotationMilestone.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraQuotationMilestone.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraQuotationMilestone.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}