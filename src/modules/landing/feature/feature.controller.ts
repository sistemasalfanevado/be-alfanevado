import { Controller, Get, Post, Body, Put, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('feature')
//@UseGuards(AuthGuard('jwt'))
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featureService.create(createFeatureDto);
  }

  @Get()
  findAll() {
    return this.featureService.findAll();
  }

  @Get(':pageId/page')
  findAllByPage(@Param('pageId') pageId: string) {
    return this.featureService.findAllByPage(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto) {
    return this.featureService.update(id, updateFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureService.remove(id);
  }

  @Patch(':id/restore') // Endpoint para restaurar un registro eliminado
  restore(@Param('id') id: string) {
    return this.featureService.restore(id);
  }
}