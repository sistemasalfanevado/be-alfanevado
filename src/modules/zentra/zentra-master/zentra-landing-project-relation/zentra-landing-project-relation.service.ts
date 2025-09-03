import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraLandingProjectRelationDto } from './dto/create-zentra-landing-project-relation.dto';
import { UpdateZentraLandingProjectRelationDto } from './dto/update-zentra-landing-project-relation.dto';

@Injectable()
export class ZentraLandingProjectRelationService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraLandingProjectRelationDto) {
    return this.prisma.zentraLandingProjectRelation.create({
      data: createDto,
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraLandingProjectRelation.findMany({
      where: { deletedAt: null },
      include: {
        zentraProject: {
          select: { name: true },
        },
        landingProject: {
          select: { title: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return results.map((item) => ({
      id: item.id,
      zentraProjectName: item.zentraProject.name,
      landingProjectTitle: item.landingProject.title,
    }));
  }


  async findOne(id: string) {
    return this.prisma.zentraLandingProjectRelation.findUnique({
      where: { id },
      include: {
        zentraProject: true,
        landingProject: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraLandingProjectRelationDto) {
    return this.prisma.zentraLandingProjectRelation.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraLandingProjectRelation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraLandingProjectRelation.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}