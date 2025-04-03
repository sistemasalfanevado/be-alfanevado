import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CreateFooterContactDto } from './dto/create-footer-contact.dto';
import { UpdateFooterContactDto } from './dto/update-footer-contact.dto';
 
@Injectable()
export class FooterContactService {

  constructor(private prisma: PrismaService) {}

  async create(createFooterContactDto: CreateFooterContactDto) {
    return this.prisma.landingFooterContact.create({
      data: createFooterContactDto,
    });
  }

  async findAll() {
    return this.prisma.landingFooterContact.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.landingFooterContact.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updateFooterContactDto: UpdateFooterContactDto) {
    return this.prisma.landingFooterContact.update({
      where: { id },
      data: updateFooterContactDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingFooterContact.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
  

  async restore(id: string) {
    return this.prisma.landingFooterContact.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}