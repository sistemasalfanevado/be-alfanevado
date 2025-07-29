import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPageDto } from './dto/create-zentra-page.dto';
import { UpdateZentraPageDto } from './dto/update-zentra-page.dto';

@Injectable()
export class ZentraPageService {
  constructor(private prisma: PrismaService) { }

  async create(createZentraPageDto: CreateZentraPageDto) {
    return this.prisma.zentraPage.create({
      data: {
        name: createZentraPageDto.name,
        description: createZentraPageDto.description,
        route: createZentraPageDto.route,
        pageGroup: {
          connect: { id: createZentraPageDto.pageGroupId },
        },
      },
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraPage.findMany({
      where: { deletedAt: null },
      include: {
        pageGroup: true,
      }
    });

    return results.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,

      pageGroupId: item.pageGroup.id,
      pageGroupName: item.pageGroup.name,

    }));
  }


  async findOne(id: string) {
    return this.prisma.zentraPage.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateZentraPageDto: UpdateZentraPageDto) {
    return this.prisma.zentraPage.update({
      where: { id },
      data: updateZentraPageDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraPage.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraPage.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}