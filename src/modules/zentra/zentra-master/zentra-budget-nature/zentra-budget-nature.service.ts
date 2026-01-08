import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraBudgetNatureDto } from './dto/create-zentra-budget-nature.dto';
import { UpdateZentraBudgetNatureDto } from './dto/update-zentra-budget-nature.dto';
import { VISIBIILITY } from 'src/shared/constants/app.constants';


@Injectable()
export class ZentraBudgetNatureService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraBudgetNatureDto) {

    const { visibilityId, ...data } = createDto;

    return this.prisma.zentraBudgetNature.create({
      data: {
        ...data,
        visibility: { connect: { id: visibilityId } },
      },
    });

  }


  async findAll() {
    const results = await this.prisma.zentraBudgetNature.findMany({
      where: { deletedAt: null, visibilityId: VISIBIILITY.VISIBLE },
      include: {
        visibility: true,
      },
      orderBy: [
        { name: 'asc' },
      ]

    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,

      visibilityId: item.visibility?.id,
      visibilityName: item.visibility?.name,

      idFirebase: item.idFirebase,

    }));

  }

  async findAllComplete() {
    const results = await this.prisma.zentraBudgetNature.findMany({
      where: { deletedAt: null },
      include: {
        visibility: true,
      },
      orderBy: [
        { name: 'asc' },
      ]

    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,

      visibilityId: item.visibility?.id,
      visibilityName: item.visibility?.name,

      idFirebase: item.idFirebase,

    }));
  }


  async findOne(id: string) {
    return this.prisma.zentraBudgetNature.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateDto: UpdateZentraBudgetNatureDto) {
    
    const { visibilityId, ...data } = updateDto;
    const updateData: any = { ...data };

    if (visibilityId) {
      updateData.visibility = { connect: { id: visibilityId } };
    }

    return this.prisma.zentraBudgetNature.update({
      where: { id },
      data: updateData,
    });

  }

  async remove(id: string) {
    return this.prisma.zentraBudgetNature.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraBudgetNature.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}