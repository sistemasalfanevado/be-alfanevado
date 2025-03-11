import { Controller, Get, Post, Body, Put, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { LotService } from './lot.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard'
import { Public } from '../../../auth/decorators/public.decorator'; 

@Controller('lot')
@UseGuards(JwtAuthGuard)
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @Post()
  create(@Body() createLotDto: CreateLotDto) {
    return this.lotService.create(createLotDto);
  }

  @Get()
  findAll() {
    return this.lotService.findAll();
  }

  @Get(':pageId/page')
  @Public()
  findAllByPage(@Param('pageId') pageId: string) {
    return this.lotService.findAllByPage(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lotService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLotDto: UpdateLotDto) {
    return this.lotService.update(id, updateLotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lotService.remove(id);
  }

  @Patch(':id/restore') // Endpoint para restaurar un registro eliminado
  restore(@Param('id') id: string) {
    return this.lotService.restore(id);
  }
}