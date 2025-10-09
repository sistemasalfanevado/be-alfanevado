import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBankAccountHierarchyDto } from './dto/create-zentra-bank-account-hierarchy.dto';
import { UpdateZentraBankAccountHierarchyDto } from './dto/update-zentra-bank-account-hierarchy.dto';

@Injectable()
export class ZentraBankAccountHierarchyService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraBankAccountHierarchyDto) {
    await this.prisma.zentraBankAccountHierarchy.create({
      data: createDto,
    });
    return { message: 'Jerarquía de cuenta bancaria creada correctamente' };
  }

  async findAll() {
    return this.prisma.zentraBankAccountHierarchy.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    });
  }

  // 🟢 Buscar una jerarquía específica
  async findOne(id: string) {
    return this.prisma.zentraBankAccountHierarchy.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateDto: UpdateZentraBankAccountHierarchyDto) {
    await this.prisma.zentraBankAccountHierarchy.update({
      where: { id },
      data: updateDto,
    });

    return { message: 'Jerarquía de cuenta bancaria actualizada correctamente' };
  }

  async remove(id: string) {
    await this.prisma.zentraBankAccountHierarchy.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Jerarquía de cuenta bancaria eliminada correctamente' };
  }

  async restore(id: string) {
    await this.prisma.zentraBankAccountHierarchy.update({
      where: { id },
      data: { deletedAt: null },
    });

    return { message: 'Jerarquía de cuenta bancaria restaurada correctamente' };
  }
}
