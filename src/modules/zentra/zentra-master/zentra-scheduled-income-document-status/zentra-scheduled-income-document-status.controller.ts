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
import { ZentraScheduledIncomeDocumentStatusService } from './zentra-scheduled-income-document-status.service';
import { CreateZentraScheduledIncomeDocumentStatusDto } from './dto/create-zentra-scheduled-income-document-status.dto';
import { UpdateZentraScheduledIncomeDocumentStatusDto } from './dto/update-zentra-scheduled-income-document-status.dto';

@Controller('zentra-scheduled-income-document-status')
export class ZentraScheduledIncomeDocumentStatusController {
  constructor(
    private readonly statusService: ZentraScheduledIncomeDocumentStatusService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraScheduledIncomeDocumentStatusDto) {
    return this.statusService.create(createDto);
  }

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  // 🔵 Obtener un estado por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(id);
  }

  // 🟠 Actualizar un estado
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraScheduledIncomeDocumentStatusDto,
  ) {
    return this.statusService.update(id, updateDto);
  }

  // 🔴 Eliminar (soft delete)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(id);
  }

  // 🟣 Restaurar (soft restore)
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.statusService.restore(id);
  }
}