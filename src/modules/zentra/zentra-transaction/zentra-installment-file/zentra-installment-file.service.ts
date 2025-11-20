import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraInstallmentFileDto } from './dto/create-zentra-installment-file.dto';
import { UpdateZentraInstallmentFileDto } from './dto/update-zentra-installment-file.dto';
import * as moment from 'moment';

@Injectable()
export class ZentraInstallmentFileService {
  constructor(private prisma: PrismaService) {}

  async create(createZentraInstallmentFileDto: CreateZentraInstallmentFileDto) {
    return this.prisma.zentraInstallmentFile.create({
      data: createZentraInstallmentFileDto,
    });
  }

  async findAll() {
    return this.prisma.zentraInstallmentFile.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraInstallmentFile.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraInstallmentFileDto: UpdateZentraInstallmentFileDto) {
    return this.prisma.zentraInstallmentFile.update({
      where: { id },
      data: updateZentraInstallmentFileDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraInstallmentFile.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraInstallmentFile.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findByInstallmentId(installmentId: string) {
    const results = await this.prisma.zentraInstallmentFile.findMany({
      where: {
        installmentId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    
    return results.map((item) => ({
      id: item.id,
      fileName: item.fileName,
      fileUrl: item.fileUrl,
      installmentId: item.installmentId,
      createdAtClean: moment(item.createdAt).utcOffset(-5).format('DD/MM/YYYY'),
      createdAt: item.createdAt
    }));


  }
}