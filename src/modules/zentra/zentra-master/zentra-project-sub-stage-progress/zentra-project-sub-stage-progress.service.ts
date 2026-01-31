import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraProjectSubStageProgressDto } from './dto/create-zentra-project-sub-stage-progress.dto';
import { UpdateZentraProjectSubStageProgressDto } from './dto/update-zentra-project-sub-stage-progress.dto';
import { Prisma } from '@prisma/client';
import * as moment from 'moment';

@Injectable()
export class ZentraProjectSubStageProgressService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateZentraProjectSubStageProgressDto) {
    return this.prisma.zentraProjectSubStageProgress.create({
      data: {
        responsible: dto.responsible,
        description: dto.description,
        finishDate: dto.finishDate ? new Date(dto.finishDate) : null,
        investmentAmount: new Prisma.Decimal(dto.investmentAmount || 0),
        projectSubStage: { connect: { id: dto.projectSubStageId } },
        percentage: { connect: { id: dto.percentageId } },
      },
      include: {
        percentage: true,
        projectSubStage: {
          include: {
            subStage: true
          }
        }
      }
    });
  }

  async findAll() {
    return this.prisma.zentraProjectSubStageProgress.findMany({
      where: { deletedAt: null },
      include: {
        percentage: true,
        projectSubStage: {
          include: {
            project: true,
            subStage: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.zentraProjectSubStageProgress.findFirst({
      where: { id, deletedAt: null },
      include: {
        percentage: true,
        projectSubStage: true
      }
    });

    if (!item) {
      throw new NotFoundException(`El registro de progreso con ID ${id} no existe`);
    }

    return item;
  }

  async update(id: string, dto: UpdateZentraProjectSubStageProgressDto) {
    await this.findOne(id);

    return this.prisma.zentraProjectSubStageProgress.update({
      where: { id },
      data: {
        responsible: dto.responsible,
        description: dto.description,
        finishDate: dto.finishDate ? new Date(dto.finishDate) : undefined,
        investmentAmount: dto.investmentAmount ? new Prisma.Decimal(dto.investmentAmount) : undefined,
        ...(dto.percentageId && { percentage: { connect: { id: dto.percentageId } } }),
        ...(dto.projectSubStageId && { projectSubStage: { connect: { id: dto.projectSubStageId } } }),
      }
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.zentraProjectSubStageProgress.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraProjectSubStageProgress.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async findAllByProjectSubStage(projectSubStageId: string) {
    const results = await this.prisma.zentraProjectSubStageProgress.findMany({
      where: {
        projectSubStageId: projectSubStageId,
        deletedAt: null
      },
      include: {
        percentage: true,
        projectSubStage: {
          include: {
            subStage: true
          }
        }
      }
    });

    return results
      .map(item => ({
        id: item.id,
        projectSubStageId: item.projectSubStageId,
        percentageId: item.percentageId,
        responsible: item.responsible,
        description: item.description,
        finishDate: item.finishDate ? moment(item.finishDate).format('DD/MM/YYYY') : '---',
        investmentAmount: item.investmentAmount,
        
        percentageAmount: item.percentage?.amount ?? 0,
        subStageName: item.projectSubStage?.subStage?.name,
      }))
      .sort((a, b) => Number(a.percentageAmount) - Number(b.percentageAmount));
  }

  

}