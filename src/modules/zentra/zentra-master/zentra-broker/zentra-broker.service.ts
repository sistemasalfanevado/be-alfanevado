import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBrokerDto } from './dto/create-zentra-broker.dto';
import { UpdateZentraBrokerDto } from './dto/update-zentra-broker.dto';

@Injectable()
export class ZentraBrokerService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraBrokerDto: CreateZentraBrokerDto) {
    return this.prisma.zentraBroker.create({
      data: createZentraBrokerDto,
    });
  }

  async findAll() {
    return this.prisma.zentraBroker.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraBroker.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateZentraBrokerDto: UpdateZentraBrokerDto) {
    return this.prisma.zentraBroker.update({
      where: { id },
      data: updateZentraBrokerDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraBroker.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBroker.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}