import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraCurrencyDto } from './dto/create-zentra-currency.dto';
import { UpdateZentraCurrencyDto } from './dto/update-zentra-currency.dto';

@Injectable()
export class ZentraCurrencyService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraCurrencyDto: CreateZentraCurrencyDto) {
    return this.prisma.zentraCurrency.create({
      data: createZentraCurrencyDto,
    });
  }

  async findAll() {
    return this.prisma.zentraCurrency.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraCurrency.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraCurrencyDto: UpdateZentraCurrencyDto) {
    return this.prisma.zentraCurrency.update({
      where: { id },
      data: updateZentraCurrencyDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraCurrency.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraCurrency.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}