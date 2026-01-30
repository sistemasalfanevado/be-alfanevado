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

  // Este es el método más importante para tu lógica:
  async findAllByProject(projectId: string) {
    const results = await this.prisma.zentraProjectSubStage.findMany({
      where: {
        projectId,
        deletedAt: null,
      },
      include: {
        subStage: {
          include: {
            stage: true // Traemos también la etapa superior si es necesario
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

    // Mapeamos para que el Frontend reciba una estructura limpia
    return results.map(item => ({
      id: item.id,
      subStageId: item.subStageId,
      subStageName: item.subStage.name,
      stageName: item.subStage.stage.name,
      completeName: item.subStage.stage.name + ' - ' + item.subStage.name
    }));
  }
}