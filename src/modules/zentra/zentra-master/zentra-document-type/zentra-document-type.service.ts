import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraDocumentTypeDto } from './dto/create-zentra-document-type.dto';
import { UpdateZentraDocumentTypeDto } from './dto/update-zentra-document-type.dto';

@Injectable()
export class ZentraDocumentTypeService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraDocumentTypeDto: CreateZentraDocumentTypeDto) {
    return this.prisma.zentraDocumentType.create({
      data: createZentraDocumentTypeDto,
    });
  }

  async findAll() {
    return this.prisma.zentraDocumentType.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraDocumentType.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraDocumentTypeDto: UpdateZentraDocumentTypeDto) {
    return this.prisma.zentraDocumentType.update({
      where: { id },
      data: updateZentraDocumentTypeDto,
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
}