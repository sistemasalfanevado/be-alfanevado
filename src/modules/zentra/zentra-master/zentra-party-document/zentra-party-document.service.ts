import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPartyDocumentDto } from './dto/create-zentra-party-document.dto';
import { UpdateZentraPartyDocumentDto } from './dto/update-zentra-party-document.dto';

@Injectable()
export class ZentraPartyDocumentService {
  constructor(private prisma: PrismaService) {}

  // Crear documento de parte
  async create(createDto: CreateZentraPartyDocumentDto) {
    await this.prisma.zentraPartyDocument.create({
      data: {
        document: createDto.document,
        observation: createDto.observation,
        partyId: createDto.partyId,
        documentTypeId: createDto.documentTypeId,
        documentHierarchyId: createDto.documentHierarchyId,
      },
    });

    return { message: 'Documento de parte creado correctamente.' };
  }

  // Listar todos los documentos (no eliminados)
  async findAll() {
    return this.prisma.zentraPartyDocument.findMany({
      where: { deletedAt: null },
      include: {
        party: true,
        documentType: true,
        documentHierarchy: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Obtener un documento por ID
  async findOne(id: string) {
    return this.prisma.zentraPartyDocument.findUnique({
      where: { id },
      include: {
        party: true,
        documentType: true,
        documentHierarchy: true,
      },
    });
  }

  // Actualizar documento
  async update(id: string, updateDto: UpdateZentraPartyDocumentDto) {
    await this.prisma.zentraPartyDocument.update({
      where: { id },
      data: updateDto,
    });

    return { message: 'Documento de parte actualizado correctamente.' };
  }

  // Eliminación lógica
  async remove(id: string) {
    await this.prisma.zentraPartyDocument.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Documento de parte eliminado correctamente.' };
  }

  // Restaurar documento eliminado
  async restore(id: string) {
    await this.prisma.zentraPartyDocument.update({
      where: { id },
      data: { deletedAt: null },
    });

    return { message: 'Documento de parte restaurado correctamente.' };
  }
}