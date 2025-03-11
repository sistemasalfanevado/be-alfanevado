import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateFooterLinkDto } from './dto/create-footer-link.dto';
import { UpdateFooterLinkDto } from './dto/update-footer-link.dto';

@Injectable()
export class FooterLinkService {
  constructor(private prisma: PrismaService) {}

  async create(createFooterLinkDto: CreateFooterLinkDto) {
    return this.prisma.landingFooterLink.create({
      data: createFooterLinkDto,
    });
  }

  async findAll() {
    return this.prisma.landingFooterLink.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.landingFooterLink.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateFooterLinkDto: UpdateFooterLinkDto) {
    return this.prisma.landingFooterLink.update({
      where: { id },
      data: updateFooterLinkDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingFooterLink.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.landingFooterLink.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}
