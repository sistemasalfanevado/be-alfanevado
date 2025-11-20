import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraDocumentFileDto } from './dto/create-zentra-document-file.dto';
import { UpdateZentraDocumentFileDto } from './dto/update-zentra-document-file.dto';
import * as moment from 'moment';

@Injectable()
export class ZentraDocumentFileService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraDocumentFileDto: CreateZentraDocumentFileDto) {
    return this.prisma.zentraDocumentFile.create({
      data: createZentraDocumentFileDto,
    });
  }

  async findAll() {
    return this.prisma.zentraDocumentFile.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraDocumentFile.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraDocumentFileDto: UpdateZentraDocumentFileDto) {
    return this.prisma.zentraDocumentFile.update({
      where: { id },
      data: updateZentraDocumentFileDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraDocumentFile.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraDocumentFile.update({
      where: { id },
      data: { deletedAt: null },
    });
  }


  async findByDocumentId(documentId: string) {
    
    const results = await this.prisma.zentraDocumentFile.findMany({
      where: {
        documentId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });


    return results.map((item) => ({
      id: item.id,
      fileName: item.fileName,
      fileUrl: item.fileUrl,
      documentId: item.documentId,
      createdAtClean: moment(item.createdAt).utcOffset(-5).format('DD/MM/YYYY'),
      createdAt: item.createdAt
    }));

  }
}