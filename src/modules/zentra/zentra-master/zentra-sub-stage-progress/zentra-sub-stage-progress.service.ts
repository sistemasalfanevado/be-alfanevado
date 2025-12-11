import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CreateZentraSubStageProgressDto } from './dto/create-zentra-sub-stage-progress.dto';
import { UpdateZentraSubStageProgressDto } from './dto/update-zentra-sub-stage-progress.dto';

import * as moment from 'moment';

@Injectable()
export class ZentraSubStageProgressService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateZentraSubStageProgressDto) {
    return this.prisma.zentraSubStageProgress.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.zentraSubStageProgress.findMany({
      where: { deletedAt: null },
      orderBy: {
        progressPercentage: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.zentraSubStageProgress.findUnique({
      where: { id },
    });

    if (!item || item.deletedAt) {
      throw new NotFoundException(`SubStageProgress ${id} no existe`);
    }

    return item;
  }

  async update(id: string, dto: UpdateZentraSubStageProgressDto) {
    await this.findOne(id); // validates existence

    return this.prisma.zentraSubStageProgress.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.zentraSubStageProgress.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraSubStageProgress.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findBySubStage(subStageId: string) {
    return this.prisma.zentraSubStageProgress.findMany({
      where: {
        subStageId,
        deletedAt: null,
      },
      orderBy: { progressPercentage: 'asc' },
    });
  }

  async findByProject(projectId: string) {
    const list = await this.prisma.zentraSubStageProgress.findMany({
      where: { deletedAt: null, projectId, },
      include: {
        subStage: {
          select: {
            name: true,
            stage: true
          },
        },
        project: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return list.map(item => ({
      id: item.id,

      responsible: item.responsible,
      status: item.status,
      finishDate: moment(item.finishDate).format('DD/MM/YYYY'),

      progressPercentage: item.progressPercentage,
      investmentAmount: item.investmentAmount,

      subStageId: item.subStageId,
      subStageName: item.subStage.name,

      stageId: item.subStage.stage.id,
      stageName: item.subStage.stage.name,
      
      projectId: item.projectId,
      projectName: item.project.name,

      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }



}