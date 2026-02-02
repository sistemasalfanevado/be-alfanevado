import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraProjectSubStageProgressFileDto } from './dto/create-zentra-project-sub-stage-progress-file.dto';
import { UpdateZentraProjectSubStageProgressFileDto } from './dto/update-zentra-project-sub-stage-progress-file.dto';
import * as moment from 'moment';

@Injectable()
export class ZentraProjectSubStageProgressFileService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraProjectSubStageProgressFileDto: CreateZentraProjectSubStageProgressFileDto) {
    return this.prisma.zentraProjectSubStageProgressFile.create({
      data: createZentraProjectSubStageProgressFileDto,
    });
  }

  async findAll() {
    return this.prisma.zentraProjectSubStageProgressFile.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.zentraProjectSubStageProgressFile.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraProjectSubStageProgressFileDto: UpdateZentraProjectSubStageProgressFileDto) {
    return this.prisma.zentraProjectSubStageProgressFile.update({
      where: { id },
      data: updateZentraProjectSubStageProgressFileDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraProjectSubStageProgressFile.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraProjectSubStageProgressFile.update({
      where: { id },
      data: { deletedAt: null },
    });
  }


  async findByCode(projectSubStageProgressId: string) {
    
    const results = await this.prisma.zentraProjectSubStageProgressFile.findMany({
      where: {
        projectSubStageProgressId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });


    return results.map((item) => ({
      id: item.id,
      fileName: item.fileName,
      fileUrl: item.fileUrl,
      projectSubStageProgressId: item.projectSubStageProgressId,
      createdAtClean: moment(item.createdAt).utcOffset(-5).format('DD/MM/YYYY'),
      createdAt: item.createdAt
    }));

  }
}