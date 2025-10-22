import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraTelecreditoOperationDetailDto } from './dto/create-zentra-telecredito-operation-detail.dto';
import { UpdateZentraTelecreditoOperationDetailDto } from './dto/update-zentra-telecredito-operation-detail.dto';
import * as moment from 'moment';

@Injectable()
export class ZentraTelecreditoOperationDetailService {
  constructor(private prisma: PrismaService) {}

  /**
   * 🟢 Crear un detalle de operación de telecrédito
   */
  async create(createDto: CreateZentraTelecreditoOperationDetailDto) {
    return this.prisma.zentraTelecreditoOperationDetail.create({
      data: createDto,
    });
  }

  /**
   * 🔹 Obtener todos los detalles activos
   */
  async findAll() {
    const results = await this.prisma.zentraTelecreditoOperationDetail.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        document: true,
        telecreditoOperation: true,
      },
    });

    // 🔹 Devolver data en formato plano y legible
    return results.map((item) => ({
      id: item.id,
      documentId: item.documentId,
      documentName: item.document?.code ?? null,
      telecreditoOperationId: item.telecreditoOperationId,
      totalAmount: item.totalAmount,
      createdAt: moment(item.createdAt).format('DD/MM/YYYY HH:mm'),
    }));
  }

  /**
   * 🔍 Buscar un detalle por ID
   */
  async findOne(id: string) {
    return this.prisma.zentraTelecreditoOperationDetail.findUnique({
      where: { id },
      include: {
        document: true,
        telecreditoOperation: true,
      },
    });
  }

  /**
   * 📝 Actualizar un detalle
   */
  async update(id: string, updateDto: UpdateZentraTelecreditoOperationDetailDto) {
    return this.prisma.zentraTelecreditoOperationDetail.update({
      where: { id },
      data: updateDto,
    });
  }

  /**
   * 🗑️ Eliminación lógica
   */
  async remove(id: string) {
    return this.prisma.zentraTelecreditoOperationDetail.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  /**
   * 🔄 Restaurar registro eliminado
   */
  async restore(id: string) {
    return this.prisma.zentraTelecreditoOperationDetail.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  /**
   * 🔍 Obtener todos los detalles por telecreditoOperationId
   */
  async findByTelecreditoOperationId(telecreditoOperationId: string) {
    const results = await this.prisma.zentraTelecreditoOperationDetail.findMany({
      where: { 
        telecreditoOperationId,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        document: true,
      },
    });

    return results.map((item) => ({
      id: item.id,
      documentId: item.documentId,
      documentName: item.document?.code ?? null,
      telecreditoOperationId: item.telecreditoOperationId,
      totalAmount: item.totalAmount,
      createdAt: moment(item.createdAt).format('DD/MM/YYYY HH:mm'),
    }));
  }
}