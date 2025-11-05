import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';

@Injectable()
export class LotService {
  constructor(private prisma: PrismaService) { }

  async create(createLotDto: CreateLotDto) {
    await this.prisma.landingLot.create({
      data: {
        name: createLotDto.name,
        number: createLotDto.number,
        block: createLotDto.block,
        code: createLotDto.code,
        area: createLotDto.area,
        perimeter: createLotDto.perimeter,
        detail: createLotDto.detail,
        pricePerSquareMeter: createLotDto.pricePerSquareMeter ?? 0,
        totalPrice: createLotDto.totalPrice ?? 0,
        status: { connect: { id: createLotDto.statusId } },
        page: { connect: { id: createLotDto.pageId } },
      },
    });

    return { message: 'Lote creado correctamente ✅' };

  }

  async findAll() {
    return this.prisma.landingLot.findMany({
      where: { deletedAt: null }, // Solo registros no eliminados
      include: { status: true, page: true }, // Incluye el estado y la página
    });
  }

  async findAllByPage(pageId: string) {

    const landingLots = await this.prisma.landingLot.findMany({
      where: { deletedAt: null, pageId },
      include: {
        status: true,
      },
    });


    const transformedLots = landingLots.map(lot => ({
      ...lot,
      statusTitle: lot.status.title,
      status: undefined,
    }));

    return transformedLots;

  }

  async findOne(id: string) {
    return this.prisma.landingLot.findUnique({
      where: { id, deletedAt: null }, // Solo si no está eliminado
      include: { status: true, page: true }, // Incluye el estado y la página
    });
  }

  async update(id: string, updateLotDto: UpdateLotDto) {
    return this.prisma.landingLot.update({
      where: { id },
      data: updateLotDto,
    });
  }

  async remove(id: string) {
    return this.prisma.landingLot.update({
      where: { id },
      data: { deletedAt: new Date() }, // Soft delete
    });
  }

  async restore(id: string) {
    return this.prisma.landingLot.update({
      where: { id },
      data: { deletedAt: null }, // Restaurar registro
    });
  }
}