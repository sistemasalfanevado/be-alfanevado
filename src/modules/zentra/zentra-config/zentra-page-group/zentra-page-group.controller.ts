import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

import { ZentraPageGroupService } from './zentra-page-group.service';
import { CreateZentraPageGroupDto } from './dto/create-zentra-page-group.dto';
import { UpdateZentraPageGroupDto } from './dto/update-zentra-page-group.dto';

@Controller('zentra-page-group')
export class ZentraPageGroupController {
  constructor(private readonly zentraPageGroupService: ZentraPageGroupService) {}

  @Post()
  create(@Body() createZentraPageGroupDto: CreateZentraPageGroupDto) {
    return this.zentraPageGroupService.create(createZentraPageGroupDto);
  }

  @Get()
  findAll() {
    return this.zentraPageGroupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const pageGroup = await this.zentraPageGroupService.findOne(id);
    if (!pageGroup) {
      throw new NotFoundException('Grupo de páginas no encontrado');
    }
    return pageGroup;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateZentraPageGroupDto: UpdateZentraPageGroupDto) {
    const pageGroup = await this.zentraPageGroupService.findOne(id);
    if (!pageGroup) {
      throw new NotFoundException('Grupo de páginas no encontrado');
    }
    return this.zentraPageGroupService.update(id, updateZentraPageGroupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const pageGroup = await this.zentraPageGroupService.findOne(id);
    if (!pageGroup) {
      throw new NotFoundException('Grupo de páginas no encontrado');
    }
    return this.zentraPageGroupService.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    const pageGroup = await this.zentraPageGroupService.findOne(id);
    if (!pageGroup) {
      throw new NotFoundException('Grupo de páginas no encontrado');
    }
    return this.zentraPageGroupService.restore(id);
  }
}