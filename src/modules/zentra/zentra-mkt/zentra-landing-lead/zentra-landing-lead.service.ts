import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraLandingLeadDto } from './dto/create-zentra-landing-lead.dto';
import { UpdateZentraLandingLeadDto } from './dto/update-zentra-landing-lead.dto';
import * as moment from 'moment';

@Injectable()
export class ZentraLandingLeadService {
  constructor(private prisma: PrismaService) { }

  // 🟢 Crear registro (usado por el formulario público de la landing)
  async create(createDto: CreateZentraLandingLeadDto) {
    return this.prisma.zentraLandingLead.create({
      data: {
        name: createDto.name,
        lastname: createDto.lastname,
        phone: createDto.phone,
        email: createDto.email,
        message: createDto.message,
        project: createDto.project,
      },
    });
  }

  // 📋 Obtener todos los leads (solo los que no estén eliminados)
  async findAll() {
    const results = await this.prisma.zentraLandingLead.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    // Formatear la fecha antes de devolver los datos
    return results.map((lead) => ({
      ...lead,
      createdAt: moment(lead.createdAt).format('DD/MM/YYYY'),
    }));
  }


  // 🔍 Obtener un lead por ID
  async findOne(id: string) {
    return this.prisma.zentraLandingLead.findUnique({
      where: { id, deletedAt: null },
    });
  }

  // ✏️ Actualizar un lead
  async update(id: string, updateDto: UpdateZentraLandingLeadDto) {
    return this.prisma.zentraLandingLead.update({
      where: { id },
      data: { ...updateDto },
    });
  }

  // 🗑️ Eliminado lógico
  async remove(id: string) {
    return this.prisma.zentraLandingLead.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // ♻️ Restaurar un registro eliminado
  async restore(id: string) {
    return this.prisma.zentraLandingLead.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}