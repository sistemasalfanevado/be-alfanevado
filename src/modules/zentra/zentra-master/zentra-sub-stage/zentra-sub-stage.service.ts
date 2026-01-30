import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraSubStageDto } from './dto/create-zentra-sub-stage.dto';
import { UpdateZentraSubStageDto } from './dto/update-zentra-sub-stage.dto';

@Injectable()
export class ZentraSubStageService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraSubStageDto) {
    return this.prisma.zentraSubStage.create({
      data: createDto,
    });
  }

  async findAll() {
    const data = await this.prisma.zentraSubStage.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        stage: true
      },
      orderBy: {
        stage: {
          name: 'asc'
        }
      }
    });

    return data.map(item => ({
      id: item.id,
      name: item.name,

      stageId: item.stageId,
      stageName: item.stage.name,

      completeName: item.stage.name + ' - ' + item.name,

    }));
  }

  async findOne(id: string) {
    return this.prisma.zentraSubStage.findUnique({
      where: { id, deletedAt: null },
    });
  }


  async update(id: string, updateDto: UpdateZentraSubStageDto) {
    return this.prisma.zentraSubStage.update({
      where: { id },
      data: updateDto,
    });
  }


  async remove(id: string) {
    return this.prisma.zentraSubStage.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }


  async restore(id: string) {
    return this.prisma.zentraSubStage.update({
      where: { id },
      data: { deletedAt: null },
    });
  }


  async findByStage(stageId: string) {
    return this.prisma.zentraSubStage.findMany({
      where: {
        stageId,
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }


  async findAllWithStage() {

    const data = await this.prisma.zentraSubStage.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        stage: {
          select: {
            name: true,
          }
        }
      },
      orderBy: [
        { name: 'asc' }
      ]
    });

    return data.map(item => ({
      id: item.id,
      name: item.name,

      stageId: item.stageId,
      stageName: item.stage.name,

      completeName: item.stage.name + ' - ' + item.name,

      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }



}