import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBankAccountTypeDto } from './dto/create-zentra-bank-account-type.dto';
import { UpdateZentraBankAccountTypeDto } from './dto/update-zentra-bank-account-type.dto';

@Injectable()
export class ZentraBankAccountTypeService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraBankAccountTypeDto) {
    await this.prisma.zentraBankAccountType.create({
      data: createDto,
    });
    return { message: 'Tipo de cuenta bancaria creado correctamente' };
  }

  async findAll() {
    return this.prisma.zentraBankAccountType.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraBankAccountType.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateDto: UpdateZentraBankAccountTypeDto) {
    await this.prisma.zentraBankAccountType.update({
      where: { id },
      data: updateDto,
    });

    return { message: 'Tipo de cuenta bancaria actualizado correctamente' };
  }

  // 🟠 Soft delete (marcar como eliminado)
  async remove(id: string) {
    await this.prisma.zentraBankAccountType.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Tipo de cuenta bancaria eliminado correctamente' };
  }

  async restore(id: string) {
    await this.prisma.zentraBankAccountType.update({
      where: { id },
      data: { deletedAt: null },
    });

    return { message: 'Tipo de cuenta bancaria restaurado correctamente' };
  }
}