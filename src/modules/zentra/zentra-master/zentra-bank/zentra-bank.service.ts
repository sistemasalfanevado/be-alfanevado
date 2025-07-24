import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBankDto } from './dto/create-zentra-bank.dto';
import { UpdateZentraBankDto } from './dto/update-zentra-bank.dto';

@Injectable()
export class ZentraBankService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraBankDto: CreateZentraBankDto) {
    return this.prisma.zentraBank.create({
      data: createZentraBankDto,
    });
  }

  async findAll() {
    return this.prisma.zentraBank.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraBank.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraBankDto: UpdateZentraBankDto) {
    return this.prisma.zentraBank.update({
      where: { id },
      data: updateZentraBankDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBank.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBank.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}