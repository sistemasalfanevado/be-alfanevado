import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraCompanyDto } from './dto/create-zentra-company.dto';
import { UpdateZentraCompanyDto } from './dto/update-zentra-company.dto';

@Injectable()
export class ZentraCompanyService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraCompanyDto: CreateZentraCompanyDto) {
    return this.prisma.zentraCompany.create({
      data: createZentraCompanyDto,
    });
  }

  async findAll() {
    return this.prisma.zentraCompany.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraCompany.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraCompanyDto: UpdateZentraCompanyDto) {
    return this.prisma.zentraCompany.update({
      where: { id },
      data: updateZentraCompanyDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraCompany.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraCompany.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}