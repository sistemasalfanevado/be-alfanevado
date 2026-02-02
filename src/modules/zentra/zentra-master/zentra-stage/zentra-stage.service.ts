import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraStageDto } from './dto/create-zentra-stage.dto';
import { UpdateZentraStageDto } from './dto/update-zentra-stage.dto';
import * as moment from 'moment';

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
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        order: true,
        _count: {
          select: { subStages: true },
        },
      },
    });

    return stages.map(stage => ({
      id: stage.id,
      name: stage.name,
      order: stage.order,
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

  async getSubStagesProgress(stageId: string, projectId: string) {
    const subStages = await this.prisma.zentraSubStage.findMany({
      where: {
        stageId: stageId,
        deletedAt: null,
        subStageAssignments: {
          some: { projectId: projectId, deletedAt: null },
        },
      },
      select: {
        id: true,
        name: true,
        subStageAssignments: {
          where: { projectId: projectId, deletedAt: null },
          select: {
            progress: {
              where: { deletedAt: null },
              orderBy: { percentage: { amount: 'asc' } },
              select: {
                id: true,
                responsible: true,
                description: true,
                finishDate: true,
                investmentAmount: true,
                percentage: {
                  select: { amount: true }
                }
              }
            }
          }
        }
      },
    });

    return subStages.map(ss => {
      const assignment = ss.subStageAssignments[0];
      const progressHistory = assignment?.progress || [];

      const currentPercentage = progressHistory.length > 0
        ? progressHistory[progressHistory.length - 1].percentage.amount
        : "0";

      return {
        subStageId: ss.id,
        subStageName: ss.name,
        currentPercentage: currentPercentage,
        history: progressHistory.map(p => ({
          id: p.id,
          percentage: p.percentage.amount,
          responsible: p.responsible,
          description: p.description,
          date: moment(p.finishDate).format('DD/MM/YYYY'),
          investment: p.investmentAmount
        }))
      };
    });
  }



}