import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraScheduledIncomeDocumentDto } from './dto/create-zentra-scheduled-income-document.dto';
import { UpdateZentraScheduledIncomeDocumentDto } from './dto/update-zentra-scheduled-income-document.dto';

@Injectable()
export class ZentraScheduledIncomeDocumentService {
  constructor(private prisma: PrismaService) { }
  
  async create(createDto: CreateZentraScheduledIncomeDocumentDto) {
    return this.prisma.zentraScheduledIncomeDocument.create({
      data: createDto,
    });
  }

  async findAll() {
    const results = await this.prisma.zentraScheduledIncomeDocument.findMany({
      where: { deletedAt: null },
      include: {
        document: { select: { id: true, code: true } },
        broker: { select: { id: true, name: true } },
        saleType: { select: { id: true, name: true } },
        lot: { select: { id: true, name: true, code: true } },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return results.map((doc) => ({
      id: doc.id,
      documentId: doc.document?.id,
      documentCode: doc.document?.code,

      brokerId: doc.broker?.id,
      brokerName: doc.broker?.name,

      saleTypeId: doc.saleType?.id,
      saleTypeName: doc.saleType?.name,

      lotId: doc.lot?.id,
      lotName: doc.lot?.name,
      lotCode: doc.lot?.code,

      lotComplete: doc.lot?.name + ' ' + doc.saleType?.name

    }));
  }
  
  async findOne(id: string) {
    return this.prisma.zentraScheduledIncomeDocument.findUnique({
      where: { id },
      include: {
        document: true,
        broker: true,
        saleType: true,
        lot: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraScheduledIncomeDocumentDto) {
    return this.prisma.zentraScheduledIncomeDocument.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraScheduledIncomeDocument.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraScheduledIncomeDocument.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}