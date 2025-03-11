import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Importa PrismaService
import { CreateLotStatusDto } from './dto/create-lot-status.dto';
import { UpdateLotStatusDto } from './dto/update-lot-status.dto';

@Injectable()
export class LotStatusService {
  constructor(private prisma: PrismaService) {} // Inyecta PrismaService

  async create(createLotStatusDto: CreateLotStatusDto) {
    return this.prisma.landingLotStatus.create({
      data: createLotStatusDto,
    });
  }

  async findAll() {
    return this.prisma.landingLotStatus.findMany({
      where: { deletedAt: null }, // Solo registros no eliminados
    });
  }

  async findOne(id: string) {
    return this.prisma.landingLotStatus.findUnique({
      where: { id, deletedAt: null }, // Solo si no está eliminado
    });
  }

  async update(id: string, updateLotStatusDto: UpdateLotStatusDto) {
    return this.prisma.landingLotStatus.update({
      where: { id },
      data: updateLotStatusDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingLotStatus.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.landingLotStatus.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }
}