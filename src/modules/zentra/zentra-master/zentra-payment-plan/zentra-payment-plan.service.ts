import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPaymentPlanDto } from './dto/create-zentra-payment-plan.dto';
import { UpdateZentraPaymentPlanDto } from './dto/update-zentra-payment-plan.dto';

@Injectable()
export class ZentraPaymentPlanService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraPaymentPlanDto: CreateZentraPaymentPlanDto) {
    return this.prisma.zentraPaymentPlan.create({
      data: createZentraPaymentPlanDto,
    });
  }

  async findAll() {
    return this.prisma.zentraPaymentPlan.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraPaymentPlan.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraPaymentPlanDto: UpdateZentraPaymentPlanDto) {
    return this.prisma.zentraPaymentPlan.update({
      where: { id },
      data: updateZentraPaymentPlanDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraPaymentPlan.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraPaymentPlan.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}