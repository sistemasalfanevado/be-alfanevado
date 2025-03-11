import { Controller, Get, Post, Body, Put, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { LotStatusService } from './lot-status.service';
import { CreateLotStatusDto } from './dto/create-lot-status.dto';
import { UpdateLotStatusDto } from './dto/update-lot-status.dto';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard'
import { Public } from '../../../auth/decorators/public.decorator'; 

@Controller('lot-status')
@UseGuards(JwtAuthGuard)
export class LotStatusController {
  constructor(private readonly lotStatusService: LotStatusService) {}

  @Post()
  create(@Body() createLotStatusDto: CreateLotStatusDto) {
    return this.lotStatusService.create(createLotStatusDto);
  }

  @Get()
  findAll() {
    return this.lotStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lotStatusService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLotStatusDto: UpdateLotStatusDto) {
    return this.lotStatusService.update(id, updateLotStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lotStatusService.remove(id);
  }

  @Patch(':id/restore') // Endpoint para restaurar un registro eliminado
  restore(@Param('id') id: string) {
    return this.lotStatusService.restore(id);
  }
}