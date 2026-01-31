import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraProjectSubStageDto } from './dto/create-zentra-project-sub-stage.dto';
import { UpdateZentraProjectSubStageDto } from './dto/update-zentra-project-sub-stage.dto';

@Injectable()
export class ZentraProjectSubStageService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraProjectSubStageDto) {
    return this.prisma.zentraProjectSubStage.create({
      data: {
        projectId: createDto.projectId,
        subStageId: createDto.subStageId,
      },
      include: {
        project: true,
        subStage: true,
      },
    });
  }

  async findAll() {
    const results = await this.prisma.zentraProjectSubStage.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        subStage: {
          include: {
            stage: true
          }
        }
      },
      orderBy: {
        subStage: {
          stage: {
            name: 'asc' // Aquí entramos nivel por nivel: subStage -> stage -> name
          }
        }
      }
    });

    return results.map(item => ({
      id: item.id,
      subStageId: item.subStageId,
      subStageName: item.subStage.name,
      stageName: item.subStage.stage.name,
      completeName: item.subStage.stage.name + ' - ' + item.subStage.name

    }));
  }



  async findOne(id: string) {
    const record = await this.prisma.zentraProjectSubStage.findFirst({
      where: { id, deletedAt: null },
      include: { project: true, subStage: true }
    });

    if (!record) throw new NotFoundException('Asignación no encontrada');
    return record;
  }

  async update(id: string, updateDto: UpdateZentraProjectSubStageDto) {
    return this.prisma.zentraProjectSubStage.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraProjectSubStage.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async restore(id: string) {
    return this.prisma.zentraProjectSubStage.update({
      where: { id },
      data: { deletedAt: null }
    });
  }

  async findAllByProject(projectId: string) {
    const results = await this.prisma.zentraProjectSubStage.findMany({
      where: {
        projectId,
        deletedAt: null,
      },
      include: {
        subStage: {
          include: {
            stage: true
          }
        },
        progress: {
          where: { deletedAt: null },
          include: {
            percentage: true
          }
        }
      },
      orderBy: {
        subStage: {
          stage: {
            name: 'asc'
          }
        }
      }
    });

    return results.map(item => {
      const progressValues = item.progress.map(p => Number(p.percentage?.amount || 0));

      const maxProgress = progressValues.length > 0 ? Math.max(...progressValues) : 0;

      return {
        id: item.id,
        subStageId: item.subStageId,
        subStageName: item.subStage.name,
        stageId: item.subStage.stage.id,
        stageName: item.subStage.stage.name,
        completeName: `${item.subStage.stage.name} - ${item.subStage.name}`,
        progress: maxProgress
      };
    });
  }

}