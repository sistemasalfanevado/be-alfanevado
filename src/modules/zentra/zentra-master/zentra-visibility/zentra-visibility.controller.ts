import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraVisibilityService } from './zentra-visibility.service';
import { CreateZentraVisibilityDto } from './dto/create-zentra-visibility.dto';
import { UpdateZentraVisibilityDto } from './dto/update-zentra-visibility.dto';

@Controller('zentra-visibility')
export class ZentraVisibilityController {
  constructor(private readonly zentraVisibilityService: ZentraVisibilityService) {}

  @Post()
  create(@Body() createZentraVisibilityDto: CreateZentraVisibilityDto) {
    return this.zentraVisibilityService.create(createZentraVisibilityDto);
  }

  @Get()
  findAll() {
    return this.zentraVisibilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraVisibilityService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraVisibilityDto: UpdateZentraVisibilityDto) {
    return this.zentraVisibilityService.update(id, updateZentraVisibilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraVisibilityService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraVisibilityService.restore(id);
  }

}