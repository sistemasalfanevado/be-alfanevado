import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraDocumentTypeDto } from './dto/create-zentra-document-type.dto';
import { UpdateZentraDocumentTypeDto } from './dto/update-zentra-document-type.dto';

@Injectable()
export class ZentraDocumentTypeService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraDocumentTypeDto) {
    return this.prisma.zentraDocumentType.create({
      data: {
        name: createDto.name,
        visibilityId: createDto.visibilityId ?? null,
      },
    });
  }

  async findAll() {
    const results = await this.prisma.zentraDocumentType.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
      include: {
        visibility: true, // 👉 para traer la relación
      },
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,
      visibilityName: item.visibility?.name,
      visibilityId: item.visibility?.id,
    }));

  }

  async findOne(id: string) {
    const found = await this.prisma.zentraDocumentType.findUnique({
      where: { id },
      include: { visibility: true },
    });

    if (!found || found.deletedAt) {
      throw new NotFoundException(`DocumentType ${id} no existe`);
    }

    return found;
  }

  async update(id: string, updateDto: UpdateZentraDocumentTypeDto) {
    return this.prisma.zentraDocumentType.update({
      where: { id },
      data: {
        ...updateDto,
        visibilityId: updateDto.visibilityId ?? undefined, // 👉 mantiene relación
      },
      include: { visibility: true },
    });
  }

  async remove(id: string) {
    return this.prisma.zentraDocumentType.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraDocumentType.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findAllByVisibility(visibilityId: string) {
    const results = await this.prisma.zentraDocumentType.findMany({
      where: { deletedAt: null, visibilityId },
      include: { visibility: true },
      orderBy: {
        name: 'asc',
      },
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,
      visibilityName: item.visibility?.name,
      visibilityId: item.visibility?.id,
    }));

  }

}