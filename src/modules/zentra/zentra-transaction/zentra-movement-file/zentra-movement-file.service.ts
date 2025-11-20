import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraMovementFileDto } from './dto/create-zentra-movement-file.dto';
import { UpdateZentraMovementFileDto } from './dto/update-zentra-movement-file.dto';
import * as moment from 'moment';

@Injectable()
export class ZentraMovementFileService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraMovementFileDto: CreateZentraMovementFileDto) {
    return this.prisma.zentraMovementFile.create({
      data: createZentraMovementFileDto,
    });
  }

  async findAll() {
    return this.prisma.zentraMovementFile.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraMovementFile.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraMovementFileDto: UpdateZentraMovementFileDto) {
    return this.prisma.zentraMovementFile.update({
      where: { id },
      data: updateZentraMovementFileDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraMovementFile.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraMovementFile.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findByMovementId(movementId: string) {
    const results = await this.prisma.zentraMovementFile.findMany({
      where: {
        movementId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });


    return results.map((item) => ({
      id: item.id,
      fileName: item.fileName,
      fileUrl: item.fileUrl,
      movementId: item.movementId,
      createdAtClean: moment(item.createdAt).utcOffset(-5).format('DD/MM/YYYY'),
      createdAt: item.createdAt
    }));

  }


}