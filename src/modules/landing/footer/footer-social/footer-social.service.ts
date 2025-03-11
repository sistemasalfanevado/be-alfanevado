import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../prisma/prisma.service'; 

import { CreateFooterSocialDto } from './dto/create-footer-social.dto';
import { UpdateFooterSocialDto } from './dto/update-footer-social.dto';

@Injectable()
export class FooterSocialService {
  constructor(private prisma: PrismaService) { }

  async create(createFooterSocialDto: CreateFooterSocialDto) {
    return this.prisma.landingFooterSocial.create({
      data: createFooterSocialDto,
    });
  }

  async findAll() {
    return this.prisma.landingFooterSocial.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.landingFooterSocial.findUnique({
      where: { id, deletedAt: null },
    });
  }


  async update(id: string, updateFooterSocialDto: UpdateFooterSocialDto) {
    return this.prisma.landingFooterSocial.update({
      where: { id },
      data: updateFooterSocialDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingFooterSocial.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.landingFooterSocial.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}