import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraLandingPageRelationDto } from './dto/create-zentra-landing-page-relation.dto';
import { UpdateZentraLandingPageRelationDto } from './dto/update-zentra-landing-page-relation.dto';

@Injectable()
export class ZentraLandingPageRelationService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateZentraLandingPageRelationDto) {
    return this.prisma.zentraLandingPageRelation.create({
      data: createDto,
    });
  }

  async findAll(): Promise<any[]> {
    const results = await this.prisma.zentraLandingPageRelation.findMany({
      where: { deletedAt: null },
      include: {
        zentraProject: {
          select: { name: true },
        },
        landingPage: {
          select: { title: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return results.map((item) => ({
      id: item.id,
      zentraProjectId: item.zentraProjectId,
      zentraProjectName: item.zentraProject.name,
      landingPageId: item.landingPageId,
      landingPageTitle: item.landingPage.title,
    }));
  }


  async findOne(id: string) {
    return this.prisma.zentraLandingPageRelation.findUnique({
      where: { id },
      include: {
        zentraProject: true,
        landingPage: true,
      },
    });
  }

  async update(id: string, updateDto: UpdateZentraLandingPageRelationDto) {
    return this.prisma.zentraLandingPageRelation.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prisma.zentraLandingPageRelation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.zentraLandingPageRelation.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}