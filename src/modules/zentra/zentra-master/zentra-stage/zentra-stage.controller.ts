import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraStageService } from './zentra-stage.service';
import { CreateZentraStageDto } from './dto/create-zentra-stage.dto';
import { UpdateZentraStageDto } from './dto/update-zentra-stage.dto';

@Controller('zentra-stages')
export class ZentraStageController {
  constructor(private readonly zentraStageService: ZentraStageService) {}

  @Post()
  create(@Body() createZentraStageDto: CreateZentraStageDto) {
    return this.zentraStageService.create(createZentraStageDto);
  }

  @Get()
  findAll() {
    return this.zentraStageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraStageService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraStageDto: UpdateZentraStageDto) {
    return this.zentraStageService.update(id, updateZentraStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraStageService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraStageService.restore(id);
  }
}