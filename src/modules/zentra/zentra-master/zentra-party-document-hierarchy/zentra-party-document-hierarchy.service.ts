import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPartyDocumentHierarchyDto } from './dto/create-zentra-party-document-hierarchy.dto';
import { UpdateZentraPartyDocumentHierarchyDto } from './dto/update-zentra-party-document-hierarchy.dto';

@Injectable()
export class ZentraPartyDocumentHierarchyService {
  constructor(private prisma: PrismaService) {}

  // Crear jerarquía de documentos
  async create(createDto: CreateZentraPartyDocumentHierarchyDto) {
    await this.prisma.zentraPartyDocumentHierarchy.create({
      data: {
        name: createDto.name,
      },
    });

    return { message: 'Jerarquía de documentos creada correctamente.' };
  }

  // Listar todas las jerarquías (no eliminadas)
  async findAll() {
    return this.prisma.zentraPartyDocumentHierarchy.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    });
  } 

  // Obtener una jerarquía por ID
  async findOne(id: string) {
    return this.prisma.zentraPartyDocumentHierarchy.findUnique({
      where: { id },
    });
  }

  // Actualizar jerarquía de documentos
  async update(id: string, updateDto: UpdateZentraPartyDocumentHierarchyDto) {
    await this.prisma.zentraPartyDocumentHierarchy.update({
      where: { id },
      data: updateDto,
    });

    return { message: 'Jerarquía de documentos actualizada correctamente.' };
  }

  // Eliminación lógica
  async remove(id: string) {
    await this.prisma.zentraPartyDocumentHierarchy.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Jerarquía de documentos eliminada correctamente.' };
  }

  // Restaurar registro eliminado
  async restore(id: string) {
    await this.prisma.zentraPartyDocumentHierarchy.update({
      where: { id },
      data: { deletedAt: null },
    });

    return { message: 'Jerarquía de documentos restaurada correctamente.' };
  }
}