import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraScheduledDebtDocumentDto } from './dto/create-zentra-scheduled-debt-document.dto';
import { UpdateZentraScheduledDebtDocumentDto } from './dto/update-zentra-scheduled-debt-document.dto';

@Injectable()
export class ZentraScheduledDebtDocumentService {
  constructor(private prisma: PrismaService) {}

  // 🟢 Crear documento de deuda
  async create(createDto: CreateZentraScheduledDebtDocumentDto) {
    return this.prisma.zentraScheduledDebtDocument.create({
      data: createDto,
      include: {
        document: { select: { id: true, code: true, description: true } },
      },
    });
  }

  // 🔍 Listar todos los documentos de deuda
  async findAll() {
    const results = await this.prisma.zentraScheduledDebtDocument.findMany({
      where: { deletedAt: null },
      include: {
        document: { select: { id: true, code: true, description: true } },
        installments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Transformación opcional del resultado para respuestas limpias
    return results.map((doc) => ({
      id: doc.id,
      documentId: doc.document?.id,
      documentCode: doc.document?.code,
      documentDescription: doc.document?.description,
      installmentsCount: doc.installments?.length || 0,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  }

  // 🔍 Buscar uno por ID
  async findOne(id: string) {
    return this.prisma.zentraScheduledDebtDocument.findUnique({
      where: { id },
      include: {
        document: true,
        installments: {
          include: {
            installmentStatus: true,
            currency: true,
          },
        },
      },
    });
  }

  // 🛠️ Actualizar documento de deuda
  async update(id: string, updateDto: UpdateZentraScheduledDebtDocumentDto) {
    return this.prisma.zentraScheduledDebtDocument.update({
      where: { id },
      data: updateDto,
      include: {
        document: { select: { id: true, code: true } },
      },
    });
  }

  // 🗑️ Eliminación lógica (soft delete)
  async remove(id: string) {
    return this.prisma.zentraScheduledDebtDocument.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // ♻️ Restaurar documento eliminado
  async restore(id: string) {
    return this.prisma.zentraScheduledDebtDocument.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}