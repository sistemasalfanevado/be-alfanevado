import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateZentraPartyDocumentDto } from './dto/create-zentra-party-document.dto';
import { UpdateZentraPartyDocumentDto } from './dto/update-zentra-party-document.dto';
import { PARTY_DOCUMENT_HIERARCHY } from 'src/shared/constants/app.constants';

@Injectable()
export class ZentraPartyDocumentService {
  constructor(private prisma: PrismaService) { }

  // Crear documento de parte
  async create(createDto: CreateZentraPartyDocumentDto) {

    // Si el documento es PRINCIPAL, degradamos el anterior a ADICIONAL
    if (createDto.documentHierarchyId === PARTY_DOCUMENT_HIERARCHY.PRINCIPAL) {
      await this.prisma.zentraPartyDocument.updateMany({
        where: {
          partyId: createDto.partyId,
          documentHierarchyId: PARTY_DOCUMENT_HIERARCHY.PRINCIPAL,
        },
        data: {
          documentHierarchyId: PARTY_DOCUMENT_HIERARCHY.ADICIONAL,
        },
      });
    }

    // Crear el documento
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

    const results = await this.prisma.zentraPartyDocument.findMany({
      where: { deletedAt: null },
      include: {
        party: true,
        documentType: true,
        documentHierarchy: true,
      },
    });

    return results.map((item) => ({
      id: item.id,
      document: item.document,
      observation: item.observation,

      partyId: item.party?.id || null,
      partyName: item.party?.name || null,

      documentTypeId: item.documentType?.id || null,
      documentTypeName: item.documentType?.name || null,

      documentHierarchyId: item.documentHierarchy?.id || null,
      documentHierarchyName: item.documentHierarchy?.name || null,
    }));

  }

  async findByPartyId(partyId: string): Promise<any[]> {
    const results = await this.prisma.zentraPartyDocument.findMany({
      where: { partyId, deletedAt: null },
      include: {
        party: true,
        documentType: true,
        documentHierarchy: true,
      },
    });

    return results.map((item) => ({
      id: item.id,
      document: item.document,
      observation: item.observation,

      partyId: item.party?.id || null,
      partyName: item.party?.name || null,

      documentTypeId: item.documentType?.id || null,
      documentTypeName: item.documentType?.name || null,

      documentHierarchyId: item.documentHierarchy?.id || null,
      documentHierarchyName: item.documentHierarchy?.name || null,
    }));
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
  // Actualizar documento
  async update(id: string, updateDto: UpdateZentraPartyDocumentDto) {
    // Obtener el documento actual para saber partyId y jerarquía
    const current = await this.prisma.zentraPartyDocument.findUnique({
      where: { id },
    });

    if (!current) {
      throw new Error('Documento no encontrado');
    }

    // Si la nueva jerarquía es PRINCIPAL,
    // degradamos los otros documentos PRINCIPAL del mismo partyId
    if (updateDto.documentHierarchyId === PARTY_DOCUMENT_HIERARCHY.PRINCIPAL) {
      await this.prisma.zentraPartyDocument.updateMany({
        where: {
          partyId: current.partyId,
          documentHierarchyId: PARTY_DOCUMENT_HIERARCHY.PRINCIPAL,
          NOT: { id }, // Excluir al documento que estamos actualizando
        },
        data: {
          documentHierarchyId: PARTY_DOCUMENT_HIERARCHY.ADICIONAL,
        },
      });
    }

    // Actualizamos el documento
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

  async findPartiesWithMultiplePrincipals() {
    const PRINCIPAL = PARTY_DOCUMENT_HIERARCHY.PRINCIPAL;

    // 1. Obtener todos los documentos
    const docs = await this.prisma.zentraPartyDocument.findMany();

    // 2. Agrupar por partyId
    const grouped = docs.reduce((acc, item) => {
      if (!acc[item.partyId]) acc[item.partyId] = [];
      acc[item.partyId].push(item);
      return acc;
    }, {} as Record<string, typeof docs>);

    // 3. Identificar partidos con más de un PRINCIPAL
    const invalid = Object.entries(grouped)
      .map(([partyId, list]) => {
        const principals = list.filter(d => d.documentHierarchyId === PRINCIPAL);
        return { partyId, principals };
      })
      .filter(item => item.principals.length > 1);

    return invalid;
  }

  async fixMultiplePrincipals() {
    const PRINCIPAL = PARTY_DOCUMENT_HIERARCHY.PRINCIPAL;
    const ADICIONAL = PARTY_DOCUMENT_HIERARCHY.ADICIONAL;

    // 1. Obtener documentos
    const docs = await this.prisma.zentraPartyDocument.findMany();

    // 2. Agrupar por partyId
    const grouped = docs.reduce((acc, item) => {
      if (!acc[item.partyId]) acc[item.partyId] = [];
      acc[item.partyId].push(item);
      return acc;
    }, {} as Record<string, typeof docs>);

    const fixes: any[] = [];

    // 3. Procesar partidos
    for (const [partyId, list] of Object.entries(grouped)) {
      const principals = list.filter(d => d.documentHierarchyId === PRINCIPAL);

      // Solo si hay más de uno
      if (principals.length > 1) {
        const principalToKeep = principals[0];
        const principalsToDemote = principals.slice(1);

        // 4. Degradar a ADICIONAL
        await this.prisma.zentraPartyDocument.updateMany({
          where: {
            id: {
              in: principalsToDemote.map(p => p.id)
            }
          },
          data: {
            documentHierarchyId: ADICIONAL
          }
        });

        fixes.push({
          partyId,
          keptPrincipal: principalToKeep.id,
          demoted: principalsToDemote.map(p => p.id)
        });
      }
    }

    return {
      message: "Corrección de documentos completada",
      totalPartiesFixed: fixes.length,
      details: fixes
    };
  }

}