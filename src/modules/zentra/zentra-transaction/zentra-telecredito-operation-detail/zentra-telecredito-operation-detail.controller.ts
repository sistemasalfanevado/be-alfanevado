import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { ZentraTelecreditoOperationDetailService } from './zentra-telecredito-operation-detail.service';
import { CreateZentraTelecreditoOperationDetailDto } from './dto/create-zentra-telecredito-operation-detail.dto';
import { UpdateZentraTelecreditoOperationDetailDto } from './dto/update-zentra-telecredito-operation-detail.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-telecredito-operation-details')
export class ZentraTelecreditoOperationDetailController {
  constructor(
    private readonly zentraTelecreditoOperationDetailService: ZentraTelecreditoOperationDetailService,
  ) {}

  // Crear un detalle
  @Post()
  create(@Body() createDto: CreateZentraTelecreditoOperationDetailDto) {
    return this.zentraTelecreditoOperationDetailService.create(createDto);
  }

  // Listar todos (si lo permites)
  @Get()
  @Public()
  findAll() {
    return this.zentraTelecreditoOperationDetailService.findAll();
  }

  // Obtener un detalle por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraTelecreditoOperationDetailService.findOne(id);
  }

  // 👉 Nuevo método: obtener detalles por telecreditoOperationId
  @Get('by-operation/:telecreditoOperationId')
  @Public()
  findByOperation(@Param('telecreditoOperationId') telecreditoOperationId: string) {
    return this.zentraTelecreditoOperationDetailService.findByTelecreditoOperationId(telecreditoOperationId);
  }

  // Actualizar detalle
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraTelecreditoOperationDetailDto,
  ) {
    return this.zentraTelecreditoOperationDetailService.update(id, updateDto);
  }

  // Eliminar (soft delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraTelecreditoOperationDetailService.remove(id);
  }

  // Restaurar
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraTelecreditoOperationDetailService.restore(id);
  }
}