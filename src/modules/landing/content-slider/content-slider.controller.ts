import { Controller, Get, Post, Body, Put, Param, Delete, Patch, UseGuards} from '@nestjs/common';
import { ContentSliderService } from './content-slider.service';
import { CreateContentSliderDto } from './dto/create-content-slider.dto';
import { UpdateContentSliderDto } from './dto/update-content-slider.dto';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard'
import { Public } from '../../../auth/decorators/public.decorator'; 

@Controller('content-slider')
@UseGuards(JwtAuthGuard)
export class ContentSliderController {
  constructor(private readonly contentSliderService: ContentSliderService) {}

  @Post()
  create(@Body() createContentSliderDto: CreateContentSliderDto) {
    return this.contentSliderService.create(createContentSliderDto);
  }

  @Get()
  findAll() {
    return this.contentSliderService.findAll();
  }

  @Get(':pageId/page')
  @Public()
  findAllByPage(@Param('pageId') pageId: string) {
    return this.contentSliderService.findAllByPage(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentSliderService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContentSliderDto: UpdateContentSliderDto) {
    return this.contentSliderService.update(id, updateContentSliderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentSliderService.remove(id);
  }

  @Patch(':id/restore') // Endpoint para restaurar un registro eliminado
  restore(@Param('id') id: string) {
    return this.contentSliderService.restore(id);
  }
}