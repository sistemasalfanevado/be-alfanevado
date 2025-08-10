import { Controller, Get, Post, Body, Param, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ZentraDocumentStatusService } from './zentra-document-status.service';
import { CreateZentraDocumentStatusDto } from './dto/create-zentra-document-status.dto';
import { UpdateZentraDocumentStatusDto } from './dto/update-zentra-document-status.dto';

import { JwtAuthGuard } from '../../../../auth/shared/guards/jwt-auth.guard';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-document-status')
//@UseGuards(JwtAuthGuard)
export class ZentraDocumentStatusController {
  constructor(private readonly zentraDocumentStatusService: ZentraDocumentStatusService) {}

  @Post()
  create(@Body() createZentraDocumentStatusDto: CreateZentraDocumentStatusDto) {
    return this.zentraDocumentStatusService.create(createZentraDocumentStatusDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraDocumentStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraDocumentStatusService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZentraDocumentStatusDto: UpdateZentraDocumentStatusDto) {
    return this.zentraDocumentStatusService.update(id, updateZentraDocumentStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraDocumentStatusService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraDocumentStatusService.restore(id);
  }
}