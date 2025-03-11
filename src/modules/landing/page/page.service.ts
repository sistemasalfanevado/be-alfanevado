import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Importa PrismaService
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {} // Inyecta PrismaService

  async create(createPageDto: CreatePageDto) {
    return this.prisma.landingPage.create({
      data: createPageDto,
    });
  }

  async findAll() {
    return this.prisma.landingPage.findMany({
      where: { deletedAt: null },
      include: { heroBanners: true }
    });
  }

  async findOne(id: string) {
    return this.prisma.landingPage.findUnique({
      where: { id, deletedAt: null },
      include: { heroBanners: true }
    });
  }

  async findByRoute(route: string) {
    return this.prisma.landingPage.findUnique({
      where: { route }, // Ahora route es un campo único
      include: {
        heroBanners: {
          where: { deletedAt: null }, // Filtra hero-banners no eliminados
        },
      },
    });
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    return this.prisma.landingPage.update({
      where: { id },
      data: updatePageDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingPage.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.landingPage.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }
}