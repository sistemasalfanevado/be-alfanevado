import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHeroBannerDto } from './dto/create-hero-banner.dto';
import { UpdateHeroBannerDto } from './dto/update-hero-banner.dto';

@Injectable()
export class HeroBannerService {
  constructor(private prisma: PrismaService) {}

  async create(createHeroBannerDto: CreateHeroBannerDto) {
    return this.prisma.landingHeroBanner.create({
      data: {
        title: createHeroBannerDto.title,
        subtitle: createHeroBannerDto.subtitle,
        linkImage: createHeroBannerDto.linkImage,
        nameImage: createHeroBannerDto.nameImage,
        page: {
          connect: { id: createHeroBannerDto.pageId },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.landingHeroBanner.findMany({
      where: { deletedAt: null },
    });
  }

  async findAllByPage(pageId: string) {
    return this.prisma.landingHeroBanner.findMany({
      where: { deletedAt: null, pageId }, // Solo registros no eliminados
    });
  }

  async findOne(id: string) {
    return this.prisma.landingHeroBanner.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateHeroBannerDto: UpdateHeroBannerDto) {
    return this.prisma.landingHeroBanner.update({
      where: { id },
      data: updateHeroBannerDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingHeroBanner.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.landingHeroBanner.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }
}