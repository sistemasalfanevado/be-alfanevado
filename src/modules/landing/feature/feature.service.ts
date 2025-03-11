import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Importa PrismaService
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeatureService {
  constructor(private prisma: PrismaService) {} // Inyecta PrismaService

  async create(createFeatureDto: CreateFeatureDto) {
    return this.prisma.landingFeature.create({
      data: {
        title: createFeatureDto.title,
        detail: createFeatureDto.detail,
        icon: createFeatureDto.icon,
        page: {
          connect: { id: createFeatureDto.pageId }, // Conecta con el page
        },
      },
    });
  }

  async findAll() {
    return this.prisma.landingFeature.findMany({
      where: { deletedAt: null }, // Solo registros no eliminados
    });
  }

  async findAllByPage(pageId: string) {
    return this.prisma.landingFeature.findMany({
      where: { deletedAt: null, pageId }, // Solo registros no eliminados
    });
  }

  async findOne(id: string) {
    return this.prisma.landingFeature.findUnique({
      where: { id, deletedAt: null }, // Solo si no está eliminado
    });
  }

  async update(id: string, updateFeatureDto: UpdateFeatureDto) {
    return this.prisma.landingFeature.update({
      where: { id },
      data: updateFeatureDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingFeature.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.landingFeature.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }
}