import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraFinancialImpactDto } from './dto/create-zentra-financial-impact.dto';
import { UpdateZentraFinancialImpactDto } from './dto/update-zentra-financial-impact.dto';

@Injectable()
export class ZentraFinancialImpactService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraFinancialImpactDto) {
    return this.prisma.zentraFinancialImpact.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.zentraFinancialImpact.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraFinancialImpact.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDto: UpdateZentraFinancialImpactDto) {
    return this.prisma.zentraFinancialImpact.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraFinancialImpact.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraFinancialImpact.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}