import { Controller, Get, Post, Body, Put, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard'
import { Public } from '../../../auth/decorators/public.decorator'; 

@Controller('content')
@UseGuards(JwtAuthGuard)
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':pageId/page')
  @Public()
  findAllByPage(@Param('pageId') pageId: string) {
    return this.contentService.findAllByPage(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(id, updateContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(id);
  }

  @Patch(':id/restore') // Endpoint para restaurar un registro eliminado
  restore(@Param('id') id: string) {
    return this.contentService.restore(id);
  }
}