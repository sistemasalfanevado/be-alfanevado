import { Controller, Get, Post, Body, Param, Patch, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ZentraPercentageService } from './zentra-percentage.service';
import { CreateZentraPercentageDto } from './dto/create-zentra-percentage.dto';
import { UpdateZentraPercentageDto } from './dto/update-zentra-percentage.dto';

@Controller('zentra-percentages') // Plural y descriptivo
export class ZentraPercentageController {
  constructor(private readonly zentraPercentageService: ZentraPercentageService) {}

  @Post()
  create(@Body() createDto: CreateZentraPercentageDto) {
    return this.zentraPercentageService.create(createDto);
  }

  @Get()
  findAll() {
    // Aquí podrías pasar un flag si quieres ver también los eliminados
    return this.zentraPercentageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.zentraPercentageService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateDto: UpdateZentraPercentageDto
  ) {
    return this.zentraPercentageService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    // Soft delete: el servicio pondrá la fecha en deletedAt
    return this.zentraPercentageService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.zentraPercentageService.restore(id);
  }
}