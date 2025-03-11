import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Importa PrismaService
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {} // Inyecta PrismaService

  async create(createContentDto: CreateContentDto) {
    return this.prisma.landingContent.create({
      data: {
        title: createContentDto.title,
        subtitle: createContentDto.subtitle,
        page: {
          connect: { id: createContentDto.pageId }, // Conecta con el page
        },
      },
    });
  }

  async findAll() {
    return this.prisma.landingContent.findMany({
      where: { deletedAt: null }, // Solo registros no eliminados
    });
  }

  async findAllByPage(pageId: string) {
    return this.prisma.landingContent.findMany({
      where: { deletedAt: null, pageId }, // Solo registros no eliminados
    });
  }

  async findOne(id: string) {
    return this.prisma.landingContent.findUnique({
      where: { id, deletedAt: null }, // Solo si no está eliminado
    });
  }

  async update(id: string, updateContentDto: UpdateContentDto) {
    return this.prisma.landingContent.update({
      where: { id },
      data: updateContentDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingContent.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.landingContent.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }
}