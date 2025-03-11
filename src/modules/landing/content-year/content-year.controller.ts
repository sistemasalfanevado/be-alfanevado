import { Controller, Get, Post, Body, Put, Param, Delete, Patch, UseGuards} from '@nestjs/common';
import { ContentYearService } from './content-year.service';
import { CreateContentYearDto } from './dto/create-content-year.dto';
import { UpdateContentYearDto } from './dto/update-content-year.dto';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard'
import { Public } from '../../../auth/decorators/public.decorator'; 

@Controller('content-year')
@UseGuards(JwtAuthGuard)
export class ContentYearController {
  constructor(private readonly contentYearService: ContentYearService) {}

  @Post()
  create(@Body() createContentYearDto: CreateContentYearDto) {
    return this.contentYearService.create(createContentYearDto);
  }

  @Get()
  findAll() {
    return this.contentYearService.findAll();
  }

  @Get(':pageId/page')
  @Public()
  findAllByPage(@Param('pageId') pageId: string) {
    return this.contentYearService.findAllByPage(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentYearService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContentYearDto: UpdateContentYearDto) {
    return this.contentYearService.update(id, updateContentYearDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentYearService.remove(id);
  }

  @Patch(':id/restore') // Endpoint para restaurar un registro eliminado
  restore(@Param('id') id: string) {
    return this.contentYearService.restore(id);
  }
}