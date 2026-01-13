import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraAreaService } from './zentra-area.service';
import { CreateZentraAreaDto } from './dto/create-zentra-area.dto';
import { UpdateZentraAreaDto } from './dto/update-zentra-area.dto';

@Controller('zentra-areas')
export class ZentraAreaController {
  constructor(private readonly zentraAreaService: ZentraAreaService) {}

  @Post()
  create(@Body() createZentraAreaDto: CreateZentraAreaDto) {
    return this.zentraAreaService.create(createZentraAreaDto);
  }

  @Get()
  findAll() {
    return this.zentraAreaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraAreaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraAreaDto: UpdateZentraAreaDto) {
    return this.zentraAreaService.update(id, updateZentraAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraAreaService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraAreaService.restore(id);
  }
}