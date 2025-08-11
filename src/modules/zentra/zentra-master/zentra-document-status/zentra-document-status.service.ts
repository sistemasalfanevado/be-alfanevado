import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraDocumentStatusDto } from './dto/create-zentra-document-status.dto';
import { UpdateZentraDocumentStatusDto } from './dto/update-zentra-document-status.dto';

@Injectable()
export class ZentraDocumentStatusService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraDocumentStatusDto: CreateZentraDocumentStatusDto) {
    return this.prisma.zentraDocumentStatus.create({
      data: createZentraDocumentStatusDto,
    });
  }

  async findAll() {
    return this.prisma.zentraDocumentStatus.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraDocumentStatus.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraDocumentStatusDto: UpdateZentraDocumentStatusDto) {
    return this.prisma.zentraDocumentStatus.update({
      where: { id },
      data: updateZentraDocumentStatusDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraDocumentStatus.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraDocumentStatus.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}