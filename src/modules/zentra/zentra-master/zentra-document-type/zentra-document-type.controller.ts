import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraDocumentTypeService } from './zentra-document-type.service';
import { CreateZentraDocumentTypeDto } from './dto/create-zentra-document-type.dto';
import { UpdateZentraDocumentTypeDto } from './dto/update-zentra-document-type.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-document-types')
//@UseGuards(JwtAuthGuard)
export class ZentraDocumentTypeController {
  constructor(private readonly zentraDocumentTypeService: ZentraDocumentTypeService) {}

  @Post()
  create(@Body() createZentraDocumentTypeDto: CreateZentraDocumentTypeDto) {
    return this.zentraDocumentTypeService.create(createZentraDocumentTypeDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraDocumentTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraDocumentTypeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraDocumentTypeDto: UpdateZentraDocumentTypeDto) {
    return this.zentraDocumentTypeService.update(id, updateZentraDocumentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraDocumentTypeService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraDocumentTypeService.restore(id);
  }
}