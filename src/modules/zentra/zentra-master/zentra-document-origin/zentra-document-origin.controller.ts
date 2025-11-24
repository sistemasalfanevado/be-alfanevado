import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { ZentraDocumentOriginService } from './zentra-document-origin.service';
import { CreateZentraDocumentOriginDto } from './dto/create-zentra-document-origin.dto';
import { UpdateZentraDocumentOriginDto } from './dto/update-zentra-document-origin.dto';
import { Public } from '../../../../auth/shared/decorators/public.decorator';

@Controller('zentra-document-origin')
export class ZentraDocumentOriginController {
  constructor(
    private readonly zentraDocumentOriginService: ZentraDocumentOriginService,
  ) {}

  @Post()
  create(@Body() createDto: CreateZentraDocumentOriginDto) {
    return this.zentraDocumentOriginService.create(createDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.zentraDocumentOriginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zentraDocumentOriginService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateZentraDocumentOriginDto,
  ) {
    return this.zentraDocumentOriginService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zentraDocumentOriginService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.zentraDocumentOriginService.restore(id);
  }
}