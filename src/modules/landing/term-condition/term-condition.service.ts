import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

import { CreateTermConditionDto } from './dto/create-term-condition.dto';
import { UpdateTermConditionDto } from './dto/update-term-condition.dto';

@Injectable()
export class TermConditionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTermConditionDto) {
    return this.prisma.landingTermCondition.create({ data });
  }

  async findAll() {
    return this.prisma.landingTermCondition.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const term = await this.prisma.landingTermCondition.findUnique({
      where: { id, deletedAt: null },
    });
    if (!term) throw new NotFoundException('Término y condición no encontrado');
    return term;
  }

  async update(id: string, data: UpdateTermConditionDto) {
    return this.prisma.landingTermCondition.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.landingTermCondition.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
  

  async restore(id: string) {
    return this.prisma.landingTermCondition.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  
}