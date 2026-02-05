import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPaymentCategoryDto } from './dto/create-zentra-payment-category.dto';
import { UpdateZentraPaymentCategoryDto } from './dto/update-zentra-payment-category.dto';

@Injectable()
export class ZentraPaymentCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraPaymentCategoryDto: CreateZentraPaymentCategoryDto) {
    return this.prisma.zentraPaymentCategory.create({
      data: createZentraPaymentCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.zentraPaymentCategory.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraPaymentCategory.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraPaymentCategoryDto: UpdateZentraPaymentCategoryDto) {
    return this.prisma.zentraPaymentCategory.update({
      where: { id },
      data: updateZentraPaymentCategoryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraPaymentCategory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraPaymentCategory.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}