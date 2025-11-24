import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraDocumentOriginDto } from './dto/create-zentra-document-origin.dto';
import { UpdateZentraDocumentOriginDto } from './dto/update-zentra-document-origin.dto';

@Injectable()
export class ZentraDocumentOriginService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateZentraDocumentOriginDto) {
    return this.prisma.zentraDocumentOrigin.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.zentraDocumentOrigin.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraDocumentOrigin.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDto: UpdateZentraDocumentOriginDto) {
    return this.prisma.zentraDocumentOrigin.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraDocumentOrigin.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraDocumentOrigin.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}