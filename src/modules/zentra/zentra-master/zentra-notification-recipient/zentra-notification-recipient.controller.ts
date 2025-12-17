import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  UseGuards
} from '@nestjs/common';

import { ZentraNotificationRecipientService } from './zentra-notification-recipient.service';
import { CreateZentraNotificationRecipientDto } from './dto/create-zentra-notification-recipient.dto';
import { UpdateZentraNotificationRecipientDto } from './dto/update-zentra-notification-recipient.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';

@Controller('zentra-notification-recipients')
@UseGuards(JwtAuthGuard)
export class ZentraNotificationRecipientController {

  constructor(
    private readonly service: ZentraNotificationRecipientService
  ) { }

  // ✅ Crear receptor
  @Post()
  create(
    @Body() dto: CreateZentraNotificationRecipientDto
  ) {
    return this.service.create(dto);
  }

  // ✅ Listar receptores
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ✅ Obtener uno
  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.service.findOne(id);
  }

  // ✏️ Editar receptor (cambiar usuario)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateZentraNotificationRecipientDto
  ) {
    return this.service.update(id, dto);
  }

  // 🗑️ Eliminar (soft delete)
  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.service.remove(id);
  }

  // ♻️ Restaurar
  @Patch(':id/restore')
  restore(
    @Param('id') id: string
  ) {
    return this.service.restore(id);
  }
}