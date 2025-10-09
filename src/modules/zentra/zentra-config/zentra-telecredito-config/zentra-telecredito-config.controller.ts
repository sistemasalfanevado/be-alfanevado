import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

import { ZentraTelecreditoConfigService } from './zentra-telecredito-config.service';
import { CreateZentraTelecreditoConfigDto } from './dto/create-zentra-telecredito-config.dto';
import { UpdateZentraTelecreditoConfigDto } from './dto/update-zentra-telecredito-config.dto';
import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-telecredito-config')
// @UseGuards(JwtAuthGuard)
export class ZentraTelecreditoConfigController {
  constructor(
    private readonly zentraTelecreditoConfigService: ZentraTelecreditoConfigService,
  ) {}

  // 🟢 Crear nueva configuración
  @Post()
  create(@Body() createDto: CreateZentraTelecreditoConfigDto) {
    return this.zentraTelecreditoConfigService.create(createDto);
  }

  // 🟢 Listar todas las configuraciones
  @Get()
  findAll() {
    return this.zentraTelecreditoConfigService.findAll();
  }

  // 🟢 Obtener una configuración por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const config = await this.zentraTelecreditoConfigService.findOne(id);
    if (!config) {
      throw new NotFoundException('Configuración no encontrada');
    }
    return config;
  }

  // 🟡 Actualizar una configuración
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraTelecreditoConfigDto,
  ) {
    const config = await this.zentraTelecreditoConfigService.findOne(id);
    if (!config) {
      throw new NotFoundException('Configuración no encontrada');
    }
    return this.zentraTelecreditoConfigService.update(id, updateDto);
  }

  // 🔴 Eliminar (borrado lógico o físico)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const config = await this.zentraTelecreditoConfigService.findOne(id);
    if (!config) {
      throw new NotFoundException('Configuración no encontrada');
    }
    return this.zentraTelecreditoConfigService.remove(id);
  }

  // ♻️ Restaurar una configuración eliminada (si usas borrado lógico)
  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    const config = await this.zentraTelecreditoConfigService.findOne(id);
    if (!config) {
      throw new NotFoundException('Configuración no encontrada');
    }
    return this.zentraTelecreditoConfigService.restore(id);
  }
}