import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPartyDocumentTypeDto } from './dto/create-zentra-party-document-type.dto';
import { UpdateZentraPartyDocumentTypeDto } from './dto/update-zentra-party-document-type.dto';

@Injectable()
export class ZentraPartyDocumentTypeService {
  constructor(private prisma: PrismaService) {}

  // Crear tipo de documento
  async create(createDto: CreateZentraPartyDocumentTypeDto) {
    await this.prisma.zentraPartyDocumentType.create({
      data: {
        name: createDto.name,
      },
    }); 

    return { message: 'Tipo de documento creado correctamente.' };
  }

  // Listar todos los tipos de documento (no eliminados)
  async findAll() {
    return this.prisma.zentraPartyDocumentType.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  // Obtener uno por ID
  async findOne(id: string) {
    return this.prisma.zentraPartyDocumentType.findUnique({
      where: { id, deletedAt: null },
    });
  }

  // Actualizar tipo de documento
  async update(id: string, updateDto: UpdateZentraPartyDocumentTypeDto) {
    await this.prisma.zentraPartyDocumentType.update({
      where: { id },
      data: updateDto,
    });

    return { message: 'Tipo de documento actualizado correctamente.' };
  }

  // Eliminado lógico
  async remove(id: string) {
    await this.prisma.zentraPartyDocumentType.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Tipo de documento eliminado correctamente.' };
  }

  // Restaurar registro eliminado
  async restore(id: string) {
    await this.prisma.zentraPartyDocumentType.update({
      where: { id },
      data: { deletedAt: null },
    });

    return { message: 'Tipo de documento restaurado correctamente.' };
  }
}
