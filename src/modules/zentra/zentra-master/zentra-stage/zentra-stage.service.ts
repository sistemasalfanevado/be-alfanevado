import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraStageDto } from './dto/create-zentra-stage.dto';
import { UpdateZentraStageDto } from './dto/update-zentra-stage.dto';

@Injectable()
export class ZentraStageService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraStageDto: CreateZentraStageDto) {
    return this.prisma.zentraStage.create({
      data: createZentraStageDto,
    });
  }

  async findAll() {
    const stages = await this.prisma.zentraStage.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        _count: {
          select: { subStages: true },
        },
      },
    });

    return stages.map(stage => ({
      id: stage.id,
      name: stage.name,
      subTaskCount: stage._count.subStages,
    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraStage.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraStageDto: UpdateZentraStageDto) {
    return this.prisma.zentraStage.update({
      where: { id },
      data: updateZentraStageDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraStage.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraStage.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}